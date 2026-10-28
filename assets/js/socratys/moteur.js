/* Socratys — moteur du parcours.
   Le contenu pédagogique est dans les fichiers sujet-*.js ; ce fichier ne fait
   que les dérouler. Tout reste dans le navigateur de l'élève (localStorage) :
   aucun compte, aucun serveur, rien n'est envoyé.

   L'interface suit le design system Socratys (docs/DESIGN.md) : une question à
   l'écran, une frise de neuf étapes, « Ma dissertation » (tiroir sur téléphone,
   colonne sur ordinateur) et un brouillon final modifiable.

   Une étape est un objet dont les clés possibles sont :
     section   titre de section (bandeau)
     repere    [titre, texte]        encadré de repère
     texte     {corps:[…], source}  texte philosophique à lire
     bon       texte d'une bulle « Bon à savoir »
     dit       [phrases]             ce que dit Socratys
   puis au plus une interaction :
     reponse   libellé d'un champ de réponse libre   (+ id, motsCles, relances)
     choix     [{l, bon, vers}]      boutons            (+ id, relances)
     champs    [libellés]            plusieurs champs   (+ id, requis, relances)
     amorce    "phrase avec ___"     phrase à compléter (+ id, consigne, relances)
     association {gauche, droite, solution}           (+ id, relances)
     redaction clé du paragraphe à rédiger             (+ titre, consigne, notes,
               modele : texte pré-rempli à partir des réponses, que l'élève peut modifier,
               brouillon : true pour pré-remplir avec les réponses des notes, dans l'ordre)
   Dans sujet.copie, une ligne [titre, clé, modèle] assemble le passage à partir
   des réponses quand l'élève ne l'a pas rédigé (ex. l'introduction du sujet 3).
   Dans les textes, {id} ou {id.2} insère une réponse de l'élève ;
   {a|b} prend la première réponse non vide. */
(function () {
  "use strict";

  const S = window.SOCRATYS;
  const SUJETS = window.SOCRATYS_SUJETS || [];
  const PREFIXE = "socratys.v2.";

  const $ = (id) => document.getElementById(id);
  const fil = $("fil");
  const ctl = $("ctl");
  const prog = $("prog");
  const side = $("side");
  const dtab = $("dtab");
  const scrim = $("scrim");
  const impression = $("impression");
  const LARGE = window.matchMedia("(min-width: 1100px)");
  const CALME = window.matchMedia("(prefers-reduced-motion: reduce)");

  const ICO = {
    tick: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.3l2.3 2.3 4.7-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chev: '<svg class="chev" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 7l4.5 4.5L13.5 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pen: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.6 2.6l2.8 2.8-8 8H2.6v-2.8l8-8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 4.5l9 9M13.5 4.5l-9 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    back: '<svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><path d="M11 4.5L6.5 9l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* Les étapes possibles de la frise (l'amorce, puis les neuf étapes de la méthode). Chaque sujet n'affiche que celles qu'il
     contient, dans l'ordre où il les parcourt (voir calculerEtapes). */
  const ETAPES = [
    { l: "Amorce", fin: "Tu as rédigé ton amorce." },
    { l: "Prédicat", fin: "Tu as cerné le premier mot à définir." },
    { l: "Sujet grammatical", fin: "Tu as nommé le sujet grammatical." },
    { l: "Couple philosophique", fin: "Tu as trouvé ton couple philosophique." },
    { l: "Définitions", fin: "Tu as défini les deux sens du prédicat." },
    { l: "Reformulation", fin: "Tu as reformulé le sujet." },
    { l: "Hypothèses", fin: "Tu as formulé tes deux hypothèses." },
    { l: "Plan", fin: "Tu as annoncé ton plan." },
    { l: "Parties", fin: "Tu as rédigé tes trois parties." },
    { l: "Conclusion", fin: "Tu as rédigé ta conclusion." }
  ];
  const ROMAINS = ["", "I", "II", "III"];
  const ORDINAUX = ["", "première", "deuxième", "troisième"];
  const ID_ETAPE = { amorce: 0, predicat: 1, sujetGram: 2, couple: 3, defs: 4, distinctes: 4, defs2: 4, reform: 5, probl: 6, problemes: 6, plan: 7 };
  /* Notes de cohérence : étape modifiée → étapes qui reçoivent la question. */
  const DEPEND = { 1: [3, 4, 5], 2: [3, 4, 5], 3: [4, 5, 6], 4: [5, 6], 5: [6, 7], 6: [7, 8], 7: [8, 9], 8: [9] };

  let sujet = null;
  let etat = null;
  let vue = "accueil";
  let friseOuverte = false;
  let edition = null;      /* {cle, avant, s} : la carte en cours de modification */
  let minuteurEnreg = null;
  let minuteurAjout = null;

  /* ---------- outils ---------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }
  function norm(s) {
    return String(s).toLowerCase().normalize("NFD")
      .replace(/[̀-ͯ]/g, "").replace(/[’‘]/g, "'");
  }
  function correspond(v, mots) {
    const t = norm(v);
    return mots.some((m) => t.indexOf(norm(m)) >= 0);
  }
  function el(tag, cls, html) {
    const d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }

  function lire(cle) {
    try { const r = localStorage.getItem(PREFIXE + cle); return r ? JSON.parse(r) : null; }
    catch (e) { return null; }
  }
  function ecrire(cle, val) {
    try { localStorage.setItem(PREFIXE + cle, JSON.stringify(val)); } catch (e) { /* stockage indisponible */ }
  }
  function effacer(cle) {
    try { localStorage.removeItem(PREFIXE + cle); } catch (e) { /* stockage indisponible */ }
  }
  /* sauvegarde automatique, signalée discrètement en haut d'écran */
  function sauve() {
    if (!sujet || !etat) return;
    ecrire("sujet." + sujet.id, etat);
    const b = $("enreg");
    b.hidden = false;
    $("enreg-t").textContent = "Enregistrement…";
    clearTimeout(minuteurEnreg);
    minuteurEnreg = setTimeout(() => { $("enreg-t").textContent = "Enregistré"; }, 450);
  }

  function valeur(chemin) {
    for (const alt of chemin.split("|")) {
      const p = alt.split(".");
      let v = etat.A[p[0]];
      if (p.length > 1 && Array.isArray(v)) v = v[+p[1]];
      if (v !== undefined && v !== null && String(v).trim() !== "") return String(v).trim();
    }
    return null;
  }
  const MOTIF = /\{([\w]+(?:\.\d+)?(?:\|[\w]+(?:\.\d+)?)*)\}/g;
  /* insertion en HTML (réponses échappées) */
  function interp(s) {
    return String(s).replace(MOTIF, (_, c) => {
      const v = valeur(c);
      return v === null ? '<span class="vide">…</span>' : '<span class="cite">' + esc(v) + "</span>";
    });
  }
  /* insertion en texte brut */
  function interpTexte(s) {
    return String(s).replace(MOTIF, (_, c) => valeur(c) || "…");
  }
  /* insertion au fil d'une phrase : sans la ponctuation finale de la réponse */
  function interpPhrase(s) {
    return String(s).replace(MOTIF, (_, c) => (valeur(c) || "…").replace(/[\s.,;:]+$/, ""));
  }
  /* premier jet d'un passage : son modèle, ou à défaut les réponses de ses notes, dans l'ordre,
     un paragraphe par rubrique */
  function premierJet(n) {
    if (n.modele) return interpPhrase(n.modele);
    if (!n.brouillon || !n.notes) return "";
    /* les choix cliqués et les associations ne sont pas des phrases de l'élève */
    const clics = new Set(sujet.etapes.filter((e) => e.choix || e.association).map((e) => e.id));
    return n.notes.map((x) => {
      /* une ligne marquée (troisième élément) entre telle quelle dans le premier jet */
      if (x[2]) return interpPhrase(x[1]);
      const v = [];
      String(x[1]).replace(MOTIF, (_, c) => {
        if (clics.has(c.split(/[.|]/)[0])) return "";
        const r = valeur(c);
        if (r) v.push(r.replace(/[\s.,;:]+$/, ""));
        return "";
      });
      return v.map((r) => (/[?!…]$/.test(r) ? r : r + ".")).join(" ");
    }).filter(Boolean).join("\n\n");
  }

  /* ---------- les neuf étapes ---------- */

  /* étape de la frise (1 à 9) et partie (1 à 3) de chaque élément du parcours */
  function calculerEtapes(s) {
    if (s._et) return;
    let st = 1, part = 0;
    s._et = s.etapes.map((e) => {
      if (e.section) {
        const m = /^Partie (I{1,3})\b/.exec(e.section);
        if (m) { st = 8; part = m[1].length; }
        else if (/^Conclusion/.test(e.section)) { st = 9; part = 0; }
      }
      if (st < 8) {
        if (e.id in ID_ETAPE) st = ID_ETAPE[e.id];
        if (e.redaction === "intro") st = 7;
      }
      return { s: st, p: part };
    });
    /* un bandeau de section appartient à l'étape qui le suit */
    s.etapes.forEach((e, i) => { if (e.section && s._et[i + 1]) s._et[i] = s._et[i + 1]; });
    /* frise propre au sujet : les étapes présentes, numérotées dans l'ordre du parcours */
    s._ordre = [];
    s._et.forEach((x, i) => { if (!s.etapes[i].section && s._ordre.indexOf(x.s) < 0) s._ordre.push(x.s); });
    s._rang = {};
    s._ordre.forEach((c, k) => { s._rang[c] = k + 1; });
    s._N = s._ordre.length;
    s._et = s._et.map((x) => ({ s: s._rang[x.s] || 1, p: x.p }));
  }
  /* nombre d'étapes de la frise, et étape (libellé, message de fin) de rang r */
  function nbEtapes(s) { return (s || sujet)._N; }
  function infoEtape(r, s) { return ETAPES[(s || sujet)._ordre[r - 1]]; }
  /* passage du rang dans la frise du sujet à l'étape de la liste ETAPES, et inversement */
  function canonDe(r, s) { return (s || sujet)._ordre[r - 1]; }
  function rangDe(c) { return sujet._rang[c]; }
  function etapeDe(i) {
    if (!sujet) return { s: 1, p: 0 };
    if (i >= sujet.etapes.length) return { s: nbEtapes() + 1, p: 0 };
    return sujet._et[i];
  }
  function etapeCourante() {
    if (etat.fini && !etat.reprise) return { s: nbEtapes() + 1, p: 0 };
    return etapeDe(etat.i);
  }
  function libelleEtape(et, s) {
    if (et.s > nbEtapes(s)) return "Dissertation terminée";
    return infoEtape(et.s, s).l + (canonDe(et.s, s) === 8 && et.p ? " · partie " + et.p + " sur 3" : "");
  }

  /* ---------- le fil de la conversation ---------- */

  function bloc(e) {
    const v = e.v;
    let d;
    switch (e.k) {
      case "dit":
        d = el("div", "tour", v.map((x) => "<p>" + x + "</p>").join(""));
        break;
      case "eleve":
        d = el("div", "bubble" + (String(v).length > 220 ? " long" : ""));
        d.innerHTML = '<span class="sr">Toi : </span>' + esc(v);
        break;
      case "bon":
        d = el("details", "tip", "<summary>Bon à savoir</summary><div>" + v + "</div>");
        break;
      case "notes":
        d = el("details", "tip", "<summary>Tes notes</summary><div>" + v + "</div>");
        d.open = true;
        break;
      case "aide":
        d = el("p", "relance-b", '<span class="tag">Une aide</span>' + v);
        break;
      case "texte":
        d = el("figure", "texte", "<blockquote>" + v[0] + "</blockquote><figcaption>" + v[1] + "</figcaption>");
        break;
      case "repere":
        d = el("div", "mile", "<b>" + v[0] + "</b>" + v[1]);
        break;
      case "etape":
        d = el("p", "done-msg", '<span class="tick">' + ICO.tick + "</span><span><b>" + esc(v[0]) + "</b> " + esc(v[1]) + "</span>");
        break;
      case "sec":
        d = el("h2", "sec");
        d.textContent = v;
        break;
      default:
        return null;
    }
    if (e.s) d.dataset.etape = e.s;
    fil.appendChild(d);
    return d;
  }
  function dire(k, v) {
    const e = { k: k, v: v, s: etapeCourante().s };
    etat.log.push(e);
    const d = bloc(e);
    defile();
    return d;
  }
  function defile() {
    requestAnimationFrame(() => { fil.scrollTop = fil.scrollHeight; });
  }
  /* La question en cours est la seule en grand : les échanges passés s'effacent. */
  function marquer() {
    fil.querySelectorAll(".tour.now").forEach((t) => t.classList.remove("now"));
    fil.querySelectorAll(".eyebrow-q").forEach((t) => t.remove());
    const tours = fil.querySelectorAll(".tour");
    const der = tours[tours.length - 1];
    const bulles = fil.querySelectorAll(".bubble");
    const derB = bulles[bulles.length - 1];
    if (!der || vue !== "dialogue") return;
    if (derB && (der.compareDocumentPosition(derB) & Node.DOCUMENT_POSITION_FOLLOWING)) return;
    der.classList.add("now");
    const et = etapeCourante();
    if (et.s <= nbEtapes()) {
      const eb = el("div", "eyebrow-q");
      eb.textContent = "Étape " + et.s + " · " + infoEtape(et.s).l + (canonDe(et.s) === 8 && et.p ? " · partie " + ROMAINS[et.p] : "");
      der.prepend(eb);
    }
  }

  /* ---------- la frise ---------- */

  function etatSeg(n, cur) {
    if (n < cur.s) return "done";
    if (n === cur.s) return "current";
    return "todo";
  }
  function segments(cur, s) {
    let h = "";
    for (let n = 1; n <= nbEtapes(s); n++) h += '<span class="seg ' + etatSeg(n, cur) + '" data-n="' + n + '"></span>';
    return h;
  }
  function rendreFrise(pulse) {
    if (!sujet || vue === "accueil") { prog.hidden = true; return; }
    prog.hidden = false;
    const cur = etapeCourante();
    const N = nbEtapes();
    const titre = "Étape " + Math.min(cur.s, N) + " sur " + N;
    let h = '<button type="button" class="ph" id="ph" aria-expanded="' + friseOuverte + '">' +
      '<span class="row"><span class="lbl">' + titre + '</span><span class="nm">' + esc(libelleEtape(cur)) + "</span>" + ICO.chev + "</span>" +
      '<span class="frise" aria-hidden="true">' + segments(cur) + "</span></button>";
    if (friseOuverte) {
      h += '<ul class="chips">';
      for (let n = 1; n <= N; n++) {
        const st = etatSeg(n, cur);
        h += '<li class="' + (st === "done" ? "d" : "") + '"><button type="button" class="chip ' + st + '" data-n="' + n + '"' +
          (st === "todo" ? ' tabindex="-1" aria-disabled="true"' : "") + ">" +
          '<span class="mk">' + (st === "done" ? ICO.tick.replace("<svg", '<svg width="16" height="16"') : n) + '</span><span class="cl">' + infoEtape(n).l + "</span></button></li>";
      }
      h += '</ul><p class="hint">Touche une étape terminée pour la relire.</p>';
    }
    prog.innerHTML = h;
    $("ph").onclick = () => { friseOuverte = !friseOuverte; rendreFrise(); };
    prog.querySelectorAll(".chip.done").forEach((c) => {
      c.onclick = () => {
        const cible = fil.querySelector('[data-etape="' + c.dataset.n + '"]');
        if (cible) cible.scrollIntoView({ behavior: CALME.matches ? "auto" : "smooth", block: "start" });
      };
    });
    if (friseOuverte) {
      const c = prog.querySelector(".chip.current");
      if (c) c.scrollIntoView({ block: "nearest", inline: "center" });
    }
    if (pulse) {
      const s = prog.querySelector('.seg[data-n="' + pulse + '"]');
      if (s && !CALME.matches) s.classList.add("pulse");
    }
  }

  /* ---------- déroulement ---------- */

  function indexAncre(a) {
    const k = sujet.etapes.findIndex((e) => e.ancre === a);
    return k < 0 ? etat.i + 1 : k;
  }
  function vide() { ctl.innerHTML = ""; }
  function avance(vers) {
    const avant = etapeDe(etat.i);
    let suiv = vers != null ? vers : etat.i + 1;
    if (etat.reprise) {
      /* « Reprendre cette question avec Socratys » : on revient ensuite là où on en était */
      const r = etat.reprise;
      if (r.seul || etapeDe(suiv).s !== r.s) {
        suiv = r.retour;
        etat.reprise = null;
        dire("etape", ["C'est repris.", "On reprend là où tu en étais."]);
      }
    } else {
      const apres = etapeDe(suiv);
      if (apres.s > avant.s) {
        dire("etape", ["Étape " + avant.s + " terminée.", infoEtape(avant.s).fin]);
      } else if (canonDe(avant.s) === 8 && apres.p > avant.p) {
        dire("etape", ["Partie " + ROMAINS[avant.p] + " terminée.", "Tu as rédigé ta " + ORDINAUX[avant.p] + " partie."]);
      }
    }
    etat.i = suiv;
    etat.essais = 0;
    etat.affiche = false;
    sauve();
    vide();
    rendreFrise(avant.s);
    rendrePanneau();
    etape();
  }
  /* Relance si l'élève n'a pas trouvé ; renvoie false quand il n'en reste plus
     (on accepte alors sa réponse et on avance, sans jamais donner la solution). */
  function relance(n) {
    const r = n.relances || [];
    if (etat.essais < r.length) {
      dire("dit", [interp(r[etat.essais])]);
      etat.essais++;
      sauve();
      return true;
    }
    return false;
  }
  function paragraphes(t) {
    return t.map((p) => "<p>" + p + "</p>").join("");
  }

  function etape() {
    vue = "dialogue";
    const n = sujet.etapes[etat.i];
    if (!n) return fin();
    if (!etat.affiche) {
      etat.affiche = true;
      fil.querySelectorAll("details.tip[open]").forEach((d) => { d.open = false; });
      if (n.section) dire("sec", n.section);
      if (n.repere) dire("repere", [n.repere[0], interp(n.repere[1])]);
      if (n.texte) dire("texte", [paragraphes(n.texte.corps), n.texte.source]);
      if (n.bon) dire("bon", n.bon).open = true;
      if (n.dit) dire("dit", n.dit.map(interp));
      if (n.redaction && n.notes) {
        dire("notes", "<dl>" + n.notes.map((x) => "<dt>" + x[0] + "</dt><dd>" + interp(x[1]) + "</dd>").join("") + "</dl>");
      }
      sauve();
    }
    marquer();
    if (n.choix) return choix(n);
    if (n.champs) return champs(n);
    if (n.reponse) return reponse(n);
    if (n.amorce) return amorce(n);
    if (n.association) return association(n);
    if (n.redaction) return redaction(n);
    if (n.section && !n.dit && !n.bon && !n.texte && !n.repere) return avance();
    continuer();
  }

  /* « Une aide ? » : la relance suivante, sous la question */
  function boutonAide(n) {
    const r = n.relances || [];
    if (etat.essais >= r.length) return "";
    return '<button type="button" class="btn" id="aide">Une aide ?</button>';
  }
  function brancherAide(n, refaire) {
    const b = $("aide");
    if (!b) return;
    b.onclick = () => {
      const r = n.relances || [];
      if (etat.essais >= r.length) return;
      dire("aide", interp(r[etat.essais]));
      etat.essais++;
      sauve();
      refaire(n);
    };
  }
  function rangee(n, libelle) {
    return '<div class="err" id="er" role="alert" hidden></div><div class="crow">' + boutonAide(n) +
      '<span class="droite"><button class="btn primary" id="go" type="button">' + libelle + "</button></span></div>";
  }
  function erreur(msg) {
    const e = $("er");
    e.hidden = false;
    e.textContent = msg;
  }
  function entreeEnvoie(champ, go) {
    champ.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); go(); }
    });
  }
  function focaliser(x) {
    if (!LARGE.matches) return;   /* sur téléphone, on n'ouvre pas le clavier d'office */
    x.focus({ preventScroll: true });
  }

  function continuer() {
    ctl.innerHTML = '<div class="ch"><button class="btn suite" id="go" type="button">Continuer</button></div>';
    $("go").onclick = () => avance();
    focaliser($("go"));
  }

  function reponse(n) {
    ctl.innerHTML = '<div class="f"><label class="sr" for="x">' + esc(n.reponse) + '</label>' +
      '<textarea id="x" rows="2" placeholder="' + esc(n.reponse) + '…"></textarea></div>' + rangee(n, "Envoyer");
    const x = $("x");
    const go = () => {
      const v = x.value.trim();
      if (!v) { x.focus(); return; }
      vide();
      etat.A[n.id] = v;
      envoye(v, n.id);
      const trouve = !n.motsCles || correspond(v, n.motsCles);
      if (!trouve && relance(n)) { marquer(); return reponse(n); }
      avance();
    };
    $("go").onclick = go;
    brancherAide(n, reponse);
    entreeEnvoie(x, go);
    focaliser(x);
  }

  function choix(n) {
    ctl.innerHTML = '<div class="ch" id="choix"></div>' + (boutonAide(n) ? '<div class="crow">' + boutonAide(n) + "</div>" : "");
    const w = $("choix");
    const avecBonne = n.choix.some((o) => o.bon);
    n.choix.forEach((o) => {
      const b = el("button", "btn");
      b.type = "button";
      b.textContent = o.l;
      if (o.inactif) b.disabled = true;
      b.onclick = () => {
        vide();
        if (n.id) etat.A[n.id] = o.l;
        envoye(o.l, n.id);
        if (avecBonne && !o.bon && relance(n)) { marquer(); return choix(n); }
        avance(o.vers ? indexAncre(o.vers) : null);
      };
      w.appendChild(b);
    });
    brancherAide(n, choix);
  }

  function champs(n) {
    const requis = n.requis || n.champs.map((_, k) => k);
    ctl.innerHTML = n.champs.map((l, k) =>
      '<div class="f"><label for="m' + k + '">' + interp(l) +
      (requis.indexOf(k) < 0 ? ' <span class="opt">(facultatif)</span>' : "") +
      '</label><textarea id="m' + k + '" rows="2"></textarea></div>').join("") + rangee(n, "Envoyer");
    $("go").onclick = () => {
      const v = n.champs.map((_, k) => $("m" + k).value.trim());
      if (requis.some((k) => !v[k])) { erreur("Complète les champs essentiels avant d'envoyer."); return; }
      vide();
      etat.A[n.id] = v;
      envoye(v.map((x, k) => (x ? interpTexte(n.champs[k]).replace(/…$/, "").trim() + " " + x : ""))
        .filter(Boolean).join("\n"), n.id);
      avance();
    };
    /* une aide redessine les champs : on garde ce que l'élève a déjà écrit */
    brancherAide(n, (m) => {
      const v = n.champs.map((_, k) => $("m" + k).value);
      champs(m);
      v.forEach((x, k) => { $("m" + k).value = x; });
    });
    focaliser($("m0"));
  }

  function amorce(n) {
    const morceaux = n.amorce.split("___");
    let h = n.consigne ? '<p class="consigne">' + esc(n.consigne) + "</p>" : "";
    h += '<p class="amorce">';
    morceaux.forEach((m, k) => {
      h += esc(interpTexte(m));
      if (k < morceaux.length - 1) {
        h += '<input type="text" id="a' + k + '" aria-label="Blanc ' + (k + 1) + '" autocomplete="off" spellcheck="true" placeholder="…">';
      }
    });
    h += "</p>";
    ctl.innerHTML = h + rangee(n, "Valider ma transition");
    const blancs = morceaux.slice(0, -1).map((_, k) => $("a" + k));
    blancs.forEach((b) => {
      b.addEventListener("input", () => { b.style.setProperty("width", Math.max(10, b.value.length + 2) + "ch", "important"); });
    });
    const go = () => {
      const v = blancs.map((b) => b.value.trim());
      if (v.some((x) => !x)) { erreur("Complète chacun des blancs."); return; }
      const phrase = morceaux.map((m, k) => interpTexte(m) + (k < v.length ? v[k] : "")).join("")
        .replace(/\s+/g, " ").trim();
      vide();
      etat.A[n.id] = phrase;
      envoye(phrase, n.id);
      avance();
    };
    blancs.forEach((b) => entreeEnvoie(b, go));
    $("go").onclick = go;
    /* une aide redessine la phrase : on garde ce que l'élève a déjà écrit */
    brancherAide(n, (m) => {
      const v = blancs.map((b) => b.value);
      amorce(m);
      v.forEach((x, k) => { $("a" + k).value = x; });
    });
    focaliser(blancs[0]);
  }

  function association(n) {
    const a = n.association;
    let h = a.consigne ? '<p class="consigne">' + esc(a.consigne) + "</p>" : "";
    a.gauche.forEach((g, i) => {
      h += '<fieldset class="asso"><legend>' + esc(g) + "</legend>";
      a.droite.forEach((d, j) => {
        h += '<label><input type="radio" name="g' + i + '" value="' + j + '"> ' + esc(d) + "</label>";
      });
      h += "</fieldset>";
    });
    ctl.innerHTML = h + rangee(n, "Valider");
    $("go").onclick = () => {
      const pris = a.gauche.map((_, i) => {
        const r = ctl.querySelector('input[name="g' + i + '"]:checked');
        return r ? +r.value : null;
      });
      if (pris.some((x) => x === null)) { erreur("Fais un choix pour chaque ligne avant de valider."); return; }
      vide();
      etat.A[n.id] = a.gauche.map((g, i) => g + " → " + a.droite[pris[i]]);
      envoye(etat.A[n.id].join("\n"), n.id);
      const juste = pris.every((x, i) => x === a.solution[i]);
      if (!juste && relance(n)) { marquer(); return association(n); }
      avance();
    };
    brancherAide(n, association);
  }

  function redaction(n) {
    const cle = "red_" + n.redaction;
    ctl.innerHTML = '<p class="consigne">' + esc(n.consigne) + "</p>" +
      '<div class="f"><label for="r">' + esc(n.titre) + '</label><textarea id="r" class="redac" rows="9" spellcheck="true"></textarea></div>' +
      '<div class="err" id="er" role="alert" hidden></div><div class="crow">' +
      '<button class="btn" id="tard" type="button">Rédiger plus tard</button>' +
      '<span class="droite"><button class="btn primary" id="go" type="button">J\'ai terminé</button></span></div>';
    const r = $("r");
    if (!(etat.A[cle] || "").trim()) etat.A[cle] = premierJet(n);
    r.value = etat.A[cle] || "";
    r.addEventListener("input", () => { etat.A[cle] = r.value; sauve(); });
    $("go").onclick = () => {
      const v = r.value.trim();
      if (!v) { erreur("Ton paragraphe est vide. Tu peux aussi choisir de le rédiger plus tard."); return; }
      etat.A[cle] = v;
      vide();
      envoye(v, cle);
      avance();
    };
    $("tard").onclick = () => {
      vide();
      dire("dit", ["D'accord. Tu pourras rédiger ce passage à la fin, dans ton brouillon."]);
      avance();
    };
    focaliser(r);
  }

  /* La réponse s'affiche en bulle, puis glisse vers « Ma dissertation ». */
  function envoye(texte, id) {
    const b = dire("eleve", texte);
    const carte = carteDeCle(id);
    if (!carte) return;
    rendrePanneau();
    const cible = LARGE.matches ? side.querySelector('[data-carte="' + carte.k + '"]') : dtab;
    if (LARGE.matches && cible) {
      cible.classList.remove("arrive");
      void cible.offsetWidth;
      cible.classList.add("arrive");
      cible.scrollIntoView({ block: "nearest", behavior: CALME.matches ? "auto" : "smooth" });
    } else {
      const add = $("dtab-add");
      add.textContent = "Ajouté : " + carte.t;
      add.hidden = false;
      clearTimeout(minuteurAjout);
      minuteurAjout = setTimeout(() => { add.hidden = true; }, 2600);
    }
    if (CALME.matches || !cible || !b || !b.animate) return;
    const de = b.getBoundingClientRect();
    const a = cible.getBoundingClientRect();
    const g = el("div", "ghost");
    g.textContent = String(texte).split("\n")[0];
    g.style.left = de.left + "px";
    g.style.top = de.top + "px";
    g.style.width = Math.min(de.width, 320) + "px";
    document.body.appendChild(g);
    const dx = a.left + a.width / 2 - (de.left + Math.min(de.width, 320) / 2);
    const dy = a.top + 12 - de.top;
    g.animate([{ transform: "translate(0,0) scale(1)", opacity: 1 },
               { transform: "translate(" + dx + "px," + dy + "px) scale(.5)", opacity: 0 }],
      { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" }).onfinish = () => g.remove();
  }

  /* ---------- « Ma dissertation » ---------- */

  function etapeIndex(id) { return sujet.etapes.findIndex((e) => e.id === id); }
  function libellesChamps(id) {
    const n = sujet.etapes[etapeIndex(id)];
    return n && n.champs ? n.champs.map((l) => interpTexte(l).replace(/…$/, "").trim()) : [];
  }
  /* les cartes : une par étape, avec le texte exact de l'élève */
  function cartes() {
    const c = [];
    const simple = (s, id, t) => c.push({ k: id, s: s, t: t, g: "Introduction", slots: [{ cle: id }] });
    simple(0, "amorce", "Amorce");
    simple(1, "predicat", "Prédicat");
    simple(2, "sujetGram", "Sujet grammatical");
    simple(3, "couple", "Couple philosophique");
    const lDefs = libellesChamps("defs");
    const defs2 = Array.isArray(etat.A.defs2) && etat.A.defs2.some((x) => x);
    c.push({ k: "defs", s: 4, t: "Définitions", g: "Introduction",
      slots: lDefs.map((l, k) => ({ cle: "defs." + k, l: l }))
        .concat(defs2 ? libellesChamps("defs2").map((l, k) => ({ cle: "defs2." + k, l: l + " (réécrite)" })) : []) });
    c.push({ k: "reform", s: 5, t: "Reformulation", g: "Introduction",
      slots: libellesChamps("reform").map((l, k) => ({ cle: "reform." + k, l: l })) });
    c.push({ k: "probl", s: 6, t: "Hypothèses", g: "Introduction",
      slots: libellesChamps("probl").map((l, k) => ({ cle: "probl." + k, l: l }))
        .concat(libellesChamps("problemes").map((l, k) => ({ cle: "problemes." + k, l: l }))) });
    c.push({ k: "red_intro", s: 7, t: "Introduction rédigée", g: "Introduction", red: "intro", slots: [{ cle: "red_intro" }] });
    c.push({ k: "plan", s: 7, t: "Plan", g: "Plan", rows: true,
      slots: [0, 1, 2].map((k) => ({ cle: "plan." + k, n: ROMAINS[k + 1] })) });
    c.push({ k: "parties", s: 8, t: "Parties", g: "Développement", rows: true,
      slots: [{ cle: "red_p1", n: "I", red: "p1", p: 1 }, { cle: "t1", n: "→", l: "Transition" },
              { cle: "red_p2", n: "II", red: "p2", p: 2 }, { cle: "t2", n: "→", l: "Transition" },
              { cle: "red_p3", n: "III", red: "p3", p: 3 }] });
    c.push({ k: "red_ccl", s: 9, t: "Conclusion", g: "Conclusion", red: "ccl", slots: [{ cle: "red_ccl" }] });
    /* numéros de la frise du sujet ; les étapes absentes du sujet n'ont pas de carte */
    return c.filter((x) => rangDe(x.s)).map((x) => Object.assign(x, { s: rangDe(x.s) }))
      .sort((a, b) => a.s - b.s);
  }
  function carteDeCle(id) {
    if (!id) return null;
    const base = String(id).split(".")[0];
    return cartes().find((c) => c.slots.some((sl) => sl.cle.split(".")[0] === base)) || null;
  }
  function lireCle(cle) {
    const p = cle.split(".");
    let v = etat.A[p[0]];
    if (p.length > 1) v = Array.isArray(v) ? v[+p[1]] : "";
    return v == null ? "" : String(v);
  }
  function ecrireCle(cle, val) {
    const p = cle.split(".");
    if (p.length > 1) {
      if (!Array.isArray(etat.A[p[0]])) etat.A[p[0]] = [];
      etat.A[p[0]][+p[1]] = val;
    } else etat.A[p[0]] = val;
  }
  function etapesEcrites() {
    const cur = etapeCourante();
    return Math.min(nbEtapes(), cur.s - 1);
  }
  function etatCarte(c) {
    const cur = etapeCourante();
    if (c.s < cur.s) return "done";
    if (c.s === cur.s) return c.slots.some((sl) => lireCle(sl.cle).trim()) ? "current partial" : "current";
    return c.slots.some((sl) => lireCle(sl.cle).trim()) ? "done" : "todo";
  }

  function rendrePanneau() {
    if (!sujet || vue === "accueil") { side.hidden = true; dtab.hidden = true; return; }
    side.hidden = false;
    dtab.hidden = false;
    const n = etapesEcrites();
    $("dtab-n").textContent = n + (n > 1 ? " étapes" : " étape") + " sur " + nbEtapes();
    if (edition) return;   /* on ne redessine pas sous les doigts de l'élève */
    const notes = etat.notes || {};
    let h = '<span class="grip" aria-hidden="true"></span><div class="phd"><div class="tt"><h3>Ma dissertation</h3><p>' +
      esc(sujet.titre) + " · " + n + (n > 1 ? " étapes" : " étape") + " sur " + nbEtapes() + "</p></div>" +
      '<button type="button" class="iconbtn fermer" id="fermer" aria-label="Fermer">' + ICO.close + "</button></div><div class=\"cards\">";
    let groupe = "";
    cartes().forEach((c) => {
      if (c.g !== groupe) { groupe = c.g; h += '<p class="grp">' + groupe + "</p>"; }
      const st = etatCarte(c);
      const rempli = c.slots.some((sl) => lireCle(sl.cle).trim());
      h += '<section class="card ' + st + '" data-carte="' + c.k + '"><div class="h"><span>' +
        (c.k === "red_intro" ? "" : c.s + " · ") + esc(c.t) + "</span>" +
        (rempli ? '<button type="button" class="pen" data-edit="' + c.slots.find((sl) => lireCle(sl.cle).trim()).cle + '" aria-label="Modifier">' + ICO.pen + "</button>" : "") +
        "</div>";
      if (!rempli) {
        h += '<p class="ph-t">' + (st.indexOf("current") === 0 ? "En cours avec Socratys…" : "À venir") + "</p>";
      } else {
        c.slots.forEach((sl) => {
          const v = lireCle(sl.cle);
          if (!v.trim() && !c.rows) return;
          const corps = (sl.l ? '<div class="sl">' + esc(sl.l) + "</div>" : "") +
            (edition && edition.cle === sl.cle ? "" :
              '<p class="txt' + (v.trim() ? "" : " vide") + '" data-edit="' + sl.cle + '" tabindex="0" role="button" aria-label="Modifier">' +
              (v.trim() ? esc(v) : "À venir") + "</p>");
          h += '<div class="slot" data-slot="' + sl.cle + '">' +
            (c.rows ? '<div class="row2"><span class="rn">' + sl.n + '</span><div class="rb">' + corps + "</div></div>" : corps) + "</div>";
        });
      }
      if (notes[c.s] && rempli) {
        h += '<div class="stale"><span class="qm" aria-hidden="true">?</span><div><p>Tu as modifié l\'étape ' + notes[c.s] +
          ". Relis cette étape : est-elle toujours d'accord avec ta nouvelle version ?</p>" +
          '<div class="sa"><button type="button" class="mini" data-relire="' + c.k + '">La relire et la modifier</button>' +
          '<button type="button" class="mini q" data-cbon="' + c.s + '">C\'est bon</button></div></div></div>';
      }
      if (rempli && st === "done" && cibleReprise(c)) {
        h += '<button type="button" class="mini q" data-reprendre="' + c.k + '">Reprendre cette question avec Socratys</button>';
      }
      h += "</section>";
    });
    /* les actions restent visibles en bas du tiroir, sous les cartes qui défilent */
    h += '</div><div class="panel-actions"><button type="button" class="btn small primary" id="voir-brouillon">Voir mon brouillon complet</button>' +
      '<button type="button" class="btn small" id="changer">Changer de sujet</button>' +
      '<button type="button" class="btn small" id="effacer" aria-expanded="false" aria-controls="effacer-conf">Effacer mes réponses</button>' +
      '<div class="confirmer" id="effacer-conf" hidden><p>Effacer toutes tes réponses pour ce sujet ? Cette action est définitive.</p>' +
      '<div class="sa"><button type="button" class="btn small primary" id="effacer-oui">Oui, tout effacer</button>' +
      '<button type="button" class="btn small" id="effacer-non">Annuler</button></div></div></div>';
    side.innerHTML = h;
    $("fermer").onclick = fermerTiroir;
    $("voir-brouillon").onclick = () => { fermerTiroir(); synthese(false); };
    $("changer").onclick = () => { fermerTiroir(); accueil(); };
    /* confirmation dans la page : les fenêtres confirm() sont bloquées dans certains affichages */
    const conf = $("effacer-conf");
    $("effacer").onclick = () => {
      conf.hidden = false;
      $("effacer").setAttribute("aria-expanded", "true");
      $("effacer-non").focus();
      conf.scrollIntoView({ block: "nearest" });
    };
    $("effacer-non").onclick = () => {
      conf.hidden = true;
      $("effacer").setAttribute("aria-expanded", "false");
      $("effacer").focus();
    };
    $("effacer-oui").onclick = () => {
      effacer("sujet." + sujet.id);
      fermerTiroir();
      accueil();
    };
    side.querySelectorAll("[data-edit]").forEach((b) => {
      b.onclick = () => modifier(b.dataset.edit);
      b.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); modifier(b.dataset.edit); } };
    });
    side.querySelectorAll("[data-cbon]").forEach((b) => {
      b.onclick = () => { delete etat.notes[b.dataset.cbon]; sauve(); rendrePanneau(); };
    });
    side.querySelectorAll("[data-relire]").forEach((b) => {
      b.onclick = () => {
        const c = cartes().find((x) => x.k === b.dataset.relire);
        const sl = c.slots.find((x) => lireCle(x.cle).trim());
        delete etat.notes[c.s];
        if (sl) modifier(sl.cle);
      };
    });
    side.querySelectorAll("[data-reprendre]").forEach((b) => {
      b.onclick = () => reprendre(cartes().find((x) => x.k === b.dataset.reprendre));
    });
  }

  /* Modification d'une carte par l'élève, sans validation de Socratys. */
  function modifier(cle) {
    const c = cartes().find((x) => x.slots.some((sl) => sl.cle === cle));
    if (!c) return;
    edition = null;
    rendrePanneau();
    edition = { cle: cle, avant: lireCle(cle), s: c.s };
    const slot = side.querySelector('[data-slot="' + cle + '"]');
    const p = slot.querySelector(".txt");
    const hist = (etat.hist || {})[cle] || [];
    const zone = el("div", "edit-zone",
      '<label class="sr" for="ed">Modifier ce passage</label><textarea class="edit" id="ed" spellcheck="true"></textarea>' +
      '<div class="erow"><span class="meta" id="ed-etat" aria-live="polite">Enregistré</span>' +
      (hist.length ? '<button type="button" class="mini" id="ed-prec">Revenir à ma version précédente</button>' : "") +
      '<button type="button" class="btn small primary" id="ed-ok">Terminé</button></div>');
    if (p) p.replaceWith(zone); else slot.appendChild(zone);
    const t = $("ed");
    t.value = edition.avant;
    const ajuste = () => { t.style.height = "auto"; t.style.height = Math.max(88, t.scrollHeight + 4) + "px"; };
    ajuste();
    t.focus();
    t.scrollIntoView({ block: "center" });
    let m = null;
    t.addEventListener("input", () => {
      ecrireCle(cle, t.value);
      ajuste();
      $("ed-etat").textContent = "Enregistrement…";
      clearTimeout(m);
      m = setTimeout(() => { sauve(); $("ed-etat").textContent = "Enregistré"; }, 400);
    });
    if ($("ed-prec")) {
      $("ed-prec").onclick = () => {
        /* échange la version actuelle et la précédente : on peut annuler le retour */
        const h = etat.hist[cle];
        const prec = h.pop();
        h.push(t.value);
        t.value = prec;
        ecrireCle(cle, prec);
        ajuste();
        sauve();
        $("ed-etat").textContent = "Enregistré";
      };
    }
    $("ed-ok").onclick = terminerEdition;
    t.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.stopPropagation(); terminerEdition(); } });
  }
  function terminerEdition() {
    if (!edition) return;
    const e = edition;
    edition = null;
    const apres = lireCle(e.cle);
    if (apres !== e.avant) {
      etat.hist = etat.hist || {};
      const h = (etat.hist[e.cle] = etat.hist[e.cle] || []);
      h.push(e.avant);
      while (h.length > 3) h.shift();
      /* notes de cohérence : seules les étapes déjà écrites reçoivent la question */
      etat.notes = etat.notes || {};
      (DEPEND[canonDe(e.s)] || []).map(rangDe).filter((d) => d && d !== e.s).forEach((d) => {
        const c = cartes().find((x) => x.s === d && x.slots.some((sl) => lireCle(sl.cle).trim()));
        if (c) etat.notes[d] = e.s;
      });
    }
    sauve();
    rendrePanneau();
    if (vue === "dialogue") marquer();
  }

  /* « Reprendre cette question avec Socratys » */
  function cibleReprise(c) {
    if (c.red) return sujet.etapes.findIndex((e) => e.redaction === c.red);
    if (canonDe(c.s) <= 7 && c.k !== "plan") return sujet.etapes.findIndex((e, i) => !e.section && etapeDe(i).s === c.s);
    if (c.k === "plan") return etapeIndex("plan");
    return -1;
  }
  function reprendre(c) {
    const cible = cibleReprise(c);
    if (cible < 0) return;
    fermerTiroir();
    if (vue !== "dialogue") afficherDialogue();
    etat.reprise = { retour: etat.fini ? sujet.etapes.length : etat.i, s: c.s, seul: !!c.red || c.k === "plan" };
    vide();
    dire("etape", ["Reprenons cette question.", "Tu reviendras ensuite là où tu en étais."]);
    etat.i = cible;
    etat.essais = 0;
    etat.affiche = false;
    sauve();
    rendreFrise();
    etape();
  }

  function ouvrirTiroir() {
    if (LARGE.matches) return;
    side.classList.add("open");
    scrim.classList.add("on");
    dtab.setAttribute("aria-expanded", "true");
    const f = $("fermer");
    if (f) f.focus();
  }
  function fermerTiroir() {
    if (edition) terminerEdition();
    side.classList.remove("open");
    scrim.classList.remove("on");
    dtab.setAttribute("aria-expanded", "false");
  }
  dtab.onclick = ouvrirTiroir;
  scrim.onclick = fermerTiroir;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && side.classList.contains("open")) fermerTiroir(); });

  /* ---------- fin du parcours et brouillon ---------- */

  function fin() {
    if (!etat.fini) {
      etat.fini = true;
      dire("dit", ["Ta dissertation est rassemblée dans ton brouillon. Relis-la : tu peux encore corriger chaque passage, et rédiger ceux que tu as laissés pour plus tard."]);
      sauve();
    }
    rendreFrise();
    rendrePanneau();
    marquer();
    synthese(true);
  }
  function remplirCopie() {
    const A = etat.A;
    /* passage assemblé à partir des réponses (3e élément de la ligne), s'il n'a pas été rédigé */
    sujet.copie.forEach((x) => {
      if ((A[x[1]] || "").trim()) return;
      if (x[2]) { A[x[1]] = interpPhrase(x[2]); return; }
      const n = sujet.etapes.find((e) => e.redaction && "red_" + e.redaction === x[1]);
      if (n) A[x[1]] = premierJet(n);
    });
    sauve();
  }
  function groupeCopie(cle) {
    if (cle === "red_intro") return "Introduction";
    if (cle === "red_ccl") return "Conclusion";
    return "Développement";
  }

  function synthese() {
    vue = "synthese";
    fermerTiroir();
    remplirCopie();
    const A = etat.A;
    let h = '<section class="copie" id="editeur"><button type="button" class="back" id="retour">' + ICO.back + "Retour au dialogue</button>" +
      "<h2>Ton brouillon</h2><p class=\"lead\">Tout ce que tu as écrit, dans l'ordre. Chaque passage reste modifiable.</p>" +
      '<p class="subj">' + esc(sujet.titre) + "</p>" +
      '<div class="ident"><div class="f"><label for="c_nom">Nom et prénom</label><input id="c_nom" data-cle="nom" autocomplete="name"></div>' +
      '<div class="f"><label for="c_classe">Classe</label><input id="c_classe" data-cle="classe"></div></div>';
    let groupe = "";
    sujet.copie.forEach((x) => {
      const g = groupeCopie(x[1]);
      if (g !== groupe) { groupe = g; h += '<p class="grp">' + g + "</p>"; }
      h += '<div class="fld"><label for="c_' + x[1] + '">' + esc(x[0]) + '</label><textarea id="c_' + x[1] +
        '" data-cle="' + x[1] + '" rows="' + (x[0] === "Transition" ? 3 : 8) + '" spellcheck="true"></textarea></div>';
    });
    h += '<label class="coche"><input type="checkbox" id="c_annexe"> Joindre ma fiche d\'analyse en annexe</label>' +
      '<p class="err" id="er-copie" role="alert" hidden></p></section>';
    fil.innerHTML = h;
    fil.scrollTop = 0;
    ctl.innerHTML = '<div class="synbar"><button class="btn primary" id="telecharger" type="button">Exporter en texte</button>' +
      '<button class="btn" id="copier" type="button">Copier</button>' +
      '<button class="btn" id="imprimer" type="button">Imprimer</button>' +
      '<p class="meta" id="syn-etat" aria-live="polite">Pour obtenir un PDF, choisis « Enregistrer au format PDF » comme imprimante.</p></div>';
    fil.querySelectorAll("[data-cle]").forEach((c) => {
      c.value = A[c.dataset.cle] || "";
      const ajuste = () => { if (c.tagName === "TEXTAREA") { c.style.height = "auto"; c.style.height = c.scrollHeight + 4 + "px"; } };
      requestAnimationFrame(ajuste);
      c.addEventListener("input", () => { A[c.dataset.cle] = c.value; ajuste(); sauve(); });
    });
    $("c_annexe").checked = !!A.annexe;
    $("c_annexe").onchange = (e) => { A.annexe = e.target.checked; sauve(); };
    $("retour").onclick = afficherDialogue;
    $("imprimer").onclick = imprimer;
    $("telecharger").onclick = telecharger;
    $("copier").onclick = copier;
    rendreFrise();
    rendrePanneau();
  }

  function afficherDialogue() {
    vue = "dialogue";
    fil.innerHTML = "";
    fil.setAttribute("aria-live", "off");
    etat.log.forEach(bloc);
    fil.querySelectorAll("details.tip").forEach((d) => { if (d.querySelector("summary").textContent === "Bon à savoir") d.open = false; });
    fil.setAttribute("aria-live", "polite");
    vide();
    rendreFrise();
    rendrePanneau();
    if (etat.i < sujet.etapes.length) {
      etape();
    } else {
      marquer();
      ctl.innerHTML = '<div class="ch"><button class="btn suite" id="go" type="button">Ouvrir mon brouillon</button></div>';
      $("go").onclick = () => synthese();
    }
    defile();
  }

  function manquants() {
    return sujet.copie.filter((x) => !(etat.A[x[1]] || "").trim()).map((x) => x[0].toLowerCase());
  }
  function enParagraphes(t) {
    return t.trim().split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean)
      .map((p) => "<p>" + esc(p) + "</p>").join("");
  }
  function dateDuJour() {
    return new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }
  function texteCopie() {
    const A = etat.A;
    let t = sujet.titre + "\n\n";
    if (A.nom) t += A.nom + (A.classe ? " — " + A.classe : "") + "\n\n";
    sujet.copie.forEach((x) => {
      const v = (A[x[1]] || "").trim();
      if (v) t += v + "\n\n";
    });
    if (A.annexe) {
      t += "FICHE D'ANALYSE\n\n" + sujet.fiche.map((f) => f[0] + " : " + interpTexte(f[1])).join("\n") + "\n";
    }
    return t;
  }

  function imprimer() {
    const A = etat.A;
    const manque = manquants();
    if (manque.length) {
      const e = $("er-copie");
      if (e.dataset.averti !== "1") {
        e.hidden = false;
        e.dataset.averti = "1";
        e.textContent = "Il manque encore : " + manque.join(", ") + ". Touche de nouveau « Imprimer » pour imprimer quand même.";
        e.scrollIntoView({ block: "center" });
        return;
      }
    }
    let h = '<header class="entete"><div>' + (A.nom ? esc(A.nom) : "Nom : ………………………………") + "<br>" +
      (A.classe ? "Classe : " + esc(A.classe) : "Classe : …………") + "</div><div>" + dateDuJour() + "</div></header>" +
      "<h1>" + esc(sujet.titre) + "</h1>";
    sujet.copie.forEach((x) => {
      const t = (A[x[1]] || "").trim();
      if (t) h += '<section class="' + (x[0] === "Transition" ? "transition" : "partie") + '">' + enParagraphes(t) + "</section>";
    });
    if (A.annexe) {
      h += '<section class="annexe"><h2>Fiche d\'analyse</h2><dl>' +
        sujet.fiche.map((f) => "<dt>" + esc(f[0]) + "</dt><dd>" + esc(interpTexte(f[1])) + "</dd>").join("") + "</dl></section>";
    }
    h += '<p class="mention">Dissertation rédigée par l\'élève, guidé par les questions de Socratys.</p>';
    impression.innerHTML = h;
    const titre = document.title;
    document.title = "Dissertation — " + sujet.titre + (A.nom ? " — " + A.nom : "");
    window.addEventListener("afterprint", () => { document.title = titre; }, { once: true });
    window.print();
  }

  function telecharger() {
    const url = URL.createObjectURL(new Blob([texteCopie()], { type: "text/plain;charset=utf-8" }));
    const a = el("a");
    a.href = url;
    a.download = "ma-dissertation.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("syn-etat").textContent = "Fichier ma-dissertation.txt exporté.";
  }

  function copier() {
    const t = texteCopie();
    const ok = () => { $("syn-etat").textContent = "Ta dissertation est copiée. Tu peux la coller où tu veux."; };
    const secours = () => {
      const z = el("textarea");
      z.value = t;
      z.setAttribute("readonly", "");
      z.style.position = "fixed";
      z.style.opacity = "0";
      document.body.appendChild(z);
      z.select();
      let r = false;
      try { r = document.execCommand("copy"); } catch (e) { r = false; }
      z.remove();
      if (r) ok(); else $("syn-etat").textContent = "La copie n'a pas fonctionné. Utilise plutôt « Exporter en texte ».";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, secours);
    else secours();
  }

  /* ---------- accueil ---------- */

  function etatValide(e) {
    return e && typeof e.i === "number" && e.A && Array.isArray(e.log);
  }

  function accueil() {
    if (edition) terminerEdition();
    sujet = null;
    etat = null;
    vue = "accueil";
    effacer("courant");
    $("titre-sujet").textContent = "";
    $("enreg").hidden = true;
    prog.hidden = true;
    side.hidden = true;
    dtab.hidden = true;
    vide();
    let h = '<div class="home"><p class="logo">Socratys</p><p class="pitch">' + esc(S.PRESENTATION) + "</p>" +
      (S.REVISION ? '<p class="pitch">' + esc(S.REVISION) + "</p>" : "");
    const der = SUJETS.find((s) => s.id === lire("dernier"));
    const precDer = der && lire("sujet." + der.id);
    if (der && etatValide(precDer) && precDer.i > 0 && !precDer.fini) {
      calculerEtapes(der);
      const et = precDer.i >= der.etapes.length ? { s: der._N + 1, p: 0 } : der._et[precDer.i];
      h += '<button type="button" class="resume" id="reprendre"><span class="k">Reprendre</span><span class="s">' + esc(der.titre) + "</span>" +
        '<span class="frise" aria-hidden="true">' + segments(et, der) + '</span><span class="m2"><span>Étape ' + Math.min(et.s, der._N) + " sur " + der._N + " · " +
        esc(libelleEtape(et, der)) + "</span><b>Continuer</b></span></button>";
    }
    h += '<p class="question homeq">Quel sujet veux-tu traiter ?</p><ul class="bank" id="bank"></ul>' +
      '<p class="confid">Tes réponses restent enregistrées dans ce navigateur, sur cet appareil : rien n\'est envoyé sur Internet. ' +
      "Sur un ordinateur partagé, pense à effacer tes réponses quand tu as fini.</p>";
    const lien = document.querySelector(".outils-site a");
    if (lien) h += '<p class="path"><a href="' + lien.getAttribute("href") + '">' + esc(lien.textContent) + "</a></p>";
    h += "</div>";
    fil.innerHTML = h;
    fil.scrollTop = 0;
    const bank = $("bank");
    SUJETS.forEach((s) => {
      const li = el("li");
      const b = el("button", "subjbtn");
      b.type = "button";
      const prec = lire("sujet." + s.id);
      b.textContent = s.titre;
      if (etatValide(prec) && prec.i > 0) {
        const m = el("span", "encours");
        m.textContent = prec.fini ? "terminé" : "en cours";
        b.appendChild(m);
      }
      b.onclick = () => (etatValide(prec) && prec.i > 0 ? proposerReprise(s) : demarrer(s, true));
      li.appendChild(b);
      bank.appendChild(li);
    });
    if ($("reprendre")) $("reprendre").onclick = () => demarrer(der, false);
  }

  function proposerReprise(s) {
    fil.querySelector(".home").insertAdjacentHTML("beforeend",
      '<div class="tour now" id="q-reprise"><p>Tu as déjà commencé ce sujet. Veux-tu reprendre là où tu en étais ?</p></div>');
    ctl.innerHTML = '<div class="ch" id="choix-reprise"></div>';
    [["Reprendre là où j'en étais", false], ["Recommencer ce sujet depuis le début", true]].forEach((x) => {
      const b = el("button", "btn");
      b.type = "button";
      b.textContent = x[0];
      b.onclick = () => demarrer(s, x[1]);
      $("choix-reprise").appendChild(b);
    });
    $("q-reprise").scrollIntoView({ block: "center" });
  }

  function demarrer(s, neuf) {
    sujet = s;
    calculerEtapes(s);
    const prec = lire("sujet." + s.id);
    if (neuf || !etatValide(prec)) {
      etat = {
        v: 2, i: 0, essais: 0, affiche: false, fini: false,
        A: { sujet: s.titre },
        log: [
          { k: "dit", v: [S.PRESENTATION], s: 1 },
          { k: "dit", v: ["Quel sujet veux-tu traiter ?"], s: 1 },
          { k: "eleve", v: s.titre, s: 1 }
        ]
      };
    } else {
      etat = prec;
    }
    etat.notes = etat.notes || {};
    etat.hist = etat.hist || {};
    ecrire("courant", s.id);
    ecrire("dernier", s.id);
    $("titre-sujet").textContent = s.titre;
    sauve();
    afficherDialogue();
  }

  /* la zone de saisie change de hauteur selon la question : on garde la question en vue */
  if (window.ResizeObserver) new ResizeObserver(() => { if (vue === "dialogue") defile(); }).observe(ctl);

  LARGE.addEventListener && LARGE.addEventListener("change", () => { fermerTiroir(); if (sujet) rendrePanneau(); });

  const courant = lire("courant");
  const s = SUJETS.find((x) => x.id === courant);
  if (s && etatValide(lire("sujet." + s.id))) demarrer(s, false);
  else accueil();
})();

/* Socratys — moteur du parcours.
   Le contenu pédagogique est dans les fichiers sujet-*.js ; ce fichier ne fait
   que les dérouler. Tout reste dans le navigateur de l'élève (localStorage) :
   aucun compte, aucun serveur, rien n'est envoyé.

   Une étape est un objet dont les clés possibles sont :
     section   titre de section (bandeau)
     repere    [titre, texte]        encadré de repère
     texte     {corps:[…], source}  texte philosophique à lire
     bon       texte d'une bulle « Bon à savoir »
     dit       [phrases]             ce que dit Socratys
   puis au plus une interaction :
     reponse   libellé d'un champ de réponse libre   (+ id, motsCles, relances)
     choix     [{l, bon, vers}]      boutons            (+ id, relances)
     champs    [libellés]            plusieurs champs   (+ id, requis)
     amorce    "phrase avec ___"     phrase à compléter (+ id, consigne)
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
  const impression = $("impression");

  let sujet = null;
  let etat = null;

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
  function el(tag, cls) {
    const d = document.createElement(tag);
    if (cls) d.className = cls;
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
  function sauve() { if (sujet && etat) ecrire("sujet." + sujet.id, etat); }

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

  /* ---------- le fil de la conversation ---------- */

  function bloc(e) {
    const v = e.v;
    let d;
    switch (e.k) {
      case "dit":
        d = el("div", "tour");
        d.innerHTML = '<div class="qui">Socratys</div>' + v.map((x) => '<p class="q">' + x + "</p>").join("");
        break;
      case "eleve":
        d = el("div", "rep");
        d.innerHTML = '<div class="bulle"><span class="sr">Toi : </span>' + esc(v) + "</div>";
        break;
      case "bon":
        d = el("aside", "bas");
        d.innerHTML = "<b>Bon à savoir</b>" + v;
        break;
      case "texte":
        d = el("figure", "txt");
        d.innerHTML = "<blockquote>" + v[0] + "</blockquote><figcaption>" + v[1] + "</figcaption>";
        break;
      case "repere":
        d = el("div", "mile");
        d.innerHTML = "<b>" + v[0] + "</b>" + v[1];
        break;
      case "notes":
        d = el("details", "notes");
        d.open = true;
        d.innerHTML = "<summary>Tes notes</summary>" + v;
        break;
      case "sec":
        d = el("h2", "sec");
        d.textContent = v;
        break;
      default:
        return;
    }
    fil.appendChild(d);
  }
  function dire(k, v) {
    const e = { k: k, v: v };
    etat.log.push(e);
    bloc(e);
    defile();
  }
  function defile() {
    requestAnimationFrame(() => window.scrollTo(0, document.documentElement.scrollHeight));
  }

  /* ---------- déroulement ---------- */

  function indexAncre(a) {
    const k = sujet.etapes.findIndex((e) => e.ancre === a);
    return k < 0 ? etat.i + 1 : k;
  }
  function vide() { ctl.innerHTML = ""; }
  function avance(vers) {
    etat.i = vers != null ? vers : etat.i + 1;
    etat.essais = 0;
    etat.affiche = false;
    sauve();
    vide();
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
  function progres() {
    return '<span class="prog">' + Math.round((etat.i / sujet.etapes.length) * 100) + "&nbsp;%</span>";
  }
  function paragraphes(t) {
    return t.map((p) => "<p>" + p + "</p>").join("");
  }

  function etape() {
    const n = sujet.etapes[etat.i];
    if (!n) return copie();
    if (!etat.affiche) {
      etat.affiche = true;
      if (n.section) dire("sec", n.section);
      if (n.repere) dire("repere", [n.repere[0], interp(n.repere[1])]);
      if (n.texte) dire("texte", [paragraphes(n.texte.corps), n.texte.source]);
      if (n.bon) dire("bon", n.bon);
      if (n.dit) dire("dit", n.dit.map(interp));
      if (n.redaction && n.notes) {
        dire("notes", "<dl>" + n.notes.map((x) => "<dt>" + x[0] + "</dt><dd>" + interp(x[1]) + "</dd>").join("") + "</dl>");
      }
      sauve();
    }
    if (n.choix) return choix(n);
    if (n.champs) return champs(n);
    if (n.reponse) return reponse(n);
    if (n.amorce) return amorce(n);
    if (n.association) return association(n);
    if (n.redaction) return redaction(n);
    if (n.section && !n.dit && !n.bon && !n.texte && !n.repere) return avance();
    continuer();
  }

  function rangee(libelle) {
    return '<div class="err" id="er" role="alert" hidden></div><div class="row">' + progres() +
      '<button class="p" id="go" type="button">' + libelle + "</button></div>";
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

  function continuer() {
    ctl.innerHTML = '<div class="ch"><button class="c suite" id="go" type="button">Continuer</button></div>';
    $("go").onclick = () => avance();
    $("go").focus({ preventScroll: true });
  }

  function reponse(n) {
    ctl.innerHTML = '<div class="f"><label for="x">' + esc(n.reponse) + '</label><textarea id="x" rows="2"></textarea></div>' +
      rangee("Envoyer") + '<p class="aide">Entrée pour envoyer · Maj + Entrée pour aller à la ligne</p>';
    const x = $("x");
    const go = () => {
      const v = x.value.trim();
      if (!v) { x.focus(); return; }
      vide();
      dire("eleve", v);
      etat.A[n.id] = v;
      const trouve = !n.motsCles || correspond(v, n.motsCles);
      if (!trouve && relance(n)) return reponse(n);
      avance();
    };
    $("go").onclick = go;
    entreeEnvoie(x, go);
    x.focus({ preventScroll: true });
  }

  function choix(n) {
    vide();
    const w = el("div", "ch");
    const avecBonne = n.choix.some((o) => o.bon);
    n.choix.forEach((o) => {
      const b = el("button", "c");
      b.type = "button";
      b.textContent = o.l;
      if (o.inactif) b.disabled = true;
      b.onclick = () => {
        vide();
        dire("eleve", o.l);
        if (n.id) etat.A[n.id] = o.l;
        if (avecBonne && !o.bon && relance(n)) return choix(n);
        avance(o.vers ? indexAncre(o.vers) : null);
      };
      w.appendChild(b);
    });
    ctl.appendChild(w);
  }

  function champs(n) {
    const requis = n.requis || n.champs.map((_, k) => k);
    ctl.innerHTML = n.champs.map((l, k) =>
      '<div class="f"><label for="m' + k + '">' + interp(l) +
      (requis.indexOf(k) < 0 ? ' <span class="opt">(facultatif)</span>' : "") +
      '</label><textarea id="m' + k + '" rows="2"></textarea></div>').join("") + rangee("Continuer");
    $("go").onclick = () => {
      const v = n.champs.map((_, k) => $("m" + k).value.trim());
      if (requis.some((k) => !v[k])) { erreur("Complète les champs essentiels avant de continuer."); return; }
      vide();
      etat.A[n.id] = v;
      dire("eleve", v.map((x, k) => (x ? interpTexte(n.champs[k]).replace(/…$/, "").trim() + " " + x : ""))
        .filter(Boolean).join("\n"));
      avance();
    };
    $("m0").focus({ preventScroll: true });
  }

  function amorce(n) {
    const morceaux = n.amorce.split("___");
    let h = n.consigne ? '<p class="consigne">' + esc(n.consigne) + "</p>" : "";
    h += '<p class="amorce">';
    morceaux.forEach((m, k) => {
      h += esc(interpTexte(m));
      if (k < morceaux.length - 1) {
        h += '<input type="text" id="a' + k + '" aria-label="Blanc ' + (k + 1) + '" autocomplete="off" spellcheck="true">';
      }
    });
    h += "</p>";
    ctl.innerHTML = h + rangee("Valider ma transition");
    const blancs = morceaux.slice(0, -1).map((_, k) => $("a" + k));
    blancs.forEach((b) => {
      b.addEventListener("input", () => { b.style.width = Math.max(10, b.value.length + 2) + "ch"; });
    });
    const go = () => {
      const v = blancs.map((b) => b.value.trim());
      if (v.some((x) => !x)) { erreur("Complète chacun des blancs."); return; }
      const phrase = morceaux.map((m, k) => interpTexte(m) + (k < v.length ? v[k] : "")).join("")
        .replace(/\s+/g, " ").trim();
      vide();
      etat.A[n.id] = phrase;
      dire("eleve", phrase);
      avance();
    };
    blancs.forEach((b) => entreeEnvoie(b, go));
    $("go").onclick = go;
    blancs[0].focus({ preventScroll: true });
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
    ctl.innerHTML = h + rangee("Valider");
    $("go").onclick = () => {
      const pris = a.gauche.map((_, i) => {
        const r = ctl.querySelector('input[name="g' + i + '"]:checked');
        return r ? +r.value : null;
      });
      if (pris.some((x) => x === null)) { erreur("Fais un choix pour chaque ligne avant de valider."); return; }
      vide();
      etat.A[n.id] = a.gauche.map((g, i) => g + " → " + a.droite[pris[i]]);
      dire("eleve", etat.A[n.id].join("\n"));
      const juste = pris.every((x, i) => x === a.solution[i]);
      if (!juste && relance(n)) return association(n);
      avance();
    };
  }

  function redaction(n) {
    const cle = "red_" + n.redaction;
    ctl.innerHTML = '<p class="consigne">' + esc(n.consigne) + "</p>" +
      '<div class="f"><label for="r">' + esc(n.titre) + '</label><textarea id="r" class="redac" rows="9" spellcheck="true"></textarea></div>' +
      '<div class="err" id="er" role="alert" hidden></div><div class="row">' + progres() +
      '<span class="boutons"><button class="l" id="tard" type="button">Rédiger plus tard</button>' +
      '<button class="p" id="go" type="button">J\'ai terminé</button></span></div>';
    const r = $("r");
    if (!(etat.A[cle] || "").trim()) etat.A[cle] = premierJet(n);
    r.value = etat.A[cle] || "";
    r.addEventListener("input", () => { etat.A[cle] = r.value; sauve(); });
    $("go").onclick = () => {
      const v = r.value.trim();
      if (!v) { erreur("Ton paragraphe est vide. Tu peux aussi choisir de le rédiger plus tard."); return; }
      etat.A[cle] = v;
      vide();
      dire("eleve", v);
      avance();
    };
    $("tard").onclick = () => {
      vide();
      dire("dit", ["D'accord. Tu pourras rédiger ce passage à la fin, au moment de relire ta copie."]);
      avance();
    };
    r.focus({ preventScroll: true });
  }

  /* ---------- la copie : relecture, impression, téléchargement ---------- */

  function copie() {
    vide();
    ctl.hidden = true;
    if (!etat.fini) {
      etat.fini = true;
      dire("sec", "Ta copie");
      dire("dit", ["Ta dissertation est rassemblée ci-dessous. Relis-la : tu peux encore corriger chaque passage, et rédiger ceux que tu as laissés pour plus tard. Quand elle te convient, imprime-la."]);
      sauve();
    }
    const A = etat.A;
    /* passage assemblé à partir des réponses (3e élément de la ligne), s'il n'a pas été rédigé */
    sujet.copie.forEach((x) => {
      if ((A[x[1]] || "").trim()) return;
      if (x[2]) { A[x[1]] = interpPhrase(x[2]); return; }
      const n = sujet.etapes.find((e) => e.redaction && "red_" + e.redaction === x[1]);
      if (n) A[x[1]] = premierJet(n);
    });
    sauve();
    const ed = el("section", "copie");
    ed.id = "editeur";
    let h = '<div class="ident"><div class="f"><label for="c_nom">Nom et prénom</label><input id="c_nom" data-cle="nom" autocomplete="name"></div>' +
      '<div class="f"><label for="c_classe">Classe</label><input id="c_classe" data-cle="classe"></div></div>';
    sujet.copie.forEach((x) => {
      h += '<div class="f"><label for="c_' + x[1] + '">' + esc(x[0]) + '</label><textarea id="c_' + x[1] +
        '" data-cle="' + x[1] + '" rows="' + (x[0] === "Transition" ? 3 : 8) + '" spellcheck="true"></textarea></div>';
    });
    h += '<label class="coche"><input type="checkbox" id="c_annexe"> Joindre ma fiche d\'analyse en annexe</label>' +
      '<div class="err" id="er-copie" role="alert" hidden></div>' +
      '<div class="actions"><button class="p" id="imprimer" type="button">Imprimer ma dissertation</button>' +
      '<button class="c" id="telecharger" type="button">Télécharger en texte</button></div>' +
      '<p class="aide">Pour obtenir un PDF, choisis « Enregistrer au format PDF » comme imprimante.</p>';
    ed.innerHTML = h;
    fil.appendChild(ed);
    ed.querySelectorAll("[data-cle]").forEach((c) => {
      c.value = A[c.dataset.cle] || "";
      c.addEventListener("input", () => { A[c.dataset.cle] = c.value; sauve(); });
    });
    $("c_annexe").checked = !!A.annexe;
    $("c_annexe").onchange = (e) => { A.annexe = e.target.checked; sauve(); };
    $("imprimer").onclick = imprimer;
    $("telecharger").onclick = telecharger;
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

  function imprimer() {
    const A = etat.A;
    const manque = manquants();
    if (manque.length) {
      const e = $("er-copie");
      if (e.dataset.averti !== "1") {
        e.hidden = false;
        e.dataset.averti = "1";
        e.textContent = "Il manque encore : " + manque.join(", ") + ". Clique de nouveau sur « Imprimer » pour imprimer quand même.";
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
    const url = URL.createObjectURL(new Blob([t], { type: "text/plain;charset=utf-8" }));
    const a = el("a");
    a.href = url;
    a.download = "dissertation-" + sujet.id + ".txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ---------- accueil et navigation ---------- */

  function etatValide(e) {
    return e && typeof e.i === "number" && e.A && Array.isArray(e.log);
  }

  function accueil() {
    sujet = null;
    etat = null;
    effacer("courant");
    ctl.hidden = false;
    fil.innerHTML = "";
    $("changer").hidden = true;
    $("effacer").hidden = true;
    bloc({ k: "dit", v: [S.PRESENTATION] });
    bloc({ k: "dit", v: ["Quel sujet veux-tu traiter ?"] });
    const note = el("p", "confid");
    note.textContent = "Tes réponses restent enregistrées dans ce navigateur, sur cet appareil : rien n'est envoyé sur Internet. " +
      "Sur un ordinateur partagé, pense à effacer tes réponses quand tu as fini.";
    fil.appendChild(note);
    vide();
    const w = el("div", "ch");
    SUJETS.forEach((s) => {
      const b = el("button", "c");
      b.type = "button";
      const prec = lire("sujet." + s.id);
      b.textContent = s.titre;
      if (etatValide(prec) && prec.i > 0) {
        const m = el("span", "encours");
        m.textContent = prec.fini ? "terminé" : "en cours";
        b.appendChild(m);
      }
      b.onclick = () => (etatValide(prec) && prec.i > 0 ? proposerReprise(s) : demarrer(s, true));
      w.appendChild(b);
    });
    ctl.appendChild(w);
  }

  function proposerReprise(s) {
    vide();
    bloc({ k: "dit", v: ["Tu as déjà commencé ce sujet. Veux-tu reprendre là où tu en étais ?"] });
    const w = el("div", "ch");
    [["Reprendre là où j'en étais", false], ["Recommencer ce sujet depuis le début", true]].forEach((x) => {
      const b = el("button", "c");
      b.type = "button";
      b.textContent = x[0];
      b.onclick = () => demarrer(s, x[1]);
      w.appendChild(b);
    });
    ctl.appendChild(w);
  }

  function demarrer(s, neuf) {
    sujet = s;
    const prec = lire("sujet." + s.id);
    if (neuf || !etatValide(prec)) {
      etat = {
        v: 2, i: 0, essais: 0, affiche: false, fini: false,
        A: { sujet: s.titre },
        log: [
          { k: "dit", v: [S.PRESENTATION] },
          { k: "dit", v: ["Quel sujet veux-tu traiter ?"] },
          { k: "eleve", v: s.titre }
        ]
      };
    } else {
      etat = prec;
    }
    ecrire("courant", s.id);
    $("changer").hidden = false;
    $("effacer").hidden = false;
    ctl.hidden = false;
    fil.setAttribute("aria-live", "off");
    fil.innerHTML = "";
    etat.log.forEach(bloc);
    fil.setAttribute("aria-live", "polite");
    sauve();
    vide();
    etape();
    defile();
  }

  $("changer").onclick = accueil;
  $("effacer").onclick = () => {
    if (!sujet) return;
    if (!confirm("Effacer toutes tes réponses pour ce sujet ? Cette action est définitive.")) return;
    effacer("sujet." + sujet.id);
    accueil();
  };

  /* le champ de saisie est fixé en bas : on réserve sa hauteur sous le fil */
  if (window.ResizeObserver) {
    new ResizeObserver(() => {
      document.body.style.paddingBottom = (ctl.hidden ? 40 : ctl.offsetHeight + 40) + "px";
      if (!ctl.hidden && ctl.childElementCount) defile();
    }).observe(ctl);
  }

  const courant = lire("courant");
  const s = SUJETS.find((x) => x.id === courant);
  if (s && etatValide(lire("sujet." + s.id))) demarrer(s, false);
  else accueil();
})();

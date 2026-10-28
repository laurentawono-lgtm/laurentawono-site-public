/* Sujet 2 — « Avons-nous la maîtrise de nos paroles ? »
   Contenu : docs/SOCRATYS-METHODE.md, §4, et la leçon « Paroles » (V2), corrigé de référence.
   Textes : « Avons-nous la maîtrise de nos paroles ? — textes ».
   Nietzsche : citation de Swift seule, sans texte à lire (décision du 29/09/2026). */
(function () {
  const B = window.SOCRATYS.BON;
  const C = window.SOCRATYS.CONSIGNES;

  /* introduction assemblée à partir des réponses de l'élève, qu'il réécrit ensuite */
  const INTRO =
    "{amorce} Avons-nous la maîtrise de nos paroles ? La parole peut s'entendre en deux sens, que distingue le couple {couple}. Du point de vue subjectif, la parole se définit comme {defs2.0|defs.0} ; on l'oppose alors à {defs.1}. " +
    "Du point de vue objectif, elle se définit comme {defs2.1|defs.2} ; on l'oppose alors à {defs.3}.\n\n" +
    "Se demander si nous avons la maîtrise de nos paroles, revient à se demander si nous avons la maîtrise de la parole comme {reform.0}, ou comme {reform.1}. " +
    "Si nous avons la maîtrise de nos paroles au sens subjectif, alors {probl.0}. Or {problemes.0}. " +
    "Si nous avons la maîtrise de nos paroles au sens objectif, alors {probl.1}. Or {problemes.1}.\n\n" +
    "Dans une première partie, nous nous demanderons ce qu'implique {plan.0}. Dans une deuxième partie, nous nous demanderons ce que suppose {plan.1}. " +
    "Et dans une troisième partie, nous nous demanderons {plan.2}.";

  const DESCARTES = {
    corps: [
      "Enfin il n'y a aucune de nos actions extérieures qui puisse assurer ceux qui les examinent que notre corps n'est pas seulement une machine qui se remue de soi-même, mais qu'il y a aussi en lui une âme qui a des pensées, excepté les paroles, ou autres signes faits à propos des sujets qui se présentent, sans se rapporter à aucune passion.",
      "Je dis les paroles ou autres signes, parce que les muets se servent de signes en même façon que nous de la voix ; et que ces signes soient à propos, pour exclure le parler des perroquets, sans exclure celui des fous, qui ne laisse pas d'être à propos des sujets qui se présentent, bien qu'il ne suive pas la raison ; […]",
      "Or il est, ce me semble, fort remarquable que la parole, étant ainsi définie, ne convient qu'à l'homme seul. Car, bien que Montaigne et Charron aient dit qu'il y a plus de différence d'homme à homme que d'homme à bête, il ne s'est toutefois jamais trouvé aucune bête si parfaite qu'elle ait usé de quelque signe pour faire entendre à d'autres animaux quelque chose qui n'eût point de rapport à ses passions ; et il n'y a point d'homme si imparfait qu'il n'en use ; en sorte que ceux qui sont sourds et muets inventent des signes particuliers par lesquels ils expriment leurs pensées.",
      "Ce qui me semble un très fort argument pour prouver que ce qui fait que les bêtes ne parlent point comme nous est qu'elles n'ont aucune pensée, et non point que les organes leur manquent. Et on ne peut dire qu'elles parlent entre elles, mais que nous ne les entendons pas ; car, comme les chiens et quelques autres animaux nous expriment leurs passions, ils nous exprimeraient aussi bien leurs pensées, s'ils en avaient."
    ],
    source: "Descartes, <em>Lettre au marquis de Newcastle</em>, 23 novembre 1646, éd. Adam et Tannery, t. IV, p. 574-575"
  };

  const BALEINE = ["La baleine est un poisson.", "La baleine est un mammifère.",
                   "La baleine n'est pas un mammifère.", "La baleine n'est pas un poisson."];
  const FORMES = {
    vrai1: "Dire de ce qui appartient à une chose qu'il lui appartient",
    faux1: "Dire de ce qui appartient à une chose qu'il ne lui appartient pas",
    vrai2: "Dire de ce qui ne lui appartient pas qu'il ne lui appartient pas",
    faux2: "Dire de ce qui ne lui appartient pas qu'il lui appartient"
  };

  window.SOCRATYS_SUJETS.push({
    id: "maitrise-paroles",
    titre: "Avons-nous la maîtrise de nos paroles ?",

    copie: [
      ["Introduction", "red_intro"],
      ["Première partie", "red_p1"],
      ["Transition", "t1"],
      ["Deuxième partie", "red_p2"],
      ["Transition", "t2"],
      ["Troisième partie", "red_p3"],
      ["Conclusion", "red_ccl"]
    ],

    fiche: [
      ["Amorce", "{amorce}"],
      ["Sujet grammatical", "la maîtrise"],
      ["Prédicat", "la parole"],
      ["Couple philosophique", "{couple}"],
      ["Sens subjectif", "{defs2.0|defs.0}"],
      ["Sens objectif", "{defs2.1|defs.2}"],
      ["Reformulation", "Se demander si nous avons la maîtrise de nos paroles, revient à se demander si nous avons la maîtrise de la parole comme {reform.0}, ou comme {reform.1}."],
      ["Première hypothèse", "Si nous avons la maîtrise de nos paroles au sens subjectif, alors {probl.0}"],
      ["Seconde hypothèse", "Si nous avons la maîtrise de nos paroles au sens objectif, alors {probl.1}"],
      ["Problèmes", "Or {problemes.0} — Or {problemes.1}"],
      ["Plan", "I. {plan.0} — II. {plan.1} — III. {plan.2}"],
      ["Couple de la partie III", "naturel / artificiel"]
    ],

    etapes: [
      /* ============ INTRODUCTION ============ */
      { section: "Introduction · l'amorce" },
      {
        bon: B.amorce,
        dit: ["Commençons par l'amorce de ton introduction. Rédige-la."],
        reponse: "Ton amorce", id: "amorce",
        relances: [
          "Dans ce sujet, la maîtrise est le sujet grammatical et la parole est le prédicat : la question les associe, puisqu'elle suppose que nous pourrions maîtriser nos paroles. Ton amorce doit donc les dissocier, par exemple en montrant le caractère volatil ou éphémère des paroles. Dans ta copie, n'écris pas « sujet grammatical » ni « prédicat ».",
          "Une parole, une fois prononcée, peut-on la rattraper ? Pense à une parole qui t'a échappé, ou qui a été oubliée aussitôt dite.",
          "Pense au proverbe « Les paroles s'envolent, les écrits restent » : que dit-il de notre pouvoir sur ce que nous disons ?"
        ]
      },

      { section: "Introduction · le sujet" },
      {
        bon: B.couple,
        dit: ["Avec quel couple philosophique peux-tu t'aider pour définir la parole ?"],
        choix: [{ l: "subjectif / objectif", bon: true }, { l: "individuel / collectif" }, { l: "particulier / général" }],
        id: "couple",
        relances: [
          "Essaie d'appliquer ce couple à la parole : une parole « {couple} »… est-ce que cela éclaire vraiment ce que fait celui qui parle ?",
          "Dans la vie de tous les jours, on distingue celui qui dit ce qu'il ressent et celui qui décrit les choses telles qu'elles sont. Quelle distinction fait-on là entre deux manières de parler ?",
          "Dans quels domaines emploie-t-on la parole ? Dans la confidence ou la poésie, que fait-on passer ? Dans la science ou le témoignage au tribunal, de quoi parle-t-on ?"
        ]
      },

      { section: "Introduction · définir et problématiser" },
      {
        dit: ["Définis maintenant la parole à partir de ce couple."],
        champs: ["Du point de vue subjectif, la parole peut se définir comme…", "On l'oppose alors à…",
                 "Du point de vue objectif, la parole peut se définir comme…", "On l'oppose alors à…"],
        id: "defs"
      },
      {
        bon: B.distinctes,
        dit: ["Relis tes deux définitions. Sont-elles assez distinctes pour que tu ne puisses jamais les confondre ?"],
        choix: [{ l: "Oui, elles sont bien distinctes", vers: "reformulation" }, { l: "Non, elles se ressemblent trop" }],
        id: "distinctes"
      },
      {
        dit: ["Réécris tes deux définitions pour mieux les distinguer."],
        relances: ["Pars du sens ordinaire de chaque terme du couple, indépendamment de la parole : dans la vie de tous les jours, que veut dire « subjectif » ? Que veut dire « objectif » ? Applique ensuite chacun de ces sens à la parole."],
        champs: ["Du point de vue subjectif, la parole peut se définir comme…", "Du point de vue objectif, la parole peut se définir comme…"],
        id: "defs2"
      },
      {
        ancre: "reformulation",
        bon: B.reformulation,
        dit: ["Reformule maintenant le sujet à partir de tes deux définitions.",
              "Se demander si nous avons la maîtrise de nos paroles, revient à se demander si nous avons la maîtrise de la parole comme… ou comme…"],
        champs: ["…si nous avons la maîtrise de la parole comme", "…ou comme"],
        id: "reform"
      },
      {
        dit: ["Formulons maintenant deux hypothèses, à partir de ta reformulation."],
        champs: ["Si nous avons la maîtrise de nos paroles au sens subjectif, alors…",
                 "Si nous avons la maîtrise de nos paroles au sens objectif, alors…"],
        relances: ["Si la parole exprime ce qui est en nous, que faudrait-il pour la maîtriser ? Et si elle nomme les choses, que faudrait-il ?"],
        id: "probl"
      },
      {
        bon: B.problematisation,
        dit: ["Ces deux hypothèses soulèvent chacune un problème. Lequel ?"],
        champs: ["Si nous avons la maîtrise de nos paroles au sens subjectif, alors {probl.0}. Or…",
                 "Si nous avons la maîtrise de nos paroles au sens objectif, alors {probl.1}. Or…"],
        relances: ["Une parole qui exprime ce que nous ressentons peut-elle trahir notre pensée ? Et deux personnes mettent-elles toujours la même idée sous le même mot ?"],
        id: "problemes"
      },
      {
        bon: "Les deux hypothèses indiquent déjà le plan : le premier problème sera traité dans la première partie, et le deuxième problème sera traité dans la deuxième partie.",
        dit: ["Annonce maintenant ton plan."],
        champs: ["Dans une première partie, nous nous demanderons ce qu'implique…",
                 "Dans une deuxième partie, nous nous demanderons ce que suppose…",
                 "Et dans une troisième partie, nous nous demanderons…"],
        id: "plan",
        relances: ["Si l'analyse du prédicat, la parole, te donne les deux premières parties, c'est celle du sujet grammatical, la maîtrise, qui te donne la troisième : on questionne alors la maîtrise à l'aide d'un autre couple philosophique. Tu peux par exemple questionner la maîtrise à partir du couple naturel / artificiel : la maîtrise de la parole est-elle naturelle, ou artificielle ?"]
      },
      {
        redaction: "intro", titre: "Ton introduction", modele: INTRO, consigne: C.reecrireIntro,
        notes: [
          ["Sujet", "Avons-nous la maîtrise de nos paroles ?"],
          ["Ton amorce", "{amorce}"],
          ["Couple", "{couple}"],
          ["Sens subjectif", "{defs2.0|defs.0} (opposé à {defs.1})"],
          ["Sens objectif", "{defs2.1|defs.2} (opposé à {defs.3})"],
          ["Reformulation", "si nous avons la maîtrise de la parole comme {reform.0}, ou comme {reform.1}"],
          ["Hypothèse 1", "Si nous avons la maîtrise de nos paroles au sens subjectif, alors {probl.0} Or {problemes.0}"],
          ["Hypothèse 2", "Si nous avons la maîtrise de nos paroles au sens objectif, alors {probl.1} Or {problemes.1}"],
          ["Plan", "I. {plan.0}<br>II. {plan.1}<br>III. {plan.2}"]
        ]
      },

      /* ============ PARTIE I ============ */
      { section: "Partie I · l'aspect subjectif de la parole" },
      {
        dit: ["Première partie : avons-nous la maîtrise de nos paroles au sens subjectif ?",
              "Si nous avons la maîtrise de nos paroles au sens subjectif, qu'est-ce que cela veut dire ?"],
        reponse: "Ta réponse", id: "p1q",
        relances: ["Il faut trouver deux significations à cette hypothèse, en te basant sur le sens du mot « subjectif ».",
                   "Qu'y a-t-il en nous, que la parole peut faire passer au-dehors ?"]
      },
      {
        dit: ["Concentre-toi maintenant sur les deux significations que tu viens de trouver. Complète :"],
        champs: ["Si nous avons la maîtrise de nos paroles au sens subjectif, cela peut signifier deux choses : soit que nous disons…",
                 "…soit que nous disons…"],
        relances: ["Quand tu parles de toi, que fais-tu passer : ce que tu éprouves, ou ce que tu penses ?",
                   "Pense à celui qui dit sa joie ou sa colère, et à celui qui expose une idée ou un raisonnement : expriment-ils la même chose ?"],
        id: "signifP1"
      },

      {
        repere: ["Première signification", "Avoir la maîtrise de ses paroles, ce serait dire ce que nous ressentons : la parole serait l'expression de nos sensations et de nos émotions."],
        dit: ["Pourquoi peut-on soutenir que la parole exprime ce que nous ressentons ?"],
        reponse: "Ton argument", id: "arg1",
        relances: ["Quand tu dis « j'ai mal » ou « je suis heureux », que fais-tu passer au-dehors ?"]
      },
      {
        dit: ["Examinons la validité de cette hypothèse. Faut-il parler pour exprimer ce que l'on ressent ? Pense au théâtre : le public perçoit souvent ce que l'acteur n'a pas dit. Que lui fait-il comprendre par son silence ?"],
        reponse: "Ta réponse", id: "theatre",
        relances: ["Un regard, une pause, un silence peuvent-ils dire une émotion aussi bien qu'une phrase ?"]
      },
      {
        dit: ["Et le témoin qui se tait devant le juge : pourquoi est-il accusé de complicité ? Que révèle son silence ?"],
        reponse: "Ta réponse", id: "temoin",
        motsCles: ["complic", "cache", "dissimul", "sait", "revel", "condamn", "faute"],
        relances: ["Que cache le silence du témoin ?",
                   "Un silence peut-il en dire autant qu'une parole ?"]
      },
      {
        dit: ["La parole est-elle toujours la traductrice fidèle de ce que tu ressens, ou peut-elle en être une traîtresse ? Peut-on dire « je vais bien » quand on souffre ?"],
        reponse: "Ta réponse", id: "traitresse",
        relances: ["Celui qui ment sur ce qu'il éprouve dit-il ce qu'il ressent ?"]
      },
      {
        dit: ["Reviens maintenant à la première signification : « avoir la maîtrise de ses paroles, ce serait dire ce que nous ressentons ». Que devient-elle, au regard du silence et du mensonge ?",
              "Formule toi-même la réfutation."],
        reponse: "Ta réfutation", id: "refutP1a",
        relances: ["Si le silence peut, lui aussi, exprimer ce que nous ressentons, la parole est-elle nécessaire pour l'exprimer ?",
                   "Et maîtrisons-nous ce que notre silence laisse paraître ?",
                   "Et si nous pouvons mentir sur ce que nous éprouvons, la parole dit-elle toujours ce que nous ressentons ?"]
      },
      { repere: ["Ta première réfutation", "{refutP1a}"] },
      {
        dit: ["Avant de passer à la seconde signification, marque le passage de l'une à l'autre. Complète cette transition."],
        amorce: "Si la parole ne se réduit pas à dire ce que nous ressentons, puisque ___, n'est-elle pas d'abord l'expression de ___ ?",
        relances: ["Si le silence peut, lui aussi, dire ce que nous ressentons, qu'est-ce que la parole peut exprimer de plus ?"],
        id: "tP1"
      },
      {
        repere: ["Seconde signification", "Avoir la maîtrise de ses paroles, ce serait dire ce que nous pensons : la parole serait l'expression de nos idées."]
      },
      {
        dit: ["Lis ce texte de Descartes."],
        texte: DESCARTES,
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "descThese",
        motsCles: ["homme seul", "seul", "pensee", "pense", "bete", "animal"],
        relances: ["À qui seul, selon Descartes, la parole convient-elle ?",
                   "Qu'est-ce que la parole révèle chez celui qui parle ?"]
      },
      {
        dit: ["Quelle différence Descartes fait-il entre les bêtes et les hommes ?"],
        reponse: "Ta réponse", id: "betes",
        motsCles: ["pens", "organe"],
        relances: ["Selon Descartes, est-ce une question d'organes ?",
                   "Relis la dernière phrase du texte : qu'est-ce qui manque aux bêtes, pour parler comme nous ?"]
      },
      {
        dit: ["Qu'exprime la parole chez l'homme, que la bête n'a pas ?"],
        reponse: "Ta réponse", id: "parolePensee",
        motsCles: ["pens", "idee", "esprit"],
        relances: ["Quand l'homme parle « à propos des sujets qui se présentent », que fait-il connaître de lui ?"]
      },
      {
        dit: ["Pourquoi Descartes attribue-t-il la parole aux fous, et pas aux perroquets ? Qu'est-ce que cela exprime ?"],
        reponse: "Ta réponse", id: "fous",
        motsCles: ["idee", "pens", "homme", "esprit"],
        relances: ["Le perroquet répète des mots : a-t-il pour autant des idées ?",
                   "Le fou, même s'il ne suit pas la raison, reste un homme : qu'a-t-il que le perroquet n'a pas ?"]
      },
      {
        dit: ["Si la parole dit ce que nous pensons, que fait celui qui lit un discours lors d'une cérémonie : le prêtre, le maire, ou celui qui prend la parole lors d'un enterrement ?"],
        reponse: "Ta réponse", id: "porteParole",
        relances: ["Au nom de qui parle le maire quand il célèbre un mariage ? Choisit-il ses mots ?",
                   "Ces paroles expriment-elles ce qu'ils pensent, ou ce que la circonstance exige ?"]
      },
      {
        dit: ["Que peux-tu en conclure ?"],
        reponse: "Ta conclusion", id: "conclPorte",
        relances: ["Toute parole exprime-t-elle la pensée propre de celui qui la prononce ?"]
      },
      {
        dit: ["Peux-tu rédiger une réfutation de l'hypothèse selon laquelle la parole exprime la pensée ?"],
        reponse: "Ta réfutation", id: "refutP1b",
        relances: ["Reprends ce que t'a appris celui qui lit un discours lors d'une cérémonie : la parole dit-elle toujours ce que nous pensons ?"]
      },
      { repere: ["Ta seconde réfutation", "{refutP1b}"] },
      {
        repere: ["Le chemin parcouru",
          "Première signification, dire ce que nous ressentons. Ta réfutation : {refutP1a}<br>Seconde signification, dire ce que nous pensons. Ta réfutation : {refutP1b}"],
        dit: ["Formule maintenant la conclusion de ta première partie : au terme de l'examen de ces deux significations, avons-nous la maîtrise de nos paroles au sens subjectif ?"],
        reponse: "Ta conclusion", id: "cclP1",
        relances: ["Disons-nous toujours ce que nous ressentons ? Et ce que nous pensons ?"]
      },
      {
        redaction: "p1", titre: "Ta première partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "Avons-nous la maîtrise de nos paroles au sens subjectif ?", true],
          ["Ce que veut dire l'hypothèse", "{p1q}"],
          ["Significations", "soit que nous disons {signifP1.0} ; soit que nous disons {signifP1.1}"],
          ["Première signification : dire ce que nous ressentons", "argument : {arg1}<br>le théâtre : {theatre}<br>le témoin : {temoin}<br>la parole traîtresse : {traitresse}<br>réfutation : {refutP1a}"],
          ["Transition", "{tP1}"],
          ["Descartes", "thèse : {descThese}<br>les bêtes et les hommes : {betes}<br>ce qu'exprime la parole : {parolePensee}<br>fous et perroquets : {fous}"],
          ["Le porte-parole", "{porteParole}<br>ce que l'on peut en conclure : {conclPorte}<br>réfutation : {refutP1b}"],
          ["Conclusion", "{cclP1}"]
        ]
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Nous avons vu que la parole, en tant qu'expression de notre intériorité, ___. Qu'en est-il lorsque nos paroles ne disent plus ce qui est en nous, mais ___ ?",
        relances: ["Si nos paroles ne disent pas toujours ce qui est en nous, que peuvent-elles dire d'autre ? Quel était le second sens de la parole, dans ton introduction ?"],
        id: "t1"
      },

      /* ============ PARTIE II ============ */
      { section: "Partie II · le caractère objectif de la parole" },
      {
        dit: ["Deuxième partie : avons-nous la maîtrise de nos paroles au sens objectif ?",
              "Si nous avons la maîtrise de nos paroles au sens objectif, qu'est-ce que cela veut dire ?"],
        reponse: "Ta réponse", id: "p2q",
        relances: ["Concentre-toi sur le mot « objectif » : à quoi renvoie ce qui est objectif ?",
                   "Quand dit-on de quelqu'un qu'il parle objectivement ? Parle-t-il de ce qu'il ressent, ou de ce qui est ?"]
      },
      {
        dit: ["Nommons-nous les choses parce que nous les connaissons, ou les connaissons-nous parce que nous les nommons ?"],
        reponse: "Ta réponse", id: "nommer"
      },
      {
        dit: ["Si parler, c'est dire d'une chose qu'elle est ce qu'elle est, qu'est-ce que cela implique ?"],
        reponse: "Ta réponse", id: "implic",
        motsCles: ["connai", "savoir", "sait", "sache"],
        relances: ["Pour dire ce qu'est une chose, que faut-il d'abord en avoir ?"]
      },
      {
        bon: "Pour Aristote, la parole affirme ou nie. Affirmer, c'est attribuer une qualité à une chose ; nier, c'est la lui retirer. Il existe quatre formes d'affirmation : dire de ce qui appartient à une chose qu'il lui appartient ; dire de ce qui lui appartient qu'il ne lui appartient pas ; dire de ce qui ne lui appartient pas qu'il ne lui appartient pas ; dire de ce qui ne lui appartient pas qu'il lui appartient.",
        dit: ["Voici quatre phrases sur une même chose, la baleine.", "Associe à chacune des deux formes d'affirmation vraies l'exemple qui lui correspond."],
        association: {
          gauche: [FORMES.vrai1, FORMES.vrai2],
          droite: BALEINE,
          solution: [1, 3]
        },
        id: "assoVrai",
        relances: ["Relis la première forme : la phrase doit attribuer à la baleine une qualité qu'elle a vraiment.",
                   "Pour la seconde forme, cherche une phrase qui retire à la baleine une qualité qu'elle n'a pas."]
      },
      {
        dit: ["Que cela nous dit-il de la maîtrise de la parole ?"],
        reponse: "Ta réponse", id: "aristVrai",
        motsCles: ["vrai", "verit", "ce qui est", "reel", "connai", "exact"],
        relances: ["Ces deux phrases disent-elles la chose telle qu'elle est ?",
                   "Dire vrai, est-ce une manière de maîtriser sa parole ?"]
      },
      {
        dit: ["Il reste deux formes d'affirmation. Avant de chercher des exemples, définis : laquelle correspond au mensonge, laquelle à l'illusion ?"],
        association: {
          gauche: ["Le mensonge", "L'illusion"],
          droite: [FORMES.faux1, FORMES.faux2],
          solution: [0, 1]
        },
        id: "assoDef",
        relances: ["Le menteur connaît la vérité : que fait-il de ce qui appartient réellement à la chose ?",
                   "Celui qui est dans l'illusion croit voir dans la chose quelque chose qui n'y est pas : ajoute-t-il ou retire-t-il une qualité ?"]
      },
      {
        dit: ["Associe maintenant à chacune un exemple."],
        association: {
          gauche: ["Le mensonge", "L'illusion"],
          droite: [BALEINE[0], BALEINE[2]],
          solution: [1, 0]
        },
        id: "assoEx",
        relances: ["Le mensonge dit de ce qui est comme n'étant pas : quelle phrase retire à la baleine ce qu'elle est vraiment ?"]
      },
      {
        dit: ["Imagine deux personnes qui disent toutes deux « la baleine est un poisson » : l'une sait que c'est faux, l'autre le croit sincèrement. Disent-elles la même chose ? Que faut-il savoir de celui qui parle pour distinguer le mensonge de l'illusion ?"],
        reponse: "Ta réponse", id: "posture",
        motsCles: ["sait", "savoir", "intention", "croit", "sincer", "conna", "volont"],
        relances: ["Le menteur sait-il qu'il dit faux ? Et celui qui est dans l'illusion ?"]
      },
      {
        bon: "Nietzsche cite Swift : « Celui qui énonce un mensonge se rend rarement compte du lourd fardeau qu'il s'impose ; il lui faut en effet, pour soutenir un mensonge, en inventer vingt autres. »",
        dit: ["Explique cette citation. Le menteur a-t-il la maîtrise de sa parole ?"],
        reponse: "Ta réponse", id: "menteur",
        motsCles: ["provisoire", "autres", "invent", "prisonnier", "pas maitre", "contraint", "oblig", "fardeau"],
        relances: ["Pour soutenir son premier mensonge, que doit faire le menteur ?",
                   "Est-ce encore lui qui choisit ses paroles, ou son premier mensonge qui les lui dicte ?"]
      },
      {
        dit: ["Et celui qui est dans l'illusion : a-t-il davantage la maîtrise de ses paroles ?"],
        reponse: "Ta réponse", id: "illusion",
        relances: ["Sait-il qu'il se trompe ?",
                   "Ses paroles ont-elles prise sur la réalité ?"]
      },
      {
        dit: ["Supposons maintenant que l'on ne mente pas et que l'on ne se trompe pas. Lis ce texte de Locke."],
        texte: {
          corps: ["Les mots signifient dans la bouche de chaque homme les idées qu'il a dans l'esprit, et qu'il voudrait exprimer par ces mots-là. Ainsi, un enfant n'ayant remarqué dans le métal qu'il entend nommer Or, rien autre chose qu'une brillante couleur jaune, applique seulement le mot d'or à l'idée qu'il a de cette couleur, et à nulle autre chose ; c'est pourquoi il donne le nom d'or à cette même couleur qu'il voit dans la queue d'un paon.",
                  "Un autre qui est à mieux observer ce métal, ajoute à la couleur jaune une grande pesanteur ; et alors le mot d'or signifie dans sa bouche une idée complexe d'un jaune brillant, et d'une substance fort pesante. Un troisième ajoute à ces qualités la fusibilité, et de là ce nom signifie à son égard un corps brillant, jaune, fusible, et fort pesant. Un autre ajoute la malléabilité. Chacune de ces personnes se sert également du mot d'or, lorsqu'il a besoin d'exprimer l'idée à laquelle il l'applique ; mais il est évident qu'aucun d'eux ne peut l'appliquer qu'à sa propre idée, et qu'il ne saurait le rendre signe d'une idée complexe qu'il n'a pas dans l'esprit."],
          source: "Locke, <em>Essai sur l'entendement humain</em>, III, 2, § 3, trad. Pierre Coste"
        },
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "lockeThese",
        motsCles: ["idee", "signif", "esprit"],
        relances: ["Selon Locke, que signifient les mots dans la bouche de chaque homme ?"]
      },
      {
        dit: ["Pourquoi l'enfant appelle-t-il « or » la couleur de la queue d'un paon ?"],
        reponse: "Ta réponse", id: "enfantOr",
        motsCles: ["couleur", "jaune", "idee", "seulement"],
        relances: ["Qu'a-t-il remarqué, lui, dans ce métal ?"]
      },
      {
        dit: ["Que peux-tu en conclure sur la question posée ?"],
        reponse: "Ta réponse", id: "lockePont",
        motsCles: ["idee", "differ", "meme mot", "incertain", "malentendu", "comprend", "chacun"],
        relances: ["Deux personnes qui emploient le mot « or » pensent-elles la même chose ?",
                   "Celui qui parle maîtrise-t-il l'idée que l'autre mettra sous ses mots ?"]
      },
      {
        repere: ["Le chemin parcouru",
          "Dire vrai : {aristVrai}<br>Le menteur : {menteur}<br>L'illusion : {illusion}<br>Locke : {lockePont}"],
        dit: ["Formule maintenant la conclusion de ta deuxième partie : au sens objectif, avons-nous la maîtrise de nos paroles ?"],
        reponse: "Ta conclusion", id: "cclP2",
        relances: ["Même sans mentir ni se tromper, deux personnes mettent-elles toujours la même idée sous le même mot ?"]
      },
      {
        redaction: "p2", titre: "Ta deuxième partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "Avons-nous la maîtrise de nos paroles au sens objectif ?", true],
          ["Ce que veut dire l'hypothèse", "{p2q}"],
          ["Nommer et connaître", "{nommer}<br>{implic}"],
          ["Aristote", "les formes vraies : {assoVrai.0} ; {assoVrai.1}<br>dire vrai : {aristVrai}"],
          ["Mensonge et illusion", "{assoDef.0} ; {assoDef.1}<br>{posture}"],
          ["Le menteur (Swift, cité par Nietzsche)", "{menteur}"],
          ["L'illusion", "{illusion}"],
          ["Locke", "thèse : {lockeThese}<br>l'enfant et l'or : {enfantOr}<br>pour notre question : {lockePont}"],
          ["Conclusion", "{cclP2}"]
        ]
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Si, du point de vue subjectif, la parole ___, et si, du point de vue objectif, le mot ___, quelle maîtrise avons-nous alors de nos paroles ?",
        relances: ["Si nos paroles ne sont maîtrisées ni quand elles expriment ce qui est en nous, ni quand elles nomment les choses, quelle maîtrise celui qui parle peut-il encore avoir ? D'où pourrait-elle lui venir ?"],
        id: "t2"
      },

      /* ============ PARTIE III ============ */
      { section: "Partie III · une maîtrise naturelle ou artificielle ?" },
      {
        dit: ["Troisième partie : la maîtrise de nos paroles est-elle naturelle, ou artificielle ?",
              "Avoir la maîtrise de nos paroles peut signifier soit que cette maîtrise est naturelle, soit qu'elle est artificielle."]
      },
      {
        dit: ["Définis maintenant la maîtrise de la parole à partir de ce couple."],
        champs: ["Au sens naturel, la maîtrise de la parole serait…",
                 "Au sens artificiel, la maîtrise de la parole serait…"],
        relances: ["Quand dit-on de quelqu'un qu'il parle bien, qu'il sait manier les mots ? Qu'est-ce que cela révèle : un don, ou un art qu'il a travaillé ?"],
        id: "defs3"
      },
      {
        repere: ["Première hypothèse", "La maîtrise de la parole serait naturelle."],
        dit: ["Si la maîtrise de la parole est naturelle, quel argument peux-tu tirer du texte de Descartes, que tu as lu en première partie ?"],
        reponse: "Ton argument", id: "argNat",
        motsCles: ["homme seul", "seul", "pens", "nature", "animal", "bete", "propre"],
        relances: ["Selon Descartes, la parole est-elle propre à tous les hommes, même au plus imparfait ?"]
      },
      {
        dit: ["Cette disposition naturelle suffit-elle à en avoir la maîtrise ? Un nouveau-né a-t-il, comme tout homme, la faculté de parler ? En a-t-il pour autant la maîtrise ?"],
        reponse: "Ta réponse", id: "nouveauNe",
        motsCles: ["non", "appren", "faculte", "depass", "suffit pas", "pas encore"],
        relances: ["Que manque-t-il au nouveau-né, qui a pourtant la faculté de parler ?"]
      },
      {
        dit: ["Lis maintenant ce texte de Platon."],
        texte: {
          corps: ["Tant qu'on ne sera pas capable de définir toute chose en elle-même ; tant que, après avoir défini cette chose, on ne saura pas, à l'inverse, la diviser selon ses espèces jusqu'à ce qu'on atteigne l'indivisible ; tant que, après avoir selon la même méthode analysé la nature de l'âme et découvert l'espèce de discours qui correspond à chaque nature, on ne disposera et on n'organisera pas son discours en conséquence – en offrant à une âme complexe des discours complexes et qui correspondent exactement à ce qu'elle demande, et des discours simples à une âme simple –, on restera incapable de manier le genre oratoire avec autant d'art que sa nature le permet, que ce soit pour enseigner ou pour persuader."],
          source: "Platon, <em>Phèdre</em>, 277b-c"
        },
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "platonThese",
        motsCles: ["art", "ame", "discours", "verite", "connai", "nature"],
        relances: ["Que faut-il réunir, selon Platon, pour manier le discours « avec art » ?"]
      },
      {
        dit: ["Que doit connaître l'orateur avant de composer son discours ?"],
        reponse: "Ta réponse", id: "orateur",
        motsCles: ["ame", "auditoire", "verit", "nature", "celui"],
        relances: ["Suffit-il, selon Platon, de savoir définir ce dont on parle ? Que faut-il encore connaître ?"]
      },
      {
        dit: ["Pourquoi un même discours ne convient-il pas à toute âme ?"],
        reponse: "Ta réponse", id: "touteAme"
      },
      {
        repere: ["Seconde hypothèse", "La maîtrise de la parole serait un art."],
        dit: ["Que signifie le fait que la maîtrise de la parole soit un art ? Qu'est-ce que cela implique ?"],
        reponse: "Ta réponse", id: "implArt",
        motsCles: ["appren", "techni", "art", "travail", "exerc", "regle"],
        relances: ["Comment acquiert-on ce qui ne nous est pas donné par la nature ?"]
      },
      {
        bon: "Platon compare ailleurs le discours à une graine, et les âmes à des sols dans lesquels on la sème. Comme un bon cultivateur choisit un sol adapté à sa semence, l'orateur doit discerner la nature de l'âme à laquelle il s'adresse.",
        dit: ["Explique cette métaphore de l'agriculteur et du discours."],
        reponse: "Ton explication", id: "metaphore"
      },
      {
        dit: ["À quoi reconnaît-on qu'un discours a été bien semé ?"],
        reponse: "Ta réponse", id: "seme",
        motsCles: ["fecond", "pouss", "germ", "fruit", "racine", "grandi", "pens", "reprend"],
        relances: ["À quoi reconnaît-on qu'une graine a été semée dans un bon sol ?"]
      },
      {
        dit: ["Que signifie cette fécondité ? Comment peux-tu faire usage de cette image dans le cadre du discours ?"],
        reponse: "Ta réponse", id: "fecondite",
        relances: ["Un discours fécond est-il seulement répété par celui qui l'a reçu ?",
                   "Que devient capable de faire celui qui a bien reçu un discours ?"]
      },
      {
        dit: ["Que peux-tu conclure, pour ta troisième partie ?"],
        reponse: "Ta conclusion", id: "ccl3",
        relances: ["La fécondité d'un discours dépend-elle seulement de celui qui parle ?"]
      },
      { repere: ["Ta conclusion de la partie III", "{ccl3}"] },
      {
        redaction: "p3", titre: "Ta troisième partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "La maîtrise de nos paroles est-elle naturelle, ou artificielle ?", true],
          ["Les deux significations", "Avoir la maîtrise de nos paroles peut signifier soit que cette maîtrise est naturelle, soit qu'elle est artificielle.", true],
          ["Couple naturel / artificiel", "naturel : {defs3.0}<br>artificiel : {defs3.1}"],
          ["Hypothèse du naturel", "argument tiré de Descartes : {argNat}<br>le nouveau-né : {nouveauNe}"],
          ["Platon", "thèse : {platonThese}<br>l'orateur : {orateur}<br>toute âme : {touteAme}"],
          ["Hypothèse de l'art", "{implArt}"],
          ["L'agriculteur", "{metaphore}<br>bien semé : {seme}<br>fécondité : {fecondite}"],
          ["Conclusion", "{ccl3}"]
        ]
      },

      /* ============ CONCLUSION ============ */
      { section: "Conclusion" },
      {
        bon: "La conclusion rappelle le chemin argumentatif en montrant les différents sens qu'a pris le mot « parole », puis les différents sens du mot « maîtrise ». Elle ne fournit pas une réponse définitive : elle montre la complexité de la question posée.",
        dit: ["À quel sujet répondais-tu ? Quelle en était la problématique ?"],
        champs: ["Le sujet", "La problématique"],
        id: "cclA"
      },
      {
        dit: ["Montre les différents sens qu'a pris le mot « parole » dans la première, la deuxième et la troisième partie."],
        champs: ["Dans la première partie", "Dans la deuxième partie", "Dans la troisième partie"],
        id: "cclB"
      },
      {
        dit: ["Montre maintenant les différents sens du mot « maîtrise » dans la première, la deuxième et la troisième partie."],
        champs: ["Dans la première partie", "Dans la deuxième partie", "Dans la troisième partie"],
        id: "cclC"
      },
      {
        dit: ["Que montrent ces variations sur la question qui t'était posée ?"],
        reponse: "Ta réponse", id: "cclD",
        relances: ["Les termes du sujet sont-ils restés les mêmes du début à la fin ?",
                   "Si chaque terme a dû changer de sens, que peut-on en dire de la question elle-même ?"]
      },
      {
        redaction: "ccl", titre: "Ta conclusion", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Sujet et problématique", "{cclA.0}<br>{cclA.1}"],
          ["La parole", "I. {cclB.0}<br>II. {cclB.1}<br>III. {cclB.2}"],
          ["La maîtrise", "I. {cclC.0}<br>II. {cclC.1}<br>III. {cclC.2}"],
          ["Ce que montrent ces variations", "{cclD}"]
        ]
      }
    ]
  });
})();

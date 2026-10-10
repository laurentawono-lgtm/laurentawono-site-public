/* Sujet 2 — « Avons-nous la maîtrise de nos paroles ? »
   Contenu : docs/SOCRATYS-METHODE.md, §4, et la leçon « Paroles » (V2), corrigé de référence.
   Textes : « Avons-nous la maîtrise de nos paroles ? — textes ».
   Nietzsche : citation de Swift seule, sans texte à lire (décision du 29/09/2026). */
(function () {
  const B = window.SOCRATYS.BON;
  const C = window.SOCRATYS.CONSIGNES;

  /* introduction assemblée à partir des réponses de l'élève, qu'il réécrit ensuite */
  const INTRO =
    "Avons-nous la maîtrise de nos paroles ? Le sujet grammatical de cette question est {sujetGram}, et son prédicat {predicat}. " +
    "Ce prédicat peut se définir à partir du couple {couple}. Du point de vue subjectif, la parole se définit comme {defs2.0|defs.0} ; on l'oppose alors à {defs.1}. " +
    "Du point de vue objectif, elle se définit comme {defs2.1|defs.3} ; on l'oppose alors à {defs.4}.\n\n" +
    "Se demander si nous avons la maîtrise de nos paroles, revient à se demander si nous avons la maîtrise de la parole comme {reform.0}, ou comme {reform.1}. " +
    "Si nous avons la maîtrise de nos paroles au sens subjectif, alors {probl.0}. Or {probl.1}. " +
    "Si nous avons la maîtrise de nos paroles au sens objectif, alors {probl.2}. Or {probl.3}.\n\n" +
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
      ["Sujet grammatical", "{sujetGram}"],
      ["Prédicat", "{predicat}"],
      ["Couple philosophique", "{couple}"],
      ["Sens subjectif", "{defs2.0|defs.0}"],
      ["Sens objectif", "{defs2.1|defs.3}"],
      ["Reformulation", "Se demander si nous avons la maîtrise de nos paroles, revient à se demander si nous avons la maîtrise de la parole comme {reform.0}, ou comme {reform.1}."],
      ["Première hypothèse", "Si nous avons la maîtrise de nos paroles au sens subjectif, alors {probl.0} Or {probl.1}"],
      ["Seconde hypothèse", "Si nous avons la maîtrise de nos paroles au sens objectif, alors {probl.2} Or {probl.3}"],
      ["Plan", "I. {plan.0} — II. {plan.1} — III. {plan.2}"],
      ["Couple de la partie III", "{couple3}"]
    ],

    etapes: [
      /* ============ INTRODUCTION ============ */
      { section: "Introduction · le sujet" },
      {
        bon: B.sujet,
        dit: ["Quel est le prédicat de ce sujet ?"],
        reponse: "Ta réponse", id: "predicat",
        motsCles: ["parole"],
        relances: ["Sur quoi porte la maîtrise dont parle la question ?"]
      },
      {
        dit: ["Et quel est le sujet grammatical de cette question ?"],
        reponse: "Ta réponse", id: "sujetGram",
        motsCles: ["maitrise"],
        relances: ["Que se demande-t-on si nous l'avons, sur nos paroles ?"]
      },
      {
        bon: B.couple,
        dit: ["Pour bien cerner ce prédicat, il faut définir le terme « parole » à partir d'un couple philosophique.",
              "Avec quel couple philosophique peux-tu le définir ?"],
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
        champs: ["Du point de vue subjectif, la parole peut se définir comme…", "On l'oppose alors à…", "Peux-tu donner un exemple ?",
                 "Du point de vue objectif, la parole peut se définir comme…", "On l'oppose alors à…", "Peux-tu donner un exemple ?"],
        id: "defs", requis: [0, 1, 3, 4]
      },
      {
        bon: B.distinctes,
        dit: ["Relis tes deux définitions. Sont-elles assez distinctes pour que tu ne puisses jamais les confondre ?"],
        choix: [{ l: "Oui, elles sont bien distinctes", vers: "reformulation" }, { l: "Non, elles se ressemblent trop" }],
        id: "distinctes"
      },
      {
        dit: ["Repars du sens général de chaque terme du couple, indépendamment de la parole : que veut dire « subjectif » ? Que veut dire « objectif » ?",
              "Réécris ensuite tes deux définitions."],
        champs: ["Du point de vue subjectif, la parole peut se définir comme…", "Du point de vue objectif, la parole peut se définir comme…"],
        id: "defs2"
      },
      {
        ancre: "reformulation",
        dit: ["Reformule maintenant le sujet : remplace le mot « parole » par les deux sens que tu as obtenus.",
              "Se demander si nous avons la maîtrise de nos paroles, revient à se demander si nous avons la maîtrise de la parole comme… ou comme…"],
        champs: ["…si nous avons la maîtrise de la parole comme", "…ou comme"],
        id: "reform"
      },
      {
        dit: ["Formulons maintenant deux hypothèses, à partir de ta reformulation."],
        champs: ["Si nous avons la maîtrise de nos paroles au sens subjectif, alors…", "Or…",
                 "Si nous avons la maîtrise de nos paroles au sens objectif, alors…", "Or…"],
        id: "probl"
      },
      { dit: [window.SOCRATYS.SYNTHESE_PROBLEMES] },
      {
        bon: "Les deux hypothèses te fournissent déjà les deux premières parties. La troisième interrogera la maîtrise à partir d'un nouveau couple philosophique.",
        dit: ["Annonce maintenant ton plan."],
        champs: ["Dans une première partie, nous nous demanderons ce qu'implique…",
                 "Dans une deuxième partie, nous nous demanderons ce que suppose…",
                 "Et dans une troisième partie, nous nous demanderons…"],
        id: "plan"
      },
      {
        redaction: "intro", titre: "Ton introduction", modele: INTRO, consigne: C.reecrireIntro,
        notes: [
          ["Sujet", "Avons-nous la maîtrise de nos paroles ?"],
          ["Prédicat · sujet grammatical", "{predicat} · {sujetGram}"],
          ["Couple", "{couple}"],
          ["Sens subjectif", "{defs2.0|defs.0} (opposé à {defs.1}) — exemple : {defs.2}"],
          ["Sens objectif", "{defs2.1|defs.3} (opposé à {defs.4}) — exemple : {defs.5}"],
          ["Reformulation", "si nous avons la maîtrise de la parole comme {reform.0}, ou comme {reform.1}"],
          ["Hypothèse 1", "Si nous avons la maîtrise de nos paroles au sens subjectif, alors {probl.0} Or {probl.1}"],
          ["Hypothèse 2", "Si nous avons la maîtrise de nos paroles au sens objectif, alors {probl.2} Or {probl.3}"],
          ["Plan", "I. {plan.0}<br>II. {plan.1}<br>III. {plan.2}"]
        ]
      },

      /* ============ PARTIE I ============ */
      { section: "Partie I · l'aspect subjectif de la parole" },
      {
        dit: ["Reprends ce que tu as annoncé pour cette partie et pose-le sous la forme d'une question."],
        reponse: "Ta question", id: "p1q",
        motsCles: ["?"],
        relances: ["Si la parole est l'expression de ce qui est en nous, que veut dire « avoir la maîtrise de ses paroles » ? Écris-le sous la forme d'une question."]
      },
      {
        dit: ["Que signifie pour toi parler ? Par quel terme dis-tu ce qui est à l'intérieur de toi ?"],
        reponse: "Un mot", id: "mot",
        motsCles: ["exprim", "expression"],
        relances: ["Quand tu fais passer une émotion ou une idée par des mots, que fais-tu ?",
                   "On dit d'un visage, d'une voix ou d'un tableau qu'ils sont très… quoi ?"]
      },
      {
        dit: ["Et quand tu ne parles pas, dans quel état es-tu ?"],
        reponse: "Un mot", id: "silence",
        motsCles: ["silence", "tai", "mutisme", "muet"],
        relances: ["Comment appelle-t-on l'absence de parole ?"]
      },
      {
        dit: ["Peux-tu reprendre toute la question en la reformulant avec le premier de ces mots ?"],
        reponse: "Ta reformulation", id: "p1ref",
        motsCles: ["exprim", "expression"],
        relances: ["Remplace « nos paroles » par ce que font nos paroles quand elles disent ce qui est en nous."]
      },

      {
        repere: ["Première implication", "Avoir la maîtrise de ses paroles, ce serait maîtriser l'expression de ce qui est en nous."],
        dit: ["Si la parole exprime ce qui est en toi, avoir la maîtrise de ses paroles, en quoi cela pourrait-il consister ?"],
        reponse: "Ta réponse", id: "maitrise1",
        motsCles: ["quand", "taire", "silence", "moment", "propos"],
        relances: ["Une parole qu'on regrette d'avoir dite, qu'a-t-elle manqué ?",
                   "Maîtriser sa parole, est-ce seulement savoir parler ? Qu'est-ce qu'il faut aussi savoir faire ?"]
      },
      {
        dit: ["Pourquoi peut-on soutenir que savoir se taire, c'est déjà maîtriser sa parole ?"],
        reponse: "Ton argument", id: "arg1"
      },
      {
        dit: ["Pense au théâtre : le public perçoit souvent ce que l'acteur n'a pas dit. L'acteur peut-il avoir la maîtrise de ce que le public entend dans son silence ?"],
        reponse: "Ta réponse", id: "theatre"
      },
      {
        dit: ["Et le témoin qui se tait devant le juge : pourquoi est-il accusé de complicité ? Tous les silences se valent-ils ?"],
        reponse: "Ta réponse", id: "temoin",
        motsCles: ["complic", "cache", "dissimul", "non", "pas tous", "condamn", "faute"],
        relances: ["Que cache le silence du témoin ?",
                   "Un silence peut-il être une faute ?"]
      },
      {
        repere: ["Seconde implication", "La parole peut aussi dissimuler ce qui est en nous."],
        bon: "Les figures de style — l'euphémisme, la métaphore, la métonymie, le superlatif — permettent de dire les choses autrement qu'elles ne sont. Platon, dans le <em>Phèdre</em>, fait l'éloge ironique des rhéteurs, dont l'art donne aux petites choses l'apparence des grandes, et aux grandes l'apparence d'être petites.",
        dit: ["La parole est-elle une traductrice de ta pensée, ou peut-elle en être une traîtresse ?"],
        reponse: "Ta réponse", id: "traitresse"
      },
      {
        dit: ["Donne un exemple de parole qui dit les choses autrement qu'elles ne sont."],
        reponse: "Ton exemple", id: "exFigure"
      },
      {
        dit: ["Si la parole peut dissimuler, faut-il la définir comme une dissimulatrice ? Celui qui parle cherche-t-il d'abord à tromper, ou à se faire comprendre ?"],
        reponse: "Ta réponse", id: "dissim"
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
        dit: ["Pourquoi les bêtes ne parlent-elles pas comme nous ?"],
        reponse: "Ta réponse", id: "betes",
        motsCles: ["pens", "organe"],
        relances: ["Selon Descartes, est-ce une question d'organes ?"]
      },
      {
        dit: ["Pourquoi Descartes inclut-il la parole des fous, et exclut-il celle des perroquets ?"],
        reponse: "Ta réponse", id: "fous",
        motsCles: ["propos", "repet", "pens", "sens", "situation"],
        relances: ["Le perroquet choisit-il ses mots en fonction de la situation ?",
                   "Le fou parle-t-il « à propos des sujets qui se présentent » ?"]
      },
      {
        dit: ["Que nous apprend ce texte sur notre question : au sens subjectif, avons-nous la maîtrise de nos paroles ?"],
        reponse: "Ta réponse", id: "descPont"
      },
      {
        dit: ["Mais toute parole véhicule-t-elle une pensée ? Le juge qui prononce une condamnation, le prêtre qui dit la messe, l'homme politique qui lit un discours : parlent-ils en leur nom propre ?"],
        reponse: "Ta réponse", id: "porteParole",
        motsCles: ["non", "porte", "au nom", "institution", "fonction", "communaut", "circonstance", "role"],
        relances: ["Au nom de qui parle le juge quand il condamne ?",
                   "Ces paroles expriment-elles ce qu'ils pensent, ou ce que la situation exige ?"]
      },
      {
        repere: ["Le chemin parcouru",
          "La maîtrise du silence : {maitrise1}<br>Ce qui lui résiste : {theatre} / {temoin}<br>La parole qui dissimule : {traitresse}<br>Descartes : {descPont}<br>Le porte-parole : {porteParole}"],
        dit: ["Formule maintenant la conclusion de ta première partie : au sens subjectif, avons-nous la maîtrise de nos paroles ?"],
        reponse: "Ta conclusion", id: "cclP1",
        relances: ["Nos paroles disent-elles toujours ce qui est en nous ?"]
      },
      {
        redaction: "p1", titre: "Ta première partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "{p1q}"],
          ["Parler, se taire", "{mot} / {silence}<br>reformulation : {p1ref}"],
          ["La maîtrise du silence", "{maitrise1}<br>argument : {arg1}<br>le théâtre : {theatre}<br>le témoin : {temoin}"],
          ["La parole qui dissimule", "{traitresse}<br>exemple : {exFigure}<br>{dissim}"],
          ["Descartes", "thèse : {descThese}<br>les bêtes : {betes}<br>fous et perroquets : {fous}<br>pour notre question : {descPont}"],
          ["Le porte-parole", "{porteParole}"],
          ["Conclusion", "{cclP1}"]
        ]
      },
      {
        dit: ["Si nos paroles ne disent pas toujours ce qui est en nous, que peuvent-elles dire d'autre ?"],
        reponse: "Ta réponse", id: "trans1",
        motsCles: ["chose", "objet", "monde", "realit", "nomm", "objecti"],
        relances: ["Quel était le second sens de la parole, dans ton introduction ?"]
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Nous avons vu que la parole, en tant qu'expression de notre intériorité, ___. Qu'en est-il lorsque nos paroles ne disent plus ce qui est en nous, mais ___ ?",
        id: "t1"
      },

      /* ============ PARTIE II ============ */
      { section: "Partie II · le caractère objectif de la parole" },
      {
        dit: ["Reprends ce que tu as annoncé pour ta deuxième partie et pose-le sous la forme d'une question."],
        reponse: "Ta question", id: "p2q",
        motsCles: ["?"],
        relances: ["Si la parole consiste à nommer les choses, que veut dire « avoir la maîtrise de ses paroles » ? Écris-le sous la forme d'une question."]
      },
      {
        dit: ["Au sens objectif, comment peux-tu définir la parole ? Que signifie « objectif » ?"],
        reponse: "Ta réponse", id: "obj1"
      },
      {
        dit: ["Explique pourquoi ce deuxième sens renvoie à un objet, ou à une chose."],
        reponse: "Ta réponse", id: "obj2"
      },
      {
        dit: ["Quand dit-on de quelqu'un qu'il parle objectivement ?"],
        reponse: "Ta réponse", id: "obj3",
        motsCles: ["fait", "tel", "realit", "chose", "neutre", "verit", "sans", "vrai"],
        relances: ["Celui qui parle objectivement parle-t-il de ce qu'il ressent, ou de ce qui est ?"]
      },
      {
        dit: ["Avec ce sens, peux-tu reformuler toute la question ?"],
        reponse: "Ta reformulation", id: "p2ref"
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
          ["Question de la partie", "{p2q}"],
          ["Le sens objectif", "{obj1}<br>{obj2}<br>parler objectivement : {obj3}"],
          ["Reformulation", "{p2ref}<br>nommer et connaître : {nommer}<br>{implic}"],
          ["Aristote", "les formes vraies : {assoVrai.0} ; {assoVrai.1}<br>dire vrai : {aristVrai}"],
          ["Mensonge et illusion", "{assoDef.0} ; {assoDef.1}<br>{posture}"],
          ["Le menteur (Swift, cité par Nietzsche)", "{menteur}"],
          ["L'illusion", "{illusion}"],
          ["Locke", "thèse : {lockeThese}<br>l'enfant et l'or : {enfantOr}<br>pour notre question : {lockePont}"],
          ["Conclusion", "{cclP2}"]
        ]
      },
      {
        dit: ["Si nos paroles ne sont maîtrisées ni quand elles expriment ce qui est en nous, ni quand elles nomment les choses, quelle maîtrise celui qui parle peut-il encore avoir ? D'où pourrait-elle lui venir ?"],
        reponse: "Ta réponse", id: "trans2"
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Si, du point de vue subjectif, la parole ___, et si, du point de vue objectif, le mot ___, quelle maîtrise avons-nous alors de nos paroles ?",
        id: "t2"
      },

      /* ============ PARTIE III ============ */
      { section: "Partie III · une maîtrise naturelle ou artificielle ?" },
      {
        dit: ["Reviens au sujet grammatical que tu avais identifié en introduction.",
              "Cette maîtrise, peut-on l'obtenir naturellement, ou faut-il l'apprendre ?"],
        reponse: "Ta réponse", id: "p3q"
      },
      {
        dit: ["Avec quel couple philosophique peux-tu définir la maîtrise ?"],
        choix: [{ l: "naturel / artificiel", bon: true }, { l: "inné / acquis" }, { l: "subjectif / objectif" }],
        id: "couple3",
        relances: [
          "Applique ce couple à la maîtrise : une maîtrise « {couple3} »… est-ce que cela éclaire ce que sait faire celui qui parle bien ?",
          "Quand dit-on de quelqu'un qu'il parle bien, qu'il sait manier les mots ? Qu'est-ce que cela révèle : un don, ou un art qu'il a travaillé ?",
          "Dans quel domaine use-t-on de la persuasion pour faire agir ou mobiliser des personnes ? La maîtrise qu'on y déploie est-elle donnée par la nature, ou fabriquée ?"
        ]
      },
      {
        dit: ["Définis maintenant la maîtrise de la parole à partir de ce couple."],
        champs: ["Au sens naturel, la maîtrise de la parole serait…", "Peux-tu donner un exemple ?",
                 "Au sens artificiel, la maîtrise de la parole serait…", "Peux-tu donner un exemple ?"],
        id: "defs3", requis: [0, 2]
      },
      {
        repere: ["Première hypothèse", "La maîtrise de la parole serait naturelle."],
        dit: ["Si la maîtrise de la parole est naturelle, quel argument peux-tu tirer du texte de Descartes, que tu as lu en première partie ?"],
        reponse: "Ton argument", id: "argNat",
        motsCles: ["homme seul", "seul", "pens", "nature", "animal", "bete", "propre"],
        relances: ["Selon Descartes, à qui seul la parole convient-elle ?"]
      },
      {
        dit: ["Cette disposition naturelle suffit-elle à en avoir la maîtrise ? Un nouveau-né a-t-il, comme tout homme, la faculté de parler ? En a-t-il pour autant la maîtrise ?"],
        reponse: "Ta réponse", id: "nouveauNe",
        motsCles: ["non", "appren", "faculte", "depass", "suffit pas", "pas encore"],
        relances: ["Que manque-t-il au nouveau-né, qui a pourtant la faculté de parler ?"]
      },
      {
        dit: ["Si la maîtrise de la parole n'est pas naturelle, que peut-on en déduire ?"],
        reponse: "Ta réponse", id: "deduire",
        motsCles: ["artifici", "appren", "techni", "acqui", "travail"],
        relances: ["Quel est l'autre terme de ton couple ?"]
      },
      {
        dit: ["Que signifie le fait que la maîtrise soit artificielle ? Qu'est-ce que cela implique ?"],
        reponse: "Ta réponse", id: "implArt",
        motsCles: ["appren", "techni", "art", "travail", "exerc", "regle"],
        relances: ["Comment acquiert-on ce qui ne nous est pas donné par la nature ?"]
      },
      {
        repere: ["Seconde hypothèse", "La maîtrise de la parole serait un art."],
        dit: ["Lis ce texte de Platon."],
        texte: {
          corps: ["Tant qu'on ne connaîtra pas la vérité sur chacune des questions dont on parle et sur lesquelles on écrit ; tant qu'on ne sera pas capable de définir toute chose en elle-même ; tant que, après avoir défini cette chose, on ne saura pas, à l'inverse, la diviser selon ses espèces jusqu'à ce qu'on atteigne l'indivisible ; tant que, après avoir selon la même méthode analysé la nature de l'âme et découvert l'espèce de discours qui correspond à chaque nature, on ne disposera et on n'organisera pas son discours en conséquence. En offrant à une âme complexe des discours complexes et qui correspondent exactement à ce qu'elle demande, et des discours simples à une âme simple, on restera incapable de manier le genre oratoire avec autant d'art que sa nature le permet, que ce soit pour enseigner ou pour persuader."],
          source: "Platon, <em>Phèdre</em>, 277b"
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
        relances: ["Suffit-il, selon Platon, de connaître la vérité sur ce dont on parle ?"]
      },
      {
        dit: ["Pourquoi un même discours ne convient-il pas à toute âme ?"],
        reponse: "Ta réponse", id: "touteAme"
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
          ["La question de la maîtrise", "{p3q}"],
          ["Couple", "{couple3}<br>naturel : {defs3.0} (exemple : {defs3.1})<br>artificiel : {defs3.2} (exemple : {defs3.3})"],
          ["Hypothèse du naturel", "Descartes : {argNat}<br>le nouveau-né : {nouveauNe}"],
          ["Hypothèse de l'artifice", "{deduire}<br>{implArt}"],
          ["Platon", "thèse : {platonThese}<br>l'orateur : {orateur}<br>toute âme : {touteAme}"],
          ["L'agriculteur", "{metaphore}<br>bien semé : {seme}<br>fécondité : {fecondite}"],
          ["Conclusion", "{ccl3}"]
        ]
      },

      /* ============ CONCLUSION ============ */
      { section: "Conclusion" },
      {
        bon: B.conclusion,
        dit: ["À quel sujet répondais-tu ? Quelle en était la problématique ?"],
        champs: ["Le sujet", "La problématique"],
        id: "cclA"
      },
      {
        dit: ["Quel sens as-tu donné à la parole dans la première, la deuxième et la troisième partie ?"],
        champs: ["Dans la première partie", "Dans la deuxième partie", "Dans la troisième partie"],
        id: "cclB"
      },
      {
        dit: ["Quels sont les sens qu'a pris la maîtrise dans la première, la deuxième et la troisième partie ?"],
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

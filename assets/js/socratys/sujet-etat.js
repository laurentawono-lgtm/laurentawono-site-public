/* Sujet 3 — « Est-ce à l'État de faire la justice ? »
   Contenu : docs/SOCRATYS-METHODE.md, §5, et la leçon « L'État et la justice » (2026),
   corrigé de référence (docs/Etat_et_Justice_2026.pdf).
   Textes : « État et justice — textes » (docs/Etat_et_Justice_textes.pdf) pour Locke, Marx et
   Rousseau ; extrait du Gorgias pour Calliclès ; Aristote et Rawls en bulles. */
(function () {
  const B = window.SOCRATYS.BON;

  /* introduction assemblée à partir des réponses de l'élève, qu'il peut ensuite modifier */
  const INTRO =
    "{amorce} Est-ce à l'État de faire la justice ? La justice peut s'entendre en deux sens, que distingue le couple {couple}. Au sens de la légalité, la justice se définit comme {defs2.0|defs.0} ; on l'oppose alors à {defs.1}. " +
    "Au sens de l'égalité, elle se définit comme {defs2.1|defs.2} ; on l'oppose alors à {defs.3}.\n\n" +
    "Se demander si c'est à l'État de faire la justice, revient à se demander s'il doit la faire comme {reform.0}, ou comme {reform.1}. " +
    "Si c'est à l'État de faire la justice au sens de la légalité, alors {probl.0}, toutefois {problemes.0}. " +
    "Si c'est à l'État de faire la justice au sens de l'égalité, alors {probl.1}, toutefois {problemes.1}.\n\n" +
    "Dans une première partie, nous nous demanderons ce qu'implique {plan.0}. Dans une deuxième partie, nous nous demanderons ce que suppose {plan.1}. " +
    "Et dans une troisième partie, nous nous demanderons {plan.2}.";

  /* première partie assemblée à partir des réponses de l'élève, qu'il peut affiner ou corriger */
  const PARTIE1 =
    "{p1q}\n\n" +
    "Si la justice est ce qui est légal, elle repose sur {mot}, que l'on oppose à {loiOppose.0} (par exemple, {loiOppose.1}). " +
    "La question devient alors : {p1ref}. Si faire la justice, c'est faire adopter des lois, l'État peut se définir comme {role}. " +
    "Mais pourquoi obéit-on à la loi ? {pourquoiObeir}. La contrainte relève du fait ({faitDroit.0}), la justice de la loi relève du droit ({faitDroit.1}).\n\n" +
    "Dans le Gorgias de Platon, Calliclès soutient que {callThese}. Le texte oppose deux conceptions de la justice : {deuxConceptions}. " +
    "Calliclès s'appuie sur la nature : {exNature}. Selon lui, la justice devrait donc reposer sur {callHyp} : c'est l'hypothèse de la priorité du fait sur le droit. " +
    "Mais si Calliclès a raison, est-il encore nécessaire d'avoir un État ? {callPont}. Pour justifier la nécessité de l'État, il nous faut donc {liberte}.\n\n" +
    "Si le droit dit ce qui doit être, une règle ne cesse pas d'être valide quand on la transgresse. Locke soutient que {lockeThese}. " +
    "En effet, {lockeRisque}. {lockePont}. Ce pouvoir commun, c'est {pouvoirCommun}.\n\n" +
    "Toutefois, toute loi édictée par l'État n'est pas juste pour autant : {loisInjustes}. {protegeViole}. {cclP1}.";

  /* deuxième et troisième parties, conclusion : même principe */
  const PARTIE2 =
    "{p2q}\n\n" +
    "La justice distributive porte sur la répartition des richesses, des charges et des avantages. Mais que faut-il égaliser ? {egaliser}. " +
    "L'égalité peut se définir comme {egaliteDef} ; elle s'oppose à {egaliteOppose} (par exemple, {egaliteEx}). " +
    "La question devient alors : {p2ref}. Aristote montre qu'il serait aussi injuste de donner des parts égales à des personnes inégales " +
    "que des parts inégales à des personnes égales. L'État doit alors {aristote}.\n\n" +
    "L'égalité en droit ne tient pas compte des différences de situation. Or les individus à qui s'applique cette égalité ne vivent pas sous les mêmes conditions, ce que confirme la lecture du texte de Marx. " +
    "Marx soutient que {marxThese}. En effet, {marxMesure}. Ce que Marx reproche au droit, c'est que {risque}. La contestation du droit induit-elle celle de l'État ? {marxEtat}.\n\n" +
    "Pour surmonter cette difficulté, Rawls propose d'abord le voile d'ignorance : {voile}. Par exemple, {voileEx}.\n\n" +
    "On peut aussi tenir compte des différences pour les corriger. Accorder une aide supplémentaire à un élève défavorisé, est-ce lui donner un privilège ? {aide}. " +
    "C'est le principe de différence de Rawls, dont on trouve un exemple dans {difference}. {rawlsPont}.\n\n" +
    "{cclP2}. {conclNiveau}.";
  const PARTIE3 =
    "Si c'est à l'État de faire la justice, de quel État s'agit-il ?\n\n" +
    "Rousseau soutient que {rous8These}. Il oppose l'état de nature ({rous8Termes.0}) à l'état civil ({rous8Termes.1}) : {rous8FaitDroit}. " +
    "L'État de fait, ou état de nature, peut-il faire la justice ? {etatNature}.\n\n" +
    "S'il ne tient sa légitimité ni de la nature ni de la force, l'État la tient {legitimite}. Rousseau appelle état civil cet État fondé sur une convention.\n\n" +
    "Rousseau soutient que {rousThese}. Chez lui, le consentement s'exprime ainsi : {rester}. Par opposition à la force, on peut l'appeler {consentSyn}. Le pacte social exige un consentement unanime parce que {rousPont}. Cela éclaire la nature de l'État : {natureEtat}. " +
    "Pourtant, {rousLimite}. À cette objection, Rousseau répond que {rousReponse}. Quelle est alors la forme de l'État la mieux à même de faire la justice ? {civilJustice}.";
  const CONCLUSION =
    "Nous nous demandions : {cclA.0} Le problème était le suivant : {cclA.1}.\n\n" +
    "Dans la première partie, faire la justice signifiait {cclB.0} ; dans la deuxième, {cclB.1} ; dans la troisième, {cclB.2}. " +
    "L'État, quant à lui, a d'abord été compris comme {cclC.0}, puis comme {cclC.1}, et enfin comme {cclC.2}.\n\n" +
    "{cclD}.";

  const CALLICLES = {
    corps: ["Et quand on dit qu'il est injuste, qu'il est vilain, de vouloir avoir plus que la plupart des gens, on s'exprime en se référant à la loi. Or, au contraire, il est évident, selon moi, que la justice consiste en ce que le meilleur ait plus que le moins bon et le plus fort plus que le moins fort. Partout il en est ainsi, c'est ce que la nature enseigne, chez toutes les espèces animales, chez toutes les races humaines et dans toutes les cités ! Si le plus fort domine le moins fort et s'il est supérieur à lui, c'est là le signe que c'est juste."],
    source: "Calliclès, dans Platon, <em>Gorgias</em>, 483c-d"
  };

  window.SOCRATYS_SUJETS.push({
    id: "etat-justice",
    titre: "Est-ce à l'État de faire la justice ?",

    copie: [
      ["Introduction", "red_intro", INTRO],
      ["Première partie", "red_p1", PARTIE1],
      ["Transition", "t1"],
      ["Deuxième partie", "red_p2", PARTIE2],
      ["Transition", "t2"],
      ["Troisième partie", "red_p3", PARTIE3],
      ["Conclusion", "red_ccl", CONCLUSION]
    ],

    fiche: [
      ["Amorce", "{amorce}"],
      ["Sujet grammatical", "l'État"],
      ["Prédicat", "faire la justice"],
      ["Couple philosophique", "{couple}"],
      ["Justice-légalité", "{defs2.0|defs.0}"],
      ["Justice-égalité", "{defs2.1|defs.2}"],
      ["Reformulation", "Se demander si c'est à l'État de faire la justice, revient à se demander s'il doit la faire comme {reform.0}, ou comme {reform.1}."],
      ["Première hypothèse", "Si c'est à l'État de faire la justice au sens de la légalité, alors {probl.0}"],
      ["Seconde hypothèse", "Si c'est à l'État de faire la justice au sens de l'égalité, alors {probl.1}"],
      ["Problèmes", "toutefois {problemes.0} — toutefois {problemes.1}"],
      ["Plan", "I. {plan.0} — II. {plan.1} — III. {plan.2}"],
      ["Couple de la partie III", "{couple3}"]
    ],

    etapes: [
      /* ============ INTRODUCTION ============ */
      { section: "Introduction · l'amorce" },
      {
        bon: B.amorce,
        dit: ["Commençons par l'amorce de ton introduction. Rédige-la."],
        reponse: "Ton amorce", id: "amorce",
        relances: [
          "Dans ce sujet, l'État est le sujet grammatical et « faire la justice » est le prédicat : la question les associe, puisqu'elle suppose que ce serait à l'État de faire la justice. Ton amorce doit donc les dissocier, par exemple en montrant que la justice est d'abord un sentiment, alors que l'État est une institution conventionnelle. Dans ta copie, n'écris pas « sujet grammatical » ni « prédicat ».",
          "Tu peux partir d'un exemple : l'enfant qui trouve injuste de recevoir une plus petite part du gâteau.",
          "L'enfant a-t-il besoin d'une loi ou d'un tribunal pour trouver cela injuste ? Que t'apprend cet exemple sur la justice ?",
          "L'État, lui, n'existe pas par nature : les hommes l'ont institué par convention. Comment peux-tu opposer ce sentiment de justice et cette institution ?"
        ]
      },

      { section: "Introduction · le sujet" },
      {
        bon: B.couple,
        dit: ["Avec quel couple philosophique peux-tu t'aider pour définir la justice ?"],
        choix: [{ l: "légalité / égalité", bon: true }, { l: "nature / culture" }, { l: "particulier / général" }],
        id: "couple",
        relances: [
          "Essaie d'appliquer ce couple à la justice : une justice « {couple} »… est-ce vraiment là ce qui distingue deux manières de faire la justice ?",
          "Quand on dit d'un jugement qu'il est « conforme à la loi », et d'un partage qu'il est « juste », parle-t-on de la même justice ? Qu'est-ce qui les distingue ?",
          "Dans quel domaine parle-t-on de justice à propos d'un tribunal ? Et dans quel domaine en parle-t-on à propos des salaires, des impôts ou des aides sociales ?"
        ]
      },

      { section: "Introduction · définir et problématiser" },
      {
        dit: ["Définis maintenant la justice à partir de ce couple."],
        champs: ["Au sens de la légalité, la justice peut se définir comme…", "On l'oppose alors à…",
                 "Au sens de l'égalité, la justice peut se définir comme…", "On l'oppose alors à…"],
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
        relances: ["Pars du sens ordinaire de chaque terme du couple, indépendamment de la justice : dans la vie de tous les jours, que veut dire « légalité » ? Que veut dire « égalité » ? Applique ensuite chacun de ces sens à la justice."],
        champs: ["Au sens de la légalité, la justice peut se définir comme…", "Au sens de l'égalité, la justice peut se définir comme…"],
        id: "defs2"
      },
      {
        ancre: "reformulation",
        bon: B.reformulation,
        dit: ["Reformule maintenant le sujet à partir de tes deux définitions.",
              "Se demander si c'est à l'État de faire la justice, revient à se demander s'il doit la faire comme… ou comme…"],
        champs: ["…s'il doit la faire comme", "…ou comme"],
        id: "reform"
      },
      {
        dit: ["Formulons maintenant deux hypothèses, à partir de ta reformulation."],
        champs: ["Si c'est à l'État de faire la justice au sens de la légalité, alors…",
                 "Si c'est à l'État de faire la justice au sens de l'égalité, alors…"],
        relances: ["Si la justice est ce qui est conforme à la loi, quel rôle revient à l'État ? Et si elle consiste à corriger les inégalités, que doit-il faire ?"],
        id: "probl"
      },
      {
        bon: B.problematisation,
        dit: ["Ces deux hypothèses soulèvent chacune un problème. Lequel ?"],
        champs: ["Si c'est à l'État de faire la justice au sens de la légalité, alors {probl.0}, toutefois…",
                 "Si c'est à l'État de faire la justice au sens de l'égalité, alors {probl.1}, toutefois…"],
        relances: ["Toute loi est-elle juste ? Et l'État peut-il rendre les hommes égaux sans porter atteinte à leur liberté ?"],
        id: "problemes"
      },
      {
        bon: "Les deux hypothèses indiquent déjà le plan : le premier problème sera traité dans la première partie, et le deuxième problème sera traité dans la deuxième partie.",
        dit: ["Annonce maintenant ton plan."],
        champs: ["Dans une première partie, nous nous demanderons ce qu'implique…",
                 "Dans une deuxième partie, nous nous demanderons ce que suppose…",
                 "Et dans une troisième partie, nous nous demanderons…"],
        id: "plan",
        relances: ["Si l'analyse du prédicat, faire la justice, te donne les deux premières parties, c'est celle du sujet grammatical, l'État, qui te donne la troisième : on questionne alors l'État à l'aide d'un autre couple philosophique. Tu peux par exemple questionner l'État à partir du couple fait / droit, que l'on peut aussi nommer nature / civil : de quel État peut-on attendre la justice ?"]
      },
      {
        redaction: "intro", titre: "Ton introduction", modele: INTRO,
        consigne: "Voici ton introduction, rassemblée à partir de tes réponses. Ce n'est qu'un premier jet : la dissertation est d'abord un exercice d'écriture. Réécris-la avec tes propres phrases, affine-la et corrige-la."
      },

      /* ============ PARTIE I ============ */
      { section: "Partie I · est-ce à l'État de faire la justice au sens de la légalité ?" },
      {
        dit: ["Reprends ce que tu as annoncé pour cette partie et pose-le sous la forme d'une question."],
        reponse: "Ta question", id: "p1q",
        motsCles: ["?"],
        relances: ["Si la justice, c'est ce qui est légal, que veut dire « faire la justice » pour l'État ? Écris-le sous la forme d'une question."]
      },
      {
        dit: ["Si la justice est ce qui est légal, sur quoi repose-t-elle ? Réponds en un mot."],
        reponse: "Un mot", id: "mot",
        motsCles: ["loi", "legal", "droit"],
        relances: ["Quand dit-on d'un acte qu'il est illégal ?",
                   "Au nom de quoi le juge condamne-t-il au tribunal ?"]
      },
      {
        dit: ["À quoi peut-on l'opposer ? Peux-tu trouver un exemple ?"],
        champs: ["On peut l'opposer à…", "Un exemple…"],
        id: "loiOppose"
      },
      {
        bon: "Au sens juridique, la loi est une règle générale et obligatoire, édictée par une autorité légitime et assortie d'une sanction.",
        dit: ["Peux-tu reprendre la question en la reformulant avec ce nouveau sens de la justice ?"],
        reponse: "Ta reformulation", id: "p1ref",
        motsCles: ["loi"],
        relances: ["Si faire la justice, c'est faire respecter la loi, que se demande-t-on de l'État ?"]
      },
      {
        dit: ["Si faire la justice, c'est faire adopter des lois, quel sens peut-on alors donner à l'État ?"],
        reponse: "Ta réponse", id: "role",
        motsCles: ["legisla", "autorit", "pouvoir", "edict", "institu", "souverain", "fait les lois", "faire les lois", "vote"],
        relances: ["Relis la définition de la loi : par qui est-elle édictée ?",
                   "Qui fait les lois, et au nom de quel pouvoir ?"]
      },
      {
        dit: ["Mais pourquoi obéit-on à la loi : parce qu'on y est contraint, ou parce qu'elle est juste ?"],
        reponse: "Ta réponse", id: "pourquoiObeir"
      },
      {
        bon: "Le fait désigne ce qui se produit effectivement : ce que les individus font réellement, indépendamment de ce qu'ils devraient faire. Le droit détermine ce qui doit être.",
        dit: ["De ces deux raisons d'obéir — la contrainte, ou la justice de la loi —, laquelle relève du fait, et laquelle relève du droit ?"],
        champs: ["Relève du fait…", "Relève du droit…"],
        id: "faitDroit"
      },
      {
        repere: ["Deux hypothèses", "La priorité du fait sur le droit, ou la priorité du droit sur le fait."],
        dit: ["Notre question admet donc deux hypothèses. Pour examiner la première, lis ce que soutient Calliclès, face à Socrate."],
        texte: CALLICLES,
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de Calliclès ?"],
        reponse: "La thèse", id: "callThese",
        motsCles: ["fort", "meilleur", "nature", "plus"],
        relances: ["Selon Calliclès, qui doit avoir plus que les autres ?"]
      },
      {
        dit: ["Quelles sont les deux conceptions de la justice que le texte oppose ?"],
        reponse: "Ta réponse", id: "deuxConceptions",
        motsCles: ["nature", "loi", "convention"],
        relances: ["Relis le début du texte : quand on dit qu'il est injuste de vouloir avoir plus que les autres, à quoi se réfère-t-on ?",
                   "À quoi Calliclès oppose-t-il cette justice fondée sur la loi ? Qu'est-ce qui, selon lui, « enseigne » la justice ?"]
      },
      {
        dit: ["Sur quoi Calliclès s'appuie-t-il pour justifier sa thèse ? Dans la nature, qui domine ? Donne un exemple."],
        reponse: "Ton exemple", id: "exNature",
        motsCles: ["nature", "animal", "animaux", "espece", "race", "cite", "partout", "fort", "domin", "lion", "predat"],
        relances: ["Relis le texte : selon Calliclès, qu'enseigne la nature ?",
                   "Parmi les animaux, entre les peuples ou entre les cités, qui l'emporte ?"]
      },
      {
        dit: ["Selon Calliclès, la justice devrait-elle reposer sur le fait ou sur le droit ?"],
        reponse: "Ta réponse", id: "callHyp",
        motsCles: ["fait", "nature", "naturel"],
        relances: ["Calliclès fonde-t-il la justice sur ce qui se passe dans la nature, ou sur une convention entre les hommes ?",
                   "Pour Calliclès, ce qui se fait dans la nature devient-il ce qui doit se faire ?"]
      },
      {
        repere: ["Première hypothèse", "La priorité du fait sur le droit."],
        dit: ["Si Calliclès a raison, est-il encore nécessaire d'avoir un État ?"],
        reponse: "Ta réponse", id: "callPont",
        motsCles: ["non", "inutile", "pas besoin", "pas necessaire", "plus necessaire", "plus fort", "force", "nature"],
        relances: ["Si la nature enseigne déjà ce qui est juste, à quoi servirait une loi commune ?",
                   "Si le plus fort domine déjà le moins fort, qui a encore besoin d'un État pour faire la justice ?"]
      },
      {
        dit: ["Que nous faut-il faire alors pour justifier la nécessité de l'État ?"],
        reponse: "Ta réponse", id: "liberte",
        motsCles: ["droit", "priorit", "convention", "seconde hypothese", "deuxieme hypothese", "autre hypothese"],
        relances: ["Quelle était la seconde hypothèse que nous avions annoncée ?",
                   "Si le fait ne suffit pas à justifier l'État, sur quoi faudrait-il le fonder ?"]
      },
      {
        repere: ["Seconde hypothèse", "La priorité du droit sur le fait."],
        dit: ["Si le droit dit ce qui doit être, une règle cesse-t-elle d'être valide quand on la transgresse ?"],
        reponse: "Ta réponse", id: "validite",
        motsCles: ["non", "reste", "toujours", "valide", "depend pas"],
        relances: ["Le vol est-il autorisé du seul fait que des gens volent ?"]
      },
      {
        bon: "Selon Locke (<em>Second Traité du gouvernement civil</em>), l'homme possède dès l'état de nature des droits fondamentaux : le droit à la vie, à la liberté et à la propriété.",
        dit: ["Lis ce texte de Locke."],
        texte: {
          corps: ["Si l'homme, dans l'état de nature, est aussi libre que j'ai dit, s'il est le seigneur absolu de sa personne et de ses possessions, égal au plus grand et sujet à personne ; pourquoi se dépouille-t-il de sa liberté et de cet empire, pourquoi se soumet-il à la domination et à l'inspection de quelque autre pouvoir ? Il est aisé de répondre, qu'encore que, dans l'état de nature, l'homme ait un droit, tel que nous avons posé, la jouissance de ce droit est pourtant fort incertaine et exposée sans cesse à l'invasion d'autrui. Car, tous les hommes étant Rois, tous étant égaux et la plupart peu exacts observateurs de l'équité et de la justice, la jouissance d'un bien propre, dans cet état, est mal assurée, et ne peut guère être tranquille."],
          source: "Locke, <em>Traité du gouvernement civil</em>, IX, § 123"
        }
      },
      {
        bon: B.these,
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "lockeThese",
        motsCles: ["incertain", "assur", "invasion", "autrui", "soumet", "pouvoir", "proteg", "garanti"],
        relances: ["Selon Locke, pourquoi l'homme accepte-t-il de se soumettre à un autre pouvoir ?",
                   "Dans l'état de nature, la jouissance de son droit est-elle assurée ?"]
      },
      {
        dit: ["Pourquoi, selon Locke, la jouissance des droits est-elle incertaine dans l'état de nature ?"],
        reponse: "Ta réponse", id: "lockeRisque",
        motsCles: ["interet", "chacun", "propre", "conflit", "violen", "guerre", "interpret", "venge", "juge"],
        relances: ["Qui décidera, en cas de désaccord, de ce que sont les droits de chacun ?",
                   "Chacun ne risque-t-il pas de défendre ses droits selon son intérêt particulier ?"]
      },
      {
        dit: ["Reconstitue l'argumentation qui conduit à la nécessité de l'État selon Locke."],
        reponse: "Ton argumentation", id: "lockePont",
        motsCles: ["condition", "etat civil", "necessaire", "garanti", "protege", "assur", "pouvoir commun", "autorite", "soumet"],
        relances: ["Pars de l'état de nature : les hommes y sont-ils libres et égaux ? Leurs droits y sont-ils pour autant assurés ?",
                   "Que leur manque-t-il pour jouir de leurs droits en sécurité ? Pourquoi acceptent-ils alors de se soumettre à un pouvoir commun ?"]
      },
      {
        dit: ["Qu'est-ce que Locke appelle « pouvoir commun » ?"],
        reponse: "Ta réponse", id: "pouvoirCommun",
        motsCles: ["etat", "gouvernement", "souverain"],
        relances: ["À quel pouvoir les hommes se soumettent-ils en sortant de l'état de nature ?",
                   "Quelle institution fait les lois communes et les fait respecter ?"]
      },
      {
        dit: ["Mais toute loi édictée par l'État est-elle juste pour autant ? Connais-tu des lois qui ont organisé l'injustice ?"],
        reponse: "Ton exemple", id: "loisInjustes",
        motsCles: ["race", "racia", "nazi", "reich", "code noir", "esclav", "segreg", "apartheid", "juif", "vichy", "non"],
        relances: ["Pense à l'esclavage dans les colonies : était-il interdit par la loi ?",
                   "Pense à l'Allemagne nazie : ses persécutions étaient-elles illégales ?"]
      },
      {
        dit: ["Comment la loi peut-elle, en même temps, protéger et violer des droits ?"],
        reponse: "Ta réponse", id: "protegeViole"
      },
      {
        repere: ["Le chemin parcouru",
          "Le sens de l'État : {role}<br>La priorité du fait (Calliclès) : {callPont}<br>Vers la seconde hypothèse : {liberte}<br>La priorité du droit (Locke) : {lockePont}<br>Ce qui lui résiste : {loisInjustes}"],
        dit: ["Si l'État n'arrive pas à faire la justice comme légalité, que peut-on en conclure ? Quel autre sens de la justice nous faut-il examiner ?"],
        reponse: "Ta conclusion", id: "cclP1",
        motsCles: ["egalit", "distribu"],
        relances: ["La légalité suffit-elle à garantir la justice ?",
                   "Quel était le second sens de la justice, dans ton introduction ?"]
      },
      {
        redaction: "p1", titre: "Ta première partie", modele: PARTIE1,
        consigne: "Voici ta première partie, rassemblée à partir de tes réponses. Ce n'est qu'un premier jet : la dissertation est d'abord un exercice d'écriture. Réécris-la avec tes propres phrases, affine-la et corrige-la."
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Nous avons vu que faire la justice au sens de la légalité ___. Mais certaines lois, bien que valides, ___. Il faut donc chercher un autre critère de la justice : ___.",
        id: "t1"
      },

      /* ============ PARTIE II ============ */
      { section: "Partie II · est-ce à l'État de faire la justice au sens de l'égalité ?" },
      {
        dit: ["Reprends ce que tu as annoncé pour ta deuxième partie et pose-le sous la forme d'une question."],
        reponse: "Ta question", id: "p2q",
        motsCles: ["?"],
        relances: ["Si la justice, c'est l'égalité, que veut dire « faire la justice » pour l'État ? Écris-le sous la forme d'une question."]
      },
      {
        bon: "La justice distributive porte sur la répartition des richesses, des charges et des avantages entre les membres d'une communauté.",
        dit: ["Puisque cette répartition concerne à la fois des personnes et des biens, que faut-il égaliser ? Faut-il donner à tous une part égale, ou à chacun une part différente ?"],
        reponse: "Ta réponse", id: "egaliser"
      },
      {
        dit: ["Comment peux-tu définir l'égalité ?"],
        reponse: "Ta définition", id: "egaliteDef",
        motsCles: ["meme", "pareil", "identique", "equivalen", "critere", "mesure", "traite", "autant"],
        relances: ["Quand dit-on que deux choses, ou deux personnes, sont égales ?",
                   "Être égaux, est-ce recevoir la même chose, ou être mesurés selon le même critère ?"]
      },
      {
        dit: ["À quoi l'égalité s'oppose-t-elle ?"],
        reponse: "Ta réponse", id: "egaliteOppose",
        motsCles: ["inegal", "privilege", "discrimin", "injust", "hierarch", "differen"],
        relances: ["Comment appelle-t-on la situation où certains ont plus que d'autres sans raison ?"]
      },
      {
        dit: ["Peux-tu donner un exemple ?"],
        reponse: "Ton exemple", id: "egaliteEx"
      },
      {
        dit: ["Peux-tu reformuler la question avec ce nouveau sens de la justice ?"],
        reponse: "Ta reformulation", id: "p2ref",
        motsCles: ["egal", "inegal", "meme", "repart", "distribu", "corrig"],
        relances: ["Si faire la justice, c'est établir l'égalité, que se demande-t-on de l'État ?"]
      },
      {
        bon: "Selon Aristote (<em>Éthique à Nicomaque</em>, V), il serait aussi injuste d'accorder des parts égales à des personnes inégales que d'attribuer des parts inégales à des personnes égales.",
        dit: ["En considérant la définition aristotélicienne de la justice, quel sens faut-il donner à l'État ?"],
        reponse: "Ta réponse", id: "aristote",
        motsCles: ["conten", "limit", "veill", "aggrav", "propor", "repart", "corrig", "regle", "distribu", "arbitr", "equilibr"],
        relances: ["Selon Aristote, la justice consiste à répartir selon une règle : qui doit fixer cette règle et la faire respecter ?",
                   "Si les personnes sont inégales, que doit faire l'État pour que ces inégalités ne deviennent pas injustes ?"]
      },
      {
        bon: "L'égalité en droit signifie que tous sont reconnus comme sujets de droit, sans que leur naissance, leur fortune ou leur position sociale leur confèrent une dignité supérieure : les différences de situation n'autorisent pas une différence de traitement de la part de l'État."
      },
      {
        bon: "Les individus à qui s'applique cette égalité ne vivent pas sous les mêmes conditions. C'est une hypothèse que la lecture du texte de Marx va permettre de confirmer."
      },
      {
        dit: ["Lis ce texte de Marx."],
        texte: {
          corps: ["Ce droit égal est un droit inégal pour un travail inégal. Il ne reconnaît aucune distinction de classe, puisque tout homme n'est qu'un travailleur comme tous les autres, mais il reconnaît tacitement comme un privilège de nature le talent inégal des travailleurs et, par suite, l'inégalité de leurs capacités productives. C'est donc dans sa teneur un droit de l'inégalité comme tout droit. Par sa nature, le droit ne peut consister que dans l'emploi d'une mesure égale pour tous ; mais les individus inégaux (ils ne seraient pas distincts s'ils n'étaient pas inégaux) ne peuvent être mesurés à une mesure égale qu'autant qu'on les considère d'un même point de vue, qu'on les regarde sous un aspect unique et déterminé."],
          source: "Marx, <em>Critique du programme de Gotha</em>, 1875, partie I"
        }
      },
      {
        bon: B.these,
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "marxThese",
        motsCles: ["inegal", "droit egal", "mesure", "talent", "capacit"],
        relances: ["Selon Marx, un droit égal pour tous produit-il l'égalité ?"]
      },
      {
        dit: ["Pourquoi, selon Marx, une même mesure appliquée à tous produit-elle de l'inégalité ?"],
        reponse: "Ta réponse", id: "marxMesure",
        motsCles: ["talent", "capacit", "different", "distinct", "inegaux", "point de vue", "aspect"],
        relances: ["Les travailleurs ont-ils tous le même talent, les mêmes capacités ?",
                   "Sous quel aspect le droit regarde-t-il les individus, et que laisse-t-il de côté ?"]
      },
      {
        dit: ["Que reproche Marx au concept de droit ?"],
        reponse: "Ta réponse", id: "risque",
        motsCles: ["inegal", "mesure", "aspect", "point de vue", "unique", "abstrait", "talent", "capacit", "privilege", "differen"],
        relances: ["Relis cette phrase : « C'est donc dans sa teneur un droit de l'inégalité comme tout droit. » Que veut dire Marx ?",
                   "En appliquant une mesure égale à des individus inégaux, le droit fait-il disparaître leurs inégalités, ou les consacre-t-il ?"]
      },
      {
        bon: "Pour Marx, le droit et l'État sont liés à la domination d'une classe sur une autre. Dans une société sans classes, l'État serait appelé à disparaître ; Engels parle de son « dépérissement ».",
        dit: ["La contestation du droit induit-elle celle de l'État selon Marx ? Qu'en penses-tu ?"],
        reponse: "Ta réponse", id: "marxEtat",
        motsCles: ["oui", "instrument", "classe", "domin", "dispar", "deperi", "inutile", "conteste"],
        relances: ["Si le droit consacre l'inégalité, que penser de l'État qui institue ce droit ?",
                   "Selon Marx, l'État aurait-il encore une raison d'être dans une société sans classes ?"]
      },
      {
        bon: "Rawls (<em>Théorie de la justice</em>, 1971) imagine des personnes chargées de choisir les principes de leur société sans connaître la place qu'elles y occuperont : elles ignorent leur origine sociale, leur fortune et leurs aptitudes. C'est ce qu'il appelle le voile d'ignorance.",
        dit: ["Qu'est-ce que le voile d'ignorance chez Rawls ?"],
        reponse: "Ta réponse", id: "voile",
        motsCles: ["ignor", "place", "situation", "position", "principe", "choisi", "sans savoir", "sans connaitre"],
        relances: ["Que ne savent pas les personnes chargées de choisir les principes de leur société ?",
                   "Choisissent-elles ces principes en connaissant la place qu'elles occuperont dans la société ?"]
      },
      {
        dit: ["Si tu devais fixer les règles d'accès aux études sans savoir si tes parents seront riches ou pauvres, quelle règle choisirais-tu ? Pourquoi ?"],
        reponse: "Ta réponse", id: "voileEx"
      },
      {
        dit: ["Accorder une aide supplémentaire à un élève défavorisé, est-ce lui donner un privilège ?"],
        reponse: "Ta réponse", id: "aide",
        motsCles: ["non", "obstacle", "compens", "corrig", "rattrap", "desavantage", "pas"],
        relances: ["Cette aide lui donne-t-elle plus que les autres, ou lui retire-t-elle un obstacle que les autres n'ont pas ?"]
      },
      {
        bon: "Rawls formule un principe de différence : il peut y avoir des inégalités justes, à condition qu'elles soient au bénéfice des plus défavorisés.",
        dit: ["Peux-tu donner un exemple de mesure de ce type ?"],
        reponse: "Ton exemple", id: "difference",
        motsCles: ["discrimination positive", "bourse", "rep", "zep", "quota", "handicap", "aide", "compens", "allocation", "impot"],
        relances: ["Pense aux mesures prises pour les élèves en difficulté, ou pour les personnes en situation de handicap."]
      },
      {
        dit: ["Exprime la difficulté qu'il y a à concilier l'égalité en droit et les inégalités de fait."],
        reponse: "Ta réponse", id: "rawlsPont",
        motsCles: ["concili", "uniforme", "renforc", "corrig", "difficile", "contradi", "tension", "meme regle", "traite", "different"],
        relances: ["Une règle identique pour tous corrige-t-elle les inégalités de fait, ou peut-elle les renforcer ?",
                   "Et si l'on traite différemment les personnes pour corriger ces inégalités, respecte-t-on encore l'égalité en droit ?"]
      },
      {
        repere: ["Le chemin parcouru",
          "Que faut-il égaliser ? {aristote}<br>Le risque de l'égalité de droit : {risque}<br>Le voile d'ignorance : {voile}<br>Le principe de différence : {rawlsPont}"],
        dit: ["Quels obstacles y a-t-il pour l'État à faire la justice au sens de l'égalité ?"],
        reponse: "Ta conclusion", id: "cclP2",
        motsCles: ["contrain", "liberte", "libre", "demotiv", "motiv", "effort", "merite", "impose", "coerci", "autoritaire", "uniformis", "assist"],
        relances: ["Pour imposer l'égalité, que devrait faire l'État ? Qu'en serait-il alors de la liberté des individus ?",
                   "Si chacun reçoit la même part quoi qu'il fasse, que devient l'envie de faire des efforts ?"]
      },
      {
        dit: ["Que peut-on en conclure à ce niveau de la réflexion ?"],
        reponse: "Ta réponse", id: "conclNiveau",
        relances: ["Ni la légalité ni l'égalité ne suffisent à garantir la justice : que faut-il alors interroger ?"]
      },
      {
        redaction: "p2", titre: "Ta deuxième partie", modele: PARTIE2,
        consigne: "Voici ta deuxième partie, rassemblée à partir de tes réponses. Ce n'est qu'un premier jet : la dissertation est d'abord un exercice d'écriture. Réécris-la avec tes propres phrases, affine-la et corrige-la."
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Nous avons distingué deux sens de la justice : ___. Mais l'existence de lois injustes montre que ___, tandis que la persistance des inégalités de fait ___. Il faut donc préciser de quel État ___.",
        id: "t2"
      },

      /* ============ PARTIE III ============ */
      { section: "Partie III · quel État peut faire la justice ?" },
      {
        bon: "Le sujet grammatical, ici « l'État », est interrogé dans la troisième partie à l'aide d'un couple philosophique.",
        dit: ["Si c'est à l'État de faire la justice, de quel État s'agit-il ?",
              "Avec quel couple philosophique peux-tu définir l'État ?"],
        choix: [{ l: "État de fait / État de droit", bon: true }, { l: "individuel / collectif" }, { l: "subjectif / objectif" }],
        id: "couple3",
        relances: [
          "Applique ce couple à l'État : un État « {couple3} »… est-ce que cela éclaire d'où l'État tient son pouvoir ?",
          "Quand on dit « nul n'est au-dessus des lois », à qui pense-t-on aussi ? Qu'est-ce que cela distingue entre deux sortes de pouvoir ?",
          "Dans quel domaine parle-t-on de « coup d'État », de « dictature » ou de « Constitution » ? Qu'est-ce qui oppose un pouvoir pris par la force et un pouvoir reconnu ?"
        ]
      },
      {
        dit: ["Lis ce texte de Rousseau."],
        texte: {
          corps: ["Ce passage de l'état de nature à l'état civil produit dans l'homme un changement très remarquable, en substituant dans sa conduite la justice à l'instinct, et donnant à ses actions la moralité qui leur manquait auparavant. C'est alors seulement que la voix du devoir succédant à l'impulsion physique et le droit à l'appétit, l'homme, qui jusque-là n'avait regardé que lui-même, se voit forcé d'agir sur d'autres principes, et de consulter sa raison avant d'écouter ses penchants."],
          source: "Rousseau, <em>Du contrat social</em>, I, 8"
        },
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "rous8These",
        motsCles: ["passage", "etat civil", "justice", "instinct", "droit", "devoir", "change", "moralite", "raison"],
        relances: ["Selon Rousseau, que change en l'homme le passage de l'état de nature à l'état civil ?"]
      },
      {
        dit: ["Relève les termes qui caractérisent l'état de nature, et ceux qui caractérisent l'état civil."],
        champs: ["L'état de nature…", "L'état civil…"],
        id: "rous8Termes"
      },
      {
        dit: ["L'état de nature relève-t-il du fait ou du droit ? Et l'état civil ?"],
        reponse: "Ta réponse", id: "rous8FaitDroit",
        motsCles: ["fait", "droit"],
        relances: ["L'instinct, l'impulsion physique, l'appétit disent-ils ce qui se produit effectivement, ou ce qui doit être ?",
                   "La justice, le devoir, le droit disent-ils ce qui est, ou ce qui doit être ?"]
      },
      {
        repere: ["Première hypothèse", "L'État de fait."],
        bon: "Rousseau distingue l'état de nature, où les hommes vivent dispersés, solitaires et sans liaison entre eux — il relève du fait —, et l'état civil, institution politique qui organise la vie sociale par des lois communes — il relève du droit.",
        dit: ["L'État de fait, ou état de nature, peut-il faire la justice ? Que serait la nature d'une telle justice ?",
              "Rappelle-toi la position de Calliclès, en première partie."],
        reponse: "Ta réponse", id: "etatNature",
        motsCles: ["plus fort", "force", "domin", "puissan", "non", "nature"],
        relances: ["Selon Calliclès, qu'enseigne la nature sur ce qui est juste ?",
                   "Une justice fondée sur la seule force est-elle encore une justice ?"]
      },
      {
        repere: ["Seconde hypothèse", "L'État de droit."],
        dit: ["Si un État ne tient sa légitimité ni de la nature ni de la force, d'où peut-il la tenir ?"],
        reponse: "Ta réponse", id: "legitimite",
        motsCles: ["volonte", "convention", "contrat", "accord", "consent", "peuple", "citoyen", "individu"],
        relances: ["Qui doit accepter le pouvoir pour qu'il soit légitime ?",
                   "Comment appelle-t-on un accord passé entre des personnes ?"]
      },
      {
        bon: "Chez Rousseau, l'État fondé sur une convention, le contrat social, s'appelle l'état civil. Attention au glissement : ce que nous appelons l'État de droit, Rousseau le nomme l'état civil."
      },
      {
        dit: ["Lis cet autre texte de Rousseau."],
        texte: {
          corps: ["Il n'y a qu'une seule loi qui, par sa nature, exige un consentement unanime ; c'est le pacte social : car l'association civile est l'acte du monde le plus volontaire ; tout homme étant né libre et maître de lui-même, nul ne peut, sous quelque prétexte que ce puisse être, l'assujettir sans son aveu. Décider que le fils d'une esclave naît esclave, c'est décider qu'il ne naît pas homme.",
                  "Si donc, lors du pacte social, il s'y trouve des opposants, leur opposition n'invalide pas le contrat, elle empêche seulement qu'ils n'y soient compris : ce sont des étrangers parmi les citoyens. Quand l'État est institué, le consentement est dans la résidence ; habiter le territoire, c'est se soumettre à la souveraineté. Hors ce contrat primitif, la voix du plus grand nombre oblige toujours tous les autres ; c'est une suite du contrat même.",
                  "Mais on demande comment un homme peut être libre et forcé de se conformer à des volontés qui ne sont pas les siennes. Comment les opposants sont-ils libres et soumis à des lois auxquelles ils n'ont pas consenti ? Je réponds que la question est mal posée. Le citoyen consent à toutes les lois, même à celles qu'on passe malgré lui, et même à celles qui le punissent quand il ose en violer quelqu'une. La volonté constante de tous les membres de l'État est la volonté générale : c'est par elle qu'ils sont citoyens et libres."],
          source: "Rousseau, <em>Du contrat social</em>, IV, 2"
        },
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "rousThese",
        motsCles: ["consent", "unanim", "pacte", "volont", "libre", "aveu", "habit", "resid"],
        relances: ["Selon Rousseau, quelle est la seule loi qui exige le consentement de tous ?",
                   "Peut-on, selon Rousseau, soumettre un homme sans son accord ?"]
      },
      {
        dit: ["Comment s'exprime le consentement d'après Rousseau ?"],
        reponse: "Ta réponse", id: "rester",
        motsCles: ["resid", "habit", "territoire", "rest", "unanim", "pacte", "majorit", "plus grand nombre"],
        relances: ["Relis la phrase : « Quand l'État est institué, le consentement est dans… » Dans quoi ?",
                   "Celui qui pourrait partir et ne part pas, qu'exprime-t-il ?"]
      },
      {
        dit: ["Quel synonyme donnes-tu au consentement, par rapport à la force ?"],
        reponse: "Un mot", id: "consentSyn",
        motsCles: ["accord", "adhes", "assentiment", "accept", "volont", "libre", "approb", "agrement", "acquiesc"],
        relances: ["La force contraint ; le consentement, lui, que suppose-t-il de la part de celui qui obéit ?"]
      },
      {
        dit: ["Pourquoi, selon Rousseau, le pacte social exige-t-il un consentement unanime ?"],
        reponse: "Ta réponse", id: "rousPont",
        motsCles: ["libre", "maitre", "volontaire", "aveu", "assujett", "accord", "consent", "force"],
        relances: ["Relis : « tout homme étant né libre et maître de lui-même… » Que peut-on en conclure ?",
                   "Peut-on, selon Rousseau, faire entrer quelqu'un dans l'association civile sans son accord ?"]
      },
      {
        dit: ["En quoi ceci éclaire-t-il la nature de l'État ?"],
        reponse: "Ta réponse", id: "natureEtat",
        motsCles: ["convention", "volont", "consent", "association", "artifici", "institu", "contrat", "pacte", "pas naturel", "libre"],
        relances: ["L'État repose-t-il alors sur la nature, sur la force, ou sur la volonté des hommes ?"]
      },
      {
        dit: ["Mais as-tu choisi l'État dans lequel tu es né ? Tout le monde peut-il partir ? Que vaut un consentement qui n'a jamais été exprimé ?"],
        reponse: "Ta réponse", id: "rousLimite",
        relances: ["Celui qui n'a ni les moyens ni la liberté de s'établir ailleurs consent-il vraiment en restant ?"]
      },
      {
        dit: ["Rousseau se pose lui-même l'objection : comment être libre en obéissant à des lois auxquelles on n'a pas consenti ? Que répond-il ?"],
        reponse: "Ta réponse", id: "rousReponse",
        motsCles: ["volonte generale", "mal posee", "consent a toutes", "citoyen", "libre"],
        relances: ["Relis la dernière phrase du texte : par quoi les membres de l'État sont-ils citoyens et libres ?"]
      },
      {
        dit: ["Quelle est la forme de l'État la mieux à même de faire la justice ?"],
        reponse: "Ta réponse", id: "civilJustice",
        motsCles: ["droit", "civil", "volonte generale", "democrat", "republi", "contrat", "consent", "loi"],
        relances: ["Entre l'État de fait et l'État de droit, lequel peut faire la justice ?",
                   "Quel État repose sur le consentement des citoyens et sur des lois qu'ils ont eux-mêmes faites ?"]
      },
      { repere: ["Ta conclusion de la partie III", "{civilJustice}"] },
      {
        redaction: "p3", titre: "Ta troisième partie", modele: PARTIE3,
        consigne: "Voici ta troisième partie, rassemblée à partir de tes réponses. Ce n'est qu'un premier jet : la dissertation est d'abord un exercice d'écriture. Réécris-la avec tes propres phrases, affine-la et corrige-la."
      },

      /* ============ CONCLUSION ============ */
      { section: "Conclusion" },
      {
        bon: "La conclusion rappelle le chemin argumentatif en montrant les différents sens qu'a pris l'expression « faire la justice », puis les différents sens du mot « État ». Elle ne fournit pas une réponse définitive : elle montre la complexité de la question posée.",
        dit: ["À quel sujet répondais-tu ? Quelle en était la problématique ?"],
        champs: ["Le sujet", "La problématique"],
        id: "cclA"
      },
      {
        dit: ["Montre les différents sens qu'a pris l'expression « faire la justice » dans la première, la deuxième et la troisième partie."],
        champs: ["Dans la première partie", "Dans la deuxième partie", "Dans la troisième partie"],
        id: "cclB"
      },
      {
        dit: ["Montre maintenant les différents sens du mot « État » dans la première, la deuxième et la troisième partie."],
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
        redaction: "ccl", titre: "Ta conclusion", modele: CONCLUSION,
        consigne: "Voici ta conclusion, rassemblée à partir de tes réponses. Ce n'est qu'un premier jet : la dissertation est d'abord un exercice d'écriture. Réécris-la avec tes propres phrases, affine-la et corrige-la."
      }
    ]
  });
})();

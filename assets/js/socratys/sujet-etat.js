/* Sujet 3 — « Est-ce à l'État de faire la justice ? »
   Contenu : docs/SOCRATYS-METHODE.md, §5, et la leçon « L'État et la justice » (2026),
   corrigé de référence (docs/Etat_et_Justice_2026.pdf).
   Textes : « État et justice — textes » (docs/Etat_et_Justice_textes.pdf) pour Locke, Marx et
   Rousseau ; Aristote et Rawls en bulles. */
(function () {
  const B = window.SOCRATYS.BON;
  const C = window.SOCRATYS.CONSIGNES;

  /* introduction assemblée à partir des réponses de l'élève, qu'il peut ensuite modifier */
  const INTRO =
    "{amorce} Est-ce à l'État de faire la justice ? La justice peut s'entendre en deux sens, que distingue le couple {couple}. Au sens de la légalité, la justice se définit comme {defs2.0|defs.0} ; on l'oppose alors à {defs.1}. " +
    "Au sens de l'égalité, elle se définit comme {defs2.1|defs.2} ; on l'oppose alors à {defs.3}.\n\n" +
    "Se demander si c'est à l'État de faire la justice, revient à se demander s'il doit la faire comme {reform.0}, ou comme {reform.1}. " +
    "Si c'est à l'État de faire la justice au sens de la légalité, alors {probl.0}. Or {problemes.0}. " +
    "Si c'est à l'État de faire la justice au sens de l'égalité, alors {probl.1}. Or {problemes.1}.\n\n" +
    "Dans une première partie, nous nous demanderons ce qu'implique {plan.0}. Dans une deuxième partie, nous nous demanderons ce que suppose {plan.1}. " +
    "Et dans une troisième partie, nous nous demanderons {plan.2}.";

  /* deuxième et troisième parties, conclusion : même principe */
  window.SOCRATYS_SUJETS.push({
    id: "etat-justice",
    titre: "Est-ce à l'État de faire la justice ?",

    copie: [
      ["Introduction", "red_intro", INTRO],
      ["Première partie", "red_p1"],
      ["Transition", "t1"],
      ["Deuxième partie", "red_p2"],
      ["Transition", "t2"],
      ["Troisième partie", "red_p3"],
      ["Conclusion", "red_ccl"]
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
      ["Problèmes", "Or {problemes.0} — Or {problemes.1}"],
      ["Plan", "I. {plan.0} — II. {plan.1} — III. {plan.2}"],
      ["Couple de la partie III", "état de nature / état civil"]
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
        champs: ["Si c'est à l'État de faire la justice au sens de la légalité, alors {probl.0}. Or…",
                 "Si c'est à l'État de faire la justice au sens de l'égalité, alors {probl.1}. Or…"],
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
        relances: ["Si l'analyse du prédicat, faire la justice, te donne les deux premières parties, c'est celle du sujet grammatical, l'État, qui te donne la troisième : on questionne alors l'État à l'aide d'un autre couple philosophique. Tu peux par exemple questionner l'État à partir du couple état de nature / état civil : de quel État peut-on attendre la justice ?"]
      },
      {
        redaction: "intro", titre: "Ton introduction", modele: INTRO, consigne: C.reecrireIntro,
        notes: [
          ["Sujet", "Est-ce à l'État de faire la justice ?"],
          ["Ton amorce", "{amorce}"],
          ["Couple", "{couple}"],
          ["Sens de la légalité", "{defs2.0|defs.0} (opposé à {defs.1})"],
          ["Sens de l'égalité", "{defs2.1|defs.2} (opposé à {defs.3})"],
          ["Reformulation", "s'il doit la faire comme {reform.0}, ou comme {reform.1}"],
          ["Hypothèse 1", "Si c'est à l'État de faire la justice au sens de la légalité, alors {probl.0} Or {problemes.0}"],
          ["Hypothèse 2", "Si c'est à l'État de faire la justice au sens de l'égalité, alors {probl.1} Or {problemes.1}"],
          ["Plan", "I. {plan.0}<br>II. {plan.1}<br>III. {plan.2}"]
        ]
      },

      /* ============ PARTIE I ============ */
      { section: "Partie I · est-ce à l'État de faire la justice au sens de la légalité ?" },
      {
        dit: ["Première partie : est-ce à l'État de faire la justice au sens de la légalité ?",
              "Si c'est à l'État de faire la justice au sens de la légalité, qu'est-ce que cela veut dire ?"],
        reponse: "Ta réponse", id: "p1q",
        relances: ["Il faut trouver deux significations à cette hypothèse. Concentre-toi sur le mot « légalité » : que voudrait dire, pour l'État, « faire la légalité » ?",
                   "Qu'est-ce qui rend une action légale ? D'où vient ce qui la rend légale ?"]
      },
      {
        dit: ["Concentre-toi maintenant sur les deux significations que tu viens de trouver. Complète :"],
        champs: ["Si c'est à l'État de faire la justice au sens de la légalité, cela peut signifier deux choses : soit qu'il doit…",
                 "…soit qu'il doit…"],
        relances: ["Pour qu'une action puisse être légale, il faut d'abord une loi : qui l'établit ?",
                   "Quand dit-on d'une action qu'elle est légale ? L'État peut-il, lui aussi, agir de cette manière ?"],
        id: "signifP1"
      },
      {
        repere: ["Première signification", "Faire la justice au sens de la légalité, ce serait faire la loi."],
        dit: ["Partons du sens ordinaire de l'expression. Quand tu dis à un camarade qu'il veut « faire la loi », à quoi penses-tu ?"],
        reponse: "Ta réponse", id: "faireLoi",
        motsCles: ["impos", "command", "decid", "chef", "domin", "ordre", "obei", "sa loi", "autorit", "pouvoir", "dirig"],
        relances: ["Que veut obtenir des autres celui qui veut faire la loi dans un groupe ?",
                   "Celui qui fait la loi, est-ce celui qui obéit ou celui qui commande ?"]
      },
      {
        dit: ["Si l'État fait la légalité au sens de faire la loi, que doivent faire les citoyens ?"],
        reponse: "Ta réponse", id: "citoyensObeir",
        motsCles: ["obei", "soumet", "soumis", "respect", "suivre", "applique", "plier", "execut"],
        relances: ["Face à celui qui commande, quelle est la place des autres ?",
                   "Si l'État commande, que reste-t-il à faire aux citoyens devant ses lois ?"]
      },
      {
        dit: ["Cette obéissance est-elle contrainte ou volontaire ?"],
        reponse: "Ta réponse", id: "obeissance",
        relances: ["Obéit-on à la loi seulement parce qu'on craint la sanction ?",
                   "Peut-on obéir à une loi sans y être forcé ? Pour quelle raison le ferait-on ?"]
      },
      {
        repere: ["Première réfutation", "Une loi imposée par la force est-elle encore une loi juste ?"],
        dit: ["Que peut-on conclure si les individus doivent obéir par contrainte ? Qu'est-ce que cela implique pour l'État qui fait des lois ?"],
        reponse: "Ta conclusion", id: "conclContrainte",
        motsCles: ["volont", "accept", "consent", "adher", "impos", "force", "approuv", "libre"],
        relances: ["Une loi que l'on respecte seulement par peur est-elle vraiment respectée ? Que se passe-t-il quand la contrainte disparaît ?",
                   "Pour que les citoyens obéissent sans y être forcés, comment l'État doit-il faire ses lois ?"]
      },
      {
        dit: ["Avant de passer à la seconde signification, marque le passage de l'une à l'autre. Complète cette transition."],
        amorce: "Si l'État ne peut pas faire la loi en l'imposant par la force, puisque ___, ne doit-il pas plutôt ___ ?",
        relances: ["Si les lois doivent être acceptées, comment l'État lui-même doit-il agir à leur égard ? Et que doivent-elles garantir aux citoyens ?"],
        id: "tP1"
      },
      {
        repere: ["Seconde signification", "Faire la justice au sens de la légalité, ce serait agir conformément à la loi : par des lois communes, l'État garantirait à chacun la sécurité de ses droits."]
      },
      {
        bon: "Selon Locke (<em>Second Traité du gouvernement civil</em>), l'homme possède dès l'état de nature des droits fondamentaux : le droit à la vie, à la liberté et à la propriété.",
        dit: ["Pour examiner ce second sens, lis ce texte de Locke."],
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
        relances: ["Selon Locke, pourquoi l'homme quitte-t-il l'état de nature pour se soumettre à un pouvoir ?",
                   "Dans l'état de nature, la jouissance de son droit est-elle assurée ?"]
      },
      {
        dit: ["Selon Locke, quelle est la condition d'une loi juste ?"],
        reponse: "Ta réponse", id: "loiJuste",
        motsCles: ["etat", "pouvoir", "commun", "gouvernement", "civil", "societe", "souverain"],
        relances: ["Dans l'état de nature, « tous les hommes étant Rois », qui décide de ce qui est juste ?",
                   "À quel pouvoir les hommes se soumettent-ils pour que la justice ne dépende plus de chacun ?"]
      },
      {
        dit: ["Comment Locke justifie-t-il la nécessité d'un pouvoir commun ?"],
        reponse: "Ta réponse", id: "lockePont",
        motsCles: ["incertain", "assur", "invasion", "autrui", "equite", "garanti", "protege", "securite", "tranquill", "roi"],
        relances: ["Dans l'état de nature, la jouissance des droits est-elle assurée ? Pourquoi ?",
                   "Si chacun est juge de ses propres droits, que se passe-t-il en cas de désaccord ?"]
      },
      {
        dit: ["Selon Locke, que garantit l'État lorsqu'il agit conformément à des lois communes ?"],
        reponse: "Ta réponse", id: "lockeSecurite",
        motsCles: ["secur", "droit", "vie", "liberte", "propriet", "bien", "jouissance", "tranquill", "proteg", "assur"],
        relances: ["Relis la fin du texte : qu'est-ce qui est « mal assuré » dans l'état de nature ?",
                   "Que gagne chacun à vivre sous des lois communes ?"]
      },
      {
        repere: ["Seconde réfutation", "La loi faite par l'État est-elle juste pour autant ?"],
        dit: ["Est-ce parce que l'État est légitime à faire des lois que celles-ci sont nécessairement justes ?"],
        reponse: "Ta réponse", id: "legitimeJuste",
        relances: ["Est légitime ce qui est fondé en droit, c'est-à-dire reconnu comme juste. La légalité n'est que la conformité à la loi : ce qui est légal peut donc ne pas être légitime."]
      },
      {
        dit: ["Connais-tu des lois qui ont organisé l'injustice ?"],
        reponse: "Ton exemple", id: "loisInjustes",
        motsCles: ["race", "racia", "nazi", "reich", "code noir", "esclav", "segreg", "apartheid", "juif", "vichy", "non"],
        relances: ["Pense à l'esclavage dans les colonies : était-il interdit par la loi ?",
                   "Pense à l'Allemagne nazie : ses persécutions étaient-elles illégales ?"]
      },
      { repere: ["Ta seconde réfutation", "{legitimeJuste}"] },
      {
        repere: ["Le chemin parcouru",
          "Première signification, faire la loi. Ta réfutation : {conclContrainte}<br>Seconde signification, agir conformément à la loi. Ta réfutation : {legitimeJuste}"],
        dit: ["Formule maintenant la conclusion de ta première partie : au terme de l'examen de ces deux significations, est-ce à l'État de faire la justice au sens de la légalité ?"],
        reponse: "Ta conclusion", id: "cclP1",
        relances: ["Une loi imposée par la force est-elle juste ? Et une loi faite par un État légitime l'est-elle toujours ?"]
      },
      {
        redaction: "p1", titre: "Ta première partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "Est-ce à l'État de faire la justice au sens de la légalité ?", true],
          ["Ce que veut dire l'hypothèse", "{p1q}"],
          ["Significations", "soit qu'il doit {signifP1.0} ; soit qu'il doit {signifP1.1}"],
          ["Première signification : faire la loi", "au sens ordinaire : {faireLoi}<br>les citoyens : {citoyensObeir}<br>contrainte ou volonté : {obeissance}<br>réfutation : {conclContrainte}"],
          ["Transition", "{tP1}"],
          ["Seconde signification : agir conformément à la loi (Locke)", "thèse : {lockeThese}<br>la condition d'une loi juste : {loiJuste}<br>la nécessité d'un pouvoir commun : {lockePont}<br>ce que garantit l'État : {lockeSecurite}"],
          ["Seconde réfutation", "légitime, donc juste ? {legitimeJuste}<br>des lois qui ont organisé l'injustice : {loisInjustes}"],
          ["Conclusion", "{cclP1}"]
        ]
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Nous avons vu que l'État ne fait pas nécessairement la justice en faisant la loi, puisque ___. Qu'en est-il si la justice ne se définit plus comme ce qui est légal, mais comme ___ ?",
        relances: ["Si une loi peut être légale sans être juste, quel était le second sens de la justice, dans ton introduction ?"],
        id: "t1"
      },

      /* ============ PARTIE II ============ */
      { section: "Partie II · est-ce à l'État de faire la justice au sens de l'égalité ?" },
      {
        dit: ["Deuxième partie : est-ce à l'État de faire la justice au sens de l'égalité ?",
              "Si c'est à l'État de faire la justice au sens de l'égalité, qu'est-ce que cela veut dire ?"],
        reponse: "Ta réponse", id: "p2q",
        relances: ["Il faut trouver deux significations à cette hypothèse. Concentre-toi sur le mot « égalité » : en quoi des hommes peuvent-ils être égaux ?",
                   "Être égaux devant la loi, est-ce la même chose qu'avoir les mêmes conditions de vie ?"]
      },
      {
        dit: ["Concentre-toi maintenant sur les deux significations que tu viens de trouver. Complète :"],
        champs: ["Si c'est à l'État de faire la justice au sens de l'égalité, cela peut signifier deux choses : soit qu'il doit…",
                 "…soit qu'il doit…"],
        relances: ["La loi s'applique-t-elle de la même façon au riche et au pauvre ? Est-ce suffisant pour qu'ils soient égaux ?",
                   "L'État doit-il seulement traiter chacun de la même manière, ou aussi réduire les écarts de richesse et de conditions ?"],
        id: "signifP2"
      },
      {
        repere: ["Première signification", "Faire la justice au sens de l'égalité, ce serait traiter tous les citoyens de la même manière : c'est l'égalité en droit."],
        dit: ["Pourquoi peut-on soutenir que l'État fait la justice en traitant tous les citoyens de la même manière ?"],
        reponse: "Ton argument", id: "argDroit",
        relances: ["Que serait une loi qui ne s'appliquerait pas de la même façon à tous ?",
                   "Pense aux privilèges de la noblesse sous l'Ancien Régime : qu'a-t-on voulu abolir en 1789 ?"]
      },
      {
        dit: ["Examinons la validité de cette hypothèse. À un examen, tous les candidats disposent du même temps, y compris un élève dyslexique ou malvoyant. La règle est la même pour tous : est-elle juste ?"],
        reponse: "Ta réponse", id: "examen",
        relances: ["Tous les candidats partent-ils avec les mêmes chances ?"]
      },
      {
        dit: ["Et si chaque citoyen payait la même somme d'impôt, qu'il soit riche ou pauvre : serait-ce juste ?"],
        reponse: "Ta réponse", id: "impot",
        relances: ["Cette somme pèse-t-elle autant pour celui qui gagne peu que pour celui qui gagne beaucoup ?"]
      },
      {
        dit: ["Reviens maintenant à la première signification : « faire la justice au sens de l'égalité, ce serait traiter tous les citoyens de la même manière ». Que devient-elle, au regard de l'examen et de l'impôt ?",
              "Formule toi-même la réfutation."],
        reponse: "Ta réfutation", id: "refutP2a",
        relances: ["Une même règle appliquée à des personnes qui ne sont pas dans la même situation produit-elle l'égalité ?",
                   "Aristote disait qu'il serait aussi injuste de donner des parts égales à des personnes inégales que des parts inégales à des personnes égales. Qu'en conclus-tu ?"]
      },
      { repere: ["Ta première réfutation", "{refutP2a}"] },
      {
        dit: ["Avant de passer à la seconde signification, marque le passage de l'une à l'autre. Complète cette transition."],
        amorce: "Si l'égalité en droit ne suffit pas à faire la justice, puisque ___, l'État ne doit-il pas plutôt ___ ?",
        relances: ["Si une même règle laisse subsister les inégalités de situation, que devrait faire l'État de ces inégalités ?"],
        id: "tP2"
      },
      {
        repere: ["Seconde signification", "Faire la justice au sens de l'égalité, ce serait corriger les inégalités de fait : réduire les écarts de richesse et de conditions entre les citoyens."]
      },
      {
        dit: ["Pour examiner ce second sens, lis ce texte de Marx."],
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
        dit: ["Selon Marx, que faudrait-il prendre en compte pour que la justice soit réellement égale ?"],
        reponse: "Ta réponse", id: "marxFait",
        motsCles: ["inegal", "differen", "talent", "capacit", "situation", "condition", "besoin", "fait", "distinct"],
        relances: ["Relis la fin du texte : que laisse de côté le droit lorsqu'il regarde les individus « sous un aspect unique et déterminé » ?",
                   "Les individus sont-ils réellement égaux ? Que faudrait-il alors corriger ?"]
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
        dit: ["Reviens maintenant à la seconde signification : « faire la justice au sens de l'égalité, ce serait corriger les inégalités de fait ». Si l'État devait corriger toutes les inégalités de fait, que deviendraient la liberté et l'effort de chacun ?",
              "Formule toi-même la réfutation."],
        reponse: "Ta réfutation", id: "refutP2b",
        relances: ["Pour imposer l'égalité, que devrait faire l'État ? Qu'en serait-il alors de la liberté des individus ?",
                   "Si chacun reçoit la même part quoi qu'il fasse, que devient l'envie de faire des efforts ?"]
      },
      { repere: ["Ta seconde réfutation", "{refutP2b}"] },
      {
        repere: ["Le chemin parcouru",
          "Première signification, l'égalité en droit. Ta réfutation : {refutP2a}<br>Seconde signification, corriger les inégalités de fait. Ta réfutation : {refutP2b}"],
        dit: ["Formule maintenant la conclusion de ta deuxième partie : au terme de l'examen de ces deux significations, est-ce à l'État de faire la justice au sens de l'égalité ?"],
        reponse: "Ta conclusion", id: "cclP2",
        relances: ["Une même règle pour tous suffit-elle à rendre les hommes égaux ? Et l'État peut-il corriger toutes les inégalités sans menacer la liberté ?"]
      },
      {
        redaction: "p2", titre: "Ta deuxième partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "Est-ce à l'État de faire la justice au sens de l'égalité ?", true],
          ["Ce que veut dire l'hypothèse", "{p2q}"],
          ["Significations", "soit qu'il doit {signifP2.0} ; soit qu'il doit {signifP2.1}"],
          ["Première signification : l'égalité en droit", "argument : {argDroit}<br>l'examen : {examen}<br>l'impôt : {impot}<br>réfutation : {refutP2a}"],
          ["Transition", "{tP2}"],
          ["Seconde signification : corriger les inégalités de fait", "Marx, thèse : {marxThese}<br>une même mesure pour tous : {marxMesure}<br>ce qu'il faudrait prendre en compte : {marxFait}<br>Rawls, le voile d'ignorance : {voile}<br>l'accès aux études : {voileEx}<br>l'aide à l'élève défavorisé : {aide}<br>le principe de différence : {difference}"],
          ["Seconde réfutation", "{refutP2b}"],
          ["Conclusion", "{cclP2}"]
        ]
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Nous avons vu que l'État ne peut pas faire la justice au sens de l'égalité, puisque ___. Si ni la légalité ni l'égalité ne suffisent à faire la justice, ne faut-il pas plutôt se demander ___ ?",
        relances: ["Jusqu'ici, nous avons interrogé le sens de la justice. Quel autre terme du sujet reste-t-il à interroger ?"],
        id: "t2"
      },

      /* ============ PARTIE III ============ */
      { section: "Partie III · quel État peut faire la justice ?" },
      {
        dit: ["Troisième partie : quel État peut faire la justice ?",
              "La justice peut se faire soit dans l'état de nature, soit dans l'état civil. Que veut dire « état de nature » ?"],
        reponse: "Ta réponse", id: "defNature",
        relances: ["Imagine des hommes qui vivraient sans État, sans lois communes, sans police ni tribunaux : dans quelle condition seraient-ils ?",
                   "Pourquoi parle-t-on de « nature » ? Qu'est-ce qui manquerait, qui est l'œuvre des hommes ?"]
      },
      {
        dit: ["Et que veut dire « état civil » ?"],
        reponse: "Ta réponse", id: "defCivil",
        relances: ["Le mot « civil » vient du latin <em>civis</em>, le citoyen : qu'est-ce qui caractérise la vie des citoyens ?",
                   "Qu'apportent aux hommes l'État et les lois communes ?"]
      },
      {
        repere: ["Première hypothèse", "Faire la justice dans l'état de nature : sans État, chacun se ferait justice lui-même."],
        dit: ["Qu'est-ce qui prévaut dans l'état de nature ?"],
        reponse: "Ta réponse", id: "argNature",
        motsCles: ["force", "fort", "puissan", "violen", "domin", "faible"],
        relances: ["Sans lois communes, qu'est-ce qui décide de ce que chacun peut faire ?",
                   "S'il y a un conflit entre deux hommes, et qu'aucun juge ne peut trancher, lequel l'emporte ?"]
      },
      {
        dit: ["Peut-il y avoir justice dans un état où c'est le plus fort qui a raison ?"],
        reponse: "Ta réponse", id: "plusFortRaison",
        relances: ["Si le plus faible a été lésé, qui lui rendra ce qui lui est dû ?",
                   "Avoir la force de l'emporter, est-ce avoir raison ?"]
      },
      {
        dit: ["Formule maintenant une réfutation de l'idée qu'il puisse y avoir une justice dans l'état de nature."],
        reponse: "Ta réfutation", id: "refutP3a",
        relances: ["Là où c'est le plus fort qui a raison, le droit de chacun est-il respecté ?",
                   "Une justice qui dépend de la force de chacun est-elle encore une justice ?"]
      },
      { repere: ["Ta première réfutation", "{refutP3a}"] },
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
        dit: ["Comment Rousseau définit-il l'état civil ?"],
        reponse: "Ta réponse", id: "rous8Def",
        motsCles: ["justice", "devoir", "droit", "raison", "moral", "principe"],
        relances: ["Relis le texte : qu'est-ce que l'état civil substitue à l'instinct ? à l'impulsion physique ? à l'appétit ?",
                   "Dans l'état civil, l'homme écoute-t-il d'abord ses penchants, ou sa raison ?"]
      },
      {
        dit: ["Pourquoi, selon Rousseau, la justice n'apparaît-elle qu'avec l'état civil ?"],
        reponse: "Ta réponse", id: "rous8Pourquoi",
        relances: ["Relis la fin du texte : l'homme qui « n'avait regardé que lui-même », que doit-il faire désormais ?",
                   "Agir selon sa raison et en tenant compte des autres, est-ce déjà une condition de la justice ?"]
      },
      {
        dit: ["Avant de passer à la seconde hypothèse, marque le passage de l'une à l'autre. Complète cette transition."],
        amorce: "Si la justice ne peut pas se faire dans l'état de nature, puisque ___, ne faut-il pas la chercher dans ___ ?",
        relances: ["Où Rousseau situe-t-il l'apparition de la justice ?"],
        id: "tP3"
      },
      {
        repere: ["Seconde hypothèse", "Faire la justice dans l'état civil."],
        dit: ["Si l'état civil ne tient sa légitimité ni de la nature ni de la force, d'où peut-il la tenir ?"],
        reponse: "Ta réponse", id: "legitimite",
        motsCles: ["volonte", "convention", "contrat", "accord", "consent", "peuple", "citoyen", "individu"],
        relances: ["Qui doit accepter le pouvoir pour qu'il soit légitime ?",
                   "Comment appelle-t-on un accord passé entre des personnes ?"]
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
        dit: ["Pourquoi, selon Rousseau, le pacte social exige-t-il un consentement unanime ?"],
        reponse: "Ta réponse", id: "rousPont",
        motsCles: ["libre", "maitre", "volontaire", "aveu", "assujett", "accord", "consent", "force"],
        relances: ["Relis : « tout homme étant né libre et maître de lui-même… » Que peut-on en conclure ?",
                   "Peut-on, selon Rousseau, faire entrer quelqu'un dans l'association civile sans son accord ?"]
      },
      {
        dit: ["Rousseau se pose lui-même l'objection : comment être libre en obéissant à des lois auxquelles on n'a pas consenti ? Que répond-il ?"],
        reponse: "Ta réponse", id: "rousReponse",
        motsCles: ["volonte generale", "mal posee", "consent a toutes", "citoyen", "libre"],
        relances: ["Relis la dernière phrase du texte : par quoi les membres de l'État sont-ils citoyens et libres ?"]
      },
      {
        repere: ["Le chemin parcouru",
          "Première hypothèse, la justice dans l'état de nature. Ta réfutation : {refutP3a}<br>Seconde hypothèse, la justice dans l'état civil. Ce que montre Rousseau : {rous8Pourquoi}<br>Le consentement : {rousPont}"],
        dit: ["Formule maintenant la conclusion de ta troisième partie : quel État peut faire la justice ?"],
        reponse: "Ta conclusion", id: "civilJustice",
        motsCles: ["civil", "droit", "volonte generale", "democrat", "republi", "contrat", "consent", "loi"],
        relances: ["Entre l'état de nature et l'état civil, où la justice peut-elle se faire ?",
                   "Quel État repose sur le consentement des citoyens et sur des lois qu'ils ont eux-mêmes faites ?"]
      },
      {
        redaction: "p3", titre: "Ta troisième partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "Quel État peut faire la justice ?", true],
          ["L'état de nature et l'état civil", "l'état de nature : {defNature}<br>l'état civil : {defCivil}"],
          ["Première hypothèse : la justice dans l'état de nature", "ce qui y prévaut : {argNature}<br>justice là où le plus fort a raison ? {plusFortRaison}<br>réfutation : {refutP3a}"],
          ["Rousseau, l'état civil", "thèse : {rous8These}<br>définition : {rous8Def}<br>pourquoi la justice n'apparaît qu'avec lui : {rous8Pourquoi}"],
          ["Transition", "{tP3}"],
          ["Seconde hypothèse : la justice dans l'état civil", "légitimité : {legitimite}<br>Rousseau, thèse : {rousThese}<br>le consentement : {rester}<br>pourquoi l'unanimité : {rousPont}<br>l'objection et sa réponse : {rousReponse}"],
          ["Conclusion", "{civilJustice}"]
        ]
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
        redaction: "ccl", titre: "Ta conclusion", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Sujet et problématique", "{cclA.0}<br>{cclA.1}"],
          ["Faire la justice", "I. {cclB.0}<br>II. {cclB.1}<br>III. {cclB.2}"],
          ["L'État", "I. {cclC.0}<br>II. {cclC.1}<br>III. {cclC.2}"],
          ["Ce que montrent ces variations", "{cclD}"]
        ]
      }
    ]
  });
})();

/* Sujet 1 — « Le bonheur est-il une affaire de raison ? »
   Contenu : docs/SOCRATYS-METHODE.md, §3. Textes : leçon « Bonheur et raison » (2026).
   Partie III : version du document de référence (conséquence / effet). */
(function () {
  const B = window.SOCRATYS.BON;
  const C = window.SOCRATYS.CONSIGNES;

  /* introduction assemblée à partir des réponses de l'élève, qu'il réécrit ensuite */
  const INTRO =
    "{amorce} Le bonheur est-il une affaire de raison ? La raison peut s'entendre en deux sens, que distingue le couple {couple}. Du point de vue théorique, la raison se définit comme {defs2.0|defs.0} ; on l'oppose alors à {defs.1}. " +
    "Du point de vue pratique, elle se définit comme {defs2.1|defs.2} ; on l'oppose alors à {defs.3}.\n\n" +
    "Se demander si le bonheur est une affaire de raison, revient à se demander s'il est une affaire de {reform.0}, ou une affaire de {reform.1}. " +
    "Si le bonheur est une affaire de {reform.0}, alors {probl.0}. Or {problemes.0}. " +
    "Si le bonheur est une affaire de {reform.1}, alors {probl.1}. Or {problemes.1}.\n\n" +
    "Dans une première partie, nous nous demanderons ce qu'implique {plan.0}. Dans une deuxième partie, nous nous demanderons ce que suppose {plan.1}. " +
    "Et dans une troisième partie, nous nous demanderons {plan.2}.";

  window.SOCRATYS_SUJETS.push({
    id: "bonheur-raison",
    titre: "Le bonheur est-il une affaire de raison ?",

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
      ["Sujet grammatical", "le bonheur"],
      ["Prédicat", "la raison"],
      ["Couple philosophique", "{couple}"],
      ["Sens théorique", "{defs2.0|defs.0}"],
      ["Sens pratique", "{defs2.1|defs.2}"],
      ["Reformulation", "Se demander si le bonheur est une affaire de raison, revient à se demander s'il est une affaire de {reform.0}, ou une affaire de {reform.1}."],
      ["Première hypothèse", "Si le bonheur est une affaire de {reform.0}, alors {probl.0}"],
      ["Seconde hypothèse", "Si le bonheur est une affaire de {reform.1}, alors {probl.1}"],
      ["Problèmes", "Or {problemes.0} — Or {problemes.1}"],
      ["Plan", "I. {plan.0} — II. {plan.1} — III. {plan.2}"]
    ],

    etapes: [
      /* ============ INTRODUCTION ============ */
      { section: "Introduction · l'amorce" },
      {
        bon: B.amorce,
        dit: ["Commençons par l'amorce de ton introduction. Rédige-la."],
        reponse: "Ton amorce", id: "amorce",
        relances: [
          "Dans ce sujet, le bonheur est le sujet grammatical et la raison est le prédicat : la question les associe, puisqu'elle fait du bonheur une affaire de raison. Ton amorce doit donc les dissocier. Dans ta copie, n'écris pas « sujet grammatical » ni « prédicat » : nomme directement le bonheur et la raison.",
          "Dissocier, c'est séparer : cherche une opinion courante, une situation ou un exemple où le bonheur semble n'avoir rien à voir avec la raison.",
          "Pense à ce que l'on dit de l'amoureux, de l'enfant qui joue, ou de celui qui « ne se pose pas de questions » : est-ce grâce à leur raison qu'ils sont heureux ?"
        ]
      },

      { section: "Introduction · le sujet" },
      {
        bon: B.couple,
        dit: ["Avec quel couple philosophique peux-tu t'aider pour définir la raison ?"],
        choix: [{ l: "théorie / pratique", bon: true }, { l: "individuel / collectif" }, { l: "particulier / général" }],
        id: "couple",
        relances: [
          "Essaie d'appliquer ce couple au prédicat : une raison « {couple} »… est-ce que cela éclaire vraiment ce dont parle le sujet ?",
          "Dans la vie de tous les jours, quand on dit de quelqu'un qu'il « raisonne » avant d'agir, à quoi pense-t-on : à quelqu'un qui comprend, ou à quelqu'un qui se conduit bien ?",
          "Dans quels domaines parle-t-on de la raison ? Y en a-t-il un où elle connaît, et un autre où elle agit ?"
        ]
      },

      { section: "Introduction · définir et problématiser" },
      {
        dit: ["Définis maintenant la raison à partir de ce couple."],
        champs: ["Du point de vue théorique, la raison peut se définir comme…", "On l'oppose alors à…",
                 "Du point de vue pratique, la raison peut se définir comme…", "On l'oppose alors à…"],
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
        relances: ["Pars du sens ordinaire de chaque terme du couple, indépendamment de la raison : dans la vie de tous les jours, que veut dire « théorique » ? Que veut dire « pratique » ? Applique ensuite chacun de ces sens à la raison."],
        champs: ["Du point de vue théorique, la raison peut se définir comme…", "Du point de vue pratique, la raison peut se définir comme…"],
        id: "defs2"
      },
      {
        ancre: "reformulation",
        bon: B.reformulation,
        dit: ["Reformule maintenant le sujet à partir de tes deux définitions.",
              "Se demander si le bonheur est une affaire de raison, revient à se demander s'il est une affaire de… ou une affaire de…"],
        champs: ["…s'il est une affaire de", "…ou une affaire de"],
        id: "reform"
      },
      {
        dit: ["Formulons maintenant deux hypothèses, à partir de ta reformulation."],
        champs: ["Si le bonheur est une affaire de {reform.0}, alors…", "Si le bonheur est une affaire de {reform.1}, alors…"],
        id: "probl"
      },
      {
        bon: B.problematisation,
        dit: ["Ces deux hypothèses soulèvent chacune un problème. Lequel ?"],
        champs: ["Si le bonheur est une affaire de {reform.0}, alors {probl.0}. Or…", "Si le bonheur est une affaire de {reform.1}, alors {probl.1}. Or…"],
        id: "problemes"
      },
      {
        bon: "Les deux hypothèses indiquent déjà le plan : le premier problème sera traité dans la première partie, et le deuxième problème sera traité dans la deuxième partie.",
        dit: ["Annonce maintenant ton plan."],
        champs: ["Dans une première partie, nous nous demanderons ce qu'implique…",
                 "Dans une deuxième partie, nous nous demanderons ce que suppose…",
                 "Et dans une troisième partie, nous nous demanderons…"],
        id: "plan",
        relances: ["Si l'analyse du prédicat, la raison, te donne les deux premières parties, c'est celle du sujet grammatical, le bonheur, qui te donne la troisième : on questionne alors le bonheur à l'aide d'un autre couple philosophique. Tu peux par exemple questionner le bonheur à partir du couple conséquence / effet : le bonheur est-il une conséquence de la raison, ou un effet ?"]
      },
      {
        redaction: "intro", titre: "Ton introduction", modele: INTRO, consigne: C.reecrireIntro,
        notes: [
          ["Sujet", "Le bonheur est-il une affaire de raison ?"],
          ["Ton amorce", "{amorce}"],
          ["Couple", "{couple}"],
          ["Sens théorique", "{defs2.0|defs.0} (opposé à {defs.1})"],
          ["Sens pratique", "{defs2.1|defs.2} (opposé à {defs.3})"],
          ["Reformulation", "s'il est une affaire de {reform.0}, ou une affaire de {reform.1}"],
          ["Hypothèse 1", "Si le bonheur est une affaire de {reform.0}, alors {probl.0} Or {problemes.0}"],
          ["Hypothèse 2", "Si le bonheur est une affaire de {reform.1}, alors {probl.1} Or {problemes.1}"],
          ["Plan", "I. {plan.0}<br>II. {plan.1}<br>III. {plan.2}"]
        ]
      },

      /* ============ PARTIE I ============ */
      { section: "Partie I · la raison au sens théorique" },
      {
        dit: ["Première partie : le bonheur est-il une affaire de raison au sens théorique ?",
              "Si le bonheur est une affaire de raison au sens théorique, qu'est-ce que cela veut dire ?"],
        reponse: "Ta réponse", id: "p1q",
        relances: ["Il faut trouver deux significations à cette hypothèse, en te basant sur le sens du mot « théorique »."]
      },
      {
        dit: ["Concentre-toi maintenant sur les deux significations que tu viens de trouver. Complète :"],
        champs: ["Si le bonheur est une affaire de raison au sens théorique, cela peut signifier deux choses : soit que nous savons…",
                 "…soit que nous savons…"],
        id: "implic"
      },

      {
        repere: ["Première signification", "Nous savons quand nous sommes heureux."],
        dit: ["Pourquoi peut-on soutenir que nous savons quand nous sommes heureux ?"],
        reponse: "Ton argument", id: "arg1",
        motsCles: ["sent", "ressent", "sensation", "eprouv", "moi", "soi", "interieur", "plaisir"],
        relances: ["Qui est le mieux placé pour dire si tu es heureux : toi, ou quelqu'un d'autre ?",
                   "Sur quoi t'appuies-tu quand tu dis « je suis heureux » ?"]
      },
      {
        dit: ["Lis ce texte d'Aristote."],
        texte: {
          corps: ["Le vulgaire s'imagine que ses divertissements font une partie du bonheur ; parce que ceux qui jouissent du pouvoir sont les premiers à y perdre leur temps. Mais la vie de ces hommes-là ne peut guère servir d'exemple ni de preuve. La vertu et l'intellect, source unique de toutes les actions honnêtes, ne sont pas les compagnes obligées du pouvoir ; et ce n'est pas parce que ces gens-là, incapables comme ils le sont de goûter un plaisir délicat et vraiment libre, se jettent sur les plaisirs du corps, leur seul refuge, qu'ils doivent nous faire prendre ces plaisirs grossiers pour les plus désirables. Les enfants aussi croient que ce qu'ils apprécient le plus est ce qu'il y a de plus précieux au monde. Mais il est tout simple que de même que les hommes faits et les enfants donnent leur estime à des choses fort différentes, de même aussi les méchants et les bons donnent la leur à des choses toutes opposées."],
          source: "Aristote, <em>Éthique à Nicomaque</em>, X, VII"
        },
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "aristThese",
        motsCles: ["plaisir", "corps", "divertissement", "exemple", "vertu", "desirable"],
        relances: ["Selon Aristote, ceux qui ont le pouvoir peuvent-ils servir d'exemple ? Pourquoi ?",
                   "Que reproche-t-il aux plaisirs du corps ?"]
      },
      {
        dit: ["Que signifie l'exemple des enfants et des hommes faits dans ce texte ?"],
        reponse: "Ton explication", id: "arist",
        motsCles: ["tromp", "erreur", "croi", "confond", "plaisir", "corps", "precieux", "apparence", "enfant"],
        relances: ["Que prennent les enfants pour ce qu'il y a de plus précieux ?",
                   "Qu'est-ce que les enfants et les hommes de pouvoir ont en commun dans leur erreur ?"]
      },
      {
        dit: ["Que peut-on en conclure sur le plaisir ?"],
        reponse: "Ta conclusion", id: "ccl1",
        motsCles: ["apparence", "signe", "illusion", "tromp", "suffi", "pas le bonheur", "n'est pas", "ne prouve"],
        relances: ["Les enfants se trompent sur ce qui est précieux, et les hommes de pouvoir sur ce qui rend heureux : que peut-on en conclure sur le plaisir ?"]
      },
      {
        dit: ["Reviens maintenant à la première signification : « nous savons quand nous sommes heureux ». Que devient-elle après la lecture d'Aristote ?",
              "Formule toi-même la réfutation."],
        reponse: "Ta réfutation", id: "refut1",
        relances: ["Si ressentir du plaisir, ce n'est pas forcément être heureux, le plaisir que je ressens me permet-il de savoir que je suis heureux ?"]
      },
      { repere: ["Ta première réfutation", "{refut1}"] },
      {
        dit: ["Avant de passer à la seconde signification, marque le passage de l'une à l'autre. Complète cette transition."],
        amorce: "Si nous ne savons pas quand nous sommes heureux, puisque ___, savons-nous du moins ___ ?",
        relances: ["La première signification portait sur le moment où nous sommes heureux ; la seconde porte sur ce qui nous rendrait heureux. Si le plaisir ne suffit pas, qu'est-ce que nous croyons connaître de nous-mêmes, qui pourrait nous guider vers le bonheur ?"],
        id: "tAK"
      },

      {
        repere: ["Seconde signification", "Nous savons ce qui nous rend heureux : je connais mes désirs, donc je sais ce qui me rendra heureux."],
        dit: ["Quel argument soutiendrait cette hypothèse ?"],
        reponse: "Ton argument", id: "arg2"
      },
      {
        dit: ["Lis maintenant ce texte de Kant."],
        texte: {
          corps: ["Le concept de bonheur est un concept si indéterminé, que, malgré le désir qu'a tout homme d'arriver à être heureux, personne ne peut jamais dire en termes précis et cohérents ce que véritablement il désire et il veut. La raison en est que tous les éléments qui font partie du concept de bonheur sont dans leur ensemble empiriques, c'est-à-dire qu'ils doivent être empruntés à l'expérience, et que cependant, pour l'idée du bonheur, un absolu, un maximum de bien-être dans mon état présent et dans toute ma condition future est nécessaire. Or il est impossible qu'un être fini, si clairvoyant et en même temps si puissant qu'on le suppose, se fasse un concept déterminé de ce qu'il veut ici véritablement.",
                  "Veut-il la richesse ? que de soucis, que d'envie, que de pièges ne peut-il par là attirer sur sa tête ! Veut-il beaucoup de connaissances et des lumières, peut-être cela ne fera-t-il que lui donner un regard plus pénétrant pour lui représenter d'une manière d'autant plus terrible les maux qui jusqu'à présent se dérobent encore à sa vue et qui sont pourtant inévitables, ou bien que charger de plus de besoins encore ses désirs qu'il a déjà bien assez de peine à satisfaire. Veut-il longue vie ? qui lui garantit que ce ne serait pas une longue souffrance ? Veut-il du moins la santé ? que de fois l'indisposition du corps a détourné d'excès où aurait fait tomber une santé parfaite, etc. ! Bref, il est incapable de déterminer avec une entière certitude d'après quelque principe ce qui le rendrait véritablement heureux : pour cela il lui faudrait l'omniscience."],
          source: "Kant, <em>Fondements de la métaphysique des mœurs</em>, II<sup>e</sup> section"
        },
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "kantThese",
        motsCles: ["indetermin", "omniscien", "certitude", "personne ne peut", "ne peut pas"],
        relances: ["Relis la première phrase : comment Kant qualifie-t-il le concept de bonheur ?",
                   "Que faudrait-il posséder, selon la dernière phrase, pour savoir ce qui nous rendrait heureux ?"]
      },
      {
        dit: ["Prends un exemple de désir qui, selon toi, pourrait te rendre heureux. Qu'en dirait Kant ?"],
        reponse: "Ta réponse", id: "kantEx",
        relances: ["Ce désir, une fois satisfait, pourrait-il t'attirer des soucis que tu n'avais pas prévus ?"]
      },
      {
        dit: ["Reviens maintenant à la seconde signification : « nous savons ce qui nous rend heureux ». Que devient-elle après la lecture de Kant ?",
              "Formule toi-même la réfutation."],
        reponse: "Ta réfutation", id: "refut2",
        relances: ["Si le bonheur est un concept indéterminé, connaître son désir suffit-il à connaître son bonheur ?"]
      },
      {
        repere: ["Le chemin parcouru",
          "Première signification : nous savons quand nous sommes heureux. Ta réfutation : {refut1}<br>Seconde signification : nous savons ce qui nous rend heureux. Ta réfutation : {refut2}"],
        dit: ["Formule maintenant la conclusion de ta première partie : au terme de l'examen de ces deux significations, que peut-on dire du bonheur, si on le considère comme une affaire de raison au sens théorique ?"],
        reponse: "Ta conclusion", id: "cclP1",
        motsCles: ["indetermin", "ignor", "sait pas", "savons pas", "inconnu", "ne peut pas savoir", "incertain"],
        relances: ["Au terme de l'examen de ces deux significations, savons-nous quand nous sommes heureux ?",
                   "Et savons-nous ce qui peut nous y conduire ?"]
      },
      {
        redaction: "p1", titre: "Ta première partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "Le bonheur est-il une affaire de raison au sens théorique ?", true],
          ["Ce que veut dire l'hypothèse", "{p1q}"],
          ["Significations", "soit que nous savons {implic.0} ; soit que nous savons {implic.1}"],
          ["Première signification", "argument : {arg1}"],
          ["Aristote", "thèse : {aristThese}<br>les enfants et les hommes faits : {arist}<br>sur le plaisir : {ccl1}<br>réfutation : {refut1}"],
          ["Transition", "{tAK}"],
          ["Seconde signification", "argument : {arg2}"],
          ["Kant", "thèse : {kantThese}<br>ton exemple : {kantEx}<br>réfutation : {refut2}"],
          ["Conclusion", "{cclP1}"]
        ]
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce."],
        amorce: "Si le bonheur n'est pas une affaire de raison au sens ___, puisque ___, l'est-il alors au sens ___ ?",
        relances: ["Combien de sens avais-tu donnés à la raison au début de ton devoir ?",
                   "Tu as examiné l'un des deux. Lequel n'as-tu pas encore examiné ?"],
        id: "t1"
      },

      /* ============ PARTIE II ============ */
      { section: "Partie II · la raison au sens pratique" },
      {
        dit: ["Deuxième partie : le bonheur est-il une affaire de raison au sens pratique ?",
              "Si le bonheur est une affaire de raison au sens pratique, qu'est-ce que cela veut dire ?"],
        reponse: "Ta réponse", id: "p2q",
        relances: ["Concentre-toi sur le mot « pratique » : à quoi renvoie la pratique ?",
                   "Quand dit-on de quelqu'un qu'il est raisonnable dans sa conduite ? Que fait-il ?"]
      },
      {
        dit: ["Si le bonheur est une affaire de bonne action, qu'implique la bonne action ? Une action peut être dite bonne en deux sens. Complète :"],
        champs: ["Si le bonheur est une affaire de bonne action, la bonne action peut être soit ce qui…",
                 "…soit ce qui…"],
        relances: ["Pense aux deux façons de dire qu'une action est « bonne » : on le dit d'un travail réussi, et on le dit d'un geste envers autrui.",
                   "Dans le premier cas, on juge l'action à son efficacité : elle est bien faite. Dans le second, on la juge moralement : que fait-elle ?"],
        id: "bonneAction"
      },

      {
        repere: ["Première signification", "La bonne action est ce qui est bien fait : la raison pratique est alors celle dont on se sert comme d'un moyen, qui calcule les gains et les pertes."],
        bon: B.instrumentale,
        dit: ["Pourquoi peut-on soutenir que le bonheur est une affaire de raison en ce sens ?"],
        reponse: "Ton argument", id: "argInst",
        relances: ["Si je sais calculer ce que me rapporte et ce que me coûte chacune de mes actions, que puis-je espérer atteindre plus sûrement ?"]
      },
      {
        dit: ["Si la raison pratique n'est qu'un moyen pour atteindre nos fins, les moyens qu'elle choisit sont-ils forcément bons ?"],
        reponse: "Ta réponse", id: "moyensBons",
        relances: ["Peut-on choisir avec soin un moyen qui, finalement, ne mène pas là où l'on voulait aller ?"]
      },
      {
        dit: ["Donne un exemple : un moyen bien calculé, qui ne conduit pourtant pas à la fin recherchée."],
        reponse: "Ton exemple", id: "exMoyen",
        relances: ["Pense à quelqu'un qui travaille sans relâche pour gagner beaucoup d'argent, afin d'être heureux."]
      },
      {
        dit: ["Dans notre sujet, quelle est la fin recherchée ? Les moyens que calcule la raison y correspondent-ils nécessairement ?"],
        reponse: "Ta réponse", id: "finBonheur",
        relances: ["Souviens-toi de ta première partie : savons-nous ce qui nous rendrait heureux ?"]
      },
      {
        dit: ["Reviens maintenant à la première signification : « la bonne action est ce qui est bien fait ». Que devient-elle ?",
              "Formule toi-même la réfutation."],
        reponse: "Ta réfutation", id: "refutInst",
        relances: ["Si les moyens peuvent ne pas correspondre à la fin recherchée, le bonheur peut-il être l'affaire d'une raison qui calcule les moyens ?"]
      },
      { repere: ["Ta première réfutation", "{refutInst}"] },
      {
        dit: ["Lis ce texte de Kant."],
        texte: {
          corps: ["Cependant le principe du bonheur personnel est le plus condamnable, non pas seulement parce qu'il est faux et que l'expérience contredit la supposition que le bien-être se règle toujours sur le bien-faire, non pas même seulement parce qu'il ne contribue pas le moins du monde à fonder la moralité, car c'est tout autre chose de rendre un homme heureux que de le rendre bon, de le rendre prudent et perspicace pour son intérêt que de le rendre vertueux ; mais parce qu'il suppose sous la moralité des mobiles qui plutôt la minent et en ruinent toute la grandeur ; ils comprennent en effet dans une même classe les motifs qui poussent à la vertu et ceux qui poussent au vice ; ils enseignent seulement à mieux calculer ; mais ils effacent absolument la différence spécifique qu'il y a entre les deux."],
          source: "Kant, <em>Fondements de la métaphysique des mœurs</em>, II<sup>e</sup> section"
        },
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse de ce texte ?"],
        reponse: "La thèse", id: "kant2These",
        motsCles: ["condamnable", "bonheur personnel", "moralit", "bon", "vertu", "mobile"],
        relances: ["Comment Kant juge-t-il « le principe du bonheur personnel » ?",
                   "Pour quelle raison principale, selon la fin du texte ?"]
      },
      {
        dit: ["Quelle distinction Kant établit-il entre le bonheur et la moralité ?"],
        reponse: "Ta réponse", id: "kant2",
        relances: ["Que dit-il de l'expérience : le bien-être se règle-t-il toujours sur le bien-faire ?",
                   "Quelle différence ces mobiles effacent-ils, selon lui ?"]
      },
      {
        dit: ["Si la bonne action n'est pas l'action efficace, quel sens peut-elle avoir ? Relis le texte de Kant pour t'en inspirer."],
        reponse: "Ta réponse", id: "kant2Pont"
      },
      {
        dit: ["Avant de passer à la seconde signification, marque le passage de l'une à l'autre. Complète cette transition."],
        amorce: "Si le bonheur n'est pas une affaire de bonne action au sens de ce qui est bien fait, puisque ___, l'est-il au sens de ___ ?",
        relances: ["La première signification jugeait l'action à son efficacité. À quoi la seconde la juge-t-elle ?"],
        id: "tIM"
      },
      {
        repere: ["Seconde signification", "La bonne action est ce qui fait le bien : la raison pratique est alors une raison morale."]
      },
      {
        dit: ["Reviens maintenant à la seconde signification : « la bonne action est ce qui fait le bien ». Que devient-elle après la lecture de Kant ?",
              "Formule toi-même la réfutation."],
        reponse: "Ta réfutation", id: "refutMor",
        relances: ["Selon Kant, rendre un homme bon, est-ce le rendre heureux ?"]
      },
      {
        repere: ["Le chemin parcouru",
          "Première signification : la bonne action est ce qui est bien fait. Ta réfutation : {refutInst}<br>Seconde signification : la bonne action est ce qui fait le bien. Ta réfutation : {refutMor}"],
        dit: ["Formule maintenant la conclusion de ta deuxième partie : au terme de l'examen de ces deux significations, que peut-on dire du bonheur, si on le considère comme une affaire de raison au sens pratique ?"],
        reponse: "Ta conclusion", id: "cclP2",
        relances: ["Au terme de l'examen de ces deux significations, l'action efficace nous rend-elle heureux ?",
                   "Et l'action morale nous le garantit-elle ?"]
      },
      {
        redaction: "p2", titre: "Ta deuxième partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Question de la partie", "Le bonheur est-il une affaire de raison au sens pratique ?", true],
          ["Ce que veut dire l'hypothèse", "{p2q}"],
          ["La bonne action", "soit ce qui {bonneAction.0} ; soit ce qui {bonneAction.1}"],
          ["Première signification", "argument : {argInst}<br>les moyens sont-ils forcément bons : {moyensBons}<br>exemple : {exMoyen}<br>la fin recherchée : {finBonheur}<br>réfutation : {refutInst}"],
          ["Kant", "thèse : {kant2These}<br>bonheur et moralité : {kant2}"],
          ["Le sens de la bonne action", "{kant2Pont}"],
          ["Transition", "{tIM}"],
          ["Seconde signification", "réfutation : {refutMor}"],
          ["Conclusion", "{cclP2}"]
        ]
      },
      {
        dit: ["Faut-il alors renoncer au bonheur ?"],
        reponse: "Ta réponse", id: "renoncer"
      },
      {
        dit: ["Rédige maintenant ta transition en complétant cette amorce. Ne retiens que ce qui concerne le bonheur."],
        amorce: "Si le bonheur n'est une affaire de raison ni au sens ___, ni au sens ___, faut-il pour autant ___ ?",
        id: "t2"
      },

      /* ============ PARTIE III ============ */
      { section: "Partie III · conséquence ou effet" },
      {
        dit: ["Reviens au sujet grammatical que tu avais identifié en introduction.",
              "Le sujet ne demande pas si le bonheur est la raison, mais s'il est « une affaire de » raison. Quel lien cette expression établit-elle entre le bonheur et la raison ? Est-il sûr, ou seulement possible ?"],
        reponse: "Ta réponse", id: "p3q"
      },
      {
        bon: "Une conséquence est nécessairement liée à sa cause : elle en découle. Un effet, lui, est contingent — il peut se produire, ou non, sans lien nécessaire avec ce qui l'a précédé.",
        dit: ["Deux hypothèses s'offrent ici. Le bonheur est-il une affaire de raison en tant qu'il en est une conséquence nécessaire — il résulterait alors de la raison ? Ou l'est-il en tant qu'effet contingent — la raison pourrait y conduire, sans que rien ne le garantisse ?",
              "De ces deux hypothèses, quelle est la plus fragile ? Pourquoi ?"],
        reponse: "Ta réponse", id: "fragile",
        motsCles: ["consequence", "necessaire"],
        relances: ["Laquelle des deux promet le plus ? Celle qui promet le plus est-elle la plus facile à tenir ?",
                   "Souviens-toi de tes deux premières parties : le savoir te donnait-il le bonheur ? l'action te le garantissait-elle ?"]
      },
      {
        repere: ["Première hypothèse", "Le bonheur serait une conséquence nécessaire de la raison."],
        bon: "Est nécessaire ce qui est universellement valable. Est contingent ce qui est accidentel.",
        dit: ["Pourquoi ne peut-on affirmer que le bonheur soit une conséquence nécessaire de la raison ?"],
        reponse: "Ta réponse", id: "necess",
        relances: ["Pour qu'un lien soit nécessaire, combien de cas doit-il couvrir ?",
                   "Un seul contre-exemple suffirait-il à ruiner cette nécessité ? En connais-tu un dans ce que tu as déjà établi ?"]
      },
      {
        dit: ["Quels sont les arguments qui permettent d'écarter cette hypothèse ?"],
        reponse: "Tes arguments", id: "ecarter",
        relances: ["Reviens à ta première partie : qu'as-tu établi sur la raison théorique ?",
                   "Et sur la raison pratique, dans ta deuxième partie ?"]
      },
      {
        bon: "Un acte peut être qualifié de bon à partir des effets bénéfiques qu'il cause — les plaisirs — ou des effets nuisibles qu'il éloigne. Cette idée, qu'on appelle l'utilitarisme, soutient que les bonnes actions peuvent être évaluées selon le degré de plaisir qu'elles apportent et selon le nombre de personnes qui en profitent. C'est la thèse du philosophe Jeremy Bentham, dans son <em>Introduction aux principes de la morale et de la législation</em>.",
        dit: ["Comment qualifierais-tu une telle raison, qui calculerait les plaisirs à rechercher et les peines à éviter ?"],
        reponse: "Ta réponse", id: "calcul",
        relances: ["Que fait cette raison, exactement ? Elle connaît ? Elle décide ? Ou elle compte ?",
                   "Est-ce encore la raison théorique, qui cherche le vrai ? La raison pratique, qui cherche le bien ? Ou une troisième chose ?"]
      },
      {
        dit: ["Quelles seraient les limites d'une telle raison, et d'une telle conception du bonheur ?"],
        reponse: "Ta réponse", id: "limites",
        motsCles: ["minorit", "autres", "sacrifi", "detriment", "exclu", "nombre", "dixieme", "certains"],
        relances: ["Si l'on compte le nombre de personnes qui profitent d'un acte, que deviennent celles qui n'en profitent pas ?",
                   "Un acte qui rend heureux neuf personnes sur dix est-il un bon acte ? Et pour la dixième ?"]
      },
      { repere: ["Ce que tu as établi sur la première hypothèse", "{necess}<br>Les limites du calcul : {limites}"] },
      {
        repere: ["Seconde hypothèse", "Le bonheur serait un effet contingent de la raison."],
        dit: ["En quel sens peut-on dire du bonheur qu'il est un effet de la raison ?"],
        reponse: "Ta réponse", id: "effet"
      },
      {
        dit: ["Lis ce texte de Descartes."],
        texte: {
          corps: ["Ma seconde maxime était d'être le plus ferme et le plus résolu en mes actions que je pourrais, et de ne suivre pas moins constamment les opinions les plus douteuses, lorsque je m'y serais une fois déterminé, que si elles eussent été très assurées. Imitant en ceci les voyageurs qui, se trouvant égarés en quelque forêt, ne doivent pas errer en tournoyant tantôt d'un côté tantôt d'un autre, ni encore moins s'arrêter en une place, mais marcher toujours le plus droit qu'ils peuvent vers un même côté, et ne le changer point pour de faibles raisons, encore que ce n'ait peut-être été au commencement que le hasard seul qui les ait déterminés à le choisir : car, par ce moyen, s'ils ne vont justement où ils désirent, ils arriveront au moins à la fin quelque part où vraisemblablement ils seront mieux que dans le milieu d'une forêt. Et ainsi, les actions de la vie ne souffrant souvent aucun délai, c'est une vérité très certaine que, lorsqu'il n'est pas en notre pouvoir de discerner les plus vraies opinions, nous devons suivre les plus probables."],
          source: "Descartes, <em>Discours de la méthode</em>, III<sup>e</sup> partie"
        },
        bon: B.these
      },
      {
        dit: ["Quelle est la thèse principale de ce texte ?"],
        reponse: "La thèse", id: "these",
        motsCles: ["probable", "ferme", "resolu", "tenir", "choisir", "direction", "delai"],
        relances: ["Que recommande Descartes au voyageur égaré ?",
                   "Que faut-il faire, selon lui, quand on n'a pas de certitude ?"]
      },
      {
        dit: ["Que nous dit cette thèse de l'usage de la raison ?"],
        reponse: "Ta réponse", id: "usage"
      },
      {
        dit: ["Que symbolise la sortie de la forêt ?"],
        reponse: "Ta réponse", id: "foret",
        relances: ["Le voyageur sait-il où il arrivera ?",
                   "Y arrive-t-il par la connaissance du chemin, ou par la constance ?"]
      },
      {
        dit: ["Quelle forme de raison est en usage ici ?"],
        reponse: "Ta réponse", id: "formeraison",
        motsCles: ["pratique", "prudence", "prudent", "decid", "agir", "action"],
        relances: ["Le voyageur cherche-t-il à savoir quel est le bon chemin, ou à en suivre un ?",
                   "Descartes recommande-t-il de connaître, ou de se déterminer ?"]
      },
      {
        dit: ["Que peux-tu conclure de ce texte, pour ta troisième partie ?"],
        reponse: "Ta conclusion", id: "ccl3",
        relances: ["Le bonheur est-il ici la conséquence certaine d'un savoir, ou l'effet espéré d'une conduite ferme ?"]
      },
      { repere: ["Ta conclusion de la partie III", "{ccl3}"] },
      {
        redaction: "p3", titre: "Ta troisième partie", brouillon: true, consigne: C.reecrire,
        notes: [
          ["Le lien entre bonheur et raison", "{p3q}"],
          ["L'hypothèse la plus fragile", "{fragile}"],
          ["Conséquence nécessaire", "{necess}<br>arguments pour l'écarter : {ecarter}"],
          ["Le calcul des plaisirs (Bentham)", "{calcul}<br>limites : {limites}"],
          ["Effet contingent", "{effet}"],
          ["Descartes", "thèse : {these}<br>usage de la raison : {usage}<br>la sortie de la forêt : {foret}<br>forme de raison : {formeraison}"],
          ["Conclusion", "{ccl3}"]
        ]
      },

      /* ============ CONCLUSION ============ */
      { section: "Conclusion" },
      {
        bon: "La conclusion rappelle le chemin argumentatif en montrant les différents sens qu'a pris le mot « raison », puis les différents sens du mot « bonheur ». Elle ne fournit pas une réponse définitive : elle montre la complexité de la question posée.",
        dit: ["À quel sujet répondais-tu ? Quelle en était la problématique ?"],
        champs: ["Le sujet", "La problématique"],
        id: "cclA"
      },
      {
        dit: ["Montre les différents sens qu'a pris le mot « raison » dans la première, la deuxième et la troisième partie."],
        champs: ["Dans la première partie", "Dans la deuxième partie", "Dans la troisième partie"],
        id: "cclB"
      },
      {
        dit: ["Montre maintenant les différents sens du mot « bonheur » dans la première, la deuxième et la troisième partie."],
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
          ["La raison", "I. {cclB.0}<br>II. {cclB.1}<br>III. {cclB.2}"],
          ["Le bonheur", "I. {cclC.0}<br>II. {cclC.1}<br>III. {cclC.2}"],
          ["Ce que montrent ces variations", "{cclD}"]
        ]
      }
    ]
  });
})();

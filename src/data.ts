import { Product, Review, Story } from './types';

export const BOUTIQUE_PRODUCTS: Product[] = [
  // CATEGORY: habits (Clothes)
  {
    id: 'prod-habit-1',
    name: 'T-shirt Oversize Streetwear "Strollo Club"',
    category: 'habits',
    price: 18000,
    originalPrice: 25000,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    tag: 'Meilleure Vente',
    description: 'Une coupe boxy moderne avec un coton lourd de 240g/m² d’une qualité exceptionnelle. Broderie fine signature de "Strollo Club" sur la poitrine et imprimé dos haute définition d’inspiration streetwear tokyoïte.',
    ingredientsOrDetails: [
      '100% Coton premium ultra épais 240g/m²',
      'Coupe oversize tombante d’un grand raffinement',
      'Col rond côtelé robuste anti-déformation',
      'Broderie et sérigraphie de qualité supérieure résistantes aux lavages',
      'Coloris Blanc Crème Vintage et Noir Charbon disponibles'
    ],
    usageTips: 'Associez cet oversize d’exception à un pantalon cargo ou un denim large pour parfaire votre silhouette streetwear.'
  },
  {
    id: 'prod-habit-2',
    name: 'Hoodie Heavyweight "Signature Silhouette"',
    category: 'habits',
    price: 28000,
    rating: 5.0,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    tag: 'Chaud',
    description: 'Le sweat à capuche ultime pour affronter les soirées fraîches avec élégance. Confectionné dans un molleton de coton brossé ultra confortable et épais de 400g/m².',
    ingredientsOrDetails: [
      'Molleton brossé intérieur très doux',
      'Capuche doublée sans cordon pour un esthétisme épuré',
      'Poche kangourou renforcée aux extrémités',
      'Bords-côtes élastiques ajustés'
    ],
    usageTips: 'Laver retourné à 30°C pour conserver toute la douceur du molleton brossé intérieur.'
  },
  {
    id: 'prod-habit-3',
    name: 'Pantalon Cargo Technique "Tactical Olive"',
    category: 'habits',
    price: 26000,
    originalPrice: 35000,
    rating: 4.8,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=600&auto=format&fit=crop',
    tag: 'Incontournable',
    description: 'Un équilibre parfait entre utilitaire et mode urbaine. Doté de multiples poches plaquées magnifiquement intégrées et de lanières ajustables à la cheville pour un look personnalisé.',
    ingredientsOrDetails: [
      'Toile ripstop résistante aux accrocs',
      '6 poches cargo zippées et boutonnées',
      'Sangles de cheville interchangeables et réglables',
      'Coloris Vert Olive Premium'
    ],
    usageTips: 'Réglez les lanières du bas pour un style resserré au-dessus de vos baskets favorites.'
  },
  {
    id: 'prod-habit-4',
    name: 'Veste Varsity Retro "Strollo Athletics"',
    category: 'habits',
    price: 45000,
    rating: 4.9,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=600&auto=format&fit=crop',
    tag: 'Prestige',
    description: 'Inspirée de la culture athlétique des universités américaines. Broderies volumineuses chenille exclusives sur le devant et les manches en cuir synthétique souple de qualité.',
    ingredientsOrDetails: [
      'Corps en laine mélangée chaude et dense',
      'Manches contrastées en cuir synthétique de premier choix',
      'Boutons pressions métalliques gravés',
      'Écussons chenille bouclés "S" style varsity'
    ],
    usageTips: 'Nettoyage à sec professionnel conseillé pour préserver l’élasticité des broderies laineuses.'
  },

  // CATEGORY: chaussures (Shoes)
  {
    id: 'prod-shoe-1',
    name: 'Air Jordan Retro Crimson Red',
    category: 'chaussures',
    price: 95000,
    originalPrice: 110000,
    rating: 5.0,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    tag: 'Meilleure Vente',
    description: 'Une icône indémodable du streetwear. Alliant une empeigne en cuir haut de gamme blanc et noir avec de magnifiques accents rouge cramoisi agressifs. Sa semelle à amorti Air-sole vous garantit un confort exceptionnel et un style légendaire au quotidien.',
    ingredientsOrDetails: [
      'Cuir véritable de première qualité et renforts synthétiques',
      'Unité Air-Sole intégrée au talon pour un amorti léger',
      'Colorway exclusif Rouge Feu, Noir Intense et Blanc Pur',
      'Semelle extérieure en caoutchouc hautement résistante'
    ],
    usageTips: 'Parfait pour rehausser un jean cargo noir. Nettoyez régulièrement avec un chiffon doux humide pour préserver l’éclat.'
  },
  {
    id: 'prod-shoe-2',
    name: 'Sneaker Dunk Low Classic Shade',
    category: 'chaussures',
    price: 85000,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop',
    tag: 'Tendance',
    description: 'Minimaliste et ultra polyvalente, la Dunk Low s’habille de cuir souple de qualité supérieure offrant un chaussant doux qui s’ajuste idéalement. Un must-have incontournable pour votre garde-robe streetwear urbaine.',
    ingredientsOrDetails: [
      'Empeigne en cuir de qualité supérieure qui s’assouplit parfaitement',
      'Col bas rembourré élégant et confortable',
      'Semelle intercalaire en mousse pour un amorti réactif et léger'
    ],
    usageTips: 'Associez-le à des chaussettes de sport blanches STROLLO.'
  },
  {
    id: 'prod-shoe-3',
    name: 'Air Force 1 Triple White Premium',
    category: 'chaussures',
    price: 75000,
    originalPrice: 85000,
    rating: 5.0,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
    tag: 'Légende',
    description: 'L’élégance intemporelle par excellence. Un cuir tout blanc d’une netteté absolue qui donne un éclat impeccable à n’importe quelle tenue de ville ou de soirée.',
    ingredientsOrDetails: [
      'Cuir pleine fleur d’une blancheur éclatante',
      'Amorti Nike Air encapsulé pour le confort au quotidien',
      'Semelle en caoutchouc non marquant à haute adhérence'
    ],
    usageTips: 'Évitez la pluie et imperméabilisez dès l’achat pour préserver la blancheur divine.'
  },
  {
    id: 'prod-shoe-4',
    name: 'Yeezy Boost 350 V2 Onyx',
    category: 'chaussures',
    price: 125000,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop',
    tag: 'Édition Limitée',
    description: 'La quintessence du confort moderne. Sa tige Primeknit tricotée épouse fidèlement les courbes de votre pied tandis que la mythique semelle Boost restitue l’énergie.',
    ingredientsOrDetails: [
      'Tige de technologie Primeknit respirante et enveloppante',
      'Semelle intermédiaire Boost révolutionnaire sur toute la longueur',
      'Finition premium noir mat texturé légendaire'
    ],
    usageTips: 'Lavage délicat en machine dans un sac protecteur ou nettoyage express à la main.'
  },
  {
    id: 'prod-shoe-5',
    name: 'Crocs Classic Clog Red Crimson',
    category: 'chaussures',
    price: 35000,
    originalPrice: 42000,
    rating: 4.8,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1619521062002-e1d17d64bc9b?q=80&w=600&auto=format&fit=crop',
    tag: 'Ultra Confort',
    description: 'Faites l’expérience du confort absolu. Légères, résistantes à l’eau et incroyablement aérées. Coloris rouge vif exclusif.',
    ingredientsOrDetails: [
      'Conception moulée en Croslite™ pour un amorti signature',
      'Résistant à l’eau et flottant, ne pèse que quelques grammes',
      'Bride pivotante au talon pour un ajustement parfaitement sécurisé'
    ],
    usageTips: 'Idéal pour vos sorties décontractées ou vos moments de détente.'
  },
  {
    id: 'prod-shoe-6',
    name: 'Sandales Confort Arizona Cork',
    category: 'chaussures',
    price: 45000,
    rating: 4.7,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop',
    tag: 'Premium Sandal',
    description: 'Une sandale orthopédique d’un chic absolu. Fabriquée à partir de cuir de liège naturel et dotée de deux brides ajustables à boucles métalliques.',
    ingredientsOrDetails: [
      'Lit de pied anatomique en liège et latex naturel',
      'Revêtement de semelle en velours ultra-doux respirant',
      'Brides en nubuck synthétique durable'
    ],
    usageTips: 'Laissez sécher à l’air libre loin de toute source directe de chaleur.'
  },

  // CATEGORY: sacs (Bags)
  {
    id: 'prod-sac-1',
    name: 'Sac à Dos "Strollo Nomad Pro"',
    category: 'sacs',
    price: 32000,
    originalPrice: 45000,
    rating: 4.9,
    reviewsCount: 57,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
    tag: 'Nouveau',
    description: 'Le sac technique ultime pour emporter votre ordinateur, vos sneakers de change et toutes vos affaires. Conçu en nylon Cordura balistique imperméable et hautement résistant.',
    ingredientsOrDetails: [
      'Nylon Cordura 1000D imperméabilisé de niveau militaire',
      'Compartiment renforcé pour ordinateur portable jusqu’à 16 pouces',
      'Fermetures à glissière étanches YKK auto-bloquantes',
      'Bretelles ergonomiques matelassées anti-transpiration'
    ],
    usageTips: 'Idéal pour les trajets urbains quotidiens ou les voyages de courte durée.'
  },
  {
    id: 'prod-sac-2',
    name: 'Sac Banane Imper "Sport Luxe"',
    category: 'sacs',
    price: 15000,
    rating: 4.7,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop',
    tag: 'Pratique',
    description: 'Une sacoche ventrale élégante et de profil ultra plat. Parfaite pour sécuriser vos clés, votre téléphone et vos cartes de crédit avec élégance.',
    ingredientsOrDetails: [
      'Tissu TPU étanche et ultra léger',
      'Sangle bandoulière jacquard marquée ajustable',
      'Poche arrière secrète anti-vol'
    ],
    usageTips: 'À porter en diagonale sur la poitrine pour une allure résolument moderne.'
  },
  {
    id: 'prod-sac-3',
    name: 'Tote Bag Canvas "Heavyweight Cotton"',
    category: 'sacs',
    price: 9000,
    rating: 4.8,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    tag: 'Éco-Responsable',
    description: 'Un sac d’emplettes décontracté mais extrêmement solide. Toile de canevas ultra épaisse conçue pour durer plusieurs décennies sans aucune faiblesse.',
    ingredientsOrDetails: [
      'Canevas de coton biologique certifié de 16oz',
      'Coutures d’arrêt renforcées en point de croix sur les anses',
      'Grande capacité à fond plat'
    ],
    usageTips: 'Lavable en machine à froid pour préserver la couleur écrue naturelle du fil.'
  },

  // CATEGORY: lunettes (Glasses)
  {
    id: 'prod-lun-1',
    name: 'Lunettes de Soleil "Cyber Vision" Noires',
    category: 'lunettes',
    price: 19000,
    originalPrice: 28000,
    rating: 4.8,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
    tag: 'Tendance',
    description: 'Des lunettes futuristes aux lignes anguleuses affirmées. Équipées de verres polarisés de catégorie 3 pour une protection totale contre les reflets violents de la lumière.',
    ingredientsOrDetails: [
      'Monture légère en acétate recyclé ultra résistant',
      'Verres TAC polarisés protection UVA/UVB à 100%',
      'Charnières métalliques flexibles à double vis',
      'Finition noire mate brillante haut de gamme'
    ],
    usageTips: 'Essuyez exclusivement avec l’étui chamoisine inclus pour éviter toute micro-rayure.'
  },
  {
    id: 'prod-lun-2',
    name: 'Lunettes Retro "Tortoise Square"',
    category: 'lunettes',
    price: 17500,
    rating: 4.6,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop',
    tag: 'Classic',
    description: 'Le charme vintage intemporel de la monture écaille de tortue. Une forme carrée biseautée qui sublime toutes les formes de visage avec beaucoup de caractère.',
    ingredientsOrDetails: [
      'Acétate d’un motif écaille de tortue traditionnel',
      'Verres teintés ambre chaud reposant pour les yeux',
      'Détails en rivets métalliques dorés décoratifs'
    ],
    usageTips: 'Sublime vos tenues formelles de bureau ou vos looks estivaux en bord de piscine.'
  },

  // CATEGORY: montres (Watches)
  {
    id: 'prod-mon-1',
    name: 'Montre Chronographe "Strollo Precision"',
    category: 'montres',
    price: 58000,
    originalPrice: 75000,
    rating: 4.9,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop',
    tag: 'Prestige',
    description: 'Un garde-temps de haute précision mêlant un boîtier en acier inoxydable poli et un mouvement chronographe à quartz ultra-fiable d’origine nippone.',
    ingredientsOrDetails: [
      'Boîtier robuste en acier inoxydable chirurgical 316L',
      'Mouvement à quartz japonais de grande précision avec dateur',
      'Verre en cristal minéral résistant aux éraflures',
      'Étanchéité atmosphérique testée à 5 ATM (50 mètres)'
    ],
    usageTips: 'Le bracelet dispose de maillons amovibles pour l’ajuster idéalement à la taille de votre poignet.'
  },
  {
    id: 'prod-mon-2',
    name: 'Montre Concept Mini "Minimalist Blackout"',
    category: 'montres',
    price: 38000,
    rating: 4.7,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=600&auto=format&fit=crop',
    tag: 'Design',
    description: 'L’élégance absolue de l’épuration stylistique. Tout de noir vêtu, ce modèle dépourvu de chiffres impose une lecture fluide et artistique de l’heure.',
    ingredientsOrDetails: [
      'Finition noire ionisée mate satinée',
      'Bracelet en cuir véritable noir surpiqué ton sur ton',
      'Aiguilles fines contrastées grises'
    ],
    usageTips: 'Un modèle iconique à porter avec une veste de costume ou un superbe t-shirt noir sobre.'
  },

  // CATEGORY: bijoux (Jewelry)
  {
    id: 'prod-bij-1',
    name: 'Collier Chaîne Cuban Link Argent 925',
    category: 'bijoux',
    price: 40000,
    originalPrice: 55000,
    rating: 5.0,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    tag: 'Luxe',
    description: 'Une magnifique chaîne maille cubaine plate d’un poids équilibré. Fabriquée en véritable argent massif et polie à la main pour obtenir un éclat métallique d’exception.',
    ingredientsOrDetails: [
      'Argent massif certifié titré 925/1000',
      'Mailles cubaines soudées de 6mm de largeur',
      'Fermoir mousqueton sécurisé à haute durabilité',
      'Traitement rhodié anti-ternissement'
    ],
    usageTips: 'Utilisez la lingette chamoisine pour conserver tout l’éclat de l’argent poli.'
  },
  {
    id: 'prod-bij-2',
    name: 'Bracelet Perles de Lave & Hématite',
    category: 'bijoux',
    price: 12000,
    rating: 4.6,
    reviewsCount: 114,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
    tag: 'Zen',
    description: 'Alliant la rugosité naturelle de la pierre de lave volcanique noire à l’éclat poli réflecteur de l’hématite. Monté sur un cordon élastique ultra robuste.',
    ingredientsOrDetails: [
      'Perles de pierre de lave naturelles poreuses et authentiques',
      'Séparateurs en pierre d’hématite couleur canon de fusil',
      'Élastique extensible de haute longévité mécanique'
    ],
    usageTips: 'Vous pouvez appliquer une micro-goutte d’huile essentielle sur les pierres poreuses pour un parfum continu.'
  },

  // CATEGORY: accessoires (Accessories)
  {
    id: 'prod-acc-1',
    name: 'Kit Nettoyant Sneakers Premium Shield',
    category: 'accessoires',
    price: 15000,
    originalPrice: 20000,
    rating: 4.9,
    reviewsCount: 256,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    tag: 'Essentiel',
    description: 'Gardez vos sneakers dans un état impeccable. Ce kit de niveau professionnel contient une solution de nettoyage ultra-active formulée à base d’ingrédients biodégradables.',
    ingredientsOrDetails: [
      'Solution de nettoyage nettoyante active de 118ml (jusqu’à 100 lavages)',
      'Brosse en bois naturel avec poils de porcs authentiques',
      'Chiffon de séchage microfibre ultra absorbant',
      'Formule 98.3% naturelle et respectueuse de l’environnement'
    ],
    usageTips: 'Humidifiez la brosse, appliquez quelques gouttes de solution, brossez doucement en formant des mouvements circulaires.'
  },
  {
    id: 'prod-acc-2',
    name: 'Lot de 3 Chaussettes Arch Support',
    category: 'accessoires',
    price: 9500,
    rating: 4.8,
    reviewsCount: 147,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    tag: 'Confort',
    description: 'Soutien de la voûte plantaire ciblé et rembourrage épais là où vous en avez le plus besoin. Maille d’aération intégrée.',
    ingredientsOrDetails: [
      'Mélange premium coton peigné, nylon de haute qualité et élasthanne',
      'Structure de serrage élastique pour maintenir la cheville'
    ],
    usageTips: 'Lavage à l’envers à 30 degrés pour conserver le moelleux.'
  },

  // CATEGORY: casquettes (Caps)
  {
    id: 'prod-cas-1',
    name: 'Casquette Dad Hat "Strollo Club" Brodée',
    category: 'casquettes',
    price: 12000,
    originalPrice: 18000,
    rating: 4.8,
    reviewsCount: 172,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
    tag: 'Meilleur Look',
    description: 'Une casquette classique non structurée à profil bas. Visière pré-courbée magnifique avec boucle métallique réglable de style laiton vieilli à l’arrière.',
    ingredientsOrDetails: [
      '100% Coton sergé souple et ultra respirant',
      'Broderie de précision reliefée sur le devant de la casquette',
      'Sangle de serrage arrière réglable avec fermoir métallique dissimulable'
    ],
    usageTips: 'S’accorde divinement bien avec une coupe de cheveux décontractée et de belles lunettes de soleil.'
  },
  {
    id: 'prod-cas-2',
    name: 'Casquette Trucker Retro "Mesh Grey"',
    category: 'casquettes',
    price: 11000,
    rating: 4.5,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=600&auto=format&fit=crop',
    tag: 'Nostalgie',
    description: 'Inspirée du look routier vintage américain des années 90. Filet de mesh robuste à l’arrière apportant une aération incomparable sous le climat tropical.',
    ingredientsOrDetails: [
      'Panneau frontal en mousse coton structuré blanc cassé',
      'Filet de mesh élastique gris lourd de haute respirabilité',
      'Fermeture classique ajustable par picots crantés'
    ],
    usageTips: 'Parfait pour donner instantanément un esprit vintage à vos t-shirts streetwear amples.'
  },

  // CATEGORY: portefeuilles (Wallets)
  {
    id: 'prod-por-1',
    name: 'Portefeuille Compact en Cuir Véritable',
    category: 'portefeuilles',
    price: 16000,
    originalPrice: 24000,
    rating: 4.9,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop',
    tag: 'Artisanal',
    description: 'Un magnifique cuir de vachette tanné végétal qui révélera une patine sublime au fil du temps. Rangez vos billets de banque et jusqu’à 8 cartes en toute sécurité.',
    ingredientsOrDetails: [
      '100% Cuir de vachette tanné végétal aniline premium',
      'Coutures sellier cirées très épaisses indéchirables',
      'Bloqueur d’ondes RFID intégré pour empêcher le piratage',
      'Dimensions compactes idéales pour la poche avant du pantalon'
    ],
    usageTips: 'Hydratez occasionnellement le cuir avec un baume spécial pour préserver sa douceur originelle.'
  },
  {
    id: 'prod-por-2',
    name: 'Porte-cartes Ultra "Carbon Minimalist"',
    category: 'portefeuilles',
    price: 14000,
    rating: 4.8,
    reviewsCount: 75,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop',
    tag: 'Futuriste',
    description: 'Fini le portefeuille encombrant. Ce boîtier usiné en fibre de carbone tressée aéronautique maintient fermement vos cartes de crédit habituelles.',
    ingredientsOrDetails: [
      'Plaques en authentique fibre de carbone 3K tressée',
      'Pince à billets en acier trempé élastique au dos',
      'Mécanisme d’éjection de cartes rapide et ergonomique'
    ],
    usageTips: 'Tirez de façon latérale sur la glissière pour déplier instantanément vos cartes en éventail.'
  },

  // CATEGORY: autres (Others)
  {
    id: 'prod-aut-1',
    name: 'Gourde Isotherme Noir Mat "Hydrate"',
    category: 'autres',
    price: 15000,
    originalPrice: 22000,
    rating: 4.9,
    reviewsCount: 168,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop',
    tag: 'Zéro Plastique',
    description: 'Gourde thermique d’une élégance absolue. Conserve vos boissons glacées pendant 24 heures complètes ou chaudes durant 12 heures, sans aucune altération du goût.',
    ingredientsOrDetails: [
      'Double paroi isolante en acier inoxydable sous vide',
      'Finition sablée poudre anti-rayures noire mate',
      'Bouchon étanche en bambou certifié et joint silicone de qualité',
      'Totalement exempt de BPA et produits chimiques nocifs'
    ],
    usageTips: 'Lavage manuel à l’eau savonneuse chaude avec un goupillon doux.'
  },
  {
    id: 'prod-aut-2',
    name: 'Mini Enceinte Bluetooth "Strollo Sound Pro"',
    category: 'autres',
    price: 25000,
    rating: 4.7,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop',
    tag: 'Nomade',
    description: 'Une enceinte de poche étanche d’un son stéréophonique surprenant de clarté. Batterie longue durée pour diffuser votre playlist sneakers préférée partout.',
    ingredientsOrDetails: [
      'Haut-parleur de précision actif de 5 Watts avec radiateur passif pour les basses',
      'Certifié étanche aux projections de poussière et d’eau IPX6',
      'Autonomie accumulée jusqu’à 10 heures à volume modéré'
    ],
    usageTips: 'Suspendez-la à votre sac à dos Nomad à l’aide du mousqueton d’acier inclus.'
  }
];

export const CLIENT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aziz O.',
    rating: 5,
    date: '10 juin 2026',
    comment: 'Superbe boutique située à KARPALA ! J’ai acheté l’Air Jordan Crimson Red et la qualité est juste irréprochable. L’équipe m’a accueilli très chaleureusement près de la clinique KASSAM. Je recommande fort !',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Mariam S.',
    rating: 5,
    date: '4 juin 2026',
    comment: 'Les Crocs classiques en rouge crépuscule sont incroyablement confortables. Commande passée par Whatsapp (64.28.47.73), livraison super rapide à Ouagadougou. Service impeccable !',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Inoussa T.',
    rating: 5,
    date: '27 mai 2026',
    comment: 'Le kit de nettoyage est magique pour mes sneakers blanches. STROLLO Sneakers est la meilleure adresse à Karpala pour trouver des paires stylées originales.',
    verified: true
  }
];

export const BOUTIQUE_STORIES: Story[] = [
  {
    id: 'story-karpala',
    title: 'La Boutique',
    coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    slides: [
      {
        title: 'STROLLO Store',
        description: 'Bienvenue dans notre univers à Karpala près de la Clinique Kassam. Un lieu dédié aux passionnés d’accessoires et d’habillement exclusifs.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Sélection Exclusive',
        description: 'Nous sélectionnons avec une rigueur absolue chaque pièce pour vous garantir confort, style et durabilité premium.',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'story-style',
    title: 'Street Style',
    coverImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    slides: [
      {
        title: 'Streetwear Attitude',
        description: 'Du style basketball rétro aux designs hoodies modernes et casquettes élégantes, trouvez votre propre signature.',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Détente Absolue',
        description: 'Osez le confort ultime de nos sabots techniques et de nos chaussettes haute performance au quotidien.',
        image: 'https://images.unsplash.com/photo-1619521062002-e1d17d64bc9b?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'story-care',
    title: 'Entretien Pro',
    coverImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    slides: [
      {
        title: 'Gardez Vos Paires Neuves',
        description: 'Grâce à notre Kit nettoyant Premium Shield, redonnez l’éclat originel à vos paires préférées en quelques minutes.',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Conseils d’Expert',
        description: 'Brossez délicatement, n’utilisez jamais de séchoir chaud et protégez vos textiles délicatement.',
        image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop'
      }
    ]
  }
];

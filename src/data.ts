import { Product, Review, Story } from './types';

export const BOUTIQUE_PRODUCTS: Product[] = [
  {
    id: 'prod-basket-1',
    name: 'Air Jordan Retro Crimson Red',
    category: 'baskets',
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
      'Semelle extérieure en caoutchouc hautement résistante',
      'Col rembourré pour un maintien optimal de la cheville'
    ],
    usageTips: 'Parfait pour rehausser un jean cargo noir ou un short streetwear. Nettoyez régulièrement avec un chiffon doux humide pour préserver l’éclat des panneaux de cuir blanc.'
  },
  {
    id: 'prod-basket-2',
    name: 'Sneaker Dunk Low Classic Shade',
    category: 'baskets',
    price: 85000,
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop',
    tag: 'Tendance',
    description: 'Minimaliste et ultra polyvalente, la Dunk Low s’habille de cuir souple de qualité supérieure offrant un chaussant doux qui s’ajuste idéalement. Un must-have incontournable pour votre garde-robe streetwear urbaine.',
    ingredientsOrDetails: [
      'Empeigne en cuir de qualité supérieure qui s’assouplit parfaitement',
      'Col bas rembourré élégant et confortable',
      'Semelle intercalaire en mousse pour un amorti réactif et léger',
      'Point de pivot classique sous la semelle en caoutchouc',
      'Perforations sur la pointe pour une respirabilité optimale'
    ],
    usageTips: 'Associez-le à des chaussettes de sport blanches STROLLO et un pantalon de jogging ajusté pour un look athleisure parfait.'
  },
  {
    id: 'prod-crocs-1',
    name: 'Crocs Classic Clog Red Crimson',
    category: 'crocs',
    price: 35000,
    originalPrice: 42000,
    rating: 4.8,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1619521062002-e1d17d64bc9b?q=80&w=600&auto=format&fit=crop',
    tag: 'Ultra Confort',
    description: 'Faites l’expérience du confort absolu. Légères, résistantes à l’eau et incroyablement aérées grâce à leurs ouvertures de ventilation iconiques. Coloris rouge vif exclusif pour affirmer votre style tout en restant décontracté.',
    ingredientsOrDetails: [
      'Conception moulée en Croslite™ pour un amorti signature',
      'Résistant à l’eau et flottant, ne pèse que quelques grammes',
      'Bride pivotante au talon pour un ajustement parfaitement sécurisé',
      'Facile à nettoyer et sèche extrêmement rapidement',
      'Personnalisable avec des clips amusants Jibbitz™'
    ],
    usageTips: 'Idéal pour vos sorties décontractées ou vos moments de détente à la maison. Portez-les avec ou sans chaussettes selon vos envies.'
  },
  {
    id: 'prod-sandal-1',
    name: 'Sandales Confort Arizona Cork',
    category: 'sandales',
    price: 45000,
    rating: 4.7,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop',
    tag: 'Premium',
    description: 'Une sandale orthopédique d’un chic absolu. Fabriquée à partir de cuir de liège naturel et dotée de deux brides ajustables à boucles métalliques. Elle s’adapte naturellement à la forme de votre pied pour un confort inégalé lors des journées chaudes à Karpala.',
    ingredientsOrDetails: [
      'Lit de pied anatomique en liège et latex naturel',
      'Revêtement de semelle en velours ultra-doux respirant',
      'Brides en nubuck synthétique durable et agréable sur la peau',
      'Boucles ardillons métalliques réglables individuellement',
      'Semelle extérieure en EVA souple absorbant les chocs'
    ],
    usageTips: 'Laissez sécher à l’air libre loin de toute source directe de chaleur pour préserver l’élasticité naturelle du liège.'
  },
  {
    id: 'prod-access-1',
    name: 'Kit Nettoyant Sneakers Premium Shield',
    category: 'accessories',
    price: 15000,
    rating: 4.9,
    reviewsCount: 256,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
    tag: 'Essentiel',
    description: 'Gardez vos sneakers dans un état impeccable. Ce kit de niveau professionnel contient une solution de nettoyage ultra-active formulée à base d’ingrédients biodégradables, une brosse en poils de porc premium et un chiffon microfibre haute densité.',
    ingredientsOrDetails: [
      'Solution de nettoyage nettoyante active de 118ml (jusqu’à 100 lavages)',
      'Brosse en bois naturel avec poils de porcs authentiques',
      'Chiffon de séchage microfibre ultra absorbant lavable',
      'Formule 98.3% naturelle et respectueuse de l’environnement',
      'Compatible avec le nubuck, daim, cuir, maille et toile'
    ],
    usageTips: 'Humidifiez la brosse, appliquez quelques gouttes de solution, brossez doucement en formant des mouvements circulaires pour faire mousser, puis essuyez l’excédent avec la microfibre.'
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
        title: 'STROLLO Sneakers',
        description: 'Bienvenue dans notre univers à Karpala près de la Clinique Kassam. Un lieu dédié aux passionnés de paires exclusives.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Sélection Exclusive',
        description: 'Nous sélectionnons avec une rigueur absolue chaque paire pour vous garantir confort, style et durabilité premium.',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop'
      }
    ]
  },
  {
    id: 'story-style',
    title: 'Sneakers & Crocs',
    coverImage: 'https://images.unsplash.com/photo-1619521062002-e1d17d64bc9b?q=80&w=600&auto=format&fit=crop',
    slides: [
      {
        title: 'Streetwear Attitude',
        description: 'Du style basketball rétro aux designs bas modernes, trouvez la silhouette parfaite pour affirmer votre personnalité.',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop'
      },
      {
        title: 'Détente Absolue',
        description: 'Osez le confort des Crocs colorés robustes équipés Jibbitz exclusifs pour pimenter vos journées relax.',
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

/* ==========================================================================
   AURAFIT — Outfit Database
   window.AuraOutfits: 40 outfits × 10 categories
   ========================================================================== */

window.AuraOutfits = [

  // ── STREETWEAR (5) ────────────────────────────────────────────────────────
  {
    id: 'out_001', name: 'Black Monochrome Stack',
    category: 'streetwear', aesthetic: 'minimal-dark',
    colors: ['black', 'charcoal'],
    season: ['all'], occasion: ['casual', 'night-out'],
    bodyTypeMatch: ['ectomorph', 'mesomorph', 'rectangular'],
    skinToneMatch: ['fair', 'medium', 'olive', 'tan', 'dark'],
    tags: ['monochrome', 'oversized', 'minimal', 'black'],
    image: 'assets/black_model_hoodie.png', confidenceScore: 92, styleScore: 89
  },
  {
    id: 'out_002', name: 'Urban Cargo Drip',
    category: 'streetwear', aesthetic: 'urban-edge',
    colors: ['olive', 'black', 'khaki'],
    season: ['autumn', 'winter'], occasion: ['casual', 'street'],
    bodyTypeMatch: ['mesomorph', 'endomorph', 'rectangular'],
    skinToneMatch: ['medium', 'olive', 'tan', 'dark'],
    tags: ['cargo', 'streetwear', 'utility', 'urban'],
    image: 'assets/model_black_hoodie.png', confidenceScore: 88, styleScore: 85
  },
  {
    id: 'out_003', name: 'Street Dominance Look',
    category: 'streetwear', aesthetic: 'street-power',
    colors: ['black', 'white', 'red'],
    season: ['spring', 'summer'], occasion: ['casual', 'street'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['all'],
    tags: ['streetwear', 'bold', 'graphic', 'sneakers'],
    image: 'assets/looks_street_dom.png', confidenceScore: 95, styleScore: 92
  },
  {
    id: 'out_004', name: 'Monochrome Grey Sets',
    category: 'streetwear', aesthetic: 'tonal-minimal',
    colors: ['grey', 'charcoal', 'white'],
    season: ['all'], occasion: ['casual', 'gym', 'street'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['fair', 'medium', 'olive'],
    tags: ['grey', 'tonal', 'set', 'comfort'],
    image: 'assets/model_black_polo.png', confidenceScore: 85, styleScore: 82
  },
  {
    id: 'out_005', name: 'Night Urban Edition',
    category: 'streetwear', aesthetic: 'nocturnal',
    colors: ['black', 'purple', 'navy'],
    season: ['autumn', 'winter'], occasion: ['night-out', 'party'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['fair', 'medium', 'dark'],
    tags: ['night', 'dark', 'street', 'premium'],
    image: 'assets/looks_night_ele.png', confidenceScore: 90, styleScore: 93
  },

  // ── CASUAL (5) ────────────────────────────────────────────────────────────
  {
    id: 'out_006', name: 'Casual Comfort Combo',
    category: 'casual', aesthetic: 'everyday-comfort',
    colors: ['beige', 'cream', 'white'],
    season: ['spring', 'summer'], occasion: ['casual', 'daily'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['fair', 'medium', 'olive'],
    tags: ['beige', 'comfort', 'casual', 'clean'],
    image: 'assets/looks_casual_com.png', confidenceScore: 80, styleScore: 78
  },
  {
    id: 'out_007', name: 'Linen Overshirt Layer',
    category: 'casual', aesthetic: 'relaxed-smart',
    colors: ['earth-tone', 'beige', 'white'],
    season: ['spring', 'summer'], occasion: ['casual', 'date'],
    bodyTypeMatch: ['ectomorph', 'mesomorph', 'rectangular'],
    skinToneMatch: ['fair', 'medium', 'olive', 'tan'],
    tags: ['linen', 'overshirt', 'layered', 'minimal'],
    image: 'assets/product_linen_overshirt.png', confidenceScore: 84, styleScore: 81
  },
  {
    id: 'out_008', name: 'Polo Casual Statement',
    category: 'casual', aesthetic: 'smart-casual',
    colors: ['black', 'white', 'navy'],
    season: ['spring', 'summer'], occasion: ['casual', 'date', 'work-casual'],
    bodyTypeMatch: ['mesomorph', 'ectomorph'],
    skinToneMatch: ['all'],
    tags: ['polo', 'smart', 'casual', 'clean'],
    image: 'assets/model_black_polo.png', confidenceScore: 83, styleScore: 80
  },
  {
    id: 'out_009', name: 'Weekend Relaxed Fit',
    category: 'casual', aesthetic: 'laid-back',
    colors: ['white', 'light-grey', 'beige'],
    season: ['all'], occasion: ['casual', 'daily', 'weekend'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['all'],
    tags: ['relaxed', 'weekend', 'comfort', 'minimal'],
    image: 'assets/product_minimal_hoodie.png', confidenceScore: 78, styleScore: 75
  },
  {
    id: 'out_010', name: 'Earth Tone Curation',
    category: 'casual', aesthetic: 'earthy-warm',
    colors: ['brown', 'earth-tone', 'cream'],
    season: ['autumn'], occasion: ['casual', 'date', 'weekend'],
    bodyTypeMatch: ['mesomorph', 'endomorph'],
    skinToneMatch: ['medium', 'olive', 'tan', 'dark'],
    tags: ['earth-tone', 'warm', 'autumn', 'layered'],
    image: 'assets/model_brown_jacket.png', confidenceScore: 86, styleScore: 84
  },

  // ── LUXURY (4) ────────────────────────────────────────────────────────────
  {
    id: 'out_011', name: 'Luxury Leather Set',
    category: 'luxury', aesthetic: 'high-fashion',
    colors: ['black', 'dark-brown', 'gold-accent'],
    season: ['autumn', 'winter'], occasion: ['night-out', 'formal', 'event'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['all'],
    tags: ['luxury', 'leather', 'premium', 'night'],
    image: 'assets/hero_home_model.png', confidenceScore: 97, styleScore: 95
  },
  {
    id: 'out_012', name: 'Brown Luxury Ensemble',
    category: 'luxury', aesthetic: 'old-money',
    colors: ['brown', 'camel', 'cream'],
    season: ['autumn', 'winter'], occasion: ['formal', 'date', 'business'],
    bodyTypeMatch: ['mesomorph', 'rectangular'],
    skinToneMatch: ['fair', 'medium', 'olive'],
    tags: ['luxury', 'brown', 'old-money', 'tailored'],
    image: 'assets/model_brown_jacket.png', confidenceScore: 94, styleScore: 91
  },
  {
    id: 'out_013', name: 'Satin Shirt Luxe',
    category: 'luxury', aesthetic: 'neo-luxury',
    colors: ['ivory', 'champagne', 'black'],
    season: ['spring', 'summer'], occasion: ['party', 'event', 'night-out'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['fair', 'medium'],
    tags: ['satin', 'luxury', 'evening', 'premium'],
    image: 'assets/product_satin_shirt.png', confidenceScore: 93, styleScore: 90
  },
  {
    id: 'out_014', name: 'CEO Minimal Power Look',
    category: 'luxury', aesthetic: 'tech-billionaire',
    colors: ['black', 'white', 'grey'],
    season: ['all'], occasion: ['work', 'formal', 'business'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['all'],
    tags: ['CEO', 'minimal', 'power', 'clean'],
    image: 'assets/black_model_hoodie.png', confidenceScore: 96, styleScore: 94
  },

  // ── GYM (4) ───────────────────────────────────────────────────────────────
  {
    id: 'out_015', name: 'Performance Gym Set',
    category: 'gym', aesthetic: 'athletic',
    colors: ['black', 'charcoal', 'white'],
    season: ['all'], occasion: ['gym', 'sport'],
    bodyTypeMatch: ['mesomorph', 'ectomorph'],
    skinToneMatch: ['all'],
    tags: ['gym', 'performance', 'athletic', 'dark'],
    image: 'assets/model_black_hoodie.png', confidenceScore: 87, styleScore: 84
  },
  {
    id: 'out_016', name: 'Streetwear Gym Crossover',
    category: 'gym', aesthetic: 'athleisure',
    colors: ['grey', 'white', 'black'],
    season: ['all'], occasion: ['gym', 'casual', 'street'],
    bodyTypeMatch: ['mesomorph', 'ectomorph', 'rectangular'],
    skinToneMatch: ['all'],
    tags: ['athleisure', 'crossover', 'gym', 'street'],
    image: 'assets/model_black_polo.png', confidenceScore: 85, styleScore: 82
  },
  {
    id: 'out_017', name: 'Graphic Tee Gym Look',
    category: 'gym', aesthetic: 'bold-athletic',
    colors: ['black', 'red', 'white'],
    season: ['spring', 'summer'], occasion: ['gym', 'casual'],
    bodyTypeMatch: ['mesomorph', 'ectomorph'],
    skinToneMatch: ['fair', 'medium', 'dark'],
    tags: ['graphic', 'tee', 'gym', 'bold'],
    image: 'assets/product_graphic_tee.png', confidenceScore: 82, styleScore: 79
  },
  {
    id: 'out_018', name: 'Cargo Active Set',
    category: 'gym', aesthetic: 'utility-athletic',
    colors: ['olive', 'black', 'khaki'],
    season: ['all'], occasion: ['gym', 'outdoor', 'casual'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['medium', 'olive', 'tan'],
    tags: ['cargo', 'active', 'utility', 'outdoor'],
    image: 'assets/product_cargo_pants.png', confidenceScore: 80, styleScore: 77
  },

  // ── FORMAL (4) ────────────────────────────────────────────────────────────
  {
    id: 'out_019', name: 'Sharp Formal Suit',
    category: 'formal', aesthetic: 'classic-formal',
    colors: ['black', 'charcoal', 'white'],
    season: ['all'], occasion: ['formal', 'business', 'event'],
    bodyTypeMatch: ['mesomorph', 'ectomorph', 'rectangular'],
    skinToneMatch: ['all'],
    tags: ['formal', 'suit', 'sharp', 'business'],
    image: 'assets/model_brown_jacket.png', confidenceScore: 92, styleScore: 90
  },
  {
    id: 'out_020', name: 'Smart Business Casual',
    category: 'formal', aesthetic: 'business-casual',
    colors: ['navy', 'white', 'light-grey'],
    season: ['all'], occasion: ['work', 'business', 'casual-formal'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['all'],
    tags: ['business', 'smart', 'professional', 'clean'],
    image: 'assets/model_black_polo.png', confidenceScore: 87, styleScore: 84
  },
  {
    id: 'out_021', name: 'Minimal Luxury Formal',
    category: 'formal', aesthetic: 'luxury-formal',
    colors: ['black', 'white', 'dark-navy'],
    season: ['autumn', 'winter'], occasion: ['formal', 'gala', 'event'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['fair', 'medium'],
    tags: ['luxury', 'formal', 'minimal', 'elegant'],
    image: 'assets/hero_home_model.png', confidenceScore: 95, styleScore: 93
  },
  {
    id: 'out_022', name: 'Relaxed Smart Blazer',
    category: 'formal', aesthetic: 'relaxed-formal',
    colors: ['beige', 'cream', 'white'],
    season: ['spring', 'summer'], occasion: ['casual-formal', 'date', 'work'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['fair', 'medium', 'olive'],
    tags: ['blazer', 'relaxed', 'formal', 'smart'],
    image: 'assets/product_linen_overshirt.png', confidenceScore: 84, styleScore: 81
  },

  // ── MONOCHROME (4) ────────────────────────────────────────────────────────
  {
    id: 'out_023', name: 'Full Black Drip',
    category: 'monochrome', aesthetic: 'all-black',
    colors: ['black'],
    season: ['all'], occasion: ['casual', 'night-out', 'street'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['all'],
    tags: ['black', 'monochrome', 'minimal', 'clean'],
    image: 'assets/black_model_hoodie.png', confidenceScore: 94, styleScore: 91
  },
  {
    id: 'out_024', name: 'Grey Tonal Depth',
    category: 'monochrome', aesthetic: 'tonal-grey',
    colors: ['grey', 'charcoal', 'light-grey'],
    season: ['all'], occasion: ['casual', 'street', 'daily'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['fair', 'medium', 'olive'],
    tags: ['grey', 'tonal', 'depth', 'layered'],
    image: 'assets/model_black_polo.png', confidenceScore: 88, styleScore: 85
  },
  {
    id: 'out_025', name: 'White Out Clean Stack',
    category: 'monochrome', aesthetic: 'clean-white',
    colors: ['white', 'cream', 'ivory'],
    season: ['spring', 'summer'], occasion: ['casual', 'date', 'beach'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['medium', 'olive', 'tan', 'dark'],
    tags: ['white', 'clean', 'summer', 'fresh'],
    image: 'assets/product_minimal_hoodie.png', confidenceScore: 85, styleScore: 82
  },
  {
    id: 'out_026', name: 'Earth Brown Monotone',
    category: 'monochrome', aesthetic: 'earthy-mono',
    colors: ['brown', 'camel', 'tan'],
    season: ['autumn'], occasion: ['casual', 'date', 'weekend'],
    bodyTypeMatch: ['mesomorph', 'rectangular'],
    skinToneMatch: ['medium', 'olive', 'tan'],
    tags: ['brown', 'earth', 'mono', 'warm'],
    image: 'assets/model_brown_jacket.png', confidenceScore: 87, styleScore: 84
  },

  // ── OVERSIZED (4) ─────────────────────────────────────────────────────────
  {
    id: 'out_027', name: 'Oversized Hoodie Stack',
    category: 'oversized', aesthetic: 'relaxed-street',
    colors: ['black', 'charcoal'],
    season: ['autumn', 'winter'], occasion: ['casual', 'street', 'daily'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['all'],
    tags: ['oversized', 'hoodie', 'street', 'comfort'],
    image: 'assets/product_minimal_hoodie.png', confidenceScore: 88, styleScore: 85
  },
  {
    id: 'out_028', name: 'Drop Shoulder Minimal',
    category: 'oversized', aesthetic: 'clean-oversized',
    colors: ['white', 'cream', 'light-grey'],
    season: ['spring', 'summer'], occasion: ['casual', 'street'],
    bodyTypeMatch: ['ectomorph', 'mesomorph', 'rectangular'],
    skinToneMatch: ['medium', 'olive', 'tan', 'dark'],
    tags: ['drop-shoulder', 'oversized', 'clean', 'minimal'],
    image: 'assets/looks_casual_com.png', confidenceScore: 84, styleScore: 81
  },
  {
    id: 'out_029', name: 'Dark Oversized Layer',
    category: 'oversized', aesthetic: 'layered-dark',
    colors: ['black', 'navy', 'dark-grey'],
    season: ['autumn', 'winter'], occasion: ['casual', 'night-out', 'street'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['fair', 'medium', 'dark'],
    tags: ['layered', 'oversized', 'dark', 'winter'],
    image: 'assets/model_black_hoodie.png', confidenceScore: 90, styleScore: 87
  },
  {
    id: 'out_030', name: 'Graphic Oversized Statement',
    category: 'oversized', aesthetic: 'bold-street',
    colors: ['black', 'white'],
    season: ['spring', 'summer'], occasion: ['casual', 'street'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['all'],
    tags: ['graphic', 'oversized', 'bold', 'statement'],
    image: 'assets/product_graphic_tee.png', confidenceScore: 86, styleScore: 83
  },

  // ── HOODIES (4) ───────────────────────────────────────────────────────────
  {
    id: 'out_031', name: 'Minimal Hoodie Dark',
    category: 'hoodies', aesthetic: 'clean-dark',
    colors: ['black', 'charcoal'],
    season: ['all'], occasion: ['casual', 'daily', 'gym'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['all'],
    tags: ['hoodie', 'minimal', 'dark', 'clean'],
    image: 'assets/product_minimal_hoodie.png', confidenceScore: 87, styleScore: 84
  },
  {
    id: 'out_032', name: 'Street Hoodie Layer',
    category: 'hoodies', aesthetic: 'street-layered',
    colors: ['grey', 'white', 'black'],
    season: ['autumn', 'winter'], occasion: ['casual', 'street'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['fair', 'medium', 'olive'],
    tags: ['hoodie', 'street', 'layer', 'cozy'],
    image: 'assets/black_model_hoodie.png', confidenceScore: 89, styleScore: 86
  },
  {
    id: 'out_033', name: 'Zip-Up Hoodie Utility',
    category: 'hoodies', aesthetic: 'utility-comfort',
    colors: ['olive', 'khaki', 'black'],
    season: ['autumn'], occasion: ['casual', 'outdoor', 'gym'],
    bodyTypeMatch: ['mesomorph', 'endomorph'],
    skinToneMatch: ['medium', 'tan', 'dark'],
    tags: ['zip-up', 'utility', 'hoodie', 'outdoor'],
    image: 'assets/model_black_hoodie.png', confidenceScore: 82, styleScore: 79
  },
  {
    id: 'out_034', name: 'Oversized Drop Hood',
    category: 'hoodies', aesthetic: 'oversized-comfort',
    colors: ['beige', 'cream', 'sand'],
    season: ['autumn', 'spring'], occasion: ['casual', 'daily'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['medium', 'olive', 'tan'],
    tags: ['oversized', 'hoodie', 'beige', 'neutral'],
    image: 'assets/product_minimal_hoodie.png', confidenceScore: 84, styleScore: 81
  },

  // ── SNEAKERS (3) ──────────────────────────────────────────────────────────
  {
    id: 'out_035', name: 'Clean White Sneaker Set',
    category: 'sneakers', aesthetic: 'clean-minimal',
    colors: ['white', 'black', 'cream'],
    season: ['spring', 'summer'], occasion: ['casual', 'date', 'daily'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['all'],
    tags: ['sneakers', 'white', 'clean', 'minimal'],
    image: 'assets/product_white_sneakers.png', confidenceScore: 86, styleScore: 83
  },
  {
    id: 'out_036', name: 'Luxury Sneaker Premium',
    category: 'sneakers', aesthetic: 'luxury-casual',
    colors: ['white', 'gold-accent', 'cream'],
    season: ['all'], occasion: ['casual', 'luxury', 'date'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['fair', 'medium', 'olive'],
    tags: ['luxury', 'sneaker', 'premium', 'clean'],
    image: 'assets/product_luxury_boots.png', confidenceScore: 93, styleScore: 90
  },
  {
    id: 'out_037', name: 'Minimal Slides Edition',
    category: 'sneakers', aesthetic: 'resort-minimal',
    colors: ['black', 'white', 'beige'],
    season: ['spring', 'summer'], occasion: ['casual', 'beach', 'resort'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['all'],
    tags: ['slides', 'minimal', 'resort', 'summer'],
    image: 'assets/product_minimal_slides.png', confidenceScore: 78, styleScore: 75
  },

  // ── PARTY (3) ─────────────────────────────────────────────────────────────
  {
    id: 'out_038', name: 'Night Elegance Luxe',
    category: 'party', aesthetic: 'nocturnal-luxury',
    colors: ['black', 'dark-purple', 'gold-accent'],
    season: ['all'], occasion: ['party', 'night-out', 'event'],
    bodyTypeMatch: ['ectomorph', 'mesomorph'],
    skinToneMatch: ['all'],
    tags: ['party', 'night', 'luxury', 'elegant'],
    image: 'assets/looks_night_ele.png', confidenceScore: 96, styleScore: 94
  },
  {
    id: 'out_039', name: 'Urban Night Stack',
    category: 'party', aesthetic: 'urban-night',
    colors: ['black', 'charcoal', 'silver-accent'],
    season: ['all'], occasion: ['party', 'club', 'night-out'],
    bodyTypeMatch: ['mesomorph', 'ectomorph'],
    skinToneMatch: ['fair', 'medium', 'dark'],
    tags: ['urban', 'night', 'party', 'dark'],
    image: 'assets/looks_urban_mini.png', confidenceScore: 91, styleScore: 88
  },
  {
    id: 'out_040', name: 'Bold Party Statement',
    category: 'party', aesthetic: 'statement-bold',
    colors: ['black', 'red', 'white'],
    season: ['all'], occasion: ['party', 'event', 'night-out'],
    bodyTypeMatch: ['all'],
    skinToneMatch: ['medium', 'olive', 'dark'],
    tags: ['bold', 'party', 'statement', 'vibrant'],
    image: 'assets/looks_street_dom.png', confidenceScore: 88, styleScore: 86
  }

]; // end AuraOutfits

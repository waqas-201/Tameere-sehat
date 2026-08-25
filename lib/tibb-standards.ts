import { CategoryItem, Product } from './types';

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'all',
    nameEn: 'All House Formulations',
    nameUr: 'تمام ادویات و نسخہ جات',
    icon: '🌿',
    description: 'Complete pharmacopeia of 100% natural Unani remedies.',
    descriptionUrdu: 'تعمیرِ صحت دواخانہ کے تمام خالص اور قدرتی نسخہ جات۔',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'honey-shifa',
    nameEn: 'Shilajit, Saffron & Pure Honey',
    nameUr: 'خالص سلاجیت، زعفران و شہد',
    icon: '🍯',
    description: 'Grade-A Sun-cured Skardu Shilajit, Super Negin Saffron & Wild Berry Honey.',
    descriptionUrdu: 'سکردو کی مصفیٰ سلاجیت، کشمیری زعفران اور قدرتی بیری کا شہد۔',
    badgeColor: 'bg-amber-100 text-amber-900'
  },
  {
    id: 'herbal-oils',
    nameEn: 'Tahiri Balms, Liniments & Oils',
    nameUr: 'طاہری مرہم، روغنیات و طلاء',
    icon: '💧',
    description: 'Antiseptic healing balms, scalp regrowth oils, and joint pain liniments.',
    descriptionUrdu: 'زخم، چنبل کے لیے طاہری مرہم، بالوں کے روغنیات اور درد کے طلاء۔',
    badgeColor: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'arqiyat',
    nameEn: 'Pure Distilled Arqiyat (Hydrosols)',
    nameUr: 'خالص مقطر عرقِیات',
    icon: '🧪',
    description: 'Traditional copper deg-bhabka steam distillates without added chemicals.',
    descriptionUrdu: 'تانبے کے دیگ بھبکے سے کشید کردہ خالص طبی عرقیات۔',
    badgeColor: 'bg-cyan-100 text-cyan-800'
  },
  {
    id: 'majun-jawarish',
    nameEn: 'Majun, Khamira & Jawarish',
    nameUr: 'معجون، خمیرہ و جوارش',
    icon: '🏺',
    description: 'Classical semi-solid electuaries with pure honey, nuts, and mineral pearls.',
    descriptionUrdu: 'خالص شہد، مغزیات اور مروارید سے تیار کردہ کلاسیکی معجونات و خمیرہ۔',
    badgeColor: 'bg-orange-100 text-orange-900'
  },
  {
    id: 'safoof-powders',
    nameEn: 'Medicinal Safoof (Fine Powders)',
    nameUr: 'طبی سفوف و چورن',
    icon: '🌾',
    description: 'Hand-pulverized digestive, vitality, and cooling botanical powders.',
    descriptionUrdu: 'ہاضمہ، مغلظ اور طاقت کے باریک پسے ہوئے قدرتی سفوف جات۔',
    badgeColor: 'bg-stone-200 text-stone-800'
  },
  {
    id: 'raw-herbs',
    nameEn: 'Raw Wild Herbs, Roots & Seeds',
    nameUr: 'خام جڑی بوٹیاں، جڑیں و بیج',
    icon: '🌱',
    description: 'Cleaned, shadow-dried authentic wildcrafted botanical specimens.',
    descriptionUrdu: 'صاف شدہ، سائے میں خشک کی گئی اصل مفرد جڑی بوٹیاں۔',
    badgeColor: 'bg-green-100 text-green-800'
  },
  {
    id: 'health-courses',
    nameEn: 'Targeted Complete Health Courses',
    nameUr: 'مستند مکمل طبی کورسز',
    icon: '📦',
    description: 'Holistic multi-remedy packs formulated for 30 to 40 days treatment.',
    descriptionUrdu: 'مخصوص امراض کے لیے 30 تا 40 دن کے مکمل جامع طبی کورسز۔',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'sharbat-syrups',
    nameEn: 'Sharbat, Lauq & Linctus',
    nameUr: 'شربت، لعوق و مربہ جات',
    icon: '🍷',
    description: 'Traditional cooling herbal syrups, chest lauq and invigorating murabba.',
    descriptionUrdu: 'سینے کے امراض کے لیے لعوق، فرحت بخش شربت اور مربہ جات۔',
    badgeColor: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'hab-tablets',
    nameEn: 'Haboob, Kurs & Kushtajaat',
    nameUr: 'حبوب، قرص و کشتہ جات',
    icon: '💊',
    description: 'Traditional Unani hand-rolled pills, herbal tablets, and purified mineral bhasmas.',
    descriptionUrdu: 'روایتی گولیاں (حبوب)، قرص اور کیمیاوی مصفیٰ کشتہ جات۔',
    badgeColor: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'itrifal',
    nameEn: 'Itrifal (Triphala Compounds)',
    nameUr: 'اطریفل جات و مصفیٰ معدہ',
    icon: '🍃',
    description: 'Classical formulas containing Harar, Bahera & Amla for brain, eyes and digestion.',
    descriptionUrdu: 'دماغ، آنکھوں اور پرانی قبض کی اصلاح کے لیے مستند اطریفل جات۔',
    badgeColor: 'bg-lime-100 text-lime-800'
  },
  {
    id: 'tila-applications',
    nameEn: 'Tila & External Rejuvenators',
    nameUr: 'طلاء و بیرونی مالش',
    icon: '✨',
    description: 'Potent external rubs and herbal preparations for muscular activation.',
    descriptionUrdu: 'عضلات اور پٹھوں کی بیرونی مالش اور تحریک کے لیے خاص طلاء۔',
    badgeColor: 'bg-amber-100 text-amber-800'
  }
];

export const TIBBI_UNITS_PRESETS = [
  // Metric Grams
  { label: '50g Small Pack', weight: '50g Jar' },
  { label: '100g Standard Pack', weight: '100g Pack' },
  { label: '150g Box', weight: '150g Box' },
  { label: '250g Half Pao (آدھا پاؤ)', weight: '250g Pouch' },
  { label: '500g 1 Pao (ایک پاؤ / آدھا کلو)', weight: '500g Value Pack' },
  { label: '1000g (1 Kilogram)', weight: '1kg Bulk Jar' },
  
  // Traditional Tibb Measures
  { label: '1 Tola (11.66g - ۱ تولہ)', weight: '1 Tola (11.66g)' },
  { label: '2 Tola (23.3g - ۲ تولہ)', weight: '2 Tola Jar' },
  { label: '5 Tola (58.3g - ۵ تولہ / ۱ چھٹانک)', weight: '5 Tola Pack' },
  { label: '1 Masha (0.97g - ۱ ماشہ)', weight: '1 Masha Vial' },
  
  // Distillates & Oils (Volume)
  { label: '60ml Dropper Bottle', weight: '60ml Dropper' },
  { label: '120ml Amber Glass Bottle', weight: '120ml Bottle' },
  { label: '250ml Bottle', weight: '250ml Bottle' },
  { label: '500ml Bottle', weight: '500ml Bottle' },
  { label: '800ml Distillate Bottle (بڑا عرق)', weight: '800ml Bottle' },
  { label: '1 Litre Family Bottle', weight: '1 Litre Bottle' },
  
  // Haboob & Tablets (Counts)
  { label: '20 Hab (۲۰ گولیاں)', weight: '20 Hab Bottle' },
  { label: '30 Hab (۳۰ گولیاں)', weight: '30 Hab Box' },
  { label: '60 Hab (۶۰ گولیاں)', weight: '60 Hab Bottle' },
  { label: '100 Hab (۱۰۰ گولیاں)', weight: '100 Hab Container' },
  
  // Courses
  { label: '15 Days Trial Course (۱۵ روزہ کورس)', weight: '15 Days Course' },
  { label: '30 Days Standard Course (۱ ماہ کورس)', weight: '30 Days Course' },
  { label: '40 Days Chilla Course (۴۰ روزہ چلہ کورس)', weight: '40 Days Chilla Course' },
  { label: '60 Days Complete Course (۲ ماہ کورس)', weight: '60 Days Course' }
];

export const TIBB_PRESET_IMAGES = [
  {
    name: 'Pure Himalayan Shilajit Resin (Gold Jar)',
    category: 'honey-shifa',
    url: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
    tags: ['shilajit', 'salajeet', 'resin', 'gold']
  },
  {
    name: 'Pure Kashmiri Saffron Filaments (Zafran)',
    category: 'honey-shifa',
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    tags: ['zafran', 'saffron', 'kesar', 'spice']
  },
  {
    name: 'Pure Wild Forest Sidr Honey',
    category: 'honey-shifa',
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    tags: ['honey', 'sidr', 'shifa', 'shehd']
  },
  {
    name: 'Tahiri Marham Ointment Jar',
    category: 'herbal-oils',
    url: 'https://images.unsplash.com/photo-1608248597358-1e428e8f8ec8?auto=format&fit=crop&w=800&q=80',
    tags: ['marham', 'balm', 'ointment', 'skin']
  },
  {
    name: 'Medicinal Scalp & Herbal Hair Oil in Dropper',
    category: 'herbal-oils',
    url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    tags: ['oil', 'roghan', 'hair', 'dropper']
  },
  {
    name: 'Pure Distilled Herbal Arqiyat Glass Bottle',
    category: 'arqiyat',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tags: ['arq', 'kasni', 'gulab', 'distillate']
  },
  {
    name: 'Classical Majun & Electuary Amber Jar',
    category: 'majun-jawarish',
    url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    tags: ['majun', 'jawarish', 'electuary', 'amber']
  },
  {
    name: 'Fine Medicinal Herbal Safoof / Powder with Spoon',
    category: 'safoof-powders',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    tags: ['safoof', 'powder', 'churna', 'roots']
  },
  {
    name: 'Raw Asgandh Nagori Roots (Ashwagandha)',
    category: 'raw-herbs',
    url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    tags: ['roots', 'asgandh', 'ashwagandha', 'raw']
  },
  {
    name: 'Pure Kalonji Black Seeds (Nigella Sativa)',
    category: 'raw-herbs',
    url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
    tags: ['kalonji', 'black seed', 'shifa', 'seeds']
  },
  {
    name: 'Gond Katira / Crystal Herbal Gum',
    category: 'raw-herbs',
    url: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
    tags: ['gond', 'katira', 'crystals', 'cooling']
  },
  {
    name: 'Traditional Mortar & Pestle Botanical Grinding',
    category: 'health-courses',
    url: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
    tags: ['tibb', 'mortar', 'course', 'heritage']
  },
  {
    name: 'Sharbat & Herbal Linctus Flask',
    category: 'sharbat-syrups',
    url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80',
    tags: ['sharbat', 'syrup', 'bottle', 'herbal']
  },
  {
    name: 'Haboob & Unani Herbal Tablets in Bottle',
    category: 'hab-tablets',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    tags: ['hab', 'tablets', 'kushta', 'pills']
  }
];

export const TIBB_PRODUCT_TEMPLATES: Partial<Product>[] = [
  {
    name: 'Majun Shabab Awar Khas (Royal Vitality Electuary)',
    urduName: 'معجون شباب آور خاص (شاہی مقوی اعصاب و جسمانی قوت)',
    category: 'majun-jawarish',
    categoryName: 'Majun, Khamira & Jawarish',
    categoryNameUrdu: 'معجون، خمیرہ و جوارش',
    shortDesc: 'Elite classical formulation with Salab Misri, Zafran, Amber, and 18 mountain herbs for lasting energy and vitality.',
    shortDescUrdu: 'ثعلب مصری، زعفران، عنبر اور 18 قیمتی جڑی بوٹیوں سے تیار کردہ شاہی معجون۔ اعصابی اور جسمانی کمزوری کے لیے بے مثال۔',
    description: 'Majun Shabab Awar Khas is compounded following ancient Unani pharmacopeial texts. It combines hand-ground Salab Misri, Musli Safaid, Zafran, Mastagi Roomi, and Maghz Badam in wild Sidr honey base. It strengthens the core organs (heart, brain, and liver), calms stress, and rejuvenates muscular stamina.',
    descriptionUrdu: 'معجون شباب آور خاص قرابادین کے مستند اصولوں پر خالص بیری کے شہد، ثعلب، موصلی اور مغزیات سے تیار کی جاتی ہے۔ یہ اعضاء رئیسہ (دل، دماغ، جگر) کو قوت بخشتی ہے اور جسم میں نئی توانائی پیدا کرتی ہے۔',
    price: 1950,
    originalPrice: 2600,
    badge: 'hakeem-special',
    mizaj: 'Garm-Tar (Hot & Moist)',
    mizajUrdu: 'گرم تر (جسم کو حرارتِ غریزی اور قوت بخشنے والا)',
    dosage: '1 teaspoon (6g) twice daily with warm sweet milk after meals.',
    dosageUrdu: 'ایک چھوٹا چمچ صبح و شام نیم گرم میٹھے دودھ کے ساتھ استعمال کریں۔',
    benefits: [
      'Restores vitality and deep muscular energy',
      'Strengthens the central nervous system & lowers fatigue',
      'Supports healthy circulation and hormonal balance',
      '100% natural herbs with zero artificial stimulants'
    ],
    benefitsUrdu: [
      'جسمانی توانائی اور پٹھوں کی مضبوطی میں اضافہ کرتا ہے',
      'اعصابی کمزوری اور سستی کو جڑ سے ختم کرتا ہے',
      'خون کی گردش کو بہتر بناتا ہے اور چہرے کی رونق بڑھاتا ہے',
      'کیمیکلز اور مصنوعی اجزاء سے بالکل پاک'
    ],
    ingredients: ['Salab Misri', 'Musli Safaid', 'Zafran (Kashmiri Saffron)', 'Amber', 'Mastagi Roomi', 'Maghz Pista', 'Maghz Badam', 'Sidr Honey'],
    ingredientsUrdu: ['ثعلب مصری', 'موصلی سفید', 'کشمیری زعفران', 'عنبر', 'مستگی رومی', 'مغز پستہ', 'مغز بادام', 'خالص بیری کا شہد'],
    variants: [
      { weight: '150g Jar', price: 1950, originalPrice: 2600, inStock: true },
      { weight: '300g Course Jar', price: 3600, originalPrice: 4800, inStock: true }
    ],
    targetConcerns: ['Vitality & Stamina', 'Nervous Weakness', 'Men Health', 'Energy & Fatigue'],
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    inStock: true
  },
  {
    name: 'Pure Skardu Aftabi Shilajit (Gold Grade Resin)',
    urduName: 'خالص سکردو آفتابی سلاجیت (گولڈ گریڈ اصلی مصفیٰ)',
    category: 'honey-shifa',
    categoryName: 'Shilajit, Saffron & Pure Honey',
    categoryNameUrdu: 'خالص سلاجیت، زعفران و شہد',
    shortDesc: '100% pure sun-purified Himalayan Shilajit resin containing 85%+ Fulvic Acid and 84+ minerals.',
    shortDescUrdu: 'سکردو کے 18000 فٹ بلند پہاڑوں سے حاصل شدہ، 40 روز تک دھوپ میں مصفیٰ خالص سلاجیت۔',
    description: 'Harvested from high-altitude Karakoram rock cliffs and purified using solar decantation (Aftabi method) with Triphala decoction. Free from heavy metals, synthetic waxes, or scorched odors.',
    descriptionUrdu: 'قراقرم کے پہاڑوں سے حاصل شدہ قدرتی سلاجیت جس کو سہ آتشہ تریفلہ کے پانی میں سورج کی دھوپ کے ذریعے 40 دن تک مصفیٰ کیا گیا ہے۔',
    price: 1850,
    originalPrice: 2400,
    badge: 'bestseller',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک (اعصاب و پٹھوں کو گرمائش و طاقت دینے والی)',
    dosage: 'Pea-sized portion (300-500mg) dissolved in warm milk or green tea daily.',
    dosageUrdu: 'چنے کے دانے کے برابر نیم گرم دودھ یا قہوے میں گھول کر روزانہ لیں۔',
    benefits: [
      'Boosts cellular ATP energy and stamina',
      'Relieves joint pain, arthritis, and cartilage stiffness',
      'Supports male testosterone and vigor',
      'Loaded with 84+ ionic trace minerals and fulvic acid'
    ],
    benefitsUrdu: [
      'جسمانی کمزوری اور تھکن دور کر کے نئی طاقت بھرتی ہے',
      'جوڑوں، گھٹنوں کے درد اور ہڈیوں کی سوزش میں بے مثال',
      'مردانہ ہارمونز اور قدرتی قوت میں اضافہ کرتی ہے',
      '84 سے زائد قدرتی معدنیات کا بیش قیمت خزانہ'
    ],
    ingredients: ['100% Pure Purified Asphaltum Punjabianum (Himalayan Shilajit Resin)'],
    ingredientsUrdu: ['100٪ خالص مصفی ہمالیائی سلاجیت'],
    variants: [
      { weight: '15g Luxury Jar', price: 1850, originalPrice: 2400, inStock: true },
      { weight: '30g Gold Pack', price: 3200, originalPrice: 4400, inStock: true }
    ],
    targetConcerns: ['Joint & Sciatica Relief', 'Vitality & Stamina', 'Energy & Fatigue'],
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
    inStock: true
  },
  {
    name: 'Arq-e-Mako Kasni Murakkab (Dual Liver & Stomach Distillate)',
    urduName: 'عرقِ مکو و کاسنی مرکب (جگر، معدہ و گردہ ٹانک)',
    category: 'arqiyat',
    categoryName: 'Pure Distilled Arqiyat (Hydrosols)',
    categoryNameUrdu: 'خالص مقطر عرقِیات',
    shortDesc: 'Copper-distilled botanical essence of Kasni and Mako for hepatic inflammation, jaundice, and internal heat.',
    shortDescUrdu: 'جگر کی گرمی، ورم، فیٹی لیور اور معدے کی تیزابیت ختم کرنے کے لیے خالص مقطر مرکب عرق۔',
    description: 'Double steam-distilled using traditional copper alembic stills. Balances liver enzymes, alleviates burning urination, reduces facial blemishes caused by toxic heat, and aids natural bile secretion.',
    descriptionUrdu: 'تانبے کے روایتی دیگ بھبکے سے کشید شدہ۔ یہ جگر اور معدے کی گرمی، تیزابیت، پیشاب کی جلن اور چہرے کے کیل مہاسوں کو دور کرتا ہے۔',
    price: 360,
    originalPrice: 480,
    badge: 'pure-certified',
    mizaj: 'Sard-Tar (Cold & Moist)',
    mizajUrdu: 'سرد تر (گرمی اور سوزش کو ختم کرنے والا)',
    dosage: '50ml to 100ml (half cup) morning and evening before meals.',
    dosageUrdu: 'صبح اور شام نہار منہ آدھا کپ پئیں۔',
    benefits: [
      'Reduces fatty liver and cools internal body heat',
      'Aids digestion and alleviates hyper-acidity',
      'Clears complexion and reduces heat pimples',
      'Acts as a gentle natural diuretic'
    ],
    benefitsUrdu: [
      'جگر اور معدے کی گرمی اور ورم کو ٹھنڈک پہنچاتا ہے',
      'کھٹی ڈکاریں اور سینے کی جلن ختم کرتا ہے',
      'خون صاف کر کے چہرے کی رنگت نکھارتا ہے',
      'پیشاب کی بندش اور جلن میں فوری سکون دیتا ہے'
    ],
    ingredients: ['Distillate of Kasni Roots & Seeds', 'Distillate of Mako (Solanum nigrum)', 'Distillate of Badyan (Fennel)'],
    ingredientsUrdu: ['خالص کاسنی کا عرق', 'عرقِ مکو خام', 'عرقِ بادیان (سونف)'],
    variants: [
      { weight: '800ml Bottle', price: 360, originalPrice: 480, inStock: true },
      { weight: 'Pack of 3 (800ml x 3)', price: 990, originalPrice: 1400, inStock: true }
    ],
    targetConcerns: ['Liver & Detox', 'Stomach & Digestion', 'Kidney & Urinary'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    inStock: true
  },
  {
    name: 'Khamira Gaozaban Ambari Jawaharwala (Heart & Brain Tonic)',
    urduName: 'خمیرہ گاؤزبان عنبری جواہر دار (مقوی دل، دماغ و اعصاب)',
    category: 'majun-jawarish',
    categoryName: 'Majun, Khamira & Jawarish',
    categoryNameUrdu: 'معجون، خمیرہ و جوارش',
    shortDesc: 'Royal cardio-cerebral electuary with Gaozaban, pearls, amber, and silver leaves for heart palpitation, memory & anxiety.',
    shortDescUrdu: 'دل کی گھبراہٹ، دھڑکن، وہم، بے چینی، یادداشت کی کمزوری اور اعصابی دباؤ کے لیے معروف شاہی خمیرہ۔',
    description: 'Formulated with Borago officinalis (Gaozaban), purified pearls (Marwareed), Amber, and pure silver foil (Warq Nuqra). Restores mental serenity, regulates high heartbeat, and bolsters cognitive sharpness.',
    descriptionUrdu: 'برگِ گاؤزبان، مروارید، عنبر اور ورقِ نقرہ سے مزین شاہی خمیرہ جو دل کو فرحت و قوت بخشتا ہے، دماغی صلاحیتیں تیز کرتا ہے اور خوف و وہم کو دور کرتا ہے۔',
    price: 1450,
    originalPrice: 1900,
    badge: 'heritage-formula',
    mizaj: 'Mo\'tadil (Balanced / معتدل)',
    mizajUrdu: 'معتدل مقوی دل و دماغ',
    dosage: '1 teaspoon (5g) in the morning on empty stomach with fresh milk or arq gaozaban.',
    dosageUrdu: 'صبح نہار منہ ایک چمچ دودھ یا عرقِ گاؤزبان کے ساتھ لیں۔',
    benefits: [
      'Relieves cardiac palpitations and sudden anxiety',
      'Enhances memory retention and concentration',
      'Provides profound emotional calm and quality sleep',
      'Enriched with pure calcined pearls and silver foil'
    ],
    benefitsUrdu: [
      'دل کی دھڑکن اور گھبراہٹ میں فوری سکون دیتا ہے',
      'یادداشت اور دماغی صلاحیتوں کو جلا بخشتا ہے',
      'ذہنی دباؤ اور بے چینی کو ختم کر کے پرسکون نیند لاتا ہے',
      'خالص سچے موتیوں (مروارید) اور چاندی کے ورق سے تیار کردہ'
    ],
    ingredients: ['Berg Gaozaban', 'Gul Gaozaban', 'Kashneez Khushk', 'Marwareed (Purified Pearls)', 'Warq Nuqra (Silver Leaves)', 'Amber', 'Sidr Honey'],
    ingredientsUrdu: ['برگِ گاؤزبان', 'گلِ گاؤزبان', 'دھنیا خشک', 'مروارید مصفیٰ', 'ورقِ نقرہ', 'عنبر', 'شہد خالص'],
    variants: [
      { weight: '100g Jar', price: 1450, originalPrice: 1900, inStock: true },
      { weight: '250g Family Pack', price: 2900, originalPrice: 3800, inStock: true }
    ],
    targetConcerns: ['Stress & Sleep', 'Heart Health', 'Brain & Memory'],
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    inStock: true
  },
  {
    name: 'Safoof-e-Hazim Khas (Herbal Digestive Churna)',
    urduName: 'سفوفِ ہاضم خاص (گیس، تبخیر و ہاضمہ چورن)',
    category: 'safoof-powders',
    categoryName: 'Medicinal Safoof (Fine Powders)',
    categoryNameUrdu: 'طبی سفوف و چورن',
    shortDesc: 'Instant digestive relief powder with Ajwain Desi, Black Salt, Zeera, and Pudina for gas, bloating & constipation.',
    shortDescUrdu: 'کھانے کے بعد پیٹ میں گیس، تبخیر، اپھارہ، بھاری پن اور بدہضمی کو منٹوں میں دور کرنے والا روایتی سفوف۔',
    description: 'An appetizing and carminative Unani powder. Stimulates sluggish digestive juices, eliminates abdominal bloating within minutes of meal ingestion, and relieves sour belches.',
    descriptionUrdu: 'دیسی اجوائن، پودینہ، زیرہ سیاہ اور نمک سیاہ کا لذیذ و موثر مرکب جو معدے کی گیس اور بدہضمی کو فوری دور کرتا ہے۔',
    price: 390,
    originalPrice: 500,
    badge: 'bestseller',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک (بلغم اور سستی ہاضمہ کو دور کرنے والا)',
    dosage: 'Half teaspoon (3g) with fresh water after heavy meals.',
    dosageUrdu: 'کھانے کے بعد آدھا چمچ پانی کے ہمراہ لیں۔',
    benefits: [
      'Instant relief from gas, bloating, and heartburn',
      'Enhances natural digestive enzyme secretion',
      'Relieves morning stomach heaviness and constipation',
      '100% natural carminative herbs'
    ],
    benefitsUrdu: [
      'گیس، اپھارہ اور سینے کی جلن سے فوری نجات',
      'بھوک کھل کر لگاتا ہے اور ہاضمہ درست کرتا ہے',
      'معدے کی سستی اور قبض کو دور کرتا ہے',
      'انتہائی خوش ذائقہ اور زود اثر'
    ],
    ingredients: ['Ajwain Desi', 'Zeera Siah', 'Namak Siah (Himalayan Black Salt)', 'Pudina Khushk', 'Filfil Siah (Black Pepper)', 'Sonth (Dry Ginger)'],
    ingredientsUrdu: ['اجوائن دیسی', 'زیرہ سیاہ', 'نمک سیاہ', 'پودینہ خشک', 'فلفل سیاہ', 'سونٹھ'],
    variants: [
      { weight: '100g Pouch', price: 390, originalPrice: 500, inStock: true },
      { weight: '250g Jar', price: 790, originalPrice: 1100, inStock: true }
    ],
    targetConcerns: ['Stomach & Digestion', 'Weight Management'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    inStock: true
  },
  {
    name: '40 Days Joint & Sciatica Recovery Course (چلہ کورس)',
    urduName: '40 روزہ چلہ کورس برائے جوڑوں کا درد و عرق النساء',
    category: 'health-courses',
    categoryName: 'Targeted Complete Health Courses',
    categoryNameUrdu: 'مستند مکمل طبی کورسز',
    shortDesc: 'Comprehensive 40-day holistic course including Majun Suranjan, Tahiri Joint Oil, and Pure Himalayan Shilajit.',
    shortDescUrdu: 'جوڑوں کا درد، نقرس، گھٹنوں کی سوزش اور عرق النساء (لنگڑی کا درد) کے لیے 40 روزہ مکمل جامع یونانی کورس۔',
    description: 'A 3-stage regenerative course designed by Hakim Muhammad Tariq. Stage 1 purges uric acid crystals; Stage 2 lubricates synovial joints; Stage 3 rebuilds cartilage strength with pure Shilajit resin.',
    descriptionUrdu: 'حکیم طارق محمود کا 40 روزہ مکمل کورس جس میں معجون سرنجان، طاہری جوائنٹ آئل اور خالص سلاجیت شامل ہے۔ یورک ایسڈ اور پرانے دردوں کا مکمل علاج۔',
    price: 4950,
    originalPrice: 6500,
    badge: 'hakeem-special',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک (جوڑوں کے بلغم اور سردی کو زائل کرنے والا)',
    dosage: 'Follow complete printed chart included in the box with Hakeem diet guidelines.',
    dosageUrdu: 'باکس میں شامل حکیم صاحب کے پرہیز چارٹ کے مطابق روزانہ استعمال کریں۔',
    benefits: [
      'Flushes excess uric acid crystals from blood and joints',
      'Restores synovial fluid cushioning in knee joints',
      'Provides long-term freedom from anti-inflammatory painkillers',
      'Includes free direct Hakeem follow-up consultation'
    ],
    benefitsUrdu: [
      'خون اور جوڑوں سے یورک ایسڈ کو خارج کرتا ہے',
      'گھٹنوں اور مہروں کے گریس (مائع) کو بحال کرتا ہے',
      'درد کش ایلوپیتھک ادویات کے سائیڈ ایفیکٹس سے نجات',
      'حکیم صاحب کی مفت آن لائن نگرانی شامل ہے'
    ],
    ingredients: ['Suranjan Shireen', 'Asgandh Nagori', 'Pure Shilajit Resin', 'Roghan Surkh', 'Kushta Gaodanti', 'Guggulu'],
    ingredientsUrdu: ['سرنجان شیریں', 'اسگندھ ناگوری', 'خالص ہمالیائی سلاجیت', 'روغنِ سرخ', 'کشتہ گودنتی', 'گوگل خالص'],
    variants: [
      { weight: '40 Days Complete Course Pack', price: 4950, originalPrice: 6500, inStock: true }
    ],
    targetConcerns: ['Joint & Sciatica Relief', 'Vitality & Stamina'],
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
    inStock: true
  }
];

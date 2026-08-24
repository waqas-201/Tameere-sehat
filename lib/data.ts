import { Product, HakeemProfile, HerbEntry, Review } from './types';

export const STORE_PHONE = '+92 318 2311310';
export const STORE_EMAIL = 'hello@tameeresehat.com';
export const STORE_WHATSAPP = '923182311310';
export const STORE_ADDRESS_EN = 'Plot no L, 41 Korangi Crossing Rd, K.D.A Allah Wala Town Sector 31 B Korangi, Karachi, Pakistan';
export const STORE_ADDRESS_UR = 'پلاٹ نمبر ایل، 41 کورنگی کراسنگ روڈ، کے ڈی اے اللہ والا ٹاؤن سیکٹر 31 بی کورنگی، کراچی، پاکستان';
export const FREE_SHIPPING_THRESHOLD = 2500;
export const STANDARD_SHIPPING_FEE = 200;

export const PAKISTAN_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 
  'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad', 'Bahawalpur', 
  'Sargodha', 'Sukkur', 'Larkana', 'Sheikhupura', 'Jhang', 'Rahim Yar Khan', 
  'Gujrat', 'Mardan', 'Kasur', 'Dera Ghazi Khan', 'Sahiwal', 'Nawabshah', 
  'Mingora', 'Mirpur Khas', 'Chiniot', 'Kamoke', 'Mandi Bahauddin', 'Jhelum', 
  'Khanewal', 'Hafizabad', 'Kohat', 'Jacobabad', 'Muzaffargarh', 'Muridke', 
  'Pakpattan', 'Abbottabad', 'Turbat', 'Dadu', 'Bahawalnagar', 'Khuzdar', 
  'Gojra', 'Dera Ismail Khan', 'Chaman', 'Swabi', 'Nowshera', 'Muzaffarabad', 
  'Mirpur (AJK)', 'Gilgit', 'Skardu', 'Other City'
];

export const PRODUCTS: Product[] = [
  {
    id: 'tahiri-marham',
    name: 'Tahiri Marham (Herbal Healing Ointment)',
    urduName: 'طاہری مرہم (قدرتی شفاء بخش مرہم)',
    category: 'herbal-oils',
    categoryName: 'Herbal Oils & Marham',
    categoryNameUrdu: 'روغنیات و مرہم',
    shortDesc: 'Traditional Unani antiseptic healing ointment for cuts, burns, eczema, and skin wounds.',
    shortDescUrdu: 'زخم، جلن، چنبل، خارش اور جلدی امراض کے لیے مشہور آزمودہ روایتی یونانی مرہم۔',
    description: 'Tahiri Marham is our heritage flagship formulation since 1990. Prepared with pure natural waxes, camphor, essential herbal resins, and medicinal cooling extracts. Provides rapid relief from skin inflammation, deep cracks on feet, non-healing wounds, and fungal irritations.',
    descriptionUrdu: 'طاہری مرہم 1990 سے ہمارا سب سے مقبول و مستند قدرتی نسخہ ہے۔ یہ خالص قدرتی موم، کافور، جڑی بوٹیوں کے نچوڑ اور شفاء بخش اجزاء سے تیار کیا جاتا ہے جو ہر قسم کے جلدی سوزش، ایڑھیوں کی پھٹن، داد، چنبل اور زخموں کو تیزی سے ٹھیک کرتا ہے۔',
    price: 450,
    originalPrice: 600,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1608248597358-1e428e8f8ec8?auto=format&fit=crop&w=800&q=80',
    badge: 'bestseller',
    benefits: [
      'Rapidly soothes burnt skin and abrasions',
      'Effective against eczema, fungal patches, and skin itch',
      'Heals cracked heels and chapped hands',
      '100% natural, free from harmful steroids'
    ],
    benefitsUrdu: [
      'جلی ہوئی جلد اور زخموں کو فوری سکون بخشتا ہے',
      'داد، چنبل اور پرانی خارش کے لیے بے حد مفید',
      'پھٹی ہوئی ایڑھیوں کو نرم و ہموار بناتا ہے',
      'سٹیرائیڈز اور کیمیکلز سے بالکل پاک'
    ],
    ingredients: ['Gandha Biroza', 'Mom Zard (Beeswax)', 'Kafur (Camphor)', 'Roghan Neem', 'Murdar Sang'],
    ingredientsUrdu: ['گندہ بیروزہ', 'موم زرد', 'کافور', 'روغنِ نیم', 'مردار سنگ'],
    dosage: 'Apply gently on cleaned affected area 2 to 3 times daily.',
    dosageUrdu: 'متاثرہ جگہ کو صاف کر کے دن میں دو سے تین بار ہلکے ہاتھ سے لگائیں۔',
    mizaj: 'Sard-Khushk (Cold & Dry)',
    mizajUrdu: 'سرد خشک (سوزش کو ٹھنڈک پہنچانے والا)',
    variants: [
      { weight: '50g Jar', price: 450, originalPrice: 600, inStock: true },
      { weight: '100g Value Pack', price: 800, originalPrice: 1100, inStock: true }
    ],
    targetConcerns: ['Skin & Eczema', 'Wound Care', 'Cracked Heels', 'Itching & Allergy'],
    inStock: true
  },
  {
    id: 'arq-kasni-pure',
    name: 'Arq Kasni (Pure Distilled Chicory Water)',
    urduName: 'خالص عرقِ کاسنی (جگر و معدہ کا ٹانک)',
    category: 'arqiyat',
    categoryName: 'Arqiyat & Distillates',
    categoryNameUrdu: 'خالص عرقِیات',
    shortDesc: 'Traditional double-distilled Kasni water for liver detox, jaundice, and cooling stomach heat.',
    shortDescUrdu: 'جگر کی گرمی، یرقان، ورمِ جگر اور معدے کی تیزابیت ختم کرنے کے لیے خالص مقطر عرق۔',
    description: 'Tameer-e-Sehat Arq Kasni is produced through classical steam distillation of premium Cichorium intybus (Kasni) roots and seeds. It detoxifies hepatic cells, eliminates internal heat (Hararat-e-Jigar), aids urine excretion, and restores clear skin complexion.',
    descriptionUrdu: 'تعمیرِ صحت کا خالص عرقِ کاسنی روایتی تپ دق بھپارے کے ذریعے خالص بیجوں اور جڑوں سے کشید کیا جاتا ہے۔ یہ جگر کی گرمی اور ورم کو دور کرتا ہے، پیشاب کی جلن دور کرتا ہے اور خون کو صاف کرتا ہے۔',
    price: 320,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'pure-certified',
    benefits: [
      'Detoxifies liver and reduces fatty liver symptoms',
      'Cools down internal body heat and stomach burning',
      'Clears facial dullness caused by hepatic sluggishness',
      'Natural diuretic for kidney and urinary tract comfort'
    ],
    benefitsUrdu: [
      'جگر کو زہریلے مادوں سے پاک اور فعال کرتا ہے',
      'معدے اور سینے کی جلن اور گرمی کو ٹھنڈک پہنچاتا ہے',
      'خون صاف کر کے چہرے کی رنگت نکھارتا ہے',
      'پیشاب کی بندش اور جلن میں فوری سکون دیتا ہے'
    ],
    ingredients: ['100% Pure Distillate of Kasni (Cichorium intybus) - No Artificial Preservatives'],
    ingredientsUrdu: ['خالص کاسنی کے بیج اور جڑ کا مقطر پانی، بنا کسی کیمیکل'],
    dosage: 'Take 50ml to 100ml (half cup) morning and evening before meals.',
    dosageUrdu: 'صبح اور شام نہار منہ یا کھانے سے آدھا گھنٹہ پہلے آدھا کپ (50 تا 100 ملی لیٹر) پئیں۔',
    mizaj: 'Sard-Tar (Cold & Moist)',
    mizajUrdu: 'سرد تر (گرمی و خشکی کو زائل کرنے والا)',
    variants: [
      { weight: '800ml Bottle', price: 320, originalPrice: 420, inStock: true },
      { weight: 'Pack of 3 (800ml x 3)', price: 880, originalPrice: 1200, inStock: true }
    ],
    targetConcerns: ['Liver & Jaundice', 'Digestion & Acidity', 'Skin Detox', 'Heat Stroke & Thirst'],
    inStock: true
  },
  {
    id: 'pure-himalayan-salajeet',
    name: 'Pure Himalayan Shilajit / Salajeet (Gold Grade Resin)',
    urduName: 'خالص ہمالیائی سلاجیت (گولڈ گریڈ اصلی)',
    category: 'honey-shifa',
    categoryName: 'Honey & Shifa Essentials',
    categoryNameUrdu: 'خالص شہد و قدرتی اجزاء',
    shortDesc: '100% authentic purified Shilajit harvested from 18,000+ ft Skardu heights with 84+ minerals.',
    shortDescUrdu: 'سکردو کی بلند و بالا چوٹیوں سے حاصل کردہ خالص سورج تاؤ مصفیٰ سلاجیت، 84 سے زائد قدرتی منرلز۔',
    description: 'Ethically sourced from high altitude Gilgit-Baltistan peaks and purified using traditional Aftabi (sun-cured) methods with Triphala decoction. Rich in 85%+ Fulvic Acid, ionic minerals, and adaptogenic properties for physical stamina, joint vitality, testosterone balance, and cognitive sharpness.',
    descriptionUrdu: 'گلگت بلتستان کے پہاڑوں سے حاصل کی گئی اعلیٰ ترین مصفیٰ سلاجیت۔ یہ جسمانی کمزوری، جوڑوں کے درد، مردانہ طاقت، ذہنی چستی اور قوتِ مدافعت میں بے پناہ اضافہ کرتی ہے۔ لیبارٹری ٹیسٹ شدہ خالص۔',
    price: 1850,
    originalPrice: 2400,
    rating: 5.0,
    reviewsCount: 236,
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
    badge: 'bestseller',
    benefits: [
      'Boosts natural energy, stamina, and cellular vitality',
      'Supports healthy testosterone levels and male vigor',
      'Strengthens joints, cartilage, and bone density',
      'Rich in Fulvic acid & 84 essential ionic trace minerals'
    ],
    benefitsUrdu: [
      'جسمانی توانائی اور اعصابی قوت کو بحال کرتی ہے',
      'مردانہ قوتِ باہ اور ٹیسٹوسٹیرون میں قدرتی اضافہ',
      'جوڑوں، پٹھوں اور ہڈیوں کی سوزش اور درد میں انتہائی کارآمد',
      '84 سے زائد معدنیات اور فولک ایسڈ کا قدرتی خزانہ'
    ],
    ingredients: ['100% Pure Purified Asphaltum Punjabianum (Himalayan Shilajit Resin)'],
    ingredientsUrdu: ['100٪ خالص مصفی ہمالیائی سلاجیت'],
    dosage: 'Pea-sized portion (300-500mg) dissolved in warm milk or green tea daily.',
    dosageUrdu: 'چنے کے دانے کے برابر نیم گرم دودھ یا قہوے میں گھول کر روزانہ لیں۔',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک (اعصاب و پٹھوں کو گرمائش و طاقت دینے والی)',
    variants: [
      { weight: '15g Luxury Jar', price: 1850, originalPrice: 2400, inStock: true },
      { weight: '30g Gold Pack', price: 3200, originalPrice: 4400, inStock: true }
    ],
    targetConcerns: ['Vitality & Stamina', 'Joint Pain & Arthritis', 'Energy & Fatigue', 'Men Health'],
    inStock: true
  },
  {
    id: 'safoof-mughaliz-royal',
    name: 'Safoof-e-Mughaliz Royal (Vitality & Semen Thickener)',
    urduName: 'سفوفِ مغلظ شاہی (قوت و اعصابی مضبوطی)',
    category: 'safoof-powders',
    categoryName: 'Safoof & Powders',
    categoryNameUrdu: 'سفوف و چورن',
    shortDesc: 'Time-tested Unani herbal formulation for male stamina, sperm motility, and nervous strength.',
    shortDescUrdu: 'مردانہ اعصابی کمزوری، مادہ منویہ کی کمی و پتلا پن اور قوتِ باہ کے لیے بے نظیر شاہی سفوف۔',
    description: 'An elite classical Tibbi combination of Salab Misri, Salab Panja, Asgandh, Gond Chuniya, and Musli Safaid. Strengthens the vital organs (Aaza-e-Raeesa), restores peak stamina, cools kidney heat, and builds profound long-term vitality without synthetic side effects.',
    descriptionUrdu: 'ثعلب مصری، ثعلب پنجہ، موصلی سفید، اسگندھ ناگوری اور گوند چنیہ کا شاندار شاہی مرکب۔ جو اعضاء رئیسہ (دل، دماغ، جگر) کو قوت بخشتا ہے، اعصابی کھچاؤ ختم کرتا ہے اور مکمل مردانہ صحت بحال کرتا ہے۔',
    price: 1650,
    originalPrice: 2200,
    rating: 4.9,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    badge: 'hakeem-special',
    benefits: [
      'Thickens seminal fluid and enhances sperm quality',
      'Treats premature weakness and nocturnal emissions',
      'Provides deep nervous and muscular rejuvenation',
      '100% herbal with zero hormones or chemicals'
    ],
    benefitsUrdu: [
      'مادہ منویہ کو گاڑھا کرتا ہے اور جراثیم کی افزائش میں مدد دیتا ہے',
      'سرعت انزال اور احتلام کی شکایت کو جڑ سے ختم کرتا ہے',
      'کمر درد اور پٹھوں کے کھچاؤ کو دور کر کے توانائی بھرتا ہے',
      '100٪ قدرتی نباتاتی جڑی بوٹیوں سے تیار کردہ'
    ],
    ingredients: ['Salab Misri', 'Musli Safaid', 'Asgandh Nagori', 'Tukhm Konch', 'Gond Katira', 'Maghz Badam'],
    ingredientsUrdu: ['ثعلب مصری', 'موصلی سفید', 'اسگندھ ناگوری', 'تخم کونچ', 'گوند کتیرا', 'مغز بادام'],
    dosage: '1 teaspoon (6g) twice daily with warm sweet milk after meals.',
    dosageUrdu: 'ایک چھوٹا چمچ صبح و شام نیم گرم میٹھے دودھ کے ساتھ استعمال کریں۔',
    mizaj: 'Sard-Tar (Cold & Moist)',
    mizajUrdu: 'سرد تر مقوی (جسم کو سیراب اور ٹھنڈک بخشنے والا)',
    variants: [
      { weight: '150g Box', price: 1650, originalPrice: 2200, inStock: true },
      { weight: '300g Full Course', price: 2950, originalPrice: 4000, inStock: true }
    ],
    targetConcerns: ['Men Health', 'Nervous Weakness', 'Vitality & Stamina', 'Back Pain'],
    inStock: true
  },
  {
    id: 'asgandh-nagori-powder',
    name: 'Asgandh Nagori (Pure Indian Ginseng / Ashwagandha)',
    urduName: 'اسگندھ ناگوری خالص (اشوگندھا سفوف)',
    category: 'raw-herbs',
    categoryName: 'Pure Raw Herbs & Spices',
    categoryNameUrdu: 'خالص جڑی بوٹیاں',
    shortDesc: 'Pure grade-A Asgandh root powder for deep sleep, cortisol reduction, muscle growth, and joints.',
    shortDescUrdu: 'بے خوابی، ذہنی تناؤ، اعصابی کمزوری اور جوڑوں کے درد کے لیے خالص ناگوری اسگندھ۔',
    description: 'Harvested from fertile indigenous soils, our Asgandh Nagori roots are triple washed, shadow dried, and finely pulverized to preserve active Withanolides. Calms an overactive nervous system, lowers stress, enhances physical resilience, and relieves joint stiffness.',
    descriptionUrdu: 'ناگور کی اصل خالص اسگندھ کی جڑیں جنہیں سائے میں خشک کر کے خالص سفوف بنایا گیا ہے۔ یہ ڈپریشن، ذہنی تناؤ اور بے خوابی کو ختم کرتی ہے، جسم میں نئی طاقت بھرتی ہے اور جوڑوں کی سوزش دور کرتی ہے۔',
    price: 490,
    originalPrice: 650,
    rating: 4.8,
    reviewsCount: 77,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    badge: 'pure-certified',
    benefits: [
      'Naturally reduces stress hormone (Cortisol) and anxiety',
      'Promotes deep restful sleep and mental clarity',
      'Enhances lean muscle mass and physical strength',
      'Reduces arthritic swelling and joint discomfort'
    ],
    benefitsUrdu: [
      'ذہنی دباؤ، بے چینی اور پریشانی کو قدرتی طور پر کم کرتا ہے',
      'گہری اور پرسکون نیند لانے میں بے مثال',
      'پٹھوں کی مضبوطی اور کمزور جسم کو فربہ بناتا ہے',
      'جوڑوں کے ورم اور درد میں فوری آرام دیتا ہے'
    ],
    ingredients: ['100% Pure Withania Somnifera (Asgandh Root Powder)'],
    ingredientsUrdu: ['100٪ خالص اسگندھ ناگوری جڑ کا باریک سفوف'],
    dosage: 'Half teaspoon (3g) in warm milk with honey at bedtime.',
    dosageUrdu: 'آدھا چمچ رات کو سوتے وقت نیم گرم دودھ اور شہد کے ساتھ لیں۔',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک (بلغم اور سردی کے امراض کو دور کرنے والی)',
    variants: [
      { weight: '100g Pouch', price: 490, originalPrice: 650, inStock: true },
      { weight: '250g Pouch', price: 990, originalPrice: 1350, inStock: true },
      { weight: '500g Value Pack', price: 1850, originalPrice: 2400, inStock: true }
    ],
    targetConcerns: ['Stress & Sleep', 'Joint Pain & Arthritis', 'Energy & Fatigue', 'Immunity'],
    inStock: true
  },
  {
    id: 'amla-khushk-indian-gooseberry',
    name: 'Amla Khushk (Pure Dried Indian Gooseberry)',
    urduName: 'آملہ خشک خالص (دیسی بیج نکلا ہوا)',
    category: 'raw-herbs',
    categoryName: 'Pure Raw Herbs & Spices',
    categoryNameUrdu: 'خالص جڑی بوٹیاں',
    shortDesc: 'Sun-dried deseeded organic Amla for hair fall prevention, eyesight support, and Vitamin C boost.',
    shortDescUrdu: 'بالوں کو گرنے سے روکنے، بینائی تیز کرنے اور وٹامن سی کی کمی پوری کرنے کے لیے مصفیٰ آملہ۔',
    description: 'High-potency Phyllanthus emblica (Amla) whole dried fruit without stones. Hand-selected for exceptional antioxidant value. Widely used for herbal hair oils, Triphala formulations, grey hair reversal, digestive strengthening, and natural immune protection.',
    descriptionUrdu: 'خالص بغیر گٹھلی کا خشک دیسی آملہ۔ یہ بالوں کو گھنا، سیاہ اور لمبا کرنے کے تیلوں میں اور ہاضمے کی اصلاح (اطریفل) میں بنیادی جزو ہے۔ اس میں لیموں اور سنگترے سے 20 گنا زیادہ قدرتی وٹامن سی پایا جاتا ہے۔',
    price: 380,
    originalPrice: 500,
    rating: 4.9,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    badge: 'pure-certified',
    benefits: [
      'Stops premature hair greying and strengthens hair roots',
      'Richest natural source of Vitamin C and bioflavonoids',
      'Enhances digestive fire and cures gastric acidity',
      'Supports healthy eyesight and skin elasticity'
    ],
    benefitsUrdu: [
      'بالوں کو سفید ہونے سے روکتا ہے اور جڑوں کو مضبوط کرتا ہے',
      'قدرتی وٹامن سی کا سب سے بڑا قدرتی ذریعہ',
      'معدے کو طاقت دیتا ہے اور تیزابیت ختم کرتا ہے',
      'آنکھوں کی بینائی کو تیز اور چمکدار بناتا ہے'
    ],
    ingredients: ['100% Deseeded Dried Indian Gooseberry Fruit'],
    ingredientsUrdu: ['100٪ خالص گٹھلی سے پاک خشک دیسی آملہ'],
    dosage: 'Boil in water for hair rinse or take 3g powder with water in morning.',
    dosageUrdu: 'بال دھونے کے لیے پانی میں ابالیں یا 3 گرام سفوف صبح نہار منہ لیں۔',
    mizaj: 'Sard-Khushk (Cold & Dry)',
    mizajUrdu: 'سرد خشک (صفراء اور خون کی حدت کو دبانے والا)',
    variants: [
      { weight: '100g Pack', price: 380, originalPrice: 500, inStock: true },
      { weight: '250g Pack', price: 790, originalPrice: 1050, inStock: true },
      { weight: '1kg Bulk Pack', price: 2750, originalPrice: 3600, inStock: true }
    ],
    targetConcerns: ['Hair & Scalp Care', 'Immunity', 'Digestion & Acidity', 'Eyesight & Brain'],
    inStock: true
  },
  {
    id: 'gond-katira-crystals',
    name: 'Gond Katira (Pure Natural Tragacanth Gum)',
    urduName: 'گوند کتیرا اصلی (سفید شفاف قدرتی ٹھنڈک)',
    category: 'raw-herbs',
    categoryName: 'Pure Raw Herbs & Spices',
    categoryNameUrdu: 'خالص جڑی بوٹیاں',
    shortDesc: 'Crystal white pure Gond Katira for summer cooling, weight control, heat stroke, and gut health.',
    shortDescUrdu: 'گرمی کے اثرات، لو لگنے، جگر و معدے کی شدید تپش اور وزن کم کرنے کے لیے شفاف گوند کتیرا۔',
    description: 'Authentic crystal-clear Astragalus gummifer exudate. When soaked in water, it swells into a thick cooling jelly. Excellent for summer drinks (Sharbat), combating dehydration, reducing nosebleeds (Nakseer), improving skin hydration, and soothing ulcerative intestines.',
    descriptionUrdu: 'درختوں سے قدرتی طور پر حاصل کردہ شفاف گوند کتیرا۔ پانی میں بھگونے پر یہ لذیذ جیلی بن جاتی ہے جو گرمیوں کے شربت، نکسیر پھوٹنے، معدے کے السر اور گرمی دانوں کے لیے بے مثال اکسیر ہے۔',
    price: 450,
    originalPrice: 600,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
    badge: 'bestseller',
    benefits: [
      'Instant cooling antidote against intense summer heat & sunstroke',
      'Provides dietary fiber that suppresses excessive appetite',
      'Strengthens urinary tract and stops burning sensation',
      'Hydrates deep skin layers and prevents sun pigmentation'
    ],
    benefitsUrdu: [
      'گرمی کی شدت اور لو کے خلاف قدرتی ڈھال',
      'فائبر سے بھرپور جو بے وقت کی بھوک مٹا کر وزن کم کرتا ہے',
      'پیشاب کی شدید جلن اور نکسیر میں فوری سکون دیتا ہے',
      'جلد کو تر و تازہ اور داغ دھبوں سے پاک رکھتا ہے'
    ],
    ingredients: ['100% Pure Natural Gum Tragacanth Crystals'],
    ingredientsUrdu: ['خالص سفید شفاف گوند کتیرا کرسٹل'],
    dosage: 'Soak 1 teaspoon in a glass of water overnight. Mix with milk or lemon water in morning.',
    dosageUrdu: 'رات کو ایک چمچ پانی میں بھگو دیں، صبح دودھ یا شربت میں ملا کر پئیں۔',
    mizaj: 'Sard-Tar (Cold & Moist)',
    mizajUrdu: 'سرد تر (گرمی کو ختم کرنے والا اور رطوبت پیدا کرنے والا)',
    variants: [
      { weight: '100g Pack', price: 450, originalPrice: 600, inStock: true },
      { weight: '250g Pack', price: 980, originalPrice: 1300, inStock: true },
      { weight: '500g Value Pack', price: 1850, originalPrice: 2450, inStock: true }
    ],
    targetConcerns: ['Heat Stroke & Thirst', 'Weight Loss & Detox', 'Digestion & Acidity', 'Skin Detox'],
    inStock: true
  },
  {
    id: 'herbal-hair-regrowth-oil',
    name: 'Maha Bhringraj & Roghan Zaitoon Herbal Hair Oil',
    urduName: 'مہا بھنگراج و روغنِ زیتون ہیئر گروتھ آئل',
    category: 'herbal-oils',
    categoryName: 'Herbal Oils & Marham',
    categoryNameUrdu: 'روغنیات و مرہم',
    shortDesc: 'Infused with 21 potent herbs for stopping hair fall, dandruff eradication, and thick new hair growth.',
    shortDescUrdu: '21 نایاب جڑی بوٹیوں سے کشید شدہ بالوں کا گرنا روکنے اور نئے بال اگانے کا خاص روغنی نسخہ۔',
    description: 'An authentic formulation slowly brewed over low heat with pure cold-pressed extra virgin olive oil, sweet almond oil, sesame oil, and 21 raw herbs including Bhringraj, Amla, Shikakai, Ritha, Balchar (Jatamansi), Methi Dana, and Kalonji seed extract.',
    descriptionUrdu: 'خالص زیتون اور روغنِ بادام میں 21 جڑی بوٹیوں (بھنگراج، آملہ، ریٹھا، سکاکائی، بالچھڑ، میتھی دانہ اور کلونجی) کے ساتھ دھیمی آنچ پر پکایا گیا شاہی تیل۔ جو جڑوں کو مضبوط کرتا ہے، گنج پن اور خشکی ختم کرتا ہے۔',
    price: 890,
    originalPrice: 1250,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1608248597358-1e428e8f8ec8?auto=format&fit=crop&w=800&q=80',
    badge: 'bestseller',
    benefits: [
      'Reduces hair fall within 14 days of regular massage',
      'Stimulates dormant hair follicles for new baby hair growth',
      'Permanently clears stubborn dandruff and itchy dry scalp',
      'Gives lustrous shine and natural dark pigment'
    ],
    benefitsUrdu: [
      'صرف 14 دنوں میں بالوں کا گرنا 90 فیصد تک کم کرتا ہے',
      'کمزور اور مردہ بالوں کی جڑوں کو دوبارہ متحرک کرتا ہے',
      'سر کی خشکی، سکری اور خارش کا مکمل خاتمہ',
      'بالوں کو چمکدار، گھنا اور ریشم جیسا نرم بناتا ہے'
    ],
    ingredients: ['Cold-pressed Olive Oil', 'Sweet Almond Oil', 'Bhringraj', 'Amla', 'Balchar', 'Kalonji', 'Brahmi'],
    ingredientsUrdu: ['خالص روغنِ زیتون', 'روغنِ بادام شیریں', 'بھنگراج', 'آملہ', 'بالچھڑ', 'کلونجی', 'براہمی'],
    dosage: 'Massage gently into scalp with fingertips 3 times a week, leave for 2-3 hours or overnight.',
    dosageUrdu: 'ہفتے میں 3 بار انگلیوں کے پوروں سے سر کی جلد میں مالش کریں اور 2 گھنٹے بعد دھو لیں۔',
    mizaj: 'Motadil (Balanced)',
    mizajUrdu: 'معتدل مقوی (دماغ و اعصاب کو تسکین دینے والا)',
    variants: [
      { weight: '120ml Bottle', price: 890, originalPrice: 1250, inStock: true },
      { weight: '250ml Family Pack', price: 1650, originalPrice: 2300, inStock: true }
    ],
    targetConcerns: ['Hair & Scalp Care', 'Stress & Sleep', 'Eyesight & Brain'],
    inStock: true
  },
  {
    id: 'majun-shabab-awar-shahi',
    name: 'Majun Shabab Awar Shahi (Royal Vitality Electuary)',
    urduName: 'معجون شباب آور شاہی (قوتِ مدافعت و توانائی)',
    category: 'majun-jawarish',
    categoryName: 'Majun & Jawarish',
    categoryNameUrdu: 'معجون و جوارش',
    shortDesc: 'Classical Tibbi electuary enriched with Zafran, Amber, Marwareed, and wild mountain honey.',
    shortDescUrdu: 'زعفران، مروارید، عنبر اور خالص پہاڑی شہد سے تیار کردہ اعصابی و جسمانی توانائی کا شاہی نچوڑ۔',
    description: 'An illustrious Tibbi formulation crafted for individuals suffering from chronic physical exhaustion, mental fatigue, premature ageing, and lack of libido. Fortifies the heart, sharpens memory, rejuvenates cardiovascular circulation, and boosts lifelong vigor.',
    descriptionUrdu: 'زعفران کشمیری، عنبر، مروارید، ورقِ نقرہ اور جڑی بوٹیوں کا نایاب مرکب۔ جو دل اور دماغ کو غیر معمولی طاقت بخشتا ہے، عمر رسیدہ افراد اور ناتواں نوجوانوں کے اعصاب میں نئی روح پھونکتا ہے۔',
    price: 2450,
    originalPrice: 3200,
    rating: 5.0,
    reviewsCount: 153,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    badge: 'hakeem-special',
    benefits: [
      'Reinvigorates core nervous system & cardiac performance',
      'Provides enduring vitality and resistance against fatigue',
      'Enhances physical vigor and marital satisfaction',
      'Restores youthful zeal and mental sharpness'
    ],
    benefitsUrdu: [
      'دل، دماغ اور اعصاب کو زبردست توانائی مہیا کرتا ہے',
      'سستی، کاہلی اور کمزوری کا جڑ سے خاتمہ',
      'ازدواجی زندگی میں خوشگوار اعتماد اور قوت',
      'چہرے کی رونق اور جوانی کا احساس بحال کرتا ہے'
    ],
    ingredients: ['Kashmiri Zafran', 'Marwareed (Purified Pearl)', 'Amber', 'Salab Misri', 'Pure Forest Honey', 'Warq Nuqra'],
    ingredientsUrdu: ['زعفران کشمیری', 'مروارید مصفی', 'عنبر', 'ثعلب مصری', 'خالص پہاڑی شہد', 'ورقِ نقرہ'],
    dosage: 'Half teaspoon (5g) twice daily with warm milk, preferably on empty stomach.',
    dosageUrdu: 'صبح نہار منہ یا رات کو سوتے وقت آدھا چمچ نیم گرم دودھ کے ساتھ استعمال کریں۔',
    mizaj: 'Garm-Tar (Hot & Nourishing)',
    mizajUrdu: 'گرم تر (خون پیدا کرنے والا اور اعصاب کو طاقت دینے والا)',
    variants: [
      { weight: '125g Jar', price: 2450, originalPrice: 3200, inStock: true },
      { weight: '250g Royal Course', price: 4500, originalPrice: 6000, inStock: true }
    ],
    targetConcerns: ['Vitality & Stamina', 'Men Health', 'Energy & Fatigue', 'Eyesight & Brain'],
    inStock: true
  },
  {
    id: 'tameer-weight-loss-detox-course',
    name: 'Tameer Herbal Slimming & Belly Fat Burner Course',
    urduName: 'تعمیرِ صحت ہربل سلمنگ و چربی پگھلاؤ کورس',
    category: 'health-courses',
    categoryName: 'Specialized Health Courses',
    categoryNameUrdu: 'خصوصی کورسز',
    shortDesc: '30-Day complete herbal fat loss regimen with zero chemical laxatives or heart palpitations.',
    shortDescUrdu: '30 روزہ مکمل قدرتی ہربل کورس، بغیر کسی ضمنی اثر کے پیٹ اور رانوں کی چربی تیزی سے پگھلائے۔',
    description: 'A clinically designed 3-component holistic treatment: 1x Detoxifying Herbal Safoof, 1x Metabolism Enhancing Green Tea Blend, and 1x Arq-e-Zira Complex. Speeds up resting metabolic rate, flushes water retention, eliminates gas bloating, and curbs unhealthy cravings naturally.',
    descriptionUrdu: '30 دن کا مکمل محفوظ کورس جس میں 1 سفوفِ ہاضم، 1 سپیشل میٹابولک ہربل ٹی اور 1 عرقِ زیرہ شامل ہے۔ یہ جسم کے فالتو مادے خارج کرتا ہے، پیٹ کے ابھار اور چربی کو قدرتی طور پر کم کرتا ہے۔',
    price: 2850,
    originalPrice: 3800,
    rating: 4.8,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'bestseller',
    benefits: [
      'Burns stubborn abdominal and visceral fat safely',
      'Regulates metabolism and improves bowel regularity',
      'No loose motions, zero dizziness or caffeine jitters',
      'Includes complimentary Hakeem Diet & Parhez chart'
    ],
    benefitsUrdu: [
      'پیٹ، کمر اور رانوں کی ضدی چربی کو قدرتی انداز میں گھلاتا ہے',
      'ہاضمہ تیز کر کے گیس، اپھارہ اور قبض کا خاتمہ کرتا ہے',
      'کسی قسم کی کمزوری یا چکر کے بغیر وزن میں 4 تا 6 کلو کمی',
      'ساتھ میں حکیم صاحب کا خصوصی ڈائٹ پلان اور پرہیز چارٹ شامل'
    ],
    ingredients: ['Zira Siah', 'Ajwain Desi', 'Sana Makki (processed)', 'Podina Khushk', 'Kalonji', 'Saunf'],
    ingredientsUrdu: ['زیرہ سیاہ', 'اجوائن دیسی', 'سنا مکی مدبر', 'پودینہ خشک', 'کلونجی', 'سونف'],
    dosage: 'Take herbal tea in morning, Safoof after lunch, and Arq at night as per included schedule.',
    dosageUrdu: 'صبح قہوہ، دوپہر کھانے کے بعد سفوف اور رات کو عرق ہدایات کے مطابق استعمال کریں۔',
    mizaj: 'Garm-Khushk (Hot & Digesting)',
    mizajUrdu: 'گرم خشک (رطوباتِ فاسدہ اور چربی کو خشک کرنے والا)',
    variants: [
      { weight: '30-Day Complete Course', price: 2850, originalPrice: 3800, inStock: true },
      { weight: '60-Day Transformation Pack', price: 5200, originalPrice: 7200, inStock: true }
    ],
    targetConcerns: ['Weight Loss & Detox', 'Digestion & Acidity', 'Fatty Liver'],
    inStock: true
  },
  {
    id: 'kashmiri-zafran-grade-a',
    name: 'Pure Kashmiri Mongra Saffron / Zafran (Grade A+)',
    urduName: 'خالص کشمیری منگرا زعفران (گریڈ اے پلس اصل)',
    category: 'honey-shifa',
    categoryName: 'Honey & Shifa Essentials',
    categoryNameUrdu: 'خالص شہد و قدرتی اجزاء',
    shortDesc: '100% pure deep crimson threads with intense natural aroma, laboratory certified for purity.',
    shortDescUrdu: 'کشمیر کے پامپور کے کھیتوں کا اصل سرخ منگرا زعفران، قدرتی خوشبو اور رنگ کا بے مثال خزانہ۔',
    description: 'Directly sourced from organic saffron farms of Pampore, Kashmir. Contains exclusively full-length deep red stigmas without yellow styles or adulterants. Renowned for enhancing mood, brightening skin complexion, improving vision, and boosting maternal wellness.',
    descriptionUrdu: 'کشمیر سے براہِ راست درآمد شدہ خالص منگرا زعفران۔ اس کے صرف خالص سرخ ریشے شامل ہیں جن میں نہ کوئی رنگ ہے نہ ملاوٹ۔ دل کو فرحت بخشتا ہے، چہرے کی رنگت میں نکھار پیدا کرتا ہے اور ڈپریشن دور کرتا ہے۔',
    price: 1950,
    originalPrice: 2600,
    rating: 5.0,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    badge: 'pure-certified',
    benefits: [
      'Natural anti-depressant and mood uplifting elixir',
      'Enhances facial glow and lightens dark spots',
      'Protects retina and supports sharp eyesight',
      'Traditional pregnancy and postpartum tonic'
    ],
    benefitsUrdu: [
      'ذہنی دباؤ اور اداسی کو ختم کر کے طبیعت میں شگفتگی لاتا ہے',
      'جلد کو قدرتی چمک اور گلابی نکھار عطا کرتا ہے',
      'بینائی کی حفاظت اور آنکھوں کے پٹھوں کو طاقت دیتا ہے',
      'حاملہ خواتین اور نئی ماؤں کے لیے روایتی مقوی غذا'
    ],
    ingredients: ['100% Pure Kashmiri Mongra Saffron Stigmas (Crocus sativus)'],
    ingredientsUrdu: ['100٪ خالص کشمیری زعفران کے سرخ ریشے'],
    dosage: '4 to 6 threads infused in warm milk or tea daily.',
    dosageUrdu: 'روزانہ 4 سے 6 ریشے نیم گرم دودھ یا قہوے میں بھگو کر پیئیں۔',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک مفرح (دل و دماغ کو خوشی و فرحت بخشنے والا)',
    variants: [
      { weight: '1 Gram Sealed Box', price: 1950, originalPrice: 2600, inStock: true },
      { weight: '3 Grams Premium Tin', price: 5400, originalPrice: 7500, inStock: true },
      { weight: '5 Grams Royal Box', price: 8800, originalPrice: 12000, inStock: true }
    ],
    targetConcerns: ['Skin Detox', 'Stress & Sleep', 'Vitality & Stamina', 'Eyesight & Brain'],
    inStock: true
  },
  {
    id: 'ispaghol-musaffa-pure-husk',
    name: 'Ispaghol Musaffa (100% Pure Super White Psyllium Husk)',
    urduName: 'اسپغول مصفیٰ (خالص سفید چھلکا)',
    category: 'raw-herbs',
    categoryName: 'Pure Raw Herbs & Spices',
    categoryNameUrdu: 'خالص جڑی بوٹیاں',
    shortDesc: 'Double-sieved pure white Ispaghol husk for chronic constipation, cholesterol, and IBS relief.',
    shortDescUrdu: 'دہرے چھانے ہوئے خالص سفید اسپغول کے چھلکے، دائمی قبض، کولیسٹرول اور معدے کی تیزابیت کا علاج۔',
    description: 'Grade-A purified Plantago ovata husks. Free from sand, dust, and grain impurities. Expands smoothly to form a protective natural mucilage that relieves constipation, regulates blood glucose, binds excess cholesterol, and heals intestinal ulcers.',
    descriptionUrdu: 'مٹی اور گرد سے مکمل پاک خالص سفید اسپغول۔ یہ آنتوں کو نرم کر کے دائمی قبض سے نجات دلاتا ہے، خون میں کولیسٹرول اور شوگر کو اعتدال پر لاتا ہے اور السر کے زخموں پر حفاظتی تہہ بناتا ہے۔',
    price: 360,
    originalPrice: 480,
    rating: 4.9,
    reviewsCount: 205,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
    badge: 'pure-certified',
    benefits: [
      'Relieves stubborn constipation and irregular bowel movements',
      'Reduces LDL cholesterol and protects cardiac vessels',
      'Provides soothing relief in acidity, GERD, and stomach burn',
      'Aids in healthy weight maintenance by increasing fullness'
    ],
    benefitsUrdu: [
      'دائمی قبض اور پیٹ کے بوجھ کو قدرتی طور پر ختم کرتا ہے',
      'کولیسٹرول کی سطح کو کم کر کے دل کو محفوظ رکھتا ہے',
      'سینے کی جلن، تیزابیت اور السر میں فوری تسکین دیتا ہے',
      'پیٹ بھرنے کا احساس دلا کر وزن متوازن رکھتا ہے'
    ],
    ingredients: ['100% Pure Cleaned Psyllium Husk (Plantago ovata)'],
    ingredientsUrdu: ['100٪ خالص مصفی اسپغول کا چھلکا'],
    dosage: '1 to 2 tablespoons in water, milk, or yogurt before bedtime or meals.',
    dosageUrdu: 'ایک سے دو کھانے کے چمچ پانی، دودھ یا دہی میں ملا کر استعمال کریں۔',
    mizaj: 'Sard-Tar (Cold & Moist)',
    mizajUrdu: 'سرد تر ملین (آنتوں کو تر و نرم کرنے والا)',
    variants: [
      { weight: '100g Box', price: 360, originalPrice: 480, inStock: true },
      { weight: '250g Jar', price: 790, originalPrice: 1050, inStock: true },
      { weight: '500g Value Pack', price: 1450, originalPrice: 1950, inStock: true }
    ],
    targetConcerns: ['Digestion & Acidity', 'Weight Loss & Detox', 'Cholesterol & Heart'],
    inStock: true
  }
];

export const HAKEEMS: HakeemProfile[] = [
  {
    id: 'hakeem-tariq-husseini',
    name: 'Hakeem-e-Hazik Muhammad Tariq Al-Husseini',
    urduName: 'حکیمِ حاذق محمد طارق الحسینی',
    title: 'Senior Tibbi Consultant & Nadi/Pulse Diagnosis Specialist',
    titleUrdu: 'سینئر طبی مشیر و ماہر نبض شناسی',
    experienceYears: 36,
    qualification: 'Fazil-ut-Tibb wal Jarahat (FTJ) Gold Medalist, Jamia Tibbiya',
    specialties: ["Men's Vitality & Stamina", "Chronic Joint & Arthritis", "Liver & Spleen Disorders", "Pulse & Mizaj Diagnostics"],
    specialtiesUrdu: ['مردانہ صحت و اعصابی قوت', 'جوڑوں کے پرانے درد و عرق النساء', 'جگر و معدہ کے امراض', 'نبض و مزاج کی تشخیص'],
    availableDays: 'Mon - Sat (11:00 AM - 9:00 PM)',
    consultationFee: 0, // Free Initial Consultation to build massive trust
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    consultationsDone: 18400,
    bio: 'Carrying forward 3+ generations of classical Unani wisdom since 1990 at Tameer-e-Sehat Karachi. Specializes in non-invasive pulse diagnosis, personalized herbal course formulation, and permanent healing of long-standing ailments without synthetic drugs.',
    bioUrdu: 'تعمیرِ صحت کراچی کے بانی و سرپرست، جن کے پاس 36 سالہ شاندار طبی تجربہ ہے۔ ہزاروں مریضوں کا بغیر کسی مضر سائیڈ ایفیکٹ نبض اور مزاج کے مطابق شافی علاج کر چکے ہیں۔'
  },
  {
    id: 'hakeema-dr-asma-farooq',
    name: 'Hakeema Dr. Asma Farooq (BEMS / FTJ)',
    urduName: 'حکیمہ ڈاکٹر عاصمہ فاروق',
    title: "Head of Women's Health & Herbal Dermatology",
    titleUrdu: 'ماہرِ امراضِ نسواں و جلدی امراض',
    experienceYears: 18,
    qualification: 'Bachelor of Eastern Medicine and Surgery (BEMS), FTJ, Certified Phytotherapist',
    specialties: ['PCOS & Hormonal Imbalance', 'Female Infertility', 'Skin Melasma & Acne', 'Postpartum Healing'],
    specialtiesUrdu: ['پی سی او ایس و ہارمونل بگاڑ', 'بانجھ پن و نسوانی کمزوری', 'چہرے کے داغ دھبے و چھائیاں', 'زچگی کے بعد کی نگہداشت'],
    availableDays: 'Mon - Fri (2:00 PM - 8:00 PM)',
    consultationFee: 0,
    image: 'https://images.unsplash.com/photo-1594824813637-814d975a5078?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    consultationsDone: 9200,
    bio: 'Dedicated female phytotherapist who provides respectful, confidential, and compassionate care for women across Pakistan and overseas. Specialist in natural hormonal balancing, pregnancy wellness, and organic skin rejuvenating remedies.',
    bioUrdu: 'خواتین کے پوشیدہ امراض، ہارمونز کی خرابی، پی سی او ایس اور چہرے کی چھائیوں کے علاج میں خصوصی مہارت رکھتی ہیں۔ ملک بھر کی خواتین کے لیے پردے کے ساتھ رازداری سے رہنمائی۔'
  },
  {
    id: 'hakeem-rizwan-ahmed',
    name: 'Hakeem Rizwan Ahmed Khan',
    urduName: 'حکیم رضوان احمد خان',
    title: 'Gastroenterology & Metabolic Health Specialist',
    titleUrdu: 'ماہر معدہ، جگر، شوگر و موٹاپا',
    experienceYears: 22,
    qualification: 'FTJ, Diploma in Unani Pharmaceutics (PCSIR Certified)',
    specialties: ['IBS, GERD & Acidity', 'Fatty Liver & High Uric Acid', 'Herbal Diabetes Management', 'Obesity & Belly Fat'],
    specialtiesUrdu: ['آنتوں کی سوزش و دائمی تیزابیت', 'فیٹی لیور و یورک ایسڈ', 'ذیابیطس کا قدرتی کنٹرول', 'پیٹ کی چربی و موٹاپا'],
    availableDays: 'Tue - Sun (1:00 PM - 10:00 PM)',
    consultationFee: 0,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    consultationsDone: 12100,
    bio: 'Expert in the interplay between digestive fire (Quwwat-e-Hazima) and metabolic health. Formulator of Tameer-e-Sehat’s renowned stomach and liver courses that have relieved thousands from chronic indigestion and bloating.',
    bioUrdu: 'معدے، جگر اور نظامِ انہضام کے پچیدہ مسائل کو قدرتی نباتاتی ادویات سے حل کرنے میں 22 سال سے متحرک ہیں۔ ان کا تیار کردہ نسخہ ہزاروں مریضوں کو شفا دے چکا ہے۔'
  }
];

export const HERB_ENCYCLOPEDIA: HerbEntry[] = [
  {
    id: 'salajeet-shilajit',
    englishName: 'Himalayan Shilajit (Salajeet)',
    urduName: 'سلاجیت ہمالیائی اصلی',
    botanicalName: 'Asphaltum Punjabianum',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک درجہ دوم',
    primaryUses: ['Joint cartilage regeneration', 'Physical stamina and testosterone support', 'Chronic fatigue reversal', 'Anti-aging adaptogen'],
    primaryUsesUrdu: ['جوڑوں کے درد اور گٹھیا کا خاتمہ', 'مردانہ قوت و ٹیسٹوسٹیرون میں اضافہ', 'اعصابی کمزوری اور سستی کا علاج', 'خلیاتی عمر لمبی کرنے والی قدرتی شے'],
    description: 'A blackish-brown resinous exudate harvested from high Himalayan rock crevices. Purified through sun-filtering (Suraj Taao) to yield pure fulvic mineral essence.',
    descriptionUrdu: 'ہمالیہ کی بلند چوٹیوں کی چٹانوں سے نکلنے والا قدرتی گوند نما مادہ، جسے سورج کی تپش میں دھو کر صاف کیا جاتا ہے۔ یہ 84 سے زائد قدرتی معدنیات کا منبع ہے۔',
    precautions: 'Avoid in acute high uric acid gout flareups without Hakeem guidance. Always drink with warm milk.',
    precautionsUrdu: 'شدید یورک ایسڈ کی حالت میں حکیم کے مشورے کے بغیر نہ لیں۔ ہمیشہ نیم گرم دودھ کے ساتھ استعمال کریں۔',
    relatedProductId: 'pure-himalayan-salajeet',
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'asgandh-ashwagandha',
    englishName: 'Asgandh Nagori (Ashwagandha)',
    urduName: 'اسگندھ ناگوری',
    botanicalName: 'Withania Somnifera',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک درجہ اول',
    primaryUses: ['Anxiety & cortisol reduction', 'Deep sleep restoration', 'Joint inflammation', 'Muscular tone'],
    primaryUsesUrdu: ['ذہنی دباؤ اور بے چینی میں کمی', 'پرسکون نیند لانا', 'پٹھوں کا کھچاؤ اور درد دور کرنا', 'جسمانی کمزوری دور کرنا'],
    description: 'Renowned as the king of Unani adaptogens. The roots strengthen the central nervous system and restore physical endurance.',
    descriptionUrdu: 'یونانی اور آیورویدک طب کی عظیم جڑی بوٹی جو اعصاب کو طاقت دیتی ہے اور ذہنی تناؤ کو دور کرتی ہے۔',
    precautions: 'Do not consume during active high fever or acute gastric heat.',
    precautionsUrdu: 'تیز بخار اور معدے کی شدید گرمی میں اکیلی استعمال نہ کریں۔',
    relatedProductId: 'asgandh-nagori-powder',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'amla-emblica',
    englishName: 'Amla (Indian Gooseberry)',
    urduName: 'آملہ خشک دیسی',
    botanicalName: 'Phyllanthus Emblica',
    mizaj: 'Sard-Khushk (Cold & Dry)',
    mizajUrdu: 'سرد خشک درجہ دوم',
    primaryUses: ['Hair root strengthening', 'Vitamin C immune powerhouse', 'Eyesight nourishment', 'Liver bile regulation'],
    primaryUsesUrdu: ['بالوں کا گرنا روکنا اور سیاہ کرنا', 'وٹامن سی اور مدافعت میں اضافہ', 'بینائی تیز کرنا', 'صفراء کی گرمی دور کرنا'],
    description: 'One of the most revered fruits in traditional medicine. Balances bile (Safra) and cleanses toxic humors.',
    descriptionUrdu: 'طب یونانی کا بنیادی پھل جس میں وٹامن سی کی وافر مقدار پائی جاتی ہے اور ہاضمے اور بالوں کے لیے اکسیر ہے۔',
    precautions: 'Excessive raw consumption may cause slight throat dryness.',
    precautionsUrdu: 'بہت زیادہ مقدار میں گلے میں ہلکی خشکی پیدا کر سکتا ہے۔',
    relatedProductId: 'amla-khushk-indian-gooseberry',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kasni-chicory',
    englishName: 'Kasni (Wild Chicory)',
    urduName: 'کاسنی و عرقِ کاسنی',
    botanicalName: 'Cichorium Intybus',
    mizaj: 'Sard-Tar (Cold & Moist)',
    mizajUrdu: 'سرد تر درجہ اول',
    primaryUses: ['Hepatic jaundice detox', 'Splenic swelling relief', 'Urine obstruction relief', 'Facial redness & heat'],
    primaryUsesUrdu: ['یرقان اور جگر کے امراض', 'تلی کا ورم دور کرنا', 'پیشاب کی جلن کا خاتمہ', 'چہرے کی گرمی اور دانوں کا علاج'],
    description: 'Kasni is mentioned extensively in prophetic medicine and ancient Unani texts as the finest liver protector.',
    descriptionUrdu: 'طب نبوی ﷺ اور یونانی کتب میں کاسنی کو جگر کے لیے سب سے بہترین قدرتی دوا قرار دیا گیا ہے۔',
    precautions: 'Safe for all ages when taken in standard distilled doses.',
    precautionsUrdu: 'عرق کی صورت میں ہر عمر کے افراد کے لیے مکمل محفوظ ہے۔',
    relatedProductId: 'arq-kasni-pure',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gond-katira',
    englishName: 'Gond Katira (Tragacanth Gum)',
    urduName: 'گوند کتیرا اصلی',
    botanicalName: 'Astragalus Gummifer',
    mizaj: 'Sard-Tar (Cold & Moist)',
    mizajUrdu: 'سرد تر درجہ دوم',
    primaryUses: ['Summer heat defense', 'Gastric ulcer cooling', 'Appetite moderation', 'Nosebleed prevention'],
    primaryUsesUrdu: ['گرمی اور لو سے بچاؤ', 'معدے کے السر کو ٹھنڈک پہنچانا', 'وزن کنٹرول کرنا', 'نکسیر کا علاج'],
    description: 'A natural cooling gum that absorbs water up to 20 times its weight into an invigorating gelatinous remedy.',
    descriptionUrdu: 'درختوں سے نکلنے والا شفاف گوند جو پانی میں پھول کر ٹھنڈک بخش جیلی بن جاتا ہے۔',
    precautions: 'Always hydrate fully in water before swallowing.',
    precautionsUrdu: 'ہمیشہ پانی میں اچھی طرح بھگو کر استعمال کریں، خشک نہ نگلیں۔',
    relatedProductId: 'gond-katira-crystals',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kashmiri-zafran',
    englishName: 'Kashmiri Zafran (Saffron)',
    urduName: 'زعفران کشمیری',
    botanicalName: 'Crocus Sativus',
    mizaj: 'Garm-Khushk (Hot & Dry)',
    mizajUrdu: 'گرم خشک درجہ دوم',
    primaryUses: ['Cardiac exhilaration', 'Facial glow & anti-melasma', 'Mood elevation', 'Vital force tonic'],
    primaryUsesUrdu: ['دل کو فرحت و تقویت دینا', 'چہرے کی چمک اور داغ دھبے مٹانا', 'طبیعت کو خوشگوار بنانا', 'روح اور اعصاب کو طاقت دینا'],
    description: 'The golden spice of royalty. Contains crocin and safranal that elevate neurotransmitters and protect cells.',
    descriptionUrdu: 'زعفران کو نباتات کا بادشاہ مانا جاتا ہے جو دل اور دماغ کو خاص فرحت اور چہرے کو نکھار دیتا ہے۔',
    precautions: 'Use minimal pinch dosage (4-6 strands daily).',
    precautionsUrdu: 'صرف چند ریشے (4 سے 6 ریشے) روزانہ کافی ہوتے ہیں۔',
    relatedProductId: 'kashmiri-zafran-grade-a',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Muhammad Kamran Siddiqui',
    city: 'Karachi (Gulshan-e-Iqbal)',
    rating: 5,
    date: '3 days ago',
    comment: 'I have been buying Tahiri Marham and Arq Kasni from their Korangi Dawakhana since my father’s time. Having this online platform with same-day Karachi delivery is a blessing. 100% genuine herbs as always!',
    commentUrdu: 'ہم پچھلے 20 سال سے طاہری مرہم اور جڑی بوٹیاں تعمیرِ صحت سے لے رہے ہیں۔ اب آن لائن آرڈر کرنا بہت آسان ہو گیا ہے اور اسی دن کراچی میں پارسل مل گیا۔ بہت زبردست سروس۔',
    productName: 'Tahiri Marham',
    verified: true
  },
  {
    id: 'rev-2',
    userName: 'Chaudhry Usman Rafique',
    city: 'Lahore (DHA Phase 5)',
    rating: 5,
    date: '1 week ago',
    comment: 'Ordered their Himalayan Salajeet after consulting with Hakeem Tariq Husseini on WhatsApp. My joint stiffness and afternoon lethargy are completely gone in 10 days. Outstanding quality resin.',
    commentUrdu: 'حکیم طارق صاحب سے واٹس ایپ پر مشورے کے بعد سلاجیت منگوائی۔ صرف 10 دن میں گھٹنوں کا درد اور جسمانی تھکن بالکل ختم ہو گئی۔ خالص چیز ہے۔',
    productName: 'Pure Himalayan Shilajit / Salajeet',
    verified: true
  },
  {
    id: 'rev-3',
    userName: 'Farzana Parveen',
    city: 'Islamabad (F-10)',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Hakeema Asma Farooq listened to all my PCOS symptoms patiently. The custom herbal course she prescribed arrived via TCS in 2 days. My skin has cleared up and I feel so much lighter.',
    commentUrdu: 'حکیمہ عاصمہ صاحبہ نے بہت توجہ سے میری بات سنی اور پرہیز چارٹ بھی دیا۔ پی سی او ایس کے لیے کورس 2 دن میں مل گیا، اب طبیعت بہت ہلکی اور پرسکون ہے۔',
    productName: 'Tameer Herbal Slimming Course',
    verified: true
  },
  {
    id: 'rev-4',
    userName: 'Dr. Shahzad Mir',
    city: 'Rawalpindi',
    rating: 5,
    date: '3 weeks ago',
    comment: 'As a medical practitioner, I appreciate their adherence to pure unadulterated botanical standards without adding harmful steroids or chemicals. The Safoof-e-Mughaliz and Asgandh are of pristine quality.',
    commentUrdu: 'بحیثیت ڈاکٹر میں تعمیرِ صحت کے خالص معیار کی تصدیق کرتا ہوں۔ ان کی جڑی بوٹیوں میں کوئی کیمیکل یا سٹیرائیڈز نہیں ہیں۔ خالص یونانی علاج۔',
    productName: 'Safoof-e-Mughaliz Royal',
    verified: true
  }
];

export const MIZAJ_QUESTIONS = [
  {
    id: 'body-frame',
    questionEn: 'What best describes your body build and weight tendency?',
    questionUr: 'آپ کی جسمانی بناوٹ اور وزن کی کیفیت کیسی ہے؟',
    options: [
      { textEn: 'Lean, light frame, finds it difficult to gain weight, dry skin', textUr: 'دبلا پتلا، وزن بمشکل بڑھتا ہے، جلد میں خشکی', value: 'Sawdawi', trait: 'Khushk (Dry)' },
      { textEn: 'Medium athletic build, tends to feel hot quickly, fast metabolism', textUr: 'درمیانہ مضبوط جسم، گرمی جلدی لگتی ہے، ہاضمہ تیز', value: 'Safrawi', trait: 'Garm (Hot)' },
      { textEn: 'Heavier or broad build, gains weight easily, tendency towards water retention', textUr: 'بھاری یا چوڑا جسم، وزن جلدی بڑھتا ہے، سستی کا رجحان', value: 'Balghami', trait: 'Sard (Cold)' },
      { textEn: 'Well-proportioned, muscular, flushed cheeks, active vitality', textUr: 'متناسب اور توانا جسم، چہرے پر سرخی، خون کی وافر مقدار', value: 'Damwi', trait: 'Garm-Tar (Hot-Moist)' }
    ]
  },
  {
    id: 'temperature-tolerance',
    questionEn: 'How does your body react to weather and temperature?',
    questionUr: 'موسم اور درجہ حرارت کے بارے میں آپ کا جسم کیسا محسوس کرتا ہے؟',
    options: [
      { textEn: 'Cannot tolerate extreme summer, feels excessive thirst, loves cold drinks', textUr: 'گرمی بالکل برداشت نہیں ہوتی، پیاس زیادہ لگتی ہے، ٹھنڈے مشروبات پسند ہیں', value: 'Safrawi', trait: 'Hot-Dominant' },
      { textEn: 'Feels cold very easily, hands/feet often chill, loves sun & warmth', textUr: 'سردی جلدی لگتی ہے، ہاتھ پاؤں ٹھنڈے رہتے ہیں، دھوپ اور گرمائش پسند ہے', value: 'Balghami', trait: 'Cold-Dominant' },
      { textEn: 'Sensitive to dry cold winds, easily prone to gas, constipation, and stiffness', textUr: 'خشک ہوا سے طبیعت بگڑتی ہے، گیس، قبض اور جوڑوں کا درد ہوتا ہے', value: 'Sawdawi', trait: 'Dry-Dominant' },
      { textEn: 'Tolerates moderate weather well, sweat is normal, body stays warm', textUr: 'معتدل موسم میں خوشگوار رہتے ہیں، جسم میں فطری گرمائش رہتی ہے', value: 'Damwi', trait: 'Balanced' }
    ]
  },
  {
    id: 'digestion-appetite',
    questionEn: 'How is your daily digestion and appetite?',
    questionUr: 'آپ کا روزمرہ ہاضمہ اور بھوک کی کیفیت کیسی رہتی ہے؟',
    options: [
      { textEn: 'Intense sudden hunger, burning in chest/stomach, sour belching', textUr: 'شدید بھوک، سینے یا معدے میں جلن، کھٹی ڈکاریں', value: 'Safrawi', trait: 'Pitta/Acidic' },
      { textEn: 'Slow sluggish digestion, feels heavy after small meals, white tongue coating', textUr: 'ہاضمہ سست، تھوڑا کھانے پر بھی پیٹ بھاری، زبان پر سفید تہہ', value: 'Balghami', trait: 'Sluggish' },
      { textEn: 'Irregular appetite, frequent bloating, hard stools or constipation', textUr: 'بے قاعدہ بھوک، پیٹ میں گیس اور اپھارہ، خشک قبض', value: 'Sawdawi', trait: 'Irregular' },
      { textEn: 'Good hearty appetite, digests easily, regular morning bowel movement', textUr: 'اچھی کھل کر بھوک لگتی ہے، ہاضمہ تیز اور باقاعدہ', value: 'Damwi', trait: 'Robust' }
    ]
  },
  {
    id: 'sleep-mood',
    questionEn: 'What best reflects your sleep and emotional state?',
    questionUr: 'آپ کی نیند اور ذہنی و جذباتی کیفیت کیسی رہتی ہے؟',
    options: [
      { textEn: 'Light interrupted sleep, overthinking, anxiety, occasional melancholia', textUr: 'ہلکی کچی نیند، گہری سوچیں، بے چینی، اداسی کا رجحان', value: 'Sawdawi', trait: 'Anxious' },
      { textEn: 'Short energetic sleep, quick to react or anger, highly ambitious', textUr: 'کم لیکن چست نیند، غصہ یا جوش جلدی آنا، تیز مزاج', value: 'Safrawi', trait: 'Fiery' },
      { textEn: 'Deep long heavy sleep, finds it hard to wake up early, calm & gentle', textUr: 'گہری اور لمبی نیند، صبح اٹھنے میں سستی، پرسکون اور دھیما مزاج', value: 'Balghami', trait: 'Calm' },
      { textEn: 'Sound 7-8 hours sleep, cheerful, friendly, optimistic outlook', textUr: 'پرسکون 7 سے 8 گھنٹے کی نیند، خوش مزاج اور پر امید طبیعت', value: 'Damwi', trait: 'Cheerful' }
    ]
  }
];

export const MIZAJ_PROFILES = {
  Safrawi: {
    titleEn: 'Safrawi (Bilious / Fire & Air - Hot & Dry)',
    titleUr: 'صفراوی مزاج (گرم خشک - آگ و ہوا کی غالب کیفیت)',
    summaryEn: 'Your body constitution possesses high metabolic heat, sharp intellect, and quick energy, but is susceptible to liver inflammation, heartburn, and skin redness.',
    summaryUr: 'آپ کے جسم میں قدرتی حرارت اور میٹابولزم تیز ہے۔ آپ کو جگر کی گرمی، تیزابیت، اور جلد پر دانوں سے بچنے کے لیے ٹھنڈی و تر اشیاء کی ضرورت ہے۔',
    favorableFoods: ['Arq Kasni', 'Gond Katira', 'Ispaghol Husk', 'Tukhm Balanga', 'Pomegranate', 'Coriander', 'Watermelon'],
    favorableFoodsUrdu: ['عرقِ کاسنی', 'گوند کتیرا', 'اسپغول کا چھلکا', 'تخم بالنگا', 'انار', 'دھنیا', 'تربوز'],
    avoidFoods: ['Deep Fried Pakoras/Samosas', 'Excess Red Meat', 'Hot Green Chillies', 'Over-roasted Masalas'],
    avoidFoodsUrdu: ['تلی ہوئی اشیاء', 'بڑا گوشت', 'تیز ہری مرچیں', 'بہت زیادہ گرم مصالحے'],
    recommendedProducts: ['arq-kasni-pure', 'gond-katira-crystals', 'ispaghol-musaffa-pure-husk', 'tahiri-marham']
  },
  Balghami: {
    titleEn: 'Balghami (Phlegmatic / Water & Earth - Cold & Moist)',
    titleUr: 'بلغمى مزاج (سرد تر - پانی اور مٹی کی غالب کیفیت)',
    summaryEn: 'Your body constitution is naturally calm and resilient, but has slower digestive fire, susceptibility to fluid retention, weight gain, and mucus buildup.',
    summaryUr: 'آپ کا جسم پرسکون ہے مگر ہاضمہ سست ہے جس کی وجہ سے بلغم، وزن کا بڑھنا اور جوڑوں میں سستی پیدا ہو سکتی ہے۔ آپ کو گرم اور خشک غذائیں درکار ہیں۔',
    favorableFoods: ['Pure Salajeet', 'Asgandh Nagori', 'Ginger & Cinnamon Tea', 'Honey', 'Black Pepper', 'Kalonji'],
    favorableFoodsUrdu: ['خالص سلاجیت', 'اسگندھ ناگوری', 'ادرک و دار چینی کا قہوہ', 'خالص شہد', 'کالی مرچ', 'کلونجی'],
    avoidFoods: ['Cold Iced Water', 'Excess Dairy/Yogurt at Night', 'White Flour / Bakery Items', 'Excess Bananas'],
    avoidFoodsUrdu: ['ٹھنڈا برف والا پانی', 'رات کو دہی یا لسی', 'بیکری اور میدے کی اشیاء', 'کھیرا و کیلا'],
    recommendedProducts: ['pure-himalayan-salajeet', 'asgandh-nagori-powder', 'tameer-weight-loss-detox-course']
  },
  Sawdawi: {
    titleEn: 'Sawdawi (Melancholic / Earth & Dryness - Cold & Dry)',
    titleUr: 'سوداوی مزاج (سرد خشک - مٹی اور خشکی کی غالب کیفیت)',
    summaryEn: 'You possess deep analytical intellect and creativity, but dry coldness can lead to insomnia, nervous exhaustion, dry skin, and constipation.',
    summaryUr: 'آپ کی طبیعت میں گہری سوچ اور فہم ہے، لیکن خشکی اور سردی کی زیادتی سے بے خوابی، اعصابی کمزوری، قبض اور گیس کا عارضہ لاحق ہو سکتا ہے۔ تر و گرم غذا مفید ہے۔',
    favorableFoods: ['Roghan Badam (Sweet Almond Oil)', 'Kashmiri Zafran', 'Desi Ghee', 'Fresh Milk', 'Dates', 'Maha Bhringraj Oil'],
    favorableFoodsUrdu: ['روغنِ بادام شیریں', 'کشمیری زعفران', 'دیسی گھی', 'تازہ دودھ', 'کھجور', 'مہا بھنگراج آئل'],
    avoidFoods: ['Stale / Frozen Food', 'Excess Black Tea / Coffee', 'Brinjals (Baingan)', 'Lentils (Masoor Daal)'],
    avoidFoodsUrdu: ['باسی اور فریز کھانا', 'بہت زیادہ چائے یا کافی', 'بینگن', 'مسور کی دال'],
    recommendedProducts: ['kashmiri-zafran-grade-a', 'herbal-hair-regrowth-oil', 'majun-shabab-awar-shahi']
  },
  Damwi: {
    titleEn: 'Damwi (Sanguine / Blood & Warmth - Hot & Moist)',
    titleUr: 'دموی مزاج (گرم تر - خون اور متوازن حرارت کی غالب کیفیت)',
    summaryEn: 'Your body has strong vitality, excellent stamina, and radiant circulation, but needs balance to prevent high blood pressure or liver congestion.',
    summaryUr: 'آپ کا جسم توانا اور خون سے بھرپور ہے۔ آپ کو خون کے دباؤ اور کولیسٹرول سے محفوظ رہنے کے لیے متوازن غذائیں اور ہلکا ڈیٹوکس استعمال کرنا چاہیے۔',
    favorableFoods: ['Amla Powder', 'Ispaghol Husk', 'Lemon Water', 'Barley Water (Sattoo)', 'Green Leafy Vegetables'],
    favorableFoodsUrdu: ['آملہ پاؤڈر', 'اسپغول', 'لیموں پانی', 'جو کا ستو', 'سبز پتوں والی سبزیاں'],
    avoidFoods: ['Heavy Oily Biryani', 'Excess Sweet Halwas', 'Heavy Butter', 'Fast Food'],
    avoidFoodsUrdu: ['چکنائی والی بریانی', 'بہت میٹھے حلوے', 'ضرورت سے زیادہ مکھن', 'فاسٹ فوڈ'],
    recommendedProducts: ['amla-khushk-indian-gooseberry', 'ispaghol-musaffa-pure-husk', 'safoof-mughaliz-royal']
  }
};

export const FAQS = [
  {
    qEn: 'Are Tameer-e-Sehat products 100% natural and free from steroids?',
    qUr: 'کیا تعمیرِ صحت کی تمام جڑی بوٹیاں اور ادویات 100٪ قدرتی اور کیمیکلز سے پاک ہیں؟',
    aEn: 'Yes, absolutely. Since 1990, our Dawakhana upholds the strictest standards of classical Unani Tibb. We never use steroids, chemicals, or synthetic additives. All herbs are hand-cleaned and quality-tested.',
    aUr: 'جی ہاں، بالکل! 1990 سے ہمارا دواخانہ روایتی طبِ یونانی کے اصولوں پر کاربند ہے۔ ہماری تمام جڑی بوٹیوں اور نسخہ جات میں کسی قسم کے سٹیرائیڈز، کیمیکلز یا مصنوعی اجزاء شامل نہیں ہوتے۔'
  },
  {
    qEn: 'How does online Hakeem consultation work?',
    qUr: 'آن لائن حکیم صاحب سے مشورہ کیسے کیا جاتا ہے؟',
    aEn: 'You can select your preferred Hakeem on our website, fill in your symptoms or upload your medical report/prescription, and connect directly via WhatsApp audio/video call or chat for a personalized treatment plan.',
    aUr: 'آپ ہماری ویب سائٹ پر حکیم صاحب کا انتخاب کر کے اپنی علامات درج کر سکتے ہیں یا نسخے کی تصویر بھیج سکتے ہیں۔ اس کے بعد واٹس ایپ یا فون کال پر براہ راست تفصیلی مفت مشورہ حاصل کر سکتے ہیں۔'
  },
  {
    qEn: 'What are the delivery charges and delivery times across Pakistan?',
    qUr: 'ڈلیوری کا طریقہ کار، وقت اور فیس کیا ہے؟',
    aEn: 'We deliver to all 250+ cities across Pakistan via TCS, Leopards, and Trax. Delivery is FREE on orders above Rs. 2,500. For orders below Rs. 2,500, flat delivery fee is Rs. 200. Karachi orders are delivered in 24 hours, other cities take 2-3 working days. Cash on Delivery (COD) is available nationwide.',
    aUr: 'ہم پورے پاکستان کے تمام شہروں میں ٹی سی ایس، لیپرڈز اور ٹریکس کے ذریعے کیش آن ڈلیوری (COD) فراہم کرتے ہیں۔ 2500 روپے سے زائد کے آرڈر پر ڈلیوری بالکل مفت ہے۔ کراچی میں 24 گھنٹے اور دیگر شہروں میں 2 سے 3 دن میں پارسل پہنچ جاتا ہے۔'
  },
  {
    qEn: 'Can I get my custom Hakeem prescription (Nuskha) prepared by you?',
    qUr: 'کیا میں اپنے کسی بھی حکیم یا ڈاکٹر کے نسخے کی جڑی بوٹیاں آپ سے تیار کروا سکتا ہوں؟',
    aEn: 'Yes! Use our "Upload Prescription / Nuskha" tool or WhatsApp us a clear photo of your prescription. Our certified herbal pharmacists will weigh, grind, and prepare the pure authentic ingredients and dispatch it to your address.',
    aUr: 'جی ہاں! آپ "نسخہ اپلوڈ کریں" کے بٹن پر کلک کر کے یا واٹس ایپ پر نسخے کی تصویر بھیج سکتے ہیں۔ ہمارے ماہرین اصل جڑی بوٹیوں سے خالص دوا تیار کر کے آپ کے پتے پر بھیج دیں گے۔'
  },
  {
    qEn: 'Where is your physical Dawakhana shop located in Karachi?',
    qUr: 'کراچی میں آپ کا فزیکل دواخانہ کہاں واقع ہے؟',
    aEn: 'Our main store is located at Plot no L, 41 Korangi Crossing Rd, K.D.A Allah Wala Town Sector 31 B Korangi, Karachi. You are welcome to visit for in-person pulse diagnosis (Nadi Pariksha) and raw herb selection.',
    aUr: 'ہمارا مرکزی دواخانہ پلاٹ نمبر ایل، 41 کورنگی کراسنگ روڈ، کے ڈی اے اللہ والا ٹاؤن سیکٹر 31 بی کورنگی، کراچی میں واقع ہے۔ آپ تشریف لا کر ذاتی طور پر نبض چیک کروا سکتے ہیں۔'
  }
];

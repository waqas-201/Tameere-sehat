export type Language = 'en' | 'ur';

export type ProductCategory = 
  | 'all'
  | 'raw-herbs'
  | 'arqiyat'
  | 'majun-jawarish'
  | 'safoof-powders'
  | 'herbal-oils'
  | 'health-courses'
  | 'honey-shifa';

export interface ProductVariant {
  weight: string;
  price: number; // in PKR
  originalPrice?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  urduName: string;
  category: ProductCategory;
  categoryName: string;
  categoryNameUrdu: string;
  shortDesc: string;
  shortDescUrdu: string;
  description: string;
  descriptionUrdu: string;
  price: number; // in PKR
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: 'bestseller' | 'pure-certified' | 'hakeem-special' | 'limited';
  benefits: string[];
  benefitsUrdu: string[];
  ingredients: string[];
  ingredientsUrdu: string[];
  dosage: string;
  dosageUrdu: string;
  mizaj: string;
  mizajUrdu: string;
  variants: ProductVariant[];
  targetConcerns: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface HakeemProfile {
  id: string;
  name: string;
  urduName: string;
  title: string;
  titleUrdu: string;
  experienceYears: number;
  qualification: string;
  specialties: string[];
  specialtiesUrdu: string[];
  availableDays: string;
  consultationFee: number; // 0 for free basic or small token
  image: string;
  rating: number;
  consultationsDone: number;
  bio: string;
  bioUrdu: string;
}

export interface HerbEntry {
  id: string;
  englishName: string;
  urduName: string;
  botanicalName: string;
  mizaj: string;
  mizajUrdu: string;
  primaryUses: string[];
  primaryUsesUrdu: string[];
  description: string;
  descriptionUrdu: string;
  precautions: string;
  precautionsUrdu: string;
  relatedProductId?: string;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  commentUrdu: string;
  productName: string;
  verified: boolean;
}

export interface ConsultationRequest {
  fullName: string;
  phone: string;
  city: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  hakeemId: string;
  preferredMode: 'whatsapp-chat' | 'audio-call' | 'video-call' | 'in-clinic';
  primaryIssue: string;
  durationOfIssue: string;
  notes?: string;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  date: string;
  status: 'Pending Verification' | 'Processing' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
  courier: 'TCS Express' | 'Leopards' | 'Trax Courier' | 'Call Courier';
}

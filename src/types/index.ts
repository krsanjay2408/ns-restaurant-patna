export type DietaryType = 'veg' | 'non-veg' | 'jain';

export type DishCategory = 
  | 'all'
  | 'patna_specials' 
  | 'rolls_wraps' 
  | 'fast_food' 
  | 'chicken_specials' 
  | 'mutton_specials' 
  | 'pure_veg_paneer' 
  | 'biryani_breads' 
  | 'icecream_desserts' 
  | 'beverages';

export type MealTimeRecommendation = 
  | 'all'
  | 'evening_snack' 
  | 'lunch_thali' 
  | 'royal_dinner' 
  | 'late_night_sweet' 
  | 'budget_bite';

export interface Dish {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  category: Exclude<DishCategory, 'all'>;
  price: number;
  dietary: DietaryType;
  isJainFriendly?: boolean;
  spiceLevel: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Tikha
  allergens: string[];
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  isChefSpecial?: boolean;
  prepTimeMinutes: number;
  mealTags?: MealTimeRecommendation[];
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  specialInstructions?: string;
}

export type OrderType = 'delivery' | 'pickup' | 'dine_in';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';
export type OrderStatus = 'received' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderType: OrderType;
  deliveryAddress?: string;
  pincode?: string;
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  packagingCharge: number;
  gstAmount: number; // 5% (2.5% CGST + 2.5% SGST)
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  orderStatus: OrderStatus;
  createdAt: string;
  estimatedDeliveryMinutes: number;
}

export interface TableBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingArea: 'indoor_ac' | 'royal_patio' | 'family_lounge';
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'cancelled';
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  savedAddresses: {
    id: string;
    label: 'Home' | 'Office' | 'Other';
    address: string;
    landmark: string;
    pincode: string;
  }[];
  favoriteDishIds: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  suggestedDishes?: Dish[];
  timestamp: string;
}

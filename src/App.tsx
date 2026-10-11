import React, { useState, useEffect } from 'react';
import { Dish, CartItem, Order, TableBooking, Coupon, UserProfile, OrderType, OrderStatus, DishCategory, MealTimeRecommendation } from './types';
import { INITIAL_DISHES, INITIAL_ORDERS, INITIAL_BOOKINGS, PATNA_PINCODES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { MealRecommender } from './components/MealRecommender';
import { MenuSection } from './components/MenuSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReservationModal } from './components/ReservationModal';
import { AuthModal } from './components/AuthModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { AdminPortal } from './components/AdminPortal';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  // Dishes State
  const [dishes, setDishes] = useState<Dish[]>(() => {
    const saved = localStorage.getItem('ns_patna_dishes_v2');
    return saved ? JSON.parse(saved) : INITIAL_DISHES;
  });

  // Category & Meal Recommendation State
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('all');
  const [selectedMealTag, setSelectedMealTag] = useState<MealTimeRecommendation>('all');

  // Cart State (dishId -> quantity)
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('ns_patna_cart');
    return saved ? JSON.parse(saved) : {};
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ns_patna_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Table Bookings State
  const [bookings, setBookings] = useState<TableBooking[]>(() => {
    const saved = localStorage.getItem('ns_patna_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // User State
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ns_patna_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Order Settings
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [pincode, setPincode] = useState<string>('800001');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('ns_patna_cart', JSON.stringify(cartQuantities));
  }, [cartQuantities]);

  useEffect(() => {
    localStorage.setItem('ns_patna_dishes_v2', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('ns_patna_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ns_patna_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ns_patna_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ns_patna_user');
    }
  }, [user]);

  // Cart Calculations
  const cartItems: CartItem[] = Object.entries(cartQuantities)
    .filter(([_, qty]) => qty > 0)
    .map(([dishId, qty]) => {
      const dish = dishes.find(d => d.id === dishId);
      return dish ? { dish, quantity: qty } : null;
    })
    .filter(Boolean) as CartItem[];

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (dish: Dish) => {
    setCartQuantities((prev) => ({
      ...prev,
      [dish.id]: (prev[dish.id] || 0) + 1,
    }));
    showToast(`Added ${dish.name} to cart!`);
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartQuantities((prev) => {
      const current = prev[dishId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[dishId];
        return copy;
      }
      return { ...prev, [dishId]: next };
    });
  };

  const handleRemoveItem = (dishId: string) => {
    setCartQuantities((prev) => {
      const copy = { ...prev };
      delete copy[dishId];
      return copy;
    });
  };

  const handleClearCart = () => {
    setCartQuantities({});
    setAppliedCoupon(null);
  };

  // Order Placement
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    handleClearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setActiveTrackingOrder(newOrder);
    setIsOrderTrackingOpen(true);
    showToast(`Order #${newOrder.id} confirmed! Preparing in kitchen.`);
  };

  // Table Booking
  const handleBookingSuccess = (booking: TableBooking) => {
    setBookings((prev) => [booking, ...prev]);
    showToast(`Table booked successfully (Ref: ${booking.id})`);
  };

  // Admin Handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder((prev) => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
  };

  const handleToggleDishAvailability = (dishId: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d))
    );
  };

  const handleUpdateDishPrice = (dishId: string, newPrice: number) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, price: newPrice } : d))
    );
    showToast('Dish price updated!');
  };

  const handleUpdateBookingStatus = (bookingId: string, status: 'confirmed' | 'seated' | 'cancelled') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  // Admin Test Order Trigger
  const handleTriggerSimulatedOrder = () => {
    const testOrder: Order = {
      id: `NS-${Math.floor(2000 + Math.random() * 7000)}`,
      customerName: 'Kunal Kashyap',
      customerPhone: '+91 94311 55443',
      orderType: 'delivery',
      deliveryAddress: 'Road 3, Patliputra Colony, Patna',
      pincode: '800013',
      items: [
        { dish: dishes[0], quantity: 1 },
        { dish: dishes[3], quantity: 2 },
      ],
      subtotal: 800,
      packagingCharge: 25,
      gstAmount: 40,
      deliveryFee: 0,
      discount: 100,
      couponCode: 'PATNA100',
      total: 765,
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      orderStatus: 'received',
      createdAt: new Date().toISOString(),
      estimatedDeliveryMinutes: 25,
    };
    setOrders((prev) => [testOrder, ...prev]);
    showToast('New incoming order received with sound chime!');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 300,
          background: 'rgba(11, 15, 23, 0.95)',
          border: '1.5px solid #f59e0b',
          borderRadius: '30px',
          padding: '10px 22px',
          color: '#fde68a',
          fontSize: '13px',
          fontWeight: '700',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(245, 158, 11, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.25s ease'
        }}>
          <CheckCircle2 size={16} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Hero
          onOrderClick={() => {
            const el = document.getElementById('menu');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onReserveClick={() => setIsReservationOpen(true)}
        />

        {/* Visual Category Showcase */}
        <CategoryShowcase
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedMealTag('all');
          }}
        />

        {/* Smart Meal Recommender ("Kab Kya Khana Chahiye?") */}
        <div className="container-custom">
          <MealRecommender
            selectedMealTag={selectedMealTag}
            onSelectMealTag={(tag) => {
              setSelectedMealTag(tag);
              setSelectedCategory('all');
              const el = document.getElementById('menu');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        {/* Dynamic Filterable Menu */}
        <MenuSection
          dishes={dishes}
          cartItems={cartQuantities}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedMealTag={selectedMealTag}
          onSelectMealTag={setSelectedMealTag}
        />

        <ReviewsSection />

        <ContactSection />
      </main>

      {/* Floating AI Chat Assistant */}
      <AIAssistantWidget
        dishes={dishes}
        onAddToCart={handleAddToCart}
      />

      {/* Mobile App Bottom Navigation */}
      <MobileBottomBar
        cartCount={cartCount}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenAuthOrProfile={() => {
          if (user) {
            setIsProfileOpen(true);
          } else {
            setIsAuthOpen(true);
          }
        }}
        user={user}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        onSetOrderType={setOrderType}
        pincode={pincode}
        onSetPincode={setPincode}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        packagingCharge={orderType === 'dine_in' ? 0 : 25}
        gstAmount={Math.round(cartSubtotal * 0.05 * 100) / 100}
        deliveryFee={orderType === 'delivery' ? (cartSubtotal >= 699 ? 0 : (PATNA_PINCODES[pincode]?.deliveryFee || 40)) : 0}
        discount={appliedCoupon ? (appliedCoupon.discountType === 'flat' ? appliedCoupon.discountValue : Math.min(appliedCoupon.maxDiscount || 999, (cartSubtotal * appliedCoupon.discountValue) / 100)) : 0}
        couponCode={appliedCoupon?.code}
        total={Math.max(0, Math.round((cartSubtotal + (orderType === 'dine_in' ? 0 : 25) + (cartSubtotal * 0.05) + (orderType === 'delivery' ? (cartSubtotal >= 699 ? 0 : 40) : 0) - (appliedCoupon ? 50 : 0)) * 100) / 100)}
        orderType={orderType}
        pincode={pincode}
        user={user}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        order={activeTrackingOrder}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onBookingSuccess={handleBookingSuccess}
        user={user}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast(`Welcome to NS Restaurant, ${loggedUser.name}!`);
        }}
      />

      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        orders={orders}
        bookings={bookings}
        onSignOut={() => {
          setUser(null);
          showToast('Signed out of account');
        }}
        onTrackOrder={(ord) => {
          setActiveTrackingOrder(ord);
          setIsOrderTrackingOpen(true);
        }}
        onReorder={(ord) => {
          const newQty: Record<string, number> = {};
          ord.items.forEach(it => {
            newQty[it.dish.id] = it.quantity;
          });
          setCartQuantities(newQty);
          setIsCartOpen(true);
          showToast('Feast re-added to your cart!');
        }}
      />

      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        dishes={dishes}
        onToggleDishAvailability={handleToggleDishAvailability}
        onUpdateDishPrice={handleUpdateDishPrice}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onTriggerSimulatedOrder={handleTriggerSimulatedOrder}
      />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, ChefHat, Bike, Home, Printer, MessageSquare, Phone, MapPin } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  if (!isOpen || !order) return null;

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.orderStatus);
  const [minsRemaining, setMinsRemaining] = useState(order.estimatedDeliveryMinutes || 25);

  // Status progression simulation
  useEffect(() => {
    const statusSequence: OrderStatus[] = ['received', 'preparing', 'out_for_delivery', 'delivered'];
    const currentIndex = statusSequence.indexOf(order.orderStatus);

    if (currentIndex < 3) {
      const timer = setTimeout(() => {
        const nextStatus = statusSequence[currentIndex + 1];
        setCurrentStatus(nextStatus);
        setMinsRemaining((prev) => Math.max(5, prev - 10));
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [order.orderStatus]);

  const stages = [
    { key: 'received', label: 'Order Received', desc: 'Kitchen acknowledged', icon: CheckCircle2 },
    { key: 'preparing', label: 'Cooking in Kitchen', desc: 'Simmering clay handis & tandoor', icon: ChefHat },
    { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Rider on the way in Patna', icon: Bike },
    { key: 'delivered', label: 'Delivered', desc: 'Enjoy your royal feast!', icon: Home },
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'received': return 0;
      case 'preparing': return 1;
      case 'out_for_delivery': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const activeIndex = getStageIndex(currentStatus);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', paddingBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
                LIVE TRACKING
              </span>
              <h3 className="font-serif" style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>
                Order #{order.id}
              </h3>
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '2px' }}>
              Placed at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {/* ETA Highlight Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.25) 0%, rgba(15, 21, 35, 0.9) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '26px'
        }}>
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#fde68a', fontWeight: '700' }}>
              Estimated Delivery Time
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <Clock size={24} color="#f59e0b" />
              <span>{currentStatus === 'delivered' ? 'Delivered' : `~${minsRemaining} Mins`}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Status</span>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#10b981', textTransform: 'capitalize' }}>
              {currentStatus.replace(/_/g, ' ')}
            </div>
          </div>
        </div>

        {/* Stepper Pipeline */}
        <div style={{ marginBottom: '30px', padding: '0 8px' }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
            {/* Horizontal Track Line */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1
            }}>
              <div style={{
                height: '100%',
                background: 'var(--gold-gradient)',
                width: `${(activeIndex / (stages.length - 1)) * 100}%`,
                transition: 'width 0.5s ease'
              }} />
            </div>

            {/* Stepper Nodes */}
            {stages.map((st, idx) => {
              const Icon = st.icon;
              const isDone = idx <= activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={st.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: '80px', textAlign: 'center' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: isDone ? 'var(--gold-gradient)' : '#161e31',
                    color: isDone ? '#0b0f17' : '#94a3b8',
                    border: isCurrent ? '3px solid #fff' : '2px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isCurrent ? '0 0 15px rgba(245, 158, 11, 0.7)' : 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: isDone ? '700' : '500', color: isDone ? '#fff' : '#64748b', marginTop: '8px' }}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Partner Info (when Out for delivery) */}
        {activeIndex >= 2 && (
          <div style={{
            background: 'rgba(18, 24, 38, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#f59e0b', color: '#0b0f17', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                RK
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#fff' }}>Ramesh Kumar (NS Rider)</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Hero Splendor (BR-01-ET-4819)</div>
              </div>
            </div>

            <a 
              href="tel:+91943100223"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10b981',
                color: '#34d399',
                padding: '6px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: '700'
              }}
            >
              <Phone size={13} /> Call
            </a>
          </div>
        )}

        {/* Order Details & Items List */}
        <div style={{
          background: 'rgba(15, 21, 35, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fde68a', marginBottom: '10px' }}>
            Items Ordered
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {order.items.map(({ dish, quantity }) => (
              <div key={dish.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#cbd5e1' }}>
                  {quantity}x {dish.name}
                </span>
                <span style={{ fontWeight: '700', color: '#fff' }}>
                  ₹{dish.price * quantity}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '12px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '800' }}>
            <span>Total Paid ({order.paymentMethod.toUpperCase()})</span>
            <span className="text-gold">₹{order.total}</span>
          </div>
        </div>

        {/* Destination Address if delivery */}
        {order.deliveryAddress && (
          <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '20px' }}>
            <MapPin size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>Delivering to: <strong style={{ color: '#fff' }}>{order.deliveryAddress}</strong> (PIN: {order.pincode})</span>
          </div>
        )}

        {/* Print Bill & WhatsApp Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handlePrint}
            className="btn-outline-gold"
            style={{ flex: 1, padding: '11px', fontSize: '13px' }}
          >
            <Printer size={15} />
            <span>Print Tax Invoice</span>
          </button>

          <a 
            href={`https://wa.me/919431000000?text=Hi%20NS%20Restaurant,%20inquiring%20about%20Order%20${order.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ flex: 1, padding: '11px', fontSize: '13px', textDecoration: 'none' }}
          >
            <MessageSquare size={15} />
            <span>WhatsApp Updates</span>
          </a>
        </div>
      </div>
    </div>
  );
};

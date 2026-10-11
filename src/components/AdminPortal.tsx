import React, { useState } from 'react';
import { X, Volume2, ShieldCheck, TrendingUp, ShoppingBag, Calendar, Utensils, ToggleLeft, ToggleRight, Check, AlertCircle, Plus } from 'lucide-react';
import { Order, Dish, TableBooking, OrderStatus } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  dishes: Dish[];
  onToggleDishAvailability: (dishId: string) => void;
  onUpdateDishPrice: (dishId: string, newPrice: number) => void;
  bookings: TableBooking[];
  onUpdateBookingStatus: (bookingId: string, status: 'confirmed' | 'seated' | 'cancelled') => void;
  onTriggerSimulatedOrder: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateOrderStatus,
  dishes,
  onToggleDishAvailability,
  onUpdateDishPrice,
  bookings,
  onUpdateBookingStatus,
  onTriggerSimulatedOrder,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'bookings' | 'analytics'>('orders');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // Sound chime using Web Audio API
  const playChimeSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.log('Audio alert fallback', e);
    }
  };

  const handleSimulateWithSound = () => {
    playChimeSound();
    onTriggerSimulatedOrder();
  };

  // Calculations for daily report
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter(o => o.orderStatus !== 'delivered').length;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ padding: '16px' }}>
      <div
        className="glass-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: '20px',
          border: '1.5px solid #f59e0b',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(245, 158, 11, 0.25)'
        }}
      >
        {/* Admin Header */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(135deg, #111827 0%, #1a2234 100%)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f59e0b', color: '#0b0f17', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-serif" style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                NS Restaurant Staff Portal
              </h3>
              <p style={{ fontSize: '12px', color: '#f59e0b' }}>
                Fraser Road Kitchen & Operations Manager
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Test Order Trigger with Sound */}
            <button
              onClick={handleSimulateWithSound}
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid #f59e0b',
                color: '#fde68a',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Simulates incoming order with audio alert chime"
            >
              <Volume2 size={14} /> + Incoming Order Alert
            </button>

            <button onClick={onClose} className="btn-icon" style={{ width: '34px', height: '34px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 24px',
          background: '#090d14',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {[
            { id: 'orders', label: `Live Orders (${activeOrdersCount})`, icon: ShoppingBag },
            { id: 'menu', label: `Menu Manager (${dishes.length})`, icon: Utensils },
            { id: 'bookings', label: `Table Bookings (${bookings.length})`, icon: Calendar },
            { id: 'analytics', label: 'Sales Analytics', icon: TrendingUp },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                style={{
                  background: isActive ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.04)',
                  color: isActive ? '#0b0f17' : '#94a3b8',
                  border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: isActive ? '800' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Icon size={15} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#0a0e17' }}>
          {/* TAB 1: LIVE ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>
                  Live Orders Pipeline
                </h4>
                <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                  Audio Chime Enabled
                </span>
              </div>

              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No orders currently placed. Click "+ Incoming Order Alert" above to test!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      style={{
                        background: 'rgba(18, 24, 38, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '800', fontSize: '16px', color: '#fff' }}>
                              #{ord.id}
                            </span>
                            <span style={{ fontSize: '12px', color: '#f59e0b', textTransform: 'uppercase', fontWeight: '700' }}>
                              [{ord.orderType.replace('_', ' ')}]
                            </span>
                          </div>
                          <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '2px' }}>
                            {ord.customerName} ({ord.customerPhone})
                          </div>
                          {ord.deliveryAddress && (
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                              📍 {ord.deliveryAddress} (PIN: {ord.pincode})
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '18px', fontWeight: '800', color: '#fde68a' }}>
                            ₹{ord.total}
                          </div>
                          <span style={{ fontSize: '11px', color: ord.paymentStatus === 'paid' ? '#10b981' : '#f59e0b', fontWeight: '700' }}>
                            {ord.paymentStatus === 'paid' ? '✓ PAID ONLINE' : '⚠ CASH ON DELIVERY'}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: '#cbd5e1' }}>
                        {ord.items.map(it => (
                          <div key={it.dish.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                            <span>{it.quantity}x {it.dish.name}</span>
                            <span style={{ fontWeight: '600' }}>₹{it.dish.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Status Update Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', paddingTop: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                          Current Status: <strong style={{ color: '#fff', textTransform: 'capitalize' }}>{ord.orderStatus.replace(/_/g, ' ')}</strong>
                        </span>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          {(['received', 'preparing', 'out_for_delivery', 'delivered'] as OrderStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => onUpdateOrderStatus(ord.id, st)}
                              style={{
                                background: ord.orderStatus === st ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                                color: ord.orderStatus === st ? '#0b0f17' : '#cbd5e1',
                                border: ord.orderStatus === st ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                padding: '5px 10px',
                                fontSize: '11px',
                                fontWeight: ord.orderStatus === st ? '800' : '600',
                                cursor: 'pointer',
                                textTransform: 'capitalize'
                              }}
                            >
                              {st.replace(/_/g, ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MENU MANAGER (CRUD) */}
          {activeTab === 'menu' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>
                  Live Menu & Inventory Availability
                </h4>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Toggle "Sold Out" instantly disables dishes on customer menu
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    style={{
                      background: 'rgba(18, 24, 38, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                      <img src={dish.imageUrl} alt={dish.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className={dish.dietary === 'veg' ? 'badge-veg' : 'badge-nonveg'} style={{ width: '12px', height: '12px' }} />
                          <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {dish.name}
                          </h5>
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'capitalize' }}>
                          {dish.category.replace(/_/g, ' ')} • Prep: {dish.prepTimeMinutes}m
                        </div>
                      </div>
                    </div>

                    {/* Price Edit */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {editingPriceId === dish.id ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: '#fde68a', fontWeight: '700' }}>₹</span>
                          <input
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(Number(e.target.value))}
                            style={{ width: '65px', background: '#121826', border: '1px solid #f59e0b', color: '#fff', borderRadius: '4px', padding: '4px', fontSize: '13px' }}
                          />
                          <button
                            onClick={() => { onUpdateDishPrice(dish.id, tempPrice); setEditingPriceId(null); }}
                            className="btn-gold"
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => { setEditingPriceId(dish.id); setTempPrice(dish.price); }}
                          style={{ fontSize: '15px', fontWeight: '800', color: '#fde68a', cursor: 'pointer', background: 'rgba(255,255,255,0.04)', padding: '4px 8px', borderRadius: '6px' }}
                          title="Click to edit price"
                        >
                          ₹{dish.price} ✎
                        </div>
                      )}
                    </div>

                    {/* Availability Switch */}
                    <button
                      onClick={() => onToggleDishAvailability(dish.id)}
                      style={{
                        background: dish.isAvailable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        border: dish.isAvailable ? '1px solid #10b981' : '1px solid #ef4444',
                        color: dish.isAvailable ? '#34d399' : '#f87171',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {dish.isAvailable ? 'In Stock (Live)' : 'Marked Sold Out'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TABLE BOOKINGS */}
          {activeTab === 'bookings' && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
                Table Reservations (Fraser Road Dining Room)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: 'rgba(18, 24, 38, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '800', color: '#fff', fontSize: '15px' }}>{b.customerName}</span>
                        <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '700' }}>Ref: {b.id}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '2px' }}>
                        📅 {b.date} at {b.timeSlot} • {b.guestsCount} Guests ({b.seatingArea.replace(/_/g, ' ')})
                      </div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                        Phone: {b.customerPhone} {b.specialRequests && `• Note: "${b.specialRequests}"`}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: b.status === 'seated' ? 'rgba(16, 185, 129, 0.2)' : b.status === 'confirmed' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: b.status === 'seated' ? '#34d399' : b.status === 'confirmed' ? '#fde68a' : '#f87171',
                        textTransform: 'capitalize'
                      }}>
                        {b.status}
                      </span>

                      {b.status !== 'seated' && (
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'seated')}
                          className="btn-gold"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Seat Guest
                        </button>
                      )}

                      {b.status !== 'cancelled' && (
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'cancelled')}
                          style={{ background: 'none', border: '1px solid #ef4444', color: '#f87171', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                        >
                          Decline
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ANALYTICS & SALES REPORT */}
          {activeTab === 'analytics' && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
                Daily Business & Revenue Metrics (Patna)
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(18, 24, 38, 0.9)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Today's Total Sales</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#fde68a', marginTop: '6px' }}>₹{totalRevenue}</div>
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>+18% vs yesterday</div>
                </div>

                <div style={{ background: 'rgba(18, 24, 38, 0.9)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Orders Fulfilled</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginTop: '6px' }}>{orders.length}</div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px' }}>Avg Delivery: 32 mins</div>
                </div>

                <div style={{ background: 'rgba(18, 24, 38, 0.9)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>Table Covers Reserved</div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginTop: '6px' }}>
                    {bookings.reduce((sum, b) => sum + b.guestsCount, 0)} Diners
                  </div>
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>Peak: 8:00 PM – 10:00 PM</div>
                </div>
              </div>

              {/* Top Selling Dishes in Patna */}
              <div style={{ background: 'rgba(18, 24, 38, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '18px' }}>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#fde68a', marginBottom: '12px' }}>
                  Top Selling Dishes in Patna
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                    <span>1. Champaran Handi Meat (Ahuna Mutton)</span>
                    <strong style={{ color: '#10b981' }}>78 Orders</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                    <span>2. Gourmet Bihari Litti Chokha Platter</span>
                    <strong style={{ color: '#10b981' }}>64 Orders</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                    <span>3. Shahi Murgh Dum Biryani</span>
                    <strong style={{ color: '#10b981' }}>52 Orders</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                    <span>4. Dal Makhani Bukhara & Garlic Naan</span>
                    <strong style={{ color: '#10b981' }}>45 Orders</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

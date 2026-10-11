import React from 'react';
import { X, User, MapPin, Package, Calendar, LogOut, Clock, RotateCcw } from 'lucide-react';
import { UserProfile, Order, TableBooking } from '../types';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  orders: Order[];
  bookings: TableBooking[];
  onSignOut: () => void;
  onTrackOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  bookings,
  onSignOut,
  onTrackOrder,
  onReorder,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="glass-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 210,
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--gold-gradient)',
              color: '#0b0f17',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '18px'
            }}>
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-serif" style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>
                {user.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#f59e0b' }}>
                {user.phone}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon" style={{ width: '34px', height: '34px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {/* Active / Recent Orders Section */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Package size={18} color="#f59e0b" />
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
                Your Orders in Patna
              </h4>
            </div>

            {orders.length === 0 ? (
              <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '10px' }}>
                No past orders yet. Place your first order today!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      background: 'rgba(18, 24, 38, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '14px', color: '#fff' }}>
                          Order #{ord.id}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                          {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} dishes
                        </div>
                      </div>

                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: ord.orderStatus === 'delivered' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: ord.orderStatus === 'delivered' ? '#34d399' : '#fde68a',
                        textTransform: 'capitalize'
                      }}>
                        {ord.orderStatus.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>
                      {ord.items.map(i => `${i.quantity}x ${i.dish.name}`).join(', ')}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                      <span style={{ fontWeight: '800', color: '#fde68a', fontSize: '15px' }}>
                        ₹{ord.total}
                      </span>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => { onTrackOrder(ord); onClose(); }}
                          className="btn-outline-gold"
                          style={{ padding: '6px 12px', fontSize: '11px' }}
                        >
                          <Clock size={12} /> Live Track
                        </button>
                        <button
                          onClick={() => { onReorder(ord); onClose(); }}
                          className="btn-gold"
                          style={{ padding: '6px 12px', fontSize: '11px' }}
                        >
                          <RotateCcw size={12} /> Re-Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Table Bookings Section */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Calendar size={18} color="#f59e0b" />
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
                Table Reservations
              </h4>
            </div>

            {bookings.length === 0 ? (
              <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '10px' }}>
                No active table reservations.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      background: 'rgba(18, 24, 38, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '700', color: '#fff', fontSize: '13px' }}>Ref: {b.id}</span>
                      <span style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                        Confirmed
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
                      {b.date} at {b.timeSlot} • {b.guestsCount} Guests ({b.seatingArea.replace(/_/g, ' ')})
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Addresses */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <MapPin size={18} color="#f59e0b" />
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
                Saved Delivery Addresses
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {user.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  style={{
                    background: 'rgba(18, 24, 38, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '13px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '800', color: '#fde68a', fontSize: '12px' }}>{addr.label}</span>
                    <span style={{ color: '#10b981', fontSize: '11px', fontWeight: '700' }}>PIN: {addr.pincode}</span>
                  </div>
                  <div style={{ color: '#cbd5e1' }}>{addr.address}</div>
                  <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>Landmark: {addr.landmark}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', background: '#080b11' }}>
          <button
            onClick={() => { onSignOut(); onClose(); }}
            style={{
              width: '100%',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              color: '#f87171',
              padding: '12px',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={16} /> Sign Out of Account
          </button>
        </div>
      </div>
    </div>
  );
};

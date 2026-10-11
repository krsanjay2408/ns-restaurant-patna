import React, { useState } from 'react';
import { X, Calendar, Users, Clock, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { TableBooking, UserProfile } from '../types';
import { TIME_SLOTS } from '../data/mockData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: TableBooking) => void;
  user: UserProfile | null;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onBookingSuccess,
  user,
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[6] || '08:00 PM');
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'indoor_ac' | 'royal_patio' | 'family_lounge'>('indoor_ac');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const newBooking: TableBooking = {
      id: `TB-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerPhone,
      customerEmail: user?.email || '',
      date,
      timeSlot,
      guestsCount,
      seatingArea,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    setIsConfirmed(true);
    onBookingSuccess(newBooking);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', paddingBottom: '14px' }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>
              Reserve a Royal Table
            </h3>
            <p style={{ fontSize: '13px', color: '#f59e0b' }}>
              NS Restaurant • Fraser Road, Patna
            </p>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {isConfirmed && confirmedBooking ? (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              margin: '0 auto 16px auto',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle size={36} />
            </div>

            <h4 className="font-serif" style={{ fontSize: '24px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>
              Table Reserved Successfully!
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '20px' }}>
              Booking Reference: <strong style={{ color: '#fde68a' }}>{confirmedBooking.id}</strong>
            </p>

            <div style={{
              background: 'rgba(18, 24, 38, 0.8)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '13px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Diner Name:</span>
                <span style={{ fontWeight: '700', color: '#fff' }}>{confirmedBooking.customerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Date & Slot:</span>
                <span style={{ fontWeight: '700', color: '#fde68a' }}>{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Guests & Seating:</span>
                <span style={{ fontWeight: '700', color: '#fff' }}>
                  {confirmedBooking.guestsCount} Guests ({confirmedBooking.seatingArea.replace(/_/g, ' ')})
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Venue:</span>
                <span style={{ fontWeight: '700', color: '#fff' }}>Fraser Road, Patna</span>
              </div>
            </div>

            <button onClick={onClose} className="btn-gold" style={{ width: '100%', padding: '12px' }}>
              Done
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit}>
            {/* Date and Guests */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  <Calendar size={14} color="#f59e0b" /> Date *
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  <Users size={14} color="#f59e0b" /> Guests (1-10) *
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                <Clock size={14} color="#f59e0b" /> Available Time Slot *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    style={{
                      background: timeSlot === slot ? 'var(--gold-gradient)' : '#121826',
                      color: timeSlot === slot ? '#0b0f17' : '#cbd5e1',
                      border: timeSlot === slot ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '7px 4px',
                      fontSize: '12px',
                      fontWeight: timeSlot === slot ? '800' : '500',
                      cursor: 'pointer'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Area */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '8px' }}>
                Seating Atmosphere
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { id: 'indoor_ac', label: 'Indoor AC' },
                  { id: 'royal_patio', label: 'Patna Patio' },
                  { id: 'family_lounge', label: 'Family Lounge' },
                ].map((area) => (
                  <button
                    type="button"
                    key={area.id}
                    onClick={() => setSeatingArea(area.id as any)}
                    style={{
                      background: seatingArea === area.id ? 'rgba(245, 158, 11, 0.2)' : '#121826',
                      border: seatingArea === area.id ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: seatingArea === area.id ? '#fde68a' : '#94a3b8',
                      borderRadius: '8px',
                      padding: '8px 4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Name & Mobile */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                  Phone (+91) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="Mobile Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Special Request */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                Special Occasion / Request (Optional)
              </label>
              <input
                type="text"
                placeholder="Birthday celebration, high chair needed, etc."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121826',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-gold"
              style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '10px' }}
            >
              <Sparkles size={16} />
              <span>Confirm Table Reservation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

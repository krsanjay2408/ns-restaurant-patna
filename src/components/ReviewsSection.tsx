import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Dr. Alok Verma',
      locality: 'Boring Road, Patna',
      rating: 5,
      date: 'Yesterday',
      text: 'The Champaran Handi Meat is simply out of this world! Cooked in real earthen pot with whole garlic pods. Hands down the best authentic taste in all of Patna.',
      favoriteDish: 'Champaran Handi Meat',
    },
    {
      id: 2,
      name: 'Sneha Kumari',
      locality: 'Kankarbagh, Patna',
      rating: 5,
      date: '3 days ago',
      text: 'Their Litti Chokha platter with pure desi ghee took me back to village roots with luxury dining standards. Clean ambience and very courteous staff at Fraser Road.',
      favoriteDish: 'Bihari Litti Chokha',
    },
    {
      id: 3,
      name: 'Rohan Shrivastav',
      locality: 'Fraser Road, Patna',
      rating: 5,
      date: 'Last week',
      text: 'Ordered delivery to Maurya Vihar and it arrived in 25 minutes flat, steaming hot! The Shahi Dum Biryani aroma filled the whole house. Highly recommended!',
      favoriteDish: 'Shahi Murgh Dum Biryani',
    },
  ];

  return (
    <section id="reviews" style={{ padding: '70px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: '#090d15' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Patna Diners' Voice
          </div>
          <h2 className="font-serif" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', color: '#fff' }}>
            LOVED BY OVER <span className="text-gold-gradient">1,200+ FOODIES</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>
            Verified dining & online delivery reviews from Patna food lovers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {reviews.map((r) => (
            <div
              key={r.id}
              className="glass-card"
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative' }}
            >
              <Quote size={28} color="rgba(245, 158, 11, 0.2)" style={{ position: 'absolute', top: '20px', right: '20px' }} />

              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                ))}
              </div>

              <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#cbd5e1', marginBottom: '20px', flex: 1, fontStyle: 'italic' }}>
                "{r.text}"
              </p>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {r.name} <CheckCircle2 size={13} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{r.locality}</div>
                </div>

                <div style={{ fontSize: '11px', background: 'rgba(245, 158, 11, 0.1)', color: '#fde68a', padding: '3px 8px', borderRadius: '6px', fontWeight: '600' }}>
                  {r.favoriteDish}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { DishCategory } from '../types';

interface CategoryShowcaseProps {
  selectedCategory: DishCategory;
  onSelectCategory: (cat: DishCategory) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: {
    id: DishCategory;
    title: string;
    itemsCount: string;
    image: string;
    badge: string;
  }[] = [
    {
      id: 'patna_specials',
      title: 'Patna Handi Specials',
      itemsCount: 'Ahuna Mutton, Chicken & Litti',
      image: '/assets/champaran_handi.jpg',
      badge: 'Signature',
    },
    {
      id: 'rolls_wraps',
      title: 'Rolls & Kathi Wraps',
      itemsCount: 'Chicken, Double Egg, Mutton, Paneer',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
      badge: 'Popular',
    },
    {
      id: 'fast_food',
      title: 'Burgers, Momos & Fries',
      itemsCount: 'Crispy Burgers, Momos & Fast Food',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      badge: 'Hot & Crispy',
    },
    {
      id: 'icecream_desserts',
      title: 'Ice-Cream & Desserts',
      itemsCount: 'Kulfi Falooda, Matka Kulfi, Scoops',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
      badge: 'Sweet Tooth',
    },
    {
      id: 'chicken_specials',
      title: 'Royal Chicken Curries',
      itemsCount: 'Butter Chicken, Kadhai, Lollipops',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
      badge: 'Chef Pick',
    },
    {
      id: 'mutton_specials',
      title: 'Tender Mutton Delights',
      itemsCount: 'Rogan Josh, Shahi Korma, Ahuna',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      badge: 'Royal Taste',
    },
    {
      id: 'pure_veg_paneer',
      title: 'Pure Veg & Paneer',
      itemsCount: 'Dal Makhani, Paneer Butter, Kadhai',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      badge: '100% Veg',
    },
    {
      id: 'biryani_breads',
      title: 'Biryanis & Garlic Naans',
      itemsCount: 'Dum Biryanis, Butter Garlic Naan',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      badge: 'Clay Oven',
    },
    {
      id: 'beverages',
      title: 'Shakes & Lassi',
      itemsCount: 'Cold Coffee with Ice Cream, Mango Lassi',
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
      badge: 'Refreshing',
    },
  ];

  return (
    <section id="categories" style={{ padding: '40px 0 20px 0' }}>
      <div className="container-custom">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ color: '#f59e0b', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>
              Explore Categories
            </div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: '800', color: '#fff' }}>
              WHAT ARE YOU <span className="text-gold-gradient">CRAVING TODAY?</span>
            </h2>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="btn-outline-gold"
            style={{ padding: '6px 16px', fontSize: '13px' }}
          >
            View All ({categories.length} Categories)
          </button>
        </div>

        {/* Scrollable / Responsive Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('menu');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glass-card"
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                  height: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '16px',
                  boxShadow: isSelected ? '0 0 25px rgba(245, 158, 11, 0.4)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.55)',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1.1)';
                  }}
                  onMouseOut={(e) => {
                    (e.target as HTMLElement).style.transform = 'scale(1)';
                  }}
                />

                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: isSelected ? 'var(--gold-gradient)' : 'rgba(0,0,0,0.65)',
                  color: isSelected ? '#0b0f17' : '#fde68a',
                  border: isSelected ? 'none' : '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '20px',
                  padding: '2px 8px',
                  fontSize: '10px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  zIndex: 2
                }}>
                  {cat.badge}
                </div>

                {/* Category Details */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 className="font-serif" style={{ fontSize: '17px', fontWeight: '800', color: '#fff', marginBottom: '2px' }}>
                    {cat.title}
                  </h3>
                  <div style={{ fontSize: '11px', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cat.itemsCount}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

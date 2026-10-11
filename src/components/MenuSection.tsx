import React, { useState, useMemo } from 'react';
import { Dish, DishCategory, MealTimeRecommendation } from '../types';
import { DishCard } from './DishCard';
import { SlidersHorizontal, Sparkles, Search, X } from 'lucide-react';

interface MenuSectionProps {
  dishes: Dish[];
  cartItems: Record<string, number>;
  onAddToCart: (dish: Dish) => void;
  onUpdateQuantity: (dishId: string, delta: number) => void;
  searchQuery: string;
  onClearSearch: () => void;
  selectedCategory: DishCategory;
  onSelectCategory: (cat: DishCategory) => void;
  selectedMealTag: MealTimeRecommendation;
  onSelectMealTag: (tag: MealTimeRecommendation) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  dishes,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  searchQuery,
  onClearSearch,
  selectedCategory,
  onSelectCategory,
  selectedMealTag,
  onSelectMealTag,
}) => {
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'jain'>('all');
  const [spiceFilter, setSpiceFilter] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');

  // Categories Definition
  const categories: { id: DishCategory; label: string }[] = [
    { id: 'all', label: 'All Dishes' },
    { id: 'patna_specials', label: 'Patna Handi Specials ⭐' },
    { id: 'rolls_wraps', label: 'Rolls & Kathi Wraps 🌯' },
    { id: 'fast_food', label: 'Burgers & Momos 🍔' },
    { id: 'icecream_desserts', label: 'Ice-Cream & Sweets 🍦' },
    { id: 'chicken_specials', label: 'Chicken Curries 🍗' },
    { id: 'mutton_specials', label: 'Mutton Rogan & Korma 🥩' },
    { id: 'pure_veg_paneer', label: 'Pure Veg & Paneer 🧀' },
    { id: 'biryani_breads', label: 'Biryanis & Naans 🍚' },
    { id: 'beverages', label: 'Shakes & Lassi 🥤' },
  ];

  // Filtering & Sorting
  const filteredDishes = useMemo(() => {
    return dishes
      .filter((dish) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = dish.name.toLowerCase().includes(q);
          const matchHindi = dish.hindiName?.toLowerCase().includes(q);
          const matchDesc = dish.description.toLowerCase().includes(q);
          if (!matchName && !matchHindi && !matchDesc) return false;
        }

        // Category Filter
        if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
          return false;
        }

        // Meal Time Tag Filter
        if (selectedMealTag !== 'all' && (!dish.mealTags || !dish.mealTags.includes(selectedMealTag))) {
          return false;
        }

        // Dietary Filter
        if (dietaryFilter === 'veg' && dish.dietary !== 'veg') return false;
        if (dietaryFilter === 'non-veg' && dish.dietary !== 'non-veg') return false;
        if (dietaryFilter === 'jain' && !dish.isJainFriendly) return false;

        // Spice Filter
        if (spiceFilter !== 'all' && dish.spiceLevel !== spiceFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isChefSpecial ? 1 : 0) - (a.isChefSpecial ? 1 : 0);
      });
  }, [dishes, searchQuery, selectedCategory, selectedMealTag, dietaryFilter, spiceFilter, sortBy]);

  return (
    <section id="menu" style={{ padding: '40px 0 60px 0', position: 'relative' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#f59e0b',
            fontWeight: '700',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            <Sparkles size={14} /> Master Kitchen of Patna
          </div>
          <h2 className="font-serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
            ORDER FROM OUR <span className="text-gold-gradient">EXPANDED MENU</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
            Over 28+ fresh dishes ranging from spicy Kolkata rolls and crunchy burgers to slow-simmered handi mutton and chilled matka kulfi.
          </p>
        </div>

        {/* Active Smart Meal Filter Notification */}
        {selectedMealTag !== 'all' && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(18, 24, 38, 0.8) 100%)',
            border: '1.5px solid #f59e0b',
            borderRadius: '12px',
            padding: '12px 18px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span style={{ fontSize: '14px', color: '#fde68a', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
              <Sparkles size={16} color="#f59e0b" /> Showing Timely Recommendations for: 
              <span style={{ textTransform: 'capitalize', color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '6px' }}>
                {selectedMealTag.replace(/_/g, ' ')}
              </span>
            </span>
            <button 
              onClick={() => onSelectMealTag('all')}
              className="btn-outline-gold"
              style={{ padding: '4px 12px', fontSize: '12px' }}
            >
              Show Full Menu
            </button>
          </div>
        )}

        {/* Active Search Notification */}
        {searchQuery.trim() && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '12px',
            padding: '10px 18px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '14px', color: '#fde68a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} /> Results for: <strong>"{searchQuery}"</strong> ({filteredDishes.length} items found)
            </span>
            <button 
              onClick={onClearSearch}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Category Horizontal Filter Pills Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '24px',
          scrollbarWidth: 'none'
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filters Bar (Dietary, Spice, Sort) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          background: 'rgba(18, 24, 38, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '14px',
          padding: '12px 18px',
          marginBottom: '32px'
        }}>
          {/* Dietary Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Diet:</span>
            
            <button
              onClick={() => setDietaryFilter('all')}
              style={{
                background: dietaryFilter === 'all' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: dietaryFilter === 'all' ? '#fff' : '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              All
            </button>

            <button
              onClick={() => setDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
              style={{
                background: dietaryFilter === 'veg' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: dietaryFilter === 'veg' ? '#34d399' : '#94a3b8',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span className="badge-veg" style={{ width: '13px', height: '13px' }} />
              Pure Veg
            </button>

            <button
              onClick={() => setDietaryFilter(dietaryFilter === 'non-veg' ? 'all' : 'non-veg')}
              style={{
                background: dietaryFilter === 'non-veg' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                color: dietaryFilter === 'non-veg' ? '#f87171' : '#94a3b8',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span className="badge-nonveg" style={{ width: '13px', height: '13px' }} />
              Non-Veg
            </button>

            <button
              onClick={() => setDietaryFilter(dietaryFilter === 'jain' ? 'all' : 'jain')}
              style={{
                background: dietaryFilter === 'jain' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: dietaryFilter === 'jain' ? '#67e8f9' : '#94a3b8',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🌿 Jain Safe
            </button>
          </div>

          {/* Spice & Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Spice:</span>
              <select
                value={spiceFilter}
                onChange={(e) => setSpiceFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                style={{
                  background: '#0e1422',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#cbd5e1',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">Any Spice</option>
                <option value="1">Mild</option>
                <option value="2">Medium</option>
                <option value="3">Desi Tikha 🌶️</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <SlidersHorizontal size={14} color="#f59e0b" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  background: '#0e1422',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#cbd5e1',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured Chef Specials</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated ★</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dish Grid */}
        {filteredDishes.length > 0 ? (
          <div className="dish-grid">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                cartQuantity={cartItems[dish.id] || 0}
                onAddToCart={() => onAddToCart(dish)}
                onUpdateQuantity={(delta) => onUpdateQuantity(dish.id, delta)}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(18, 24, 38, 0.4)',
            borderRadius: '16px',
            border: '1px dashed rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🍽️</div>
            <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '8px' }}>No dishes found in this category</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
              Try selecting another category or clearing filters.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onSelectMealTag('all');
                setDietaryFilter('all');
                setSpiceFilter('all');
                onClearSearch();
              }}
              className="btn-outline-gold"
              style={{ fontSize: '13px', padding: '8px 18px' }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const handleOrder = () => {
    if (cartItems[id]) {
      removeFromCart(id);
    } else {
      addToCart(id);
    }
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />
        <button className='order-button' onClick={handleOrder}>
          {cartItems[id] ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className='namewe'>{name}</p>
          <img className='ratingstars' src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price} Birr</p>
      </div>
    </div>
  );
}

export default FoodItem;

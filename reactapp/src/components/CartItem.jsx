/** CartItem.jsx
 * 장바구니 내 상품 컴포넌트
 */

import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import '../pages/ShoppingCart.css'

const CartItem = ({ item, onQuantityChange, onRemove, onToggleCheck }) => {


  return (
    <div className="cart-item">
      <div className="checkbox-column">
        <input 
        type="checkbox" 
        checked={item.checked} 
        onChange={() => onToggleCheck(item.shoppingCartId)}
        />
      </div>

      <div className="item-info">
        <img src={item.image} alt={item.name} />
        <div className="item-details">
          <span className="item-seller">{item.seller}</span>
          <span className="item-name">{item.name}</span>
          <span className="item-option">{item.option}</span>
        </div>
      </div>
      <div className="item-quantity">
        <button 
          onClick={() => onQuantityChange(item.shoppingCartId, item.quantity - 1)}
          >
            <Minus size={12} />
        </button>
        <input type="text" value={item.quantity} readOnly 
        />
        <button 
        onClick={() => onQuantityChange(item.shoppingCartId, item.quantity + 1)}
        >
          <Plus size={12} />
        </button>
      </div>
      <div className="item-price">
        <span className="original-price">
          {item.price.toLocaleString()}원
        </span>
      </div>
      <div  className="item-shipping">무료배송</div>
      <button 
        className="remove-button" 
        onClick={() => onRemove(item.shoppingCartId)}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default CartItem;
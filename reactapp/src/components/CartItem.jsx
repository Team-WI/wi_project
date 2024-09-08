/** CartItem.jsx
 * 장바구니 내 상품 컴포넌트
 */

import React from 'react';
import { Minus, Plus, X } from 'lucide-react';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-item">
      <input type="checkbox" 
      checked={item.checked} 
      onChange={() => {}}
      />
      <div className="item-info">
        <img src={item.image} alt={item.name} />
        <div className="item-details">
          <span className="item-brand">{item.brand}</span>
          <span className="item-name">{item.name}</span>
          <span className="item-option">{item.option}</span>
        </div>
      </div>
      <div className="item-quantity">
        <button 
          // onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          >
            <Minus size={16} />
        </button>
        <input type="text" 
        // value={item.quantity} readOnly 
        />
        <button 
        // onClick={() => onQuantityChange(item.id, item.quantity + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="item-price">
        <span className="original-price">
          {/* {item.originalPrice.toLocaleString()}원 */}
        </span>
        <span className="discounted-price">
          {item.price.toLocaleString()}원</span>
      </div>
      <button 
        className="remove-button" 
        // onClick={() => onRemove(item.id)}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default CartItem;
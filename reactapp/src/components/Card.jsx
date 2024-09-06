/* Card.jsx
개별 상품 데이터가 출력될 카드 컴포넌트. 
ProductList.jsx 컴포넌트 안에서 사용됨 
*/

import React from 'react';
import { Link } from "react-router-dom";
import { Card as BootstrapCard } from 'react-bootstrap';
import './Card.css'

const Card = ({ product }) => {
  return (
    <div>
      <Link to={`/products/${product.productId}`}       className="product-card-link">
      <BootstrapCard className="product-card">
        {product.productImg ? (
          <BootstrapCard.Img variant="top" src={product.productImg} alt={product.productName} />
        ) : (
          <div className="product-placeholder" style={{
            width: '100%',
            paddingBottom: '100%',
            background: '#d9e1e8'
        }}></div>
        )}
        <BootstrapCard.Body>
          <BootstrapCard.Title>{product.productName}</BootstrapCard.Title>
          <BootstrapCard.Text>{product.price}원</BootstrapCard.Text>
        </BootstrapCard.Body>
      </BootstrapCard>
    </Link>
    </div>
  );
};

export default Card;
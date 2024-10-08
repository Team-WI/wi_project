/* Card.jsx
개별 상품 데이터가 출력될 카드 컴포넌트. 
ProductList.jsx 컴포넌트 안에서 사용됨 
*/

import React from 'react';
import { Link } from "react-router-dom";
import { Card as BootstrapCard } from 'react-bootstrap';
import './Card.css'

const Card = ({ product }) => {

  const imageUrl = product.image_medium
    ? `${process.env.REACT_APP_IMAGE_URL}/${product.productName}/${product.image_medium}`
    : null;

  return (
    <div>
      <Link to={`/products/${product.productId}`} className="product-card-link">
      <BootstrapCard className="product-card">
        {imageUrl ? (
          <BootstrapCard.Img 
            variant="top" 
            src={imageUrl}
            // src={`http://43.203.208.22:3080/files/${product.productName}/${product.image_medium}`}
            alt={product.productName} />
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
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Vertical.css';

// // 샘플 데이터 생성
// const generateSampleProducts = (count) => {
//   return Array.from({ length: count }, (_, i) => ({
//     id: i + 1,
//     name: `상품 ${i + 1}`,
//     price: Math.floor(Math.random() * 100000) + 10000,
//     imageUrl: `/api/placeholder/150/200`
//   }));
// };

// const sampleProducts = generateSampleProducts(30);  // 30개의 샘플 상품 생성

const ProductCard = ({ product, isLarge }) => (
  <div className={`product-card ${isLarge ? 'large-card' : ''}`}>
    <div className="product-image-container">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
    </div>
    <div className="product-info">
      <h5 className="product-title" >{product.name}</h5>
      <p className="product-price" >{product.price}원</p>
    </div>
  </div>
);

export const Vertical = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="no-products">상품이 없습니다.</div>;
  }

  const firstColProducts = products.slice(0, 4); // 첫 번째 열에 4개의 상품
  const restProducts = products.slice(4);

  return (
    <div className="vertical-container">
      <Row className="vertical-layout">
        <Col xs={12} md={6} className="mb-4 first-col">
          {/* <ProductCard product={firstColProduct} isLarge={true} /> */}
          <Row>
            {firstColProducts.map((product, index) => (
              <Col key={product.id} xs={12} className={`mb-4 ${index === 0 ? 'large-product' : ''}`}>
                <ProductCard product={product} isLarge={index === 0} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={12} md={6} className="rest-col">
          <Row>
            {restProducts.map((product, index) => (
              <Col key={product.id} xs={6} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>

);
};
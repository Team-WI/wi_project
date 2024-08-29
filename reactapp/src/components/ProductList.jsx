/*
메인페이지에서 출력될 상품 리스트 컴포넌트.
-상품 데이터 호출 함수 getProducts
-상품 데이터를 부트스트랩 카드 컴포넌트에 담아 표시
*/

import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card} from 'react-bootstrap';

const ProductList = ( ) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 상품 데이터 호출 
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://43.203.208.22:3000/api/products')
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('상품을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      
      }
    };
    
    getProducts();

  },[]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      <Container className="container">
        <Row>

          {products && products.map((product) => (

          <Col key={product.productId} xs={6} md={4}>
            <Link to={`/detailView/${product.productId}`}>
            <Card style={{ cursor: 'pointer', marginBottom: '20px' }}>
            {product.productImg ? (
              <Card.Img variant="top" src="https://img.29cm.co.kr/item/202408/11ef55478685a889836291fe267a0e85.jpg?width=400" />
              ) : (
                <div style={{height: '200px' }}></div>
              )}
              <Card.Body>
                <Card.Text>
                product.productName 
                </Card.Text>
                <Card.Text>
                  product.price
                </Card.Text>
              </Card.Body>
            </Card>
            </Link>
          </Col>
          ))}
        </Row>

      </Container>
    </div>
  );
};

export default ProductList;
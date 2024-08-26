/*
ProductList.jsx 컴포넌트 안 상품 데이터가 출력될 카드 컴포넌트 분리 예정
*/

import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card} from 'react-bootstrap';

const Card = () => {
  return (
    <div>
      <Container className="container">
        <Row>

          {data && data.map((product) => (

          <Col key={product.productId} xs={6} md={4}>
            <Link to={`/detailView/${product.productId}`}>
            <Card style={{ cursor: 'pointer' }}>
            {product.productImg ? (
              <Card.Img variant="top" src="https://img.29cm.co.kr/item/202408/11ef55478685a889836291fe267a0e85.jpg?width=400" />
              ) : (
                <div style={{height: '200px' }}></div>
              )}
              <Card.Body>
                <Card.Text>
                product.ProductName 
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

export default Card;
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProductList = () => {
  return (
    <div>
      <Container className="container">
        <Row>
          <Col xs={6} md={4}>
            <Card>
              <Card.Img variant="top" src="https://img.29cm.co.kr/item/202408/11ef55478685a889836291fe267a0e85.jpg?width=400" />
              <Card.Body>
                <Card.Text>
                product.ProductName 
                </Card.Text>
                <Card.Text>
                  product.price
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={4}><Card>
              <Card.Img variant="top" src="https://img.29cm.co.kr/item/202408/11ef55478685a889836291fe267a0e85.jpg?width=400" />
              <Card.Body>
                <Card.Text>
                  product.ProductName 
                </Card.Text>
                <Card.Text>
                  product.price
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} md={4}><Card>
              <Card.Img variant="top" src="https://img.29cm.co.kr/item/202408/11ef55478685a889836291fe267a0e85.jpg?width=400" />
              <Card.Body>
                <Card.Text>
                product.ProductName 
                </Card.Text>
                <Card.Text>
                  product.price
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  );
};

export default ProductList;
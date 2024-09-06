/** ProductDetail.jsx
 * 상품 상세 페이지 컴포넌트. 
 * TODO: 상품상세,상품평 등 스티키헤더
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import './pages.css'

import { CartProvider, useCart } from '../components/CartContext';  // CartProvider import
import CartButton from '../components/CartButton';


const ProductDetailContent = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 장바구니 담기
  const [cartItems, setCartItems] = useState([]);
  const { addToCart } = useCart(); // CartContext에서 addToCart 함수 가져오기

  // 상품 데이터 호출 
  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const url = `http://43.203.208.22:3000/api/products/${productId}`;
        const response = await axios.get(url);

        if (response.data && response.data.data) {
          console.log("성공:", response.data.data);
          const { productId, productName, price, description } = response.data.data;
          setProduct({ productId, productName, price, description });
        } else {
          throw new Error('데이터 형식이 올바르지 않습니다.');
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err.response?.status === 404
            ? '상품이 없습니다.'
            : '상품을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      getProductDetail();
    }
  }, [productId]);

  // 상품 정보가 업데이트될 때마다 실행되는 useEffect
  useEffect(() => {
    if (product) {
      console.log("상품 정보가 업데이트되었습니다:", product);
      // 여기에서 product 상태를 사용하는 추가 로직을 구현할 수 있습니다.
    }
  }, [product]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>상품 정보가 없습니다.</div>;


  

  const placeholderImage = (
    <div
      style={{
        width: '100%',
        paddingBottom: '80%',
        background: '#d9e1e8'
      }}
    />
  );
        
  return (

      <Container fluid>
        <Row className="mb-4">
          <Col xs={12} md={8} lg={9} className="mb-3 mb-md-0">
            <div className='image-container'>
              {placeholderImage}
            </div>
          </Col>
          <Col xs={12} md={4} lg={3}>
            <h5 className="h4 mb-3">Seller</h5>
            <h5 className="h2 mb-3">{product.productName}</h5>
            <p>{product.description}</p>
            <p className="mb-3">{product.price}원</p>
            수량
            <input></input>
              <Col>
                <CartButton productId={product.productId} />
              </Col>
              <Col>
                <button>바로 구매</button>
              </Col>


            {/* <Dropdown className="mb-3">
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-color">
                Color
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>BLACK</Dropdown.Item>
                <Dropdown.Item>BEIGE</Dropdown.Item>
                <Dropdown.Item>IVORY</Dropdown.Item>
                <Dropdown.Item>INDIGO</Dropdown.Item>
                <Dropdown.Item>NAVY</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
             */}
          </Col>

        <Row>
          <Col>
            <p>상품번호: {product.productId}</p>
          </Col>
          
        </Row>
        </Row>

        {/* <Row>
          <Nav>
            상품상세 | 상품평 | 상품문의 | 배송/교환/반품 안내
          </Nav>
        </Row> */}


        {/* <Row className="g-3">
          {[...Array(6)].map((_, idx) => (
            <Col xs={12} sm={8} md={9} key={idx}>
              {placeholderImage}
            </Col>
          ))}
        </Row> */}

        {/* <Row>
          <div>
            <h5>상품정보</h5>
            <table>
              <tbody>
                {product.map((item, index) => (
                  <tr key={index}>
                    <th>{item.label}</th>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row> */}

      </Container>

  );
};

// ContextAPI CartProvider로 감싸는 부분을 별도의 컴포넌트로 분리
const ProductDetail = () => (
  <CartProvider>
    <ProductDetailContent />
  </CartProvider>
);

export default ProductDetail;
/** ProductDetail.jsx
 * 상품 상세 페이지 컴포넌트. 
 * TODO: 상품상세,상품평 등 스티키헤더, tanstack-query 적용
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Dropdown, Form, Button } from 'react-bootstrap';
import { ArrowLeft, Heart, LoaderCircle } from 'lucide-react';
import './ProductDetail.css';

import { CartProvider, useCart } from '../components/CartContext';  // CartProvider import
import CartButton from '../components/CartButton';


const ProductDetailContent = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 수량 선택
  const [quantity, setQuantity] = useState(1);

  // 장바구니 담기
  const [cartItems, setCartItems] = useState([]);
  const { addToCart } = useCart(); // CartContext에서 addToCart 함수 가져오기

  // 상품 설명 탭 UI
  let [tab, setTab] = useState(0);

  const tabContent = (props) => {
    if (props.tab === 0) return <div>0</div>
    else if (props.tab ===1) return <div>1</div>
    else if (props.tab ===2) return <div>2</div>
    else return <div>3</div>
  }

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
  // useEffect(() => {
  //   if (product) {
  //     console.log("상품 정보가 업데이트되었습니다:", product);
  //   }
  // }, [product]);

  const handleQuantityChange = (value) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + value;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };


  if (loading) return <LoaderCircle />;
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
      <Container fluid className="product-detail">
        <Row className="mb-3">
          <Col>
            <Link to="#" onClick={() => navigate(-1)} className="back-link">
              <ArrowLeft size={20}/> 뒤로가기
            </Link>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h1 className="product-name">{product.productName}</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={7} className="mb-3 mb-md-0">
            <div className='image-container'>
              {placeholderImage}
            </div>
          </Col>
          <Col  md={5} className="product-info">
            <p className="seller-id">Seller</p>
            <h5 className="h2 mb-3">{product.productName}</h5>
            <p className="description">{product.description}</p>
            <p className="price">{product.price}원</p>

            <div className="quantity-selector mb-3">
              <span>수량</span>
              <div className="quantity-control">
                <input type="text" value={quantity} readOnly className="quantity-input" />
                <div className="quantity-buttons">
                  <button onClick={() => handleQuantityChange(1)} className="quantity-button">
                    <ChevronUp size={20} />
                  </button>
                  <button onClick={() => handleQuantityChange(-1)} className="quantity-button">
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <CartButton productId={product.productId} />
                <Button variant="outline-dark" className="wishlist-btn">
                  <Heart size={20} />
                </Button>
            </div>
                <Button variant="dark" className="buy-btn" block>바로 구매</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>상품번호: {product.productId}</p>
            <hr />
          </Col>
        </Row>

        <Row>
          <p>상품설명</p>
        </Row>

        <Row>
          <Nav justify variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={() => setTab(0)}>상품상세</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={() => setTab(1)}>상품평</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>상품문의</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-3" onClick={() => setTab(3)}>배송/교환/반품 안내</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
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
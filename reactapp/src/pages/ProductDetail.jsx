/** ProductDetail.jsx
 * 상품 상세 페이지 컴포넌트. 
 * 장바구니 담기, 바로구매, 찜하기 기능의 렌더링
 */

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { CircleArrowLeft, Heart, LoaderCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductDetail.css';
import CartButton from '../components/CartButton';

const API_URL = process.env.REACT_APP_API_URL;

const getProduct = async (productId) => {
  const response = await axios.get(`${API_URL}/api/products/${productId}`);
  return response.data.data;
}

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();  
  const navigate = useNavigate();

  // 상품 데이터 호출 
  // useEffect(() => {
  //   const getProductDetail = async () => {
  //     try {
  //       const url = `${API_URL}/api/products/${productId}`;
  //       const response = await axios.get(url);

  //       if (response.data && response.data.data) {
  //         console.log("성공:", response.data.data);
  //         const { productId, productName, price, description } = response.data.data;
  //         setProduct({ productId, productName, price, description });
  //       } else {
  //         throw new Error('데이터 형식이 올바르지 않습니다.');
  //       }
  //     } catch (err) {
  //       console.error("Error fetching product:", err);
  //       setError(
  //         err.response?.status === 404
  //           ? '상품이 없습니다.'
  //           : '상품을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.'
  //       );
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (productId) {
  //     getProductDetail();
  //   }
  // }, [productId]);

  // 상품 정보가 업데이트될 때마다 실행되는 useEffect
  // useEffect(() => {
  //   if (product) {
  //     console.log("상품 정보가 업데이트되었습니다:", product);
  //   }
  // }, [product]);
  // useQuery 훅을 사용하여 상품 데이터 호출
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    onError: (err) => {
      console.error("상품 fetch 오류", err);
    }
  });

  // 수량 선택
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + value;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  // 바로 구매
  const handleBuyNow = () => {
    navigate('/Checkout', { state: { buyNow: true, product: { ...product, quantity }}});
  };

  // 짬하기
  const handleWishlistToggle = () => {
    toggleWishlist(productId);
  };

  // 상품 설명 탭 UI
  let [tab, setTab] = useState(0);

  const tabContent = (props) => {
    if (props.tab === 0) return <div>0</div>
    else if (props.tab ===1) return <div>1</div>
    else if (props.tab ===2) return <div>2</div>
    else return <div>3</div>
  }

  if (isLoading) return <LoaderCircle />;
  if (error) return <div>{error.message}</div>;
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
              <CircleArrowLeft size={20}/> 뒤로가기
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
            <p classNAme="description">리뷰 00개</p>
            <p className="price">{product.price}원</p>

            <div className="quantity-selector mb-3">
              <span>수량</span>
              <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(-1)} className="quantity-button">
                    <ChevronLeft size={20} />
                  </button>
                  <input type="text" value={quantity} readOnly className="quantity-input" />
                  <button onClick={() => handleQuantityChange(1)} className="quantity-button">
                    <ChevronRight size={20} />
                  </button>
              </div>
            </div>
            
              <div className="d-flex justify-content-between align-items-center mb-3">
              
                <CartButton productId={product.productId} />
                <Button 
                  variant="outline-dark" 
                  className={`wishlist-btn ${isInWishlist(productId) ? 'wishlisted' : ''}`}
                  onClick={handleWishlistToggle}>
                  <Heart fill={isInWishlist(productId) ? 'red' : 'none'} size={20} />
                </Button>
              </div>
                <Button variant="dark" className="buy-btn" onClick={handleBuyNow}>바로 구매</Button>
          </Col>
        </Row>

        <hr />

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

        <Row>
          <Col>
          <p>상품번호: {product.productId}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p>상품설명</p>
            <div className='image-container'>
              {placeholderImage}
            </div>
          </Col>
        </Row>
      </Container>

  );
};

export default ProductDetail;
/** *
메인페이지에서 출력될 상품 리스트 컴포넌트.
상품 데이터 호출 함수 getProducts
*/

import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Card from './Card';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { CATEGORIES, SUBCATEGORIES } from './CATEGORIES.js';
import './ProductList.css';


const ProductList = ( ) => {
  const { category, item } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Current category:', category); 
  console.log('Current item:', item);   

  // 상품 데이터 호출 
  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = `http://43.203.208.22:3000/api/categories/${category}`;

        // item이 존재하고 'all'이 아닌 경우에만 URL에 추가
        if (item && item !== 'all') {
          url += `/${item}`;
        }
        console.log('요청중인 URL:', url);

        const response = await axios.get(url);
        console.log('서버 응답:', response);
        console.log('서버 응답 데이터:', response.data);
        

        // let filteredProducts = response.data.data;
        // console.log(filteredProducts)
        // 서브카테고리가 선택된 경우에만 필터링
        // if (item && !SUBCATEGORIES.find(subcat => subcat.name === item)) {
        // }
        if (response.data && response.data.data) {
          const productsData = response.data.data;
          console.log('처리 전 상품 데이터:', productsData);

            // 항상 배열 형태로 처리
            setProducts(Array.isArray(productsData) ? productsData : [productsData]);
          } else {
            throw new Error("응답에 data 속성이 없습니다.");
          }
        } catch (err) {
          console.error("상품 데이터 fetch 에러:", err);
          setError(err.message || '상품을 불러오는 중 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      };

    //       if (Array.isArray(productsData)) {
    //         setProducts(productsData);
    //       } else if (typeof productsData === 'object') {
    //         setProducts([productsData]);
    //       } else {
    //         throw new Error("상품 데이터 형식이 올바르지 않습니다.");
    //       }
    //     } else {
    //       throw new Error("응답에 data 속성이 없습니다.");
    //     }
    //   } catch (err) {
    //     console.error("상품 데이터 fetch 에러:", err);
    //     setError(err.message || '상품을 불러오는 중 오류가 발생했습니다.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

      getProducts();
  }, [category, item]);  // category, item 의존성 
  

    // 상품 정보가 업데이트될 때마다 실행되는 useEffect
    useEffect(() => {
    if (products) {
      console.log("상품 정보가 업데이트되었습니다:", products);
      // 여기에서 product 상태를 사용하는 추가 로직을 구현할 수 있습니다.
    }
  }, [products]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>{error}</div>;

  
  const currentCategory = CATEGORIES.find(cat => cat.name === category);
  const categoryText = currentCategory ? currentCategory.text : category;
  const subCategories = SUBCATEGORIES[currentCategory?.id] || [];


  return (
    <div>
      <Container className="container">
        {/* <h2>{categoryText} {item && item !== 'all' ? `- ${item}` : ''}</h2> */}
        <Nav className="product-list-tab">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`/categories/${category}`}
              className={`product-category-link ${(!item || item === 'all') ? 'active' : ''}`}
            >
              All
            </Nav.Link>
          </Nav.Item>


        {subCategories.map(subcat => (
          <Nav.Item key={subcat.name}>
            <Nav.Link
              as={Link}
              to={`/categories/${category}/${subcat.name}`}
              className={`product-category-link ${subcat.name === item ? 'active' : ''}`}
              >
              {subcat.text}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>



      <Row>
      {/* <h2>{categoryText} {item && item !== 'all' ? `- ${item}` : ''}</h2> */}
        {products.length > 0 ? (
            products.map((product) => (
          <Col key={product.productId} xs={6} md={4}>
            <Card product={product} />
          </Col>
          ))
        ) : (
          <Col>상품이 없습니다.</Col>
      )}
      </Row>
      </Container>
    </div>
  );
};

export default ProductList;
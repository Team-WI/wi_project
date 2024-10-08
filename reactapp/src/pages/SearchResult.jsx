/** SearchResult.jsx
 * SearchBar를 통해 입력받은 검색어로 API 호출, 검색결과를 렌더링하는 페이지입니다. 
 */

import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useSearchProducts } from '../hooks/useSearchProduct';
import Card from '../components/Card';
import { CATEGORIES, SUBCATEGORIES } from '../components/CATEGORIES';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const [filters, setFilters] = useState({});

  const { data: productsData, isLoading, isError, error } = useSearchProducts(keyword);

  // const handleFilterClick = (filterType, filterValue) => {
  //   setFilters(prev => {
  //     const newFilters = { ...prev };
  //     if (newFilters[filterType] === filterValue) {
  //       delete newFilters[filterType];
  //     } else {
  //       newFilters[filterType] = filterValue;
  //     }
  //     return newFilters;
  //   });
  // };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error while fetching</div>

  const products = Array.isArray(productsData) ? productsData : (productsData ? [productsData] : []);

  return (
    <Container>
      <h2>검색결과: "{keyword}"</h2>
      <Row>
        {products && products.length > 0 ? (
          products.map(product => (
            <Col key={product.productId} xs={6} md={4} lg={3}>
              <Card 
                product={product
                  // {
                  // ...product, 
                  // productImg: product.image_medium 
                  // ? `${process.env.REACT_APP_IMAGE_URL}/${product.productName}/${product.image_medium}`
                  // : null
                  // }
                }
                  />
            </Col>
          ))
        ) : (
          <Col>
            <div>검색 결과가 없습니다.</div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SearchResult;
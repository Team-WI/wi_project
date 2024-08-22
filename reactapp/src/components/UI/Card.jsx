import React, {useState} from "react";
// import data from "../data.js"

// 상품 목록 json 파일을 가져옵니다. 
// fetch("../data.json")
// .then((res) = {
//   return res.json()
// })
// .then((obj) => {
//   List(obj);
// })


function Card( {products, index} ) {
  return (
    <div>
      <div id="productList">
        <div className="productCard">
          <div className="productImg"></div>
          <div className="productContent">
            <div className="productName">{product.name}</div>
            <div className="productPrice">{product.price}</div>
            <div className="productBrand">{product.brand}</div>
          </div>
        </div>
      </div>
    </div>
  )};

export default Card;
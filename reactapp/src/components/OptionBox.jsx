/** OptionBox.jsx
 * 상품 옵션 선택 컴포넌트
 */

import React, { useState } from 'react';


const OptionBox = () => {
  const [option, setOption] = useState([]);
  const [sum, setSum] = useState(0);

  // 상품 옵션을 선택하면 화면에 옵션 추가 렌더링 함수
  const selectOption = (e) => {
    const option = option.filter((o, idx) => {
      //동일한 옵션 선택시 같은 옵션 상품이 추가되지 않도록 방지
      if (o !== e.target.value) {
        return o;
      }
    })
    let price = Number(e.target.value.slice(-7, -1).split(",").join("").trim());
    setOption([
      ...option,
      { text: e.target.value, num: 1, prd: prd, sum: price },
    ]);
    setSum(sum + price);
  };
  

  return (
    <div>
      
    </div>
  );
};

export default OptionBox;
/*
Footer 영역 컴포넌트
*/

import React from 'react';

const Footer = () => {
  const footerStyle = {
    padding: '20rem 0 2rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <div style={footerStyle}>
      Footer 영역
    </div>
  );
};

export default Footer;
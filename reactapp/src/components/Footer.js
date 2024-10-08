import React from 'react';
import './Components.css';

const Footer = () => {
    const footerStyle = {
        background: '#3c3c40',
        padding: '10rem 0 2rem 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      };
    return (
        <div  style={footerStyle}>
            <p>이게 footer 영역이다.</p>
        </div>
    )

};
export default Footer;
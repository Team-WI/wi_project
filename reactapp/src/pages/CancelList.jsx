import React from "react";
//import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './CancelList.css';


const CancelList = () => {
    return (
        <div className="cancel-list">
             <Sidebar />
             <div className="cancel-section">
             <h2 >취소/교환/반품 내역</h2>
             <div className="cancel-category">
             <span>주문취소/</span>
             <span>상품교환/</span>
             <span>반품접수</span>
             </div>
             <table className="cancel-tb">
                <tr>
                    <th className="cancel-count">종류</th>
                    <th>주문번호</th>
                    <th>상품명</th>
                    <th>접수일자</th>
                    <th>진행상태</th>
                </tr>
                <tr>
                    <td>
                       취소 
                    </td>
                    <td>
                       12345678
                    </td>
                    <td>
                       monkeyhands
                    </td>
                    <td>
                     2024-09-07
                    </td>
                    <td>
                     취소완료
                    </td>
                </tr>
                <tr>
                    <td className='hidden-td'>
                        접수사유:
                    </td>
                    <td className='hidden-colspan-td' colSpan={4}>
                   <ul>단순변심</ul> 
                    </td>
                </tr>
                <tr>
                    <td className='hidden-td'>
                        접수상품:
                    </td>
                    <td className='hidden-colspan-td' colSpan={4}>
                       <ul>상품코드: 2062241</ul>
                       <ul>상품명: monkeyhands</ul>
                       <ul>판매가: 50,000원</ul>
                       <ul>수량: 2개</ul> 
                       <ul>실 환불금액: 50,000원</ul> 
                    </td>
                </tr>
             </table>
             </div>
        </div>
    );
};

export default CancelList;
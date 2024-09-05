import React from 'react';
import Sidebar from '../components/Sidebar';
import { useQuery } from '@tanstack/react-query'; 
import { fetchData } from './MyOrder'; // 리액트쿼리로 api요청해서 받아온 데이터 가져오기
import './MyOrder.css';


const MyOrderDetail = () => {
    
    const { data } = useQuery({
        queryKey: ['order'],
        queryFn: fetchData
      });

    console.log('상세페이지:',data);
    return (
        <div className='myorder-detail'>  
            <Sidebar />
            <div className='detail-info'>
            <h2>주문배송조회 상세내역</h2>
            <div className='detail-item-info'>
                <h4 className='sub-head'>주문상품정보</h4>
                {data && data.map((order, index) => (
   <div className='myorder-list'>
   <div className='myorder-date' key={index}>
       <span>주문일자:{order.orderDate}</span>
       <span>주문번호:{order.orderId}</span>
   </div>
   {order.items.map((item, itemIndex) => 
   <li className='myorder-li' key={index}>
    <ul className='myorder-itemimg'>이미지영역</ul>
   <ul className='myorder-item' >
       <p>상품명:{item.orderItem}</p>
       <p>수량:{item.quantity}</p>
       <p>가격:{item.price}</p>
   </ul>
   <ul className='myorder-deliveryFee'>{order.deliveryFee}원</ul>
   <ul className='myorder-status'>{order.status}</ul>
</li>
)}  
        </div>
            ))} 
            </div>
            <div className='buyer-info'>
                <h4 className='sub-head'>구매자정보</h4>
                <table className='info-tb'>
                    <tr>
                        <td>주문자</td>
                        <th>motherisalien2</th>
                        <td>휴대폰 번호</td>
                        <th>010-1234-5678</th>
                    </tr>
                </table>
            </div>
            <div className='payments-info'>
                <h4 className='sub-head'>결제정보</h4>
                <table className='info-tb'>
                    <tr >
                        <td>상품금액:</td>
                        <th>96,000원</th>
                        <td rowSpan={2}> 총 결제금액:</td>
                        <th rowSpan={2}>96,000원</th>
                    </tr>
                    <tr>
                    <td>배송비:</td>
                    <th>0원</th>
                    </tr>
                </table>
            </div>
            <div className='shipping-info'>
                <h4 className='sub-head'>배송지정보</h4>
                <table className='info-tb'>
                    <tr>
                        <td>받는사람</td>
                        <th>yougurt31</th>
                    </tr>
                    <tr>
                        <td>휴대폰 번호</td>
                        <th>010-8756-4321</th>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <th>서울시 금천구 가산디지털2로 144 현대테라타워 20층</th>
                    </tr>
                    <tr>
                        <td>배송요청사항</td>
                        <th>문앞에 놔주세요 감사합니다!</th>
                    </tr>
                </table>
            </div>
            </div>
            </div>
    );

};

export default MyOrderDetail;
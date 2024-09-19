import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './MyOrder.css';
import Sidebar from '../components/Sidebar';
//import { useState } from 'react';

//데이터 패칭 함수
const fetchData = async () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const loginId = sessionStorage.getItem('id'); 

    try {
        const response = await axios.post(`${API_URL}/api/orders/shippingList/`,
            {loginId: loginId}
        );
       // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
}


const MyOrder = () => {

    const [cancelModal, SetCancelModal] = useState(false);
    const [refundModal, setRefundModal] = useState(false);

    // useQuery 훅 사용 
    const { data } = useQuery({
        queryKey: ['order'],
        queryFn: fetchData,
        staleTime: 1000 * 60 * 5, // 캐시 시간 설정
      });
   //console.log('data:',data);

   // if (isLoading) return <div>Loading...</div>;
    //if (error) return <div>Error: {error.message}</div>;


    // 취소접수모달창 열기
    const openCancel = () => {
        SetCancelModal(true);
    };
    // 취소접수모달창 닫기
    const closeCancel = () => {
        SetCancelModal(false);
    };

    // 환불접수모달창 닫기
    const openRefund = () => {
    setRefundModal(true);      
    };

    // 환불접수모달창 닫기
    const closeRefund = () => {
    setRefundModal(false);
    };


    return (
        <div className="myorder">
            <Sidebar />
            <div className='myorder-section'>
                <h2>주문배송조회</h2>
                <div className='myorder-th'>
                    <span className='th-img'></span>
                    <span className='th-item'>상품정보</span>
                    <span className='th-status'>진행상태</span>
                    <span className='th-btn'>구매확정</span>
                </div>
                {cancelModal && (<div className='cancel-modal'>
                <form className='cancel-write'>
                <div className='x-btn-section'>
                    <h4 className='cancel-write-head'>취소접수</h4>
                    <button onClick={closeCancel}>x</button>
                    </div>
                    <label>
        <input
          type="radio"
           name="cancel-option"
          value="단순변심"
        />
        단순변심
      </label>
      <label>
        <input
          type="radio"
          name="cancel-option"
          value="재주문 예정"
        />
        다른 상품 추가 후 재주문 예정
      </label> 
      <label>
        <input
          type="radio"
          name="cancel-option"
          value="기타사유"
        />
        기타사유
      </label>
                    <button type='onSubmit'>접수</button>
                </form>
                </div>)}
                {refundModal && (<div className='cancel-modal'>
                <form className='cancel-write'>
                    <div className='x-btn-section'>
                    <h4 className='cancel-write-head'>반품 & 교환 접수</h4>
                    <button onClick={closeRefund}>x</button>
                    </div>
                    <select>
                    <option value="" selected disabled hidden>접수 구분 선택</option>
                            <option value="구매관련문의">반품</option>
                            <option value="일반상담문의">교환</option>
                    </select>
                    <label>
        <input
          type="radio"
           name="cancel-option"
          value="단순변심"
        />
        단순변심
      </label>
      <label>
        <input
          type="radio"
          name="cancel-option"
          value="배송 오류"
        />
        배송 오류
      </label> 
      <label>
        <input
          type="radio"
          name="cancel-option"
          value="상품 파손"
        />
        상품 파손
      </label>
      <input type='file'></input>
      <textarea placeholder='사유를 상세하게 작성해주세요.'></textarea>
                    <button type='onSubmit'>접수</button>
                </form>
                </div>)}
                
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((order) => (
                       
                            <div className='myorder-list'>
                                 <Link className='myorder-link' to={`/MyPage/MyOrder/MyOrderDetail/${order.orderId}`} key={order.orderId}>
                                <div className='myorder-date'>
                                    <span>주문일자: {order.orderDate}</span>
                                    <span>주문번호: {order.orderId}</span>
                                </div>
                                </Link>
                                <ul className='myorder-items'>
                                    {order.items.map((item, itemIndex) => (
                                        <li className='myorder-li' key={itemIndex}>
                                            <div className='myorder-itemimg'>이미지영역</div>
                                            <div className='myorder-item'>
                                                <p>상품명: {item.orderItem}</p>
                                                <p>수량: {item.quantity}</p>
                                                <p>가격: {item.price}</p>
                                            </div>
                                            <div className='myorder-status'>
                                                <p>{order.status}</p>
                                                </div>
                                                <div className='myorder-btn'>
                                                {order.status === '결제완료' && (
                                                    <button className='cancel-btn' onClick={openCancel}>취소접수</button>
                                                )}
                                                {order.status === '배송완료' && (
                                                    <button className='cancel-btn' onClick={openRefund}>반품접수</button>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    ))
                ) : (
                    <div className='myorder-list'>주문내역이 없습니다.</div>
                )}
            </div>
        </div>
    );
    
    
}


export {fetchData, MyOrder};


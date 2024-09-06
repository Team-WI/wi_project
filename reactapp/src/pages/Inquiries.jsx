import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import './Inquiries.css';

// 추가할것, 해당 유저만 접근가능하게, post, get 로직, 등록시 테이블 추가되도록
//onClick={() => handleRowClick()} 페이지이동 or 코멘트영역 드롭다운


const Inquiries = () => {
    const [open, setOpen] = useState(false); // 모달창 오픈 상태
    const [expandedInquiryId, setExpandedInquiryId] = useState(null);
    const [inquiries, setInquiries] = useState([]); // 문의내역을 저장할 상태
    const [inquiryId, setInquiryId] = useState(''); // 문의Id, 
    const [inquiryCategory, setInquiryCategory] = useState('');
    const [inquiryTitle, setInquiryTitle] = useState(''); 
    const [userComment, setUserComment] =useState(''); 
    const [productID, setProductID] =useState('');
    const loginId = sessionStorage.getItem('id') 

  
    useEffect(() => {
        const getInquiries = async () => {
            try {
                const response = await axios.get(`http://43.203.208.22:3000/api/productInquiries/${inquiryId}`);
                console.log(response.data.data);
                 // 받은 데이터를 사용하려면 여기에 추가
                 setInquiries(response.data.data);    
            } 
            catch (error) {
                console.error('Error getting inquiries:', error);
            }
        };
        getInquiries(); // 함수 호출
    }, []); // 빈 배열로 의존성 설정


    
    // 문의 작성 데이터 onChange 핸들러   
    const categoryOnChange = (e) => {
        setInquiryCategory(e.target.value);
    };

    const titleOnChange = (e) => {
        setInquiryTitle(e.target.value);
    };

    const comentOnChange = (e) => {
        setUserComment(e.target.value);
    };
    
    const productIDOnChange = (e) => {
        setProductID(e.target.value);
    };

    let body = {
        inquiryCategory: inquiryCategory,
        inquiryTitle: inquiryTitle,
        userComment: userComment,
        productId:productID,
        loginId: loginId,
    }

   // 문의 데이터 post 하기
    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const Post = await axios.post(
                'http://43.203.208.22:3000/api/productInquiries', // URL
                body,         // 요청 본문
                { headers: { 'Content-Type': 'application/json' } } // 요청 설정
            );
            
            // if(){
            //   resPost = await axios.get(`http://43.203.208.22:3000/api/productInquiries`);
            //   console.log(resPost);
            //   setInquiries(resPost.data.data);
            // } 

      setProductID(''); // POST 후 입력 필드를 초기화
      setInquiryTitle('');
      setUserComment('');
      setOpen(false); // 모달 닫기
      alert('등록 완료');
        } catch (error) {
            // 오류 처리
            console.error('Error posting inquiry:', error);
            alert('등록 오류입니다.');
        }
    };

    const handleDelete = async (inquiryId) => {
        try{
           const Delete = await axios.delete(`http://43.203.208.22:3000/api/productInquiries/${inquiryId}`);
       
            if(Delete.data.data.ok){
               const resDelete = await axios.get(`http://43.203.208.22:3000/api/productInquiries`);
              setInquiries(resDelete.data.data);
              alert('정상적으로 삭제 되었습니다.');
            }
          
        } catch (error) {
            console.error('Error deleting inquiry:', error);
        }
    }

   

  // 클릭 시 호출되는 함수
  const handleRowClick = (inquiryId) => {
    // 현재 클릭한 문의가 이미 확장된 상태라면 숨기기
    if (expandedInquiryId === inquiryId) {
      setExpandedInquiryId(null);
    } else {
      // 그렇지 않으면 클릭한 문의를 확장
      setExpandedInquiryId(inquiryId);
    }
  };

    const modalOpen = () => {
        setOpen(!open);
    };
  

    return (
        <div className='Qnamantoman'>
            <Sidebar />
            <div className='qna'>
                <h2>1:1 문의내역</h2>
                <p>한번 등록한 상담내용은 수정이 불가능합니다.</p>
                <button className='modal-open' onClick={modalOpen}> {open ? '닫기' : '작성하기'}</button>
                {open && (
                    <div className='qna-modal'>
                        <form className='qna-writie' onSubmit={handleSubmit}>
                            <select name="inquiryCategory" value={inquiryCategory} onChange={categoryOnChange}>
                            <option value="" selected disabled hidden>문의 카테고리 선택</option>
                            <option value="구매관련문의">구매관련문의</option>
                            <option value="일반상담문의">일반상담문의</option>
                            <option value="기타문의">기타문의</option>
                            </select>
                            <label>주문 번호</label>
                            <input className='qna-title' name="productID" value={productID} onChange={productIDOnChange} placeholder='주문번호를 입력하세요.'></input>
                            <label>문의 제목</label>
                            <input className='qna-title' name="inquiryTitle" value={inquiryTitle} onChange={titleOnChange} placeholder='문의제목을 입력해주세요.'></input>
                            <label>문의내용</label>
                            <textarea className='qna-content' name="userComment" value={userComment} onChange={comentOnChange} placeholder='문의내용을 입력해주세요.'></textarea>
                            <button type="submit" className='qna-submit'>등록하기</button>
                        </form>
                    </div>
                )}
                
                <table className='qna-table'>
                    <thead>
                        <tr>
                            <th>상담구분</th>
                            <th>상담제목</th>
                            <th>작성일</th>
                            <th>답변유무</th>
                            <th></th>
                        </tr>
                    </thead>
                   <tbody>
        {Array.isArray(inquiries) && inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <React.Fragment key={inquiry.inquiryId}>
              <tr onClick={() => handleRowClick(inquiry.inquiryId)}>
                <td>{inquiry.inquiryCategory}</td>
                <td>{inquiry.inquiryTitle}</td>
                <td>{inquiry.inquiryDate}</td>
                <td>{inquiry.sellerComment ? 'YES' : 'NO'}</td>
                <td><button onClick={() => handleDelete(inquiry.inquiryId)}>X</button></td>
              </tr>
              {expandedInquiryId === inquiry.inquiryId && (
                <tr>
                  <td colSpan="5" className='drop-answer'>Q: {inquiry.userComment} <br/>
                    A: {inquiry.sellerComment}</td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan="5">작성한 문의가 없습니다.</td>
          </tr>
        )}
      </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inquiries;

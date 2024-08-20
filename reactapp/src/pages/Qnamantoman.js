import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import './pages.css';
// 추가할것, 해당 유저만 접근가능하게, post, get 로직, 등록시 테이블 추가되도록


const Qnamantoman = () => {
    const [open, setOpen] = useState(false); // 모달창 오픈 상태

    const [inquiry, setInquiry] = useState({ // 문의 작성 데이터 상태
        option: "",
        title: "",
        userComment: "",
    });

    const inquryOnChange = (e) => {
        const { name, value } = e.target;
        setInquiry({
            ...inquiry,
            [name]:value
        });
        console.log(setInquiry)
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const response = await axios.post(
                'api/users/inquiry', // URL
                { inquiry },         // 요청 본문
                { headers: { 'Content-Type': 'application/json' } } // 요청 설정
            );
    
            // 응답 처리
            console.log(response.data);
        } catch (error) {
            // 오류 처리
            console.error('Error submitting inquiry:', error);
        }
    };


    const modalOpen = () => {
        setOpen(!open);
    };

    return (
        <div className='Qnamantoman'>
            <Sidebar />
            <div className='qna'>
                <h1>1:1 문의내역</h1>
                <p>한번 등록한 상담내용은 수정이 불가능합니다.</p>
                <button className='modal-open' onClick={modalOpen}> {open ? '닫기' : '작성하기'}</button>
                {open && (
                    <div className='qna-modal'>
                        <form className='qna-writie' onSubmit={handleSubmit}>
                            <select name="inquiryOption" value={inquiry.option} onChange={inquryOnChange}>
                            <option value="구매관련문의">구매관련문의</option>
                            <option value="일반상담문의">일반상담문의</option>
                            <option value="기타문의">기타문의</option>
                            </select>
                            <label>문의 제목</label>
                            <input className='qna-title' name="title" value={inquiry.title} onChange={inquryOnChange} placeholder='문의제목을 입력해주세요.'></input>
                            <label>문의내용</label>
                            <textarea className='qna-content' name="userComment" value={inquiry.userComment} onChange={inquryOnChange} placeholder='문의내용을 입력해주세요.'></textarea>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>기타문의</td>
                            <td>입고언제되나요</td>
                            <td>2024-08-19</td>
                            <td>YES</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Qnamantoman;

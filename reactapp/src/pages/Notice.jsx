import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; 
import './Notice.css';



const Notice = () => {
    //const [rowOpen, setRowOpen] = useState(false);
    const [expandedNoticeId, setExpandedNoticeId] = useState(null);
    const [notice, setNotice] = useState([]);
    
   

    useEffect (() => {
        const getNotice = async () => {
                await axios.get('http://43.203.208.22:3000/api/boards')
                .then(response => {
                    console.log(response.data);
                    setNotice(response.data.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        getNotice();
    }, []);

    const handleRowOpen = (boardId) => {
        if (expandedNoticeId === boardId) {
           setExpandedNoticeId(null);
        } else {
           setExpandedNoticeId(boardId);
        }
       };

    return (
        <div className='notice'>
            <Sidebar />
            <div className='ntc'>
            <h2 className='notice-headline'>공지사항</h2>
            <table className='notice-table'>
                <thead>
                <tr>
                    <th>
                        번호
                    </th>
                    <th className='notice-title'>
                        제목
                    </th>
                    <th>
                        등록일
                    </th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(notice) && notice.length > 0 ? (
  notice.map((notice) => (
    <React.Fragment key={notice.boardId}>
      <tr onClick={() => handleRowOpen(notice.boardId)}>
        <td>{notice.boardId}</td>
        <td>{notice.inquiryCategory}</td>
        <td>{notice.inquiryDate}</td>
      </tr>
      {expandedNoticeId === notice.boardId && (
        <tr>
          <td colSpan="3" className='notice-content'>{notice.inquiryContent}</td>
        </tr>
      )}
    </React.Fragment>
  ))
) : (
  <tr>
    <td colSpan="3">공지사항이 없습니다.</td>
  </tr>
)}
</tbody>
            </table>
            </div>
        </div>
    );
};

export default Notice;
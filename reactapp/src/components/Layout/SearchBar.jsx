/** SearchBar.jsx 
 * 메인 상단 검색창 컴포넌트. 
 * handle Submit 입력된 검색어 검색 결과 페이지로 이동
*/

import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';
import './SearchBar.css';


const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate(); 

  // 검색어 입력 감지 함수
  const handleChange = (event) => {
    setSearchKeyword(event.target.value);
  }

  // 검색어 제출 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchKeyword.trim()) {
      const searchPath = `search?keyword=${encodeURIComponent(searchKeyword)}`;
      navigate(searchPath);
  };
  };

  return(
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <input
          type="text"
          className="search-input"
          placeholder=""
          value={searchKeyword}
          onChange={handleChange}
        />
        <button type="submit" className="search-button">
          {/* <Search className="search-icon"/> */}
            <svg className="search-icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
              </g>
            </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar;

/** SearchBar.jsx 
 * 메인 상단 검색창 컴포넌트
*/

import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchBar = ({ }) => {
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
      const searchPath = `search?q=${encodeURIComponent(searchKeyword)}`;
      navigate(searchPath);
  };
  };

  return(
    <Form onSubmit={handleSubmit} className="d-flex">
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchKeyword}
          onChange={handleChange}
        />
        <Button variant="light" type="submit">
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBar;

import { Link } from "react-router-dom";
import './Components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const Category = () => {
   return (
        <div className='category'>
            <div className='category-list'>
                    <div className='category-tap'>Best</div>
                    <div className='category-tap'>Women
                    <ul className='dropdown'>
                        <li className='dropdown-item'>All</li>
                        <li className='dropdown-item'>상의</li>
                        <li className='dropdown-item'>하의</li>
                        <li className='dropdown-item'>신발</li>
                    </ul>
                    </div>
                    <div className='category-tap'>Men
                    <ul className='dropdown'>
                        <li className='dropdown-item'>All</li>
                        <li className='dropdown-item'>상의</li>
                        <li className='dropdown-item'>하의</li>
                        <li className='dropdown-item'>신발</li>
                    </ul>
                    </div>
                    <div className='category-tap'>Kids
                    <ul className='dropdown'>
                        <li className='dropdown-item'>All</li>
                        <li className='dropdown-item'>상의</li>
                        <li className='dropdown-item'>하의</li>
                        <li className='dropdown-item'>신발</li>
                    </ul>
                    </div>
                </div>
            <div className='search'>
            <button className='search-btn'>
            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
            </button>
            <input className="search-input" placeholder="원하는 상품을 검색하세요" />
            </div>
        </div>
    );
};
export default Category;
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';
import { searchItems } from '~/services/searchService';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (query.trim()) {
            try {
                const searchResults = await searchItems(query);
                setResults(searchResults);
                navigate(`/search?q=${query.trim()}`);
            } catch (error) {
                console.error('Error fetching search results:', error);
                // alert(`Đã xảy ra lỗi khi tìm kiếm ${query.trim()}, vui lòng thử lại sau.`);
                navigate(`/search?q=${query.trim()}`);
            }
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const toggleSearchInput = () => {
        setShowSearchInput((prevShowSearchInput) => !prevShowSearchInput);
    };

    const handleSearchButtonClick = () => {
        handleSearch();
    };

    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon className={cx('icon')} icon={faSearch} onClick={toggleSearchInput} />
            {showSearchInput && (
                <div className={cx('search-container')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faSearch} onClick={handleSearchButtonClick} />
                    <input
                        type="text"
                        className={cx('search-input')}
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Tìm kiếm..."
                    />
                    {results.length > 0 && (
                        <ul className={cx('results')}>
                            {results.map((item) => (
                                <li key={item.id} className={cx('result-item')}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;

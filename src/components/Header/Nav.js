import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Nav.scss';

const Nav = () => {
  const [data, setData] = useState({ parentNavigation: [], childNavigation: [] });
  const [hoveredMenu, setHoveredMenu] = useState(null);

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        const parentResponse = await axios.get('http://localhost:3001/category');
        const childResponse = await axios.get('http://localhost:3001/childNavigation');
        setData({
          parentNavigation: parentResponse.data,
          childNavigation: childResponse.data,
        });
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      }
    };

    fetchNavigationData();
  }, []);

  const handleMouseEnter = (parentId) => {
    setHoveredMenu(parentId);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Trang Chủ</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {data.parentNavigation.map((parent) => (
              <li
                key={parent.id}
                className={`nav-item dropdown ${hoveredMenu === parent.id ? 'show' : ''}`}
                onMouseEnter={() => handleMouseEnter(parent.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="nav-link dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={hoveredMenu === parent.id ? 'true' : 'false'}
                >
                  {parent.name}
                </button>
                <ul className={`dropdown-menu ${hoveredMenu === parent.id ? 'show' : ''}`}>
                  {data.childNavigation
                    .filter((child) => child.parentNavigationId === parent.id)
                    .map((child) => (
                      <li key={child.id}>
                        <Link className="dropdown-item" to={`/${child.title.replace(/\s+/g, '-').toLowerCase()}`}>
                          {child.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit">Tìm kiếm</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

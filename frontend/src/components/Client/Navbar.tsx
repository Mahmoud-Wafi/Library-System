import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query) {
            navigate(`/search?query=${query}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">Library</Link>
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
                        <li className="nav-item">
                            <Link className="nav-link" to="#book-section">Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/link">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/link">Authors</Link>
                        </li>
                        
                    </ul>
                    <form className="d-flex mx-auto" role="search" onSubmit={handleSearch}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            style={{ height: 'calc(1.5em + .75rem + 2px)' }} // Match the height of the button
                        />
                        <button 
                            className="btn btn-outline-success d-flex align-items-center justify-content-center" 
                            type="submit"
                            style={{ height: 'calc(1.5em + .75rem + 2px)' }}
                        >
                            Search
                        </button>
                    </form>
                        <Link to="/profile" className="nav-link" style={{ marginRight: '20px' , padding: "10px 10px" }}>
                            <FaUser size={30} />
                        </Link>
                        <Link to="/logout" className="nav-link" style={{ marginRight: '19px' , padding: "10px 10px" }}>
                            <FaSignOutAlt size={30} />
                        </Link>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import Sort from './Sort';
import './Header.css';

const Header = ({ onSort, onLanguageChange }) => {
    const [darkMode, setDarkMode] = useState(false);

    // Apply light or dark mode class to the body
    useEffect(() => {
        const theme = darkMode ? 'dark-mode' : 'light-mode';
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme); // Persist theme in localStorage
    }, [darkMode]);

    // Load saved theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark-mode') {
            setDarkMode(true);
        }
    }, []);

    const handleLanguageChange = (e) => {
        onLanguageChange(e.target.value);
    };

    return (
        <header className="header">
            <h1>CineScout</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/preferences">Preferences</Link>
                <Link to="/recommendations">Recommendations</Link>
                <Link to="/surprise">Surprise Me</Link>
                {/* Add toggle button inline with navigation */}
                <button
                    className="dark-mode-toggle"
                    onClick={() => setDarkMode((prevMode) => !prevMode)}
                >
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </nav>
            <div className="filters-container">
                <Sort onSort={onSort} />
                <Search />
                <div className="language-container">
                    <label htmlFor="language-select">Language:</label>
                    <select
                        id="language-select"
                        onChange={handleLanguageChange}
                        className="language-select"
                    >
                        <option value="">Select Language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                        <option value="zh">Chinese</option>
                    </select>
                </div>
            </div>
        </header>
    );
};

export default Header;

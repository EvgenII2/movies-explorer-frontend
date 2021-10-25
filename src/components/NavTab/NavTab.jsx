import './NavTab.css';
import React from 'react';

function NavTab() {
    return (
        <ul className="nav-tab">
            <li className="nav-tab__button-kontainer">
                <button type="button" className="nav-tab__button">
                    О&#160;проекте
                </button>
            </li>
            <li className="nav-tab__button-kontainer">
                <button type="button" className="nav-tab__button">
                    Технологии
                </button>
            </li>
            <li className="nav-tab__button-kontainer">
                <button type="button" className="nav-tab__button">
                    Студент
                </button>
            </li>
        </ul>
    )
}

export default NavTab;

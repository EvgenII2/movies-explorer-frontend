import './Portfolio.css';
import React from 'react';

function Portfolio() {
    return (
        <div className="portfolio">
            <h4 className="portfolio-title">
                Портфолио
            </h4>
            <ul className="portfolio-links">
                <li className="portfolio-link">
                    <span className="portfolio-link-text">
                        Статичный сайт
                    </span>
                    <span className="portfolio-link-arrow">
                        &#8599;
                    </span>
                </li>
                <li className="portfolio-link">
                    <span className="portfolio-link-text">
                        Адаптивный сайт
                    </span>
                    <span className="portfolio-link-arrow">
                        &#8599;
                    </span>
                </li>
                <li className="portfolio-link">
                    <span className="portfolio-link-text">
                        Одностраничное приложение
                    </span>
                    <span className="portfolio-link-arrow">
                        &#8599;
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Portfolio;

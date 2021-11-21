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
                    <a href='https://domainname.nomoredomains.club/'>
                        <span className="portfolio-link-text">
                            Статичный сайт
                        </span>
                        <span className="portfolio-link-arrow">
                            &#8599;
                        </span>
                    </a>
                </li>
                <li className="portfolio-link">
                    <a href='https://domainname.nomoredomains.club/'>
                        <span className="portfolio-link-text">
                            Адаптивный сайт
                        </span>
                        <span className="portfolio-link-arrow">
                            &#8599;
                        </span>
                    </a>
                </li>
                <li className="portfolio-link">
                    <a href='https://domainname.nomoredomains.club/'>
                        <span className="portfolio-link-text">
                            Одностраничное приложение
                        </span>
                        <span className="portfolio-link-arrow">
                            &#8599;
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Portfolio;

import './Techs.css';
import React from 'react';

function Techs() {
    return (
        <div className="techs">
            <h2 className="techs__title">
                Технологии
            </h2>
            <div className="techs__desc">
                <h3 className="techs__desc-title">
                    7 технологий
                </h3>
                <p className="techs__desc-paragraph">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <ul className="techs__names">
                    <li className="techs__name">
                        HTML
                    </li>
                    <li className="techs__name">
                        CSS
                    </li>
                    <li className="techs__name">
                        JS
                    </li>
                    <li className="techs__name">
                        React
                    </li>
                    <li className="techs__name">
                        Git
                    </li>
                    <li className="techs__name">
                        Express.js
                    </li>
                    <li className="techs__name">
                        mongoDB
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Techs;

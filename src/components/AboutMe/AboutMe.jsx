import './AboutMe.css';
import React from 'react';
import image from '../../images/avatar.png';

function AboutMe() {
    return (
        <div className="about-me">
            <h2 className="about-me__title">
                Студент
            </h2>
            <article className="about-me__article">
                <div className="about-me__text">
                    <h3 className="about-me__article-title">
                        Виталий
                    </h3>
                    <p className="about-me__article-subtitle">
                        Фронтенд-разработчик, 30 лет
                    </p>
                    <p className="about-me__article-paragraph">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и&#160;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <ul className="about-me__personal-links">
                        <li className="about-me__personal-link">
                            Facebook
                        </li>
                        <li className="about-me__personal-link">
                            Github
                        </li>
                    </ul>
                </div>
                <img src={image} alt='Фото' className="about-me__photo" />
            </article>
            <div className="about-me__portfolio">
                <h4 className="about-me__portfolio-title">
                    Портфолио
                </h4>
                <ul className="about-me__portfolio-links">
                    <li className="about-me__portfolio-link">
                        <span className="about-me__portfolio-link-text">
                            Статичный сайт
                        </span>
                        <span className="about-me__portfolio-link-arrow">
                            &#8599;
                        </span>
                    </li>
                    <li className="about-me__portfolio-link">
                        <span className="about-me__portfolio-link-text">
                            Адаптивный сайт
                        </span>
                        <span className="about-me__portfolio-link-arrow">
                            &#8599;
                        </span>
                    </li>
                    <li className="about-me__portfolio-link">
                        <span className="about-me__portfolio-link-text">
                            Одностраничное приложение
                        </span>
                        <span className="about-me__portfolio-link-arrow">
                            &#8599;
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AboutMe;

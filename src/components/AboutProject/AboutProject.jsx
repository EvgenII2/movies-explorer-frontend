import './AboutProject.css';
import React from 'react';

function AboutProject() {
    return (
        <div className="about-project">
            <h2 className="about-project__title">
                О проекте
            </h2>
            <div className="about-project__desc">
                <article className="about-project__desc-article">
                    <h3 className="about-project__desc-article-title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__desc-article-paragraph">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </article>
                <article className="about-project__desc-article">
                    <h3 className="about-project__desc-article-title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__desc-article-paragraph">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </article>
            </div>
            <div className="about-project__plane">
                <div className="about-project__plane-section">
                    <div className="about-project__plane-weeks about-project__plane-weeks_color_green">
                        1 неделя
                    </div>
                    <p className="about-project__plane-techs">
                        Back-end
                    </p>
                </div>
                <div className="about-project__plane-section">
                    <div className="about-project__plane-weeks">
                        4 недели
                    </div>

                    <p className="about-project__plane-techs">
                        Front-end
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutProject;

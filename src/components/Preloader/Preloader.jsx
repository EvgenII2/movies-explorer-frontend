import React from 'react'
import PropTypes from 'prop-types';
import './Preloader.css'

function Preloader({ isActive }) {
    return (
        isActive ? (
            <div className="preloader">
                <div className="preloader__container">
                    <span className="preloader__round" />
                </div>
            </div>) :
            (<></>)
    )
};
Preloader.propTypes = {
    isActive: PropTypes.bool.isRequired
}

export default Preloader

import React from 'react';

import tg from '../../assets/img/tg.svg'
import vk from '../../assets/img/vk.svg'
export const Index = () => {
    return (
        <>
            <div className="header">
                <div className="logo">
                    <p>Дорога к</p>
                    <img src="" alt=""/>
                </div>
                <div className="header__content">
                    <ul>
                        <li>Ака </li>
                        <li>мака</li>
                        <li>жага</li>
                        <li>кака</li>
                        <li>лука</li>
                    </ul>
                </div>
                <div className="header__link">
                    <a href="">
                        <img src={tg} alt="tg"/>
                    </a>
                    <a href="">
                        <img src={vk} alt=""/>
                    </a>
                </div>
            </div>
        </>

    );

};


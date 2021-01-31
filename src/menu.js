import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    const [visibleMenu, setVisibleMenu] = useState(false);

    const toggleMenu = () => {
        setVisibleMenu(!visibleMenu);
    };

    return (
        <div className="menu">
            <div className="menu-title">
                <h3 onClick={() => toggleMenu()}>MENU</h3>
            </div>
            {visibleMenu && (
                <div className="menu-list" onClick={() => toggleMenu()}>
                    <Link to="/about">
                        <p>ABOUT</p>
                    </Link>
                    <Link to="/bowie-map">
                        <p>BOWIE BERLIN</p>
                    </Link>
                    <Link to="/kino-map">
                        <p>CLASSIC KINOS</p>
                    </Link>
                    <Link to="book-map">
                        <p>INDIE BOOKSTORES</p>
                    </Link>
                    <Link to="/suggestions">
                        <p>SEND SUGGESTIONS!</p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Menu;

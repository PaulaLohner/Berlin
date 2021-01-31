import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <div className="logo-page">
            <Link to="/">
                <img src="/bear_logo.png" alt="Berlin bear logo"></img>
            </Link>
            <h1>BERLIN BY DEMAND</h1>
        </div>
    );
}

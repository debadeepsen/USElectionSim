import React from "react";
import DesktopApp from "./DesktopApp";
import MobileApp from "./MobileApp";

const Container = () => (
    <div>
        <div className="desktop-container">
            <DesktopApp />
        </div>
        <div className="mobile-container">
            <MobileApp />
        </div>
    </div>
)

export default Container;
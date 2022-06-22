import React, { Component } from "react";
import NavMenu from "./nav_menu";

function SideBar() {
    return (
        <>
            <div className="sidebar-wrapper print-hide">
                <nav id="sidebar" className="print-hide">
                    <NavMenu />
                </nav>
            </div>
        </>
    );
}

export default SideBar;

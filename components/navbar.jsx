import React, { useState } from "react";
import Link from "next/link";
import NavMenu from "./nav_menu";
import InvisionSignIn from "./invision-auth-react/invision-signin";

function Navbar() {
    const [showColapsedMenu, setShowColapsedMenu] = useState(false);

    const handleMenuToggleButton = (close) => {
        const show = close ? false : !showColapsedMenu;
        setShowColapsedMenu(show);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <>
            <nav className="navbar navbar-fixed-top  navbar-expand navbar-dark bg-dark print-hide desktop-menu">
                <div className="row">
                    <div className="col-auto">
                        <h1 className="navbar-brand">
                            <Link href="/">Site Title</Link>
                        </h1>
                    </div>
                </div>
                <div className="col-auto">
                    {/* <div
                        className="collapse navbar-collapse"
                        id="navbarsExample04"
                    >
                        <ul className="navbar-nav mr-auto header-nav">
                            <li className="nav-item active"></li>
                        </ul>
                    </div> */}
                    <InvisionSignIn
                        community_url={
                            process.env.NEXT_PUBLIC_INVISION_COMMUNITY_URL
                        }
                        client_id={process.env.NEXT_PUBLIC_INVISION_CLIENT_ID}
                        scopes={["profile"]}
                    />
                </div>
            </nav>

            <nav className="navbar navbar-dark bg-dark mobile-menu">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-auto">
                            <button
                                className="btn btn-outline-light mt-2 mb-2"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarsExample01"
                                aria-controls="navbarsExample01"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                                onClick={() => handleMenuToggleButton()}
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={`collapse navbar-collapse ${
                        showColapsedMenu ? "show" : ""
                    }`}
                    id="navbarsExample01"
                >
                    <NavMenu onMenuItemClick={handleMenuToggleButton} />
                </div>
            </nav>
        </>
    );
}

export default Navbar;

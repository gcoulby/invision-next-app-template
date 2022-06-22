import Link from "next/link";
import React, { useState } from "react";
import { withMinumumStaffRole } from "./rbac-hoc";

function NavMenu({ onMenuItemClick }) {
    const [baseUrl] = useState("/");
    const [sections] = useState([
        {
            title: "Sub Section",
            role: "*",
            pages: [
                {
                    url: "/page-one",
                    pageName: "Page 1",
                    icon: "fa fa-users",
                    active: false,
                    role: "*",
                },
                {
                    url: "/page-one",
                    pageName: "Page 1",
                    icon: "fa fa-users",
                    active: false,
                    role: "*",
                },
            ],
        },
        {
            title: "Sub Section",
            role: "Admin",
            pages: [
                {
                    url: "/page-one",
                    pageName: "Page 1",
                    icon: "fa fa-users",
                    active: false,
                    role: "Admin",
                },
                {
                    url: "/page-one",
                    pageName: "Page 1",
                    icon: "fa fa-users",
                    active: false,
                    role: "Senior Admin",
                },
            ],
        },
        {
            title: "Sub Section",
            role: "Management",
            pages: [
                {
                    url: "/page-two",
                    pageName: "Page 2",
                    icon: "fa fa-address-card",
                    active: false,
                    role: "Management",
                },
                {
                    url: "/page-two",
                    pageName: "Page 4",
                    icon: "fa fa-address-card",
                    active: false,
                    role: "Owner",
                },
            ],
        },
    ]);

    const getRestrictedLink = (page) => {
        let RestrictedLink = withMinumumStaffRole(page.role)(
            ({ url, pageName, onMenuItemClick, icon }) => {
                return (
                    <>
                        <Link key={url} href={url}>
                            <a
                                onClick={() =>
                                    onMenuItemClick
                                        ? onMenuItemClick()
                                        : () => {}
                                }
                            >
                                <i
                                    className={`menu-icon ${icon}`}
                                    aria-hidden="true"
                                ></i>
                                &nbsp;{pageName}
                            </a>
                        </Link>
                    </>
                );
            }
        );
        return (
            <RestrictedLink
                url={page.url}
                pageName={page.pageName}
                onMenuItemClick={onMenuItemClick}
                icon={page.icon}
            />
        );
    };

    const getRestrictedSectionTitle = (section) => {
        let RestrictedSectionTitle = withMinumumStaffRole(section.role)(() => {
            return <h6 className="menu-title">{section.title}</h6>;
        });
        return <RestrictedSectionTitle title={section.title} />;
    };

    return (
        <>
            <div className="row  menu-roller">
                <div className="col-12 col-lg-4"></div>
            </div>
            <ul>
                {sections.map((section, i) => {
                    return (
                        <li key={"section_" + i} className="sidebarGroup">
                            {/* <h6 className="menu-title">{section.title}</h6> */}
                            {getRestrictedSectionTitle(section)}
                            <ul className="navbar-nav mr-auto">
                                {section.pages.map((page, j) => (
                                    <li
                                        key={"page_" + j}
                                        className={`${
                                            page.active ? "active" : ""
                                        }`}
                                    >
                                        {page.title}

                                        {/* <Link key={page.url} href={page.url}>
                                            <a
                                                onClick={() =>
                                                    onMenuItemClick
                                                        ? onMenuItemClick()
                                                        : () => {}
                                                }
                                            >
                                                <i
                                                    className={`menu-icon ${page.icon}`}
                                                    aria-hidden="true"
                                                ></i>
                                                &nbsp;{page.pageName}
                                            </a>
                                        </Link> */}
                                        {page.title}
                                        {getRestrictedLink(page)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default NavMenu;

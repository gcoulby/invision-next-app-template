import React, { useContext } from "react";
import { UserContext } from "./user-context";

export const staffRoles = [
    "Administrator",
    "Senior Admin",
    "Staff Lead",
    "Management",
    "Owners",
];

export const getAllowedRoles = (role) => {
    let staffRoleIndex = staffRoles.indexOf(role);
    return staffRoles.slice(staffRoleIndex);
};

export const checkMinimumStaffRole = (role) => {
    let allowedRoles = getAllowedRoles(role);
    var r = allowedRoles.filter((x) =>
        x.toLowerCase().includes(role.toLowerCase())
    );
    return r.length > 0;
};

export const withMinumumStaffRole =
    (role) =>
    (Component) =>
    ({ ...props }) => {
        if (role === "*") {
            return <Component {...props} />;
        } else {
            let allowedRoles = getAllowedRoles(role);
            const context = useContext(UserContext);
            if (context.checkRoles(allowedRoles)) {
                return <Component {...props} />;
            }
            if (props.showIfNotAuthorized) {
                return (
                    <div className="alert alert-danger">
                        <h4 className="alert-heading">
                            Error 401: Authorized Access
                        </h4>
                        <hr />
                        <p>
                            You are not authorized to access this content.
                            Please ensure you are logged in and that you have
                            the correct whitelisting on the forums.
                        </p>
                    </div>
                );
            }
            return null;
        }
    };

export const withRoles =
    (roles) =>
    (Component) =>
    ({ ...props }) => {
        const context = useContext(UserContext);
        if (context.checkRoles(roles)) {
            return <Component {...props} />;
        }
        if (props.showIfNotAuthorized) {
            return (
                <p className="alert">
                    You are not authorised to view this content
                </p>
            );
        }
        return null;
    };

// export const withRoles;
// export const withMinumumStaffRole;

// export const withAdminRole = withRole([
//     "Admin",
//     "Senior Admin",
//     "Staff Lead",
//     "Management",
//     "Owner",
// ]);
// export const withSeniorAdminRole = withRole([
//     "Senior Admin",
//     "Staff Lead",
//     "Management",
//     "Owner",
// ]);
// export const withStaffLeadRole = withRole([
//     "Staff Lead",
//     "Management",
//     "Owner",
// ]);
// export const withManagementRole = withRole(["Management", "Owner"]);
// export const withOwnerRole = withRole(["Owner"]);

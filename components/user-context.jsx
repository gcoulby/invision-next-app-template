import React, { useState } from "react";

export const UserContext = React.createContext();

export function AppContextWrapper({ children }) {
    const [user, setUser] = useState({
        access_token: "",
        expiry: "",
        user: {},
    });

    const checkRoles = (roles) => {
        var r = roles.filter((x) =>
            x
                .toLowerCase()
                .includes(user?.user?.primaryGroup?.name?.toLowerCase())
        );
        return r.length > 0;
    };

    return (
        <UserContext.Provider
            value={{
                data: user,
                updateUser: setUser,
                checkRoles: checkRoles,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

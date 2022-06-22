import React, { useContext } from "react";
import { UserContext } from "../components/user-context";

import Page from "../components/_page";

export default function PageOne() {
    return (
        <>
            <Page
                Role="Management"
                Component={() => {
                    let context = useContext(UserContext);

                    const getData = () => {
                        fetch(
                            `/api/protected?params=${context?.data?.user?.primaryGroup?.name},${context?.data?.access_token}`
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                            });
                    };
                    return (
                        <>
                            <h1>Hello</h1>
                            <button onClick={() => getData()}>Get Data</button>
                        </>
                    );
                }}
            />
        </>
    );
}

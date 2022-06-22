import React, { useEffect, useContext } from "react";
import { UserContext } from "../user-context";

function InvisionSignIn({ community_url, client_id, scopes }) {
    let context = useContext(UserContext);
    const access_reg = /access_token=(.*?)&/;
    const expiry_reg = /expires_in=([0-9]+)/;

    const styles = {
        invision_signin: {
            cursor: "pointer",
        },

        invision_photo: {
            width: "30px",
            borderRadius: "50%",
            verticalAlign: "middle",
            marginRight: "0.5em",
        },

        invision_icon: {
            width: "30px",
            height: "30px",
            paddingLeft: "0.2em",
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: "#c2c2c2",
            verticalAlign: "middle",
            marginRight: "0.5em",
        },
    };

    const getAccessToken = () => {
        const url = `${community_url}/oauth/authorize?client_id=${client_id}&response_type=token&scope=${scopes}`;
        window.location.href = url;
    };

    const signOut = () => {
        context.updateUser({
            access_token: "",
            expiry: "",
            user: {},
        });
        localStorage.removeItem(`invision_credentials(${client_id})`);
        window.location.href = "/";
    };

    const storeCreditentials = (access_token, expiry, user) => {
        context.updateUser({
            access_token: access_token,
            expiry: expiry,
            user: user,
        });
        localStorage.setItem(
            `invision_credentials(${client_id})`,
            JSON.stringify({
                access_token: access_token,
                expiry: expiry,
                user: user,
            })
        );
    };

    useEffect(() => {
        let access_token = context.data.access_token ?? "";
        let expiry = context.data.expiry ?? "";

        let localCredentials = localStorage.getItem(
            `invision_credentials(${client_id})`
        );
        if (localCredentials) {
            let credentials = JSON.parse(localCredentials);
            if (credentials.expiry > Date.now()) {
                storeCreditentials(
                    credentials.access_token,
                    credentials.expiry,
                    credentials.user
                );
                access_token = credentials.access_token;
            }
        }
        if (access_token === "" && window.location.hash) {
            let hash = window.location.hash;
            let match_access = hash.match(access_reg);
            access_token =
                match_access && match_access.length > 0 ? match_access[1] : "";

            let match_expiry = hash.match(expiry_reg);
            let expires_in =
                match_expiry && match_expiry.length > 0 ? match_expiry[1] : "";

            expiry = Date.now() + parseInt(expires_in) * 1000;
        }
        if (access_token != "") {
            fetch(
                `${community_url}/api/core/me?access_token=${access_token}`,
                {}
            )
                .then((response) => response.json())
                .then((responseData) => {
                    storeCreditentials(access_token, expiry, responseData);
                });
        }
    }, []);

    return (
        <>
            <div className="invision_button" style={styles.invision_signin}>
                {context.data.access_token !== "" ? (
                    <div className="invision_button_signOut" onClick={signOut}>
                        <img
                            className="invision_button_photo"
                            style={styles.invision_photo}
                            src={context.data.user.photoUrl}
                            alt="profile_photo"
                            title="profile_photo"
                        ></img>
                        <span className="invision_button_signout_text">
                            Sign Out ({context.data.user.name})
                        </span>
                    </div>
                ) : (
                    <div
                        className="invision_button_signIn"
                        onClick={getAccessToken}
                    >
                        <span
                            className="invision_button_icon"
                            style={styles.invision_icon}
                        >
                            <svg
                                className="svg-icon"
                                style={{
                                    padding: "0.2em",
                                    width: "1.5em",
                                    height: "1.5em",
                                    verticalAlign: "middle",
                                    fill: "white",
                                    overflow: "hidden",
                                }}
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
                            </svg>
                        </span>
                        <span className="invision_button_signin_text">
                            Sign in with forum account
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}

export default InvisionSignIn;

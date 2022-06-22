import CheckAuth from "../../services/server_auth";

export default function handler(req, res) {
    // let { clientRole, minimumRole, data, access_token, auth } =
    CheckAuth(req.query, "Management").then((data) => {
        res.status(200).json({
            data: data,
            aaa: "Sent",
        });
    });

    // res.status(200).json({
    //     data: auth,
    //     aaa: "Sent",
    // });

    // res.status(200).json({
    //     auth: auth,
    //     name: "John Doe2",
    // });

    // let community_url = process.env.NEXT_PUBLIC_INVISION_COMMUNITY_URL;
    // fetch(`${community_url}/api/core/me?access_token=${accessToken}`)
    //     .then((r) => r.json())
    //     .then((data) => {
    //         res.status(200).json({
    //             role: role,
    //             data: data,
    //             name: "John Doe",
    //         });
    //     });
    // res.status(200).json({
    //     role: role,
    //     accessToken: accessToken,
    //     name: "John Doe",
    // });
}

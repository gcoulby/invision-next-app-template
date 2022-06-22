import CheckAuth from "../../services/server_auth";

export default function handler(req, res) {
    CheckAuth(req.query.clientRole, req.query.accessToken, "Management").then(
        (data) => {
            res.status(200).json({
                data: data,
            });
        }
    );
}

import { checkMinimumStaffRole } from "../components/rbac-hoc";

async function CheckAuth(query, minimumRole) {
    const { params } = query;
    let paramSplit = params.split(",");
    if (paramSplit && paramSplit.length !== 2) {
        res.status(422).send("Invalid data");
    }
    let clientRole = paramSplit[0];
    let accessToken = paramSplit[1];

    let community_url = process.env.NEXT_PUBLIC_INVISION_COMMUNITY_URL;
    let data = await fetch(
        `${community_url}/api/core/me?access_token=${accessToken}`
    )
        .then((r) => r.json())
        .then((data) => {
            return {
                clientRole: clientRole,
                minimumRole: minimumRole,
                data: data,
                accessToken: accessToken,
                auth: checkMinimumStaffRole(minimumRole),
                tamper: data.primaryGroup.name !== clientRole,
            };
        });
    return data;
}

export default CheckAuth;

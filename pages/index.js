import HomePage from "../components/page_components/home";
import Page from "../components/_page";

export default function Index() {
    return (
        <>
            <Page Role="*" Component={HomePage} />
        </>
    );
}

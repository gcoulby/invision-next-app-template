import "../styles/globals.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/css-compiled/main.css";
import { AppContextWrapper } from "../components/user-context";

function MyApp({ Component, pageProps }) {
    return (
        <AppContextWrapper>
            <Component {...pageProps} />
        </AppContextWrapper>
    );
}

export default MyApp;

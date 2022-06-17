import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';


export default function ProtectedRoute({ children }) {
    const cookies = new Cookies();
    var auth = cookies.get("loginToken");
    const username = cookies.get("username");
    if (username == "undefined") {
        cookies.set("loginToken", false);
        auth = cookies.get("loginToken");
    }

    if (!auth) {
        // user is not authenticated
        return <Navigate to="/signin" />;
    }
    return children;
};
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';


export default function ProtectedRoute({ children }) {
    const cookies = new Cookies();
    var auth = cookies.get("loginToken");
    const accessTok = cookies.get("accessTok");
    if (accessTok == "undefined") {
        cookies.set("loginToken", 'false');
        auth = cookies.get("loginToken");
    }

    if (auth === 'false') {
        // user is not authenticated
        return <Navigate to="/signin" />;
    }
    return children;
};
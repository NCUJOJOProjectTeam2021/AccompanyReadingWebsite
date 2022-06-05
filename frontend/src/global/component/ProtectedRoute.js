import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';


export default function ProtectedRoute({ children }) {
    const cookies = new Cookies();
    const auth = cookies.get("loginToken");

    if (!auth) {
        // user is not authenticated
        return <Navigate to="/signin" />;
    }
    return children;
};
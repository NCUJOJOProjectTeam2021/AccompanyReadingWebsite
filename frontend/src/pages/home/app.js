import { Link } from "react-router-dom";

export default function HomePage(props) {
    return (
        <div>
            <h1>Hello</h1>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>
            </div>
        </div>
    );
};
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

export default function Header() {
    const { isAuthenticated, username } = useContext(AuthContext);

    return (
        <header>
            <h1>
                <Link to="/" className="home">
                    GamesPlay
                </Link>
            </h1>
            <nav>
                <Link to="/games">All games</Link>

                {isAuthenticated ? (
                    <div id="user">
                        <Link to="/games/create">Create Game</Link>
                        <Link to="/logout">Logout</Link>
                        <span> | {username}</span>
                    </div>
                ) : (
                    <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}



            </nav>
        </header>
    );
}
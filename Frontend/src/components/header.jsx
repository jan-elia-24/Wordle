import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'; // If you're using React Router

export function Header() {
    return (
        <header className="fixed-top shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
                <div className="container">
                    <a className="navbar-brand fw-bold fs-4" href="#">
                        Wordle
                    </a>
                    
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-2">
                                <NavLink 
                                    className="nav-link px-3 py-2 rounded" 
                                    activeClassName="active bg-white text-primary fw-bold"
                                    exact
                                    to="/"
                                >
                                    The Game
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink 
                                    className="nav-link px-3 py-2 rounded" 
                                    activeClassName="active bg-white text-primary fw-bold"
                                    to="/highscores"
                                >
                                    Highscore List
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink 
                                    className="nav-link px-3 py-2 rounded" 
                                    activeClassName="active bg-white text-primary fw-bold"
                                    to="/about"
                                >
                                    About Me
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
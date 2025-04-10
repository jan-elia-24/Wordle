import 'bootstrap/dist/css/bootstrap.min.css';

export function Header() {
    return (
        <header className="header  fixed-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">The game</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Highscore-lista</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About me</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

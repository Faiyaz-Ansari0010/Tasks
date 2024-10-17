import './Header.scss';
import logoImg from "../assets/logo.PNG"

export default function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={logoImg} alt="Quantum Logo" />
                <p>Quantum</p>
            </div>
            <div className="nav-items-container">
                <nav className="nav">
                    <ul>
                        <li><a href="#">CONTENT</a></li>
                        <li><a href="#">USERS</a></li>
                        <li><a href="#">ADMIN</a></li>
                    </ul>
                </nav>
                <div className="profile">
                    <p className="profile-initials">PA</p>
                </div>
            </div>
        </header>
    )
}



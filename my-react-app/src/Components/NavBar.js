import "./NavBar.scss"
import backImg from "../assets/back-arrow.PNG"

export default function Header() {
    return (
        <nav className="nav-bar">
            <button className="back-btn">
                <img src={backImg} alt="Back-Button" />
            </button>
            <p className="title">Create New Question</p>
            <div className="actions">
                <button className="cancel">CANCEL</button>
                <button className="publish">PUBLISH</button>
                <button className="save">SAVE ▼</button>
            </div>
        </nav>
    )
}
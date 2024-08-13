import { Link } from 'react-router-dom'
import argentBankLogo from '../../assets/argentBankLogo.png'
import './index.css'

function Nav() {
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to={'/'}>
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <Link className="main-nav-item" to="/login">
                <i className="fa fa-user-circle"></i> Sign In
            </Link>
        </nav>
    )
}

export default Nav

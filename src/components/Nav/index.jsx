import { Link } from 'react-router-dom'
import argentBankLogo from '../../assets/argentBankLogo.png'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectConnexion } from '../../pages/Login/authSlice'

function Nav() {
    const dispatch = useDispatch()
    const isUserConnexted = useSelector(selectConnexion)

    const handleClick = () => {
        dispatch(logout())
    }

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
            {isUserConnexted ? (
                <Link className="main-nav-item" to="/" onClick={handleClick}>
                    <i className="fa fa-user-circle"></i> Sign out
                </Link>
            ) : (
                <Link className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i> Sign In
                </Link>
            )}
        </nav>
    )
}

export default Nav

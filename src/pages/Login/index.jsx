import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../services/Api'
import { setCredentials } from './authSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login] = useLoginMutation()

    //suppression du JWT lors de l'arrivé sur la page Login car pas de encore maintien de connexion
    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    // Lance le call API pour récupérer le JWT afin d'accéder aux ressources privées
    // Gère la navigation
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const token = await login({ email, password }).unwrap()
            dispatch(setCredentials({ token: token }))
            localStorage.setItem('token', token)
            if (token) {
                navigate('/profile')
            }
        } catch (error) {
            console.error('Connexion échoué', error)
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">UserEmail</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Login

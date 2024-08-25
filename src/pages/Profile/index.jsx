import { useDispatch, useSelector } from 'react-redux'
import { useGetUserProfileQuery } from '../../services/Api'
import { selectUserInfo, setCredentials } from '../Login/authSlice'
import { useEffect } from 'react'

function Profil() {
    const dispatch = useDispatch()
    const { data, error, isLoading } = useGetUserProfileQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })
    const userInfo = useSelector(selectUserInfo)

    useEffect(() => {
        if (data?.body) {
            dispatch(setCredentials({ user: data.body }))
        }
    }, [dispatch, data?.body])

    if (error) return <p>Error: {error}</p>
    if (isLoading) return <p>Loading...</p>

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {userInfo?.firstName} {userInfo?.lastName}!
                </h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Checking (x8349)
                    </h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Savings (x6712)
                    </h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Credit Card (x8349)
                    </h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">
                        Current Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
        </main>
    )
}

export default Profil

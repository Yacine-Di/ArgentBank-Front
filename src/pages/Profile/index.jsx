import { useDispatch, useSelector } from 'react-redux'
import { useGetUserProfileQuery } from '../../services/Api'
import { selectUserInfo, setCredentials } from '../Login/authSlice'
import { useEffect, useState } from 'react'
import Editor from '../../components/Editor/Editor'

function Profil() {
    const [shouldRefresh, setShouldRefresh] = useState(false)
    const dispatch = useDispatch()
    const { data, error, isLoading, refetch } = useGetUserProfileQuery(
        undefined,
        {
            refetchOnMountOrArgChange: true,
        }
    )

    // Met à jour le user du store
    useEffect(() => {
        if (data?.body) {
            dispatch(setCredentials({ user: data.body }))
        }
    }, [dispatch, data?.body])

    const userInfo = useSelector(selectUserInfo)

    // Met à jour le composant après modification du nom et prénom dans le composant enfant Editor
    useEffect(() => {
        if (shouldRefresh) {
            refetch()
            setShouldRefresh(false)
        }
    }, [refetch, shouldRefresh])

    if (error) return <p>Error: {error.data.message}</p>
    if (isLoading) return <p>Loading...</p>

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back {userInfo?.firstName} {userInfo?.lastName} !
                </h1>
                <Editor setShouldRefresh={setShouldRefresh} />
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

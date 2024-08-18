import { useEffect, useState } from 'react'

export function useFetchUserData(fn) {
    const [data, setData] = useState({})
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('jwtToken')

            if (!token) {
                setError('User not authentificated')
                setData(null)
                return { data, error }
            }

            try {
                const data = await fn(token)
                setData(data)
            } catch (err) {
                console.log(err.message)
                setError('err.message')
            }
        }

        fetchData()
    }, [fn])

    return { data, error }
}

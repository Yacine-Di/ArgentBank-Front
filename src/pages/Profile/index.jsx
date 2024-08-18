import { getUserData } from '../../services/Api'
import { useFetchUserData } from '../../utils/hooks'

function Profil() {
    const { data, error } = useFetchUserData(getUserData)
    console.log(data)
    return <h1>Profil test</h1>
}

export default Profil

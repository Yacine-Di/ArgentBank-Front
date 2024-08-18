/** Api call pour la connexion sur le site
 *
 * @param {Object} form
 */
export async function login(email, password) {
    console.log(email, password)

    try {
        const response = await fetch(
            'http://localhost:3001/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        )

        if (!response.ok) {
            throw new Error("Nom d'utilsiateur ou mot de passe invalide")
        }

        const data = await response.json()
        const token = data.body.token
        localStorage.setItem('jwtToken', token)

        window.location.href = '/profile'
    } catch (error) {
        console.log(error)
    }
}

// Api call pour la récupération des données de l'utilisateur sur la page profile
export async function getUserData(token) {
    return await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => data)
}

/** Api call pour éditer le nom ou le prénom
 *
 * @param {Object} form
 */
export async function editUser(form) {
    const token = localStorage.getItem('jwtToken')

    await fetch('/user/profile', {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: form.firstName.value,
            lastName: form.lastName.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert('Données non récuéprable')
            } else {
                return data
            }
        })
}

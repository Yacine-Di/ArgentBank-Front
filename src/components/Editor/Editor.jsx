import { useState } from 'react'
import { useEditUserProfileMutation } from '../../services/Api'

function Editor({ setShouldRefresh }) {
    const [isEditable, setIsEditable] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [editUserProfile] = useEditUserProfileMutation()

    const handleEditClick = () => {
        setIsEditable(!isEditable)
    }

    // Lance le call API pour mettre à jour la base de donnée
    // Rafraichit le composant et réinitialise les imputs
    const handleSaveClick = async () => {
        if (firstName.length && lastName.length > 0) {
            await editUserProfile({ firstName, lastName })
            setShouldRefresh(true)
            setFirstName('')
            setLastName('')
        }
    }

    return isEditable ? (
        <div className="edit-wrappers">
            <div className="edit-wrapper">
                <input
                    type="text"
                    id="firstName"
                    placeholder="Tony"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <button
                    className="edit-button edit-button-right"
                    onClick={handleSaveClick}
                >
                    Save
                </button>
            </div>
            <div className="edit-wrapper">
                <input
                    type="text"
                    id="lastName"
                    placeholder="Jarvis"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button
                    className="edit-button edit-button-left"
                    onClick={() => setIsEditable(!isEditable)}
                >
                    Cancel
                </button>
            </div>
        </div>
    ) : (
        <button className="edit-button" onClick={handleEditClick}>
            Edit Name
        </button>
    )
}

export default Editor

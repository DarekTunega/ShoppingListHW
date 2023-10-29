import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { UserState } from '../Types/User'

interface UserContextProps {
    user: UserState | null
    login: (user: UserState) => void
}

const UserContext = createContext<UserContextProps | null>(null)

export const useUser = () => useContext(UserContext)

export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<UserState | null>({ id: '1', name: 'Darek Tunega' })

    const login = (user: UserState) => {
        setUser(user)
    }

    return <UserContext.Provider value={{ user, login }}>{children}</UserContext.Provider>
}

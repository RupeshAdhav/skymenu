'use client'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ID, account } from "@/appwrite/config";
const UserContext = createContext<any>({});

interface Props {
    children?: ReactNode
}

export const AuthContextProvider = ({ children, ...props }: Props) => {
    const [user, setUser] = useState<{} | null>() ;
    const [userLoading, setUserLoading] = useState(true)

    async function login(email: string, password: string) {
        await account.createEmailPasswordSession(email, password);
        init();
    }

    async function logout() {
        await account.deleteSession("current");
        setUser(null);
    }

    async function register(email: string, password: string) {
        await account.create(ID.unique(), email, password);
    }
 
    async function init() {
        account.get()
        .then(function (response: any) {
            setUser(response);
            setUserLoading(false);
        }, function (err: any) {
            setUser(null);
            setUserLoading(false);
        });
    }

    useEffect(() => {
       init();
    }, []);

    return (
        <UserContext.Provider value={{ user, userLoading, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );

};

export const UserAuth = () => {
    return useContext(UserContext);
};
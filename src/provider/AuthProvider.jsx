import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    // all sign in and login
    const userCreate = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)

    }
    // logout
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }
    const userUpdateProfile = (name,photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("currentUser", currentUser);
            setLoading(false)
        })
        return () => {
            return unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        userCreate,
        loginUser,
        logout,
        googleLogin,
        userUpdateProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
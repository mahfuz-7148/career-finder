import {createContext, useEffect, useState} from "react";
import {getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged,
        GoogleAuthProvider,
        signInWithPopup,
        updateProfile
} from 'firebase/auth'
import {app} from "../firebase.js";

export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [saveUser, setSaveUser] = useState(null)

    const createUser = (email, password) => {
        setLoading(true);
       return  createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true);
       return  signInWithEmailAndPassword(auth, email, password)
    }


    const logoutUser = () => {
       return  signOut(auth)
    }

    const googleAuth = () => {
        setLoading(true);
       return signInWithPopup(auth, googleProvider)
    }

    const userUpdateProfile = (profile) => {
        setLoading(true);
      return  updateProfile(auth.currentUser, profile)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser)
            setSaveUser(currentUser)
            setLoading(false);
        })
        return () => unsubscribe()
    }, []);


    const userInformation = {
        createUser,
        loginUser,
        logoutUser,
        saveUser,
        googleAuth,
        userUpdateProfile,
        loading
    }

    return (
        <div>
            <AuthContext value={userInformation}>
                {children}
            </AuthContext>

        </div>
    )
};

export default AuthProvider;
import { createContext, useCallback, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

export const AuthContext = createContext(null);
const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo]=useState({});
  const [loading, setLoading] = useState(true);
  const axiosPrivate=useAxiosPrivate()

  const googleProvider = new GoogleAuthProvider();

  const auth = getAuth(app);

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)


  }



  const profileInfo = (userName, userImage) => {
   return updateProfile(auth.currentUser, {
      displayName: userName, photoURL: userImage
    })
  }


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);


    });

    return () => {
      unsubscribe();
    }
  }, [])



  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
    
  }

  const refetchUser = useCallback(async () => {
    if (user?.email) {
        
      const res = await axiosPrivate.get(`/currentUserInfo/${user.email}`);
      console.log(res.data);
      setUserInfo(res.data);
      console.log("updated not again, ");
    
    }
  
    
  }, [axiosPrivate,user]);

  useEffect(() => {
    refetchUser(); 
  }, [refetchUser]);

  const authInfo = {
    user,
    loading,
    createUser,
    profileInfo,
    signIn,
    logOut,
    googleSignIn,
    userInfo,
    setUserInfo
  }
  console.log(user)
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Provider;
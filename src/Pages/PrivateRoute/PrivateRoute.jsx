import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import Skeleton from "react-loading-skeleton";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext);
    if(loading){
       return <div><Skeleton count={10} /></div>
    }
 
    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    else{
        return children;
    }
};

export default PrivateRoute;
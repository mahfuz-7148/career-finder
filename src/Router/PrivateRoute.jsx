import {use} from "react";
import {AuthContext} from "../Provider/AuthProvider.jsx";
import {Navigate} from "react-router";


const PrivateRoute = ({children}) => {

    const {saveUser, loading} = use(AuthContext)

    if (loading){
       return (
           <div className="min-h-screen flex  justify-center items-center">
               <span className="loading loading-bars loading-xl"></span>
           </div>
       )
    }

    return saveUser && saveUser.email ? children : <Navigate to='/auth/login' />
};

export default PrivateRoute;
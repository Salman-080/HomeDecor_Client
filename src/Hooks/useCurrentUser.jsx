// import { useContext } from "react";
// import { AuthContext } from "../Pages/Provider/Provider";
// import useAxiosPrivate from "./useAxiosPrivate";
// import { useQuery } from "react-query";

// const useCurrentUser = () => {
//    const {user}=useContext(AuthContext);
//    console.log(user);
//    const axiosPrivate=useAxiosPrivate();

//    const {data: loggedUserInfo={}, refetch}=useQuery({
//     queryKey: ["loggedUserInfo", user?.email],
//     queryFn: async()=>{
//         if (!user?.email) return null;
//         const res= await axiosPrivate.get(`/currentUserInfo/${user?.email}`);
        
//     },
//     enabled: !!user?.email, // Ensure the query only runs if the user's email is available
//     retry: 3 // Retry failed requests up to 3 times
    
 
//    })

//    return [loggedUserInfo, refetch];
// };

// export default useCurrentUser;
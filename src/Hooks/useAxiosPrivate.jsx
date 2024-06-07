import axios from "axios";

const axiosPrivate= axios.create({
    
    // baseURL: "http://localhost:5000"
    baseURL: "https://experiments-lab-server.vercel.app"
})
const useAxiosPrivate = () => {
    return axiosPrivate;
};

export default useAxiosPrivate;
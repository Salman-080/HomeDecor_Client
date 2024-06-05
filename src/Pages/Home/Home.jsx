import { Outlet } from "react-router-dom";
import Navbar from "../../FixedComponents/Navbar/Navbar";
import Products from "./Products/Products";

const Home = () => {
    return (
        <div>
            <Products></Products>
        </div>
    );
};

export default Home;
import { Outlet } from "react-router-dom";
import NavBer from "../components/header/NavBer";


const Main = () => {
    return (
        <div className="flex">
            <NavBer></NavBer>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;
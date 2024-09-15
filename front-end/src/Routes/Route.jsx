import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../components/Home/Home";
import Employees from "../components/Employees/Employees";
import AddEmployee from "../components/AddEmployee/AddEmployee";
import UpdateEmployee from "../components/AddEmployee/UpdateEmployee";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children:[
        {
          path:'/',
          element:<Home></Home>,
          loader:()=>fetch('http://localhost:5000/usersCount')
        },
        {
          path:'/employees',
          element:<Employees></Employees>,
          loader:()=>fetch('http://localhost:5000/usersCount')
        },
        {
          path:'/addEmployee',
          element:<AddEmployee></AddEmployee>
        },
        {
          path:'/updateEmployee/:id',
          element:<UpdateEmployee></UpdateEmployee>,
          loader: ({params})=>fetch(`http://localhost:5000/users/${params.id}`)
        }
      ]
    },
  ]);

export default router;
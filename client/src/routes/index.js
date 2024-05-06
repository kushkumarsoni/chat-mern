import { createBrowserRouter  } from "react-router-dom";
import Home from "../pages/Home";
import RegisterPage from './../pages/RegisterPage';
import App from './../App';
import CheckEmailPage from './../pages/CheckEmailPage';
import CheckPasswordPage from './../pages/CheckPasswordPage';
import MessageComponent from './../components/MessageComponent';
import AuthLayout from './../layouts/index';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
            path: "register",
            element: <AuthLayout><RegisterPage /></AuthLayout>,
        },
        {
            path: "email",
            element:  <AuthLayout><CheckEmailPage /></AuthLayout>,
        },
        {
            path: "password",
            element:  <AuthLayout><CheckPasswordPage /></AuthLayout>,
        },
        {
            path: "",
            element: <Home />,
            children:[
                {
                    path:":userId",
                    element:<MessageComponent />
                }
            ]
        },
      ]
    },
  ]);

export default router
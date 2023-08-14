import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import Details from "../pages/details/Details";
import Home from "../pages/home/Product";
import Create from "../pages/create/Create";
import Admin from "../pages/Admin/Admin";
import path from "../services/path";
import Login from "../pages/Authen/Login";
import SignIn from "../pages/Authen/SignIn";
import ForgotPassword from "../pages/forgotpassword/ForgotPassword";
import OTPInput from "../pages/forgotpassword/OTPInput";
import ChangePassword from "../pages/forgotpassword/ChangePassword";
import Chat from "../components/Chat/Chat";
import Verify from "../pages/Authen/EmailVerify"
import Update from "../pages/Update/Update";
export default function useRouterElement() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          {/* <h1>HOME</h1> */}
          <Home />
        </MainLayout>
      ),
    },
    {
      path: path.details,
      element: (
        <MainLayout>
          <Details />
        </MainLayout>
      ),
    },
    {
      path: path.create,
      element: (
        <MainLayout>
          <Create />
        </MainLayout>
      ),
    },
    {
      path: path.admin,
      element: (
        <MainLayout>
          <Admin />
        </MainLayout>
      ),
    },
    {
      path: path.update,
      element: (
        <MainLayout>
          <Update />
        </MainLayout>
      ),
    },
    {
      path: path.chat,
      element: (
        <MainLayout>
          <Chat />
        </MainLayout>
      ),
    },
    {
      path: path.login,
      element: <Login />,
    },
    {
      path: path.verify,
      element: <Verify />,
    },
    {
      path: path.signin,
      element: <SignIn />,
    },
    {
      path: path.forgotpassword,
      element: <ForgotPassword />,
    },
    {
      path: path.otpinput,
      element: <OTPInput />,
    },
    {
      path: path.changepassword,
      element: <ChangePassword />,
    },
  ]);

  return routes;
}

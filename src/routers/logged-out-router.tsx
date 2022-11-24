import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAccount } from "../pages/user/create-account";
import { Login } from "../pages/user/login";

const routes = [
    {
        path: "/",
        component: <Login />,
    },
    {
        path: "/create-account",
        component: <CreateAccount />,
    },
];
export const LoggedOutRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}
                {/* <Route path="/*" element={<NotFound/>} /> */}
            </Routes>
        </BrowserRouter>
    );
}
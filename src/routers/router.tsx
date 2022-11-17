import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Villagers } from '../pages/villagers';
import { Events } from '../pages/events';
import { Turnip } from '../pages/turnip';
import { Login } from '../pages/user/login';
import { CreateAccount } from '../pages/user/create-account';
import { Villager } from '../pages/villager';
import { Creatures } from '../pages/creatures';

const routes = [
    {
        path: "/",
        element: <Villagers />
    },
    {
        path: "/villagers/:id",
        element: <Villager />
    },
    {
        path: "/fishes",
        element: <Creatures />
    },
    {
        path: "/bugs",
        element: <Creatures />
    },
    {
        path: "/seas",
        element: <Creatures />
    },
    {
        path: "/events",
        element: <Events />
    },
    {
        path: "/turnip",
        element: <Turnip />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/create-account",
        element: <CreateAccount />,
    },
];

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div className='wrapper'>
                <Header />

                <div className='content'>                                    
                    <Routes>
                        {routes.map((route => 
                            <Route key={route.path} path={route.path} element={route.element} />
                        ))}
                        <Route key='villager' path='/villagers/:id' element={<Villagers />} />
                    </Routes>

                    <Footer />            
                </div>
            </div>
        </BrowserRouter>
    );
}
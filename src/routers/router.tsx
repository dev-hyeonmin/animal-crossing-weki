import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Bugs } from '../pages/bugs';
import { Fishes } from '../pages/fishes';
import { Seas } from '../pages/seas';
import { Villagers } from '../pages/villagers';
import { Events } from '../pages/events';

export const routes = [
    {
        path: "/",
        element: <Villagers />,
        name: "villagers"
    },
    {
        path: "/fishes",
        element: <Fishes />,
        name: "fishes"
    },
    {
        path: "/bugs",
        element: <Bugs />,
        name: "bugs"
    },
    {
        path: "/seas",
        element: <Seas />,
        name: "seas"
    },
    {
        path: "/events",
        element: <Events />,
        name: "events"
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
                            <Route key={`route${route.name}`} path={route.path} element={route.element} />                            
                        ))}
                    </Routes>

                    <Footer />            
                </div>
            </div>
        </BrowserRouter>
    );
}
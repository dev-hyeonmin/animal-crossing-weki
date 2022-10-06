import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Menu } from '../components/menu';
import { Bugs } from '../pages/bugs';
import { Fishes } from '../pages/fishes';
import { Seas } from '../pages/seas';
import { Villagers } from '../pages/villagers';

export const AppRouter = () => {
    return (
        <div className='wrapper'>
            <Header />

            <div className='content'>                
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Villagers />} />
                        <Route path="/fishes" element={<Fishes />} />
                        <Route path="/bugs" element={<Bugs />} />
                        <Route path="/seas" element={<Seas />} />
                    </Routes>

                    <Menu />
                </BrowserRouter>                
            </div>
        </div>
    );
}
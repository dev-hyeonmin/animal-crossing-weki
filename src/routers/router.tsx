import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Menu } from '../components/menu';
import { Fishes } from '../pages/fishes';
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
                    </Routes>

                    <Menu />
                </BrowserRouter>                
            </div>
        </div>
    );
}
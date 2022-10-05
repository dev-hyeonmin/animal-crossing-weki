import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Menu } from '../components/menu';
import { Villagers } from '../pages/villagers/villagers';

export const AppRouter = () => {
    return (
        <div className='wrapper'>
            <Header />

            <div className='content'>                
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Villagers />} />
                    </Routes>

                    <Menu />
                </BrowserRouter>                
            </div>
        </div>
    );
}
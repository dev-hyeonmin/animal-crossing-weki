import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { Villager } from '../pages/villagers/villager';
import { Villagers } from '../pages/villagers/villagers';

export const AppRouter = () => {
    return (
        <div className='wrapper'>
            <Header />

            <div className='content'>                
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Villagers />} />
                        <Route path="/villager/:id" element={<Villager />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}
import { useLocation } from 'react-router-dom';
// @ts-ignore
import fishIcon from '../images/fishes.png';
// @ts-ignore
import fishActiveIcon from '../images/fishes-active.png';
// @ts-ignore
import seaIcon from '../images/sea.png';
// @ts-ignore
import seaActiveIcon from '../images/sea-active.png';
// @ts-ignore
import bugIcon from '../images/bug.png';
// @ts-ignore
import bugActiveIcon from '../images/bug-active.png';
// @ts-ignore
import villagerIcon from '../images/villager.png';
// @ts-ignore
import villagerActiveIcon from '../images/villager-active.png';

export const Menu = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <nav>
            <div
                className={ path === '/' ? "menu active" : "menu" }
                style={{ backgroundImage: path === '/' ? `url(${villagerActiveIcon})` : `url(${villagerIcon})` }}>
                villager
            </div>
            <div
                className={ path === '/fish' ? "menu active" : "menu" }
                style={{ backgroundImage: path === '/fish' ? `url(${fishActiveIcon})` : `url(${fishIcon})` }}>
                fish
            </div>
            <div 
                className={ path === '/bug' ? "menu active" : "menu" }
                style={{ backgroundImage: path === '/bug' ? `url(${bugActiveIcon})` : `url(${bugIcon})` }}>
                bug
            </div>
            <div
                className={ path === '/sea' ? "menu active" : "menu" }
                style={{ backgroundImage: path === '/sea' ? `url(${seaActiveIcon})` : `url(${seaIcon})` }}>
                sea
            </div>
        </nav>
    );
}
import { Link, useLocation } from 'react-router-dom';
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

export const Footer = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <nav>
            <Link
                to="/"
                className={ path === '/' ? "footer-menu active" : "footer-menu" }
                style={{ backgroundImage: path === '/' ? `url(${villagerActiveIcon})` : `url(${villagerIcon})` }}>
                villager
            </Link>
            <Link
                to="/fishes"
                className={ path === '/fishes' ? "footer-menu active" : "footer-menu" }
                style={{ backgroundImage: path === '/fishes' ? `url(${fishActiveIcon})` : `url(${fishIcon})` }}>
                fish
            </Link>
            <Link
                to="/bugs"
                className={ path === '/bugs' ? "footer-menu active" : "footer-menu" }
                style={{ backgroundImage: path === '/bugs' ? `url(${bugActiveIcon})` : `url(${bugIcon})` }}>
                bug
            </Link>
            <Link
                to="/seas"
                className={ path === '/seas' ? "footer-menu active" : "footer-menu" }
                style={{ backgroundImage: path === '/seas' ? `url(${seaActiveIcon})` : `url(${seaIcon})` }}>
                sea
            </Link>
        </nav>
    );
}
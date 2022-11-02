import { Link, useLocation } from 'react-router-dom';
// @ts-ignore
import fishIcon from '../images/fishes.png';
// @ts-ignore
import fishActiveIcon from '../images/fishes-active.png';
// @ts-ignore
import bugIcon from '../images/bug.png';
// @ts-ignore
import bugActiveIcon from '../images/bug-active.png';
// @ts-ignore
import villagerIcon from '../images/villager.png';
// @ts-ignore
import villagerActiveIcon from '../images/villager-active.png';
// @ts-ignore
import userIcon from '../images/user.png';
// @ts-ignore
import userActiveIcon from '../images/user-active.png';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';

const footerMenu = [
    {
        path: "/",
        name: "villagers",
        image: villagerIcon,
        imageActive: villagerActiveIcon
    },
    {
        path: "/fishes",
        name: "fishes",
        image: fishIcon,
        imageActive: fishActiveIcon
    },
    {
        path: "/bugs",
        name: "bugs",
        image: bugIcon,
        imageActive: bugActiveIcon
    },
];

export const Footer = () => {
    const location = useLocation();
    const path = location.pathname;
    const isLoggedIn = useReactiveVar(isLoggedInVar);

    return (
        <nav>
            <>
                {footerMenu.map((menu) => 
                    <Link
                        key={menu.path}
                        to="/"
                        className={path === menu.path ? "footer-menu active" : "footer-menu"}
                        style={{ backgroundImage: path === menu.path ? `url(${menu.imageActive})` : `url(${menu.image})` }}>
                        {menu.name}
                    </Link>
                )}
            
                {isLoggedIn ?                     
                    <Link
                        to="/edit-profile"
                        className={ path === '/edit-profile' ? "footer-menu active" : "footer-menu" }
                        style={{ backgroundImage: path === '/edit-profile' ? `url(${userActiveIcon})` : `url(${userIcon})` }}>
                        User
                    </Link>
                    : 
                    <Link
                        to="/login"
                        className={ path === '/login' ? "footer-menu active" : "footer-menu" }
                        style={{ backgroundImage: path === '/login' ? `url(${userActiveIcon})` : `url(${userIcon})` }}>
                        User
                    </Link> 
                }                
            </>
        </nav>
    );
}
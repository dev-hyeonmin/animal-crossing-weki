import { Link, useLocation } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';
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


const footerMenu = [
    {
        path: "/",
        name: "주민",
        image: villagerIcon,
        imageActive: villagerActiveIcon
    },
    {
        path: "/fishes",
        name: "생물",
        image: fishIcon,
        imageActive: fishActiveIcon
    },
    {
        path: "/bugs",
        name: "아이템",
        image: bugIcon,
        imageActive: bugActiveIcon
    },
    {
        path: "/turnip",
        name: "무계산기",
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
                {/* {footerMenu.map((menu) => 
                    <Link
                        key={menu.path}
                        to="/"
                        className={path === menu.path ? "footer-menu active" : "footer-menu"}
                        style={{ backgroundImage: path === menu.path ? `url(${menu.imageActive})` : `url(${menu.image})` }}>
                        {menu.name}
                    </Link>
                )}                               */}
            </>
        </nav>
    );
}
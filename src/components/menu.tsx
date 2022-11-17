import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Villagers } from "../pages/villagers";
import { Events } from "../pages/events";
import { Turnip } from "../pages/turnip";
// @ts-ignore
import closeMenu from '../images/close-menu.png';
import { Creatures } from "../pages/creatures";

const menuRoute = [
    {
        path: "/",
        element: <Villagers />,
        name: "villagers"
    },
    {
        path: "/fishes",
        element: <Creatures />,
        name: "fishes"
    },
    {
        path: "/bugs",
        element: <Creatures />,
        name: "bugs"
    },
    {
        path: "/seas",
        element: <Creatures />,
        name: "seas"
    },
    {
        path: "/events",
        element: <Events />,
        name: "events"
    },
    {
        path: "/turnip",
        element: <Turnip />,
        name: "turnip calculator"
    },
];

const toggleVariant = {
    disable: { x: "-100%" },
    enable: { x: "-50px" },
}

export const Menu = () => {
    const location = useLocation();
    const path = location.pathname;
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        setToggleMenu(false);
    }, [path])
    return (
        <>
            <div className="menu" onClick={() => setToggleMenu(true)}></div>
                        
            {true &&
                <motion.div
                    className={toggleMenu ? "box-menu active" : "box-menu"}
                    key="box-menu"
                    variants={toggleVariant}
                    initial={"disable"}
                    animate={toggleMenu ? "enable" : "disable"}
                    exit={"disable"}
                >
                    <button onClick={() => setToggleMenu(false)}><img src={closeMenu} /></button>
                    
                    <dl>
                        {menuRoute.map((route) => 
                            <dd key={`menu${route.name}`}>
                                <Link
                                    to={route.path}
                                    className={path === route.path ? "active" : ""}
                                >
                                    {route.name}
                                </Link>
                            </dd>
                        )}                        
                    </dl>
                </motion.div>
            }
        </>
    );
}
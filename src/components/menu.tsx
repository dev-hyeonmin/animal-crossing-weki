import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Villagers } from "../pages/villagers";
import { Events } from "../pages/events";
import { Turnip } from "../pages/turnip";
import { Creatures } from "../pages/creatures";
// @ts-ignore
import closeMenu from '../images/close-menu.png';

const menuRoute = [
    {
        path: "/villagers",
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
];

const toggleVariant = {
    disable: { y: "-100%", opacity: 0 },
    enable: { y: "0%", opacity: 1 },
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
                    onClick={() => setToggleMenu(false)}
                >
                    {/* <button onClick={() => setToggleMenu(false)}><img src={closeMenu} /></button> */}

                    {menuRoute.map((route, index) =>
                        <motion.div
                            key={`menu${route.name}`}
                            variants={toggleVariant}
                            initial={"disable"}
                            exit={"disable"}
                            animate={toggleMenu ? "enable" : "disable"}
                            transition={{ ease: "easeInOut", delay: 0.1 * index, duration: 0.4}}
                        >
                            <Link
                                to={route.path}
                                className={path === route.path ? "active" : ""}
                            >
                                {route.name}
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            }
        </>
    );
}
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { routes } from "../routers/router";

// @ts-ignore
import closeMenu from '../images/close-menu.png';


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
                        {routes.map((route) => 
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
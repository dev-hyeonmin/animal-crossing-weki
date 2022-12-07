import { useMe } from "../hooks/useMe";
import { Menu } from "./menu";
import { Link } from "react-router-dom";
// @ts-ignore
import userImage from '../images/default-user.png';

export const Header = () => {
    const { data: user } = useMe();
    
    return (
        <header>
            <Menu />

            <Link to="/edit-profile" className="user">
                <img src={user?.me.userImage ? user?.me.userImage : userImage} />
            </Link>
        </header>
    );
}
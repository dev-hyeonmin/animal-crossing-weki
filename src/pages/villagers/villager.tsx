import { useLocation } from "react-router-dom";
import { IVillager } from "../../constants/interface";

export const Villager = () => {
    const location = useLocation();
    const villagerData:IVillager = location.state;
    
    return (
        <div>villager</div>
    )
}
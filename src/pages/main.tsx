import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { MYVILLAGER_QUERY } from "../mutations";
import { myVillagerQuery, myVillagerQuery_myVillager } from "../__generated__/myVillagerQuery";

function getColor() {
    return "hsl(" + 360 * Math.random() + ',' +
        (25 + 70 * Math.random()) + '%,' +
        (85 + 10 * Math.random()) + '%)'
}

export const Main = () => {
    const { data: user } = useMe();
    const { data: myVillagerData } = useQuery<myVillagerQuery, myVillagerQuery_myVillager>(MYVILLAGER_QUERY);

    return (
        <div className="wrapper-main">
            <h6>MY ISLAND</h6>
            <h3>{user?.me.islandName}</h3>

            <div className="my-island">
                <ul>
                    <li>
                        <span></span>
                        <br />
                        {user?.me.fruit}
                    </li>

                    <li>
                        <span></span>
                        <br />
                        {user?.me.flower}
                    </li>

                    <li>
                        <span></span>
                        <br />
                        {user?.me.hemisphere}
                    </li>
                </ul>

                <div className="box-turnip">
                    Turnips
                    <span>97 bell</span>
                </div>
            </div>

            <div className="main-villager">
                <div className="main-title">
                    Villagers
                    <Link to="/villagers">Show all</Link>
                </div>

                <ul>
                    {myVillagerData?.myVillager.myVillagers.map(villager =>
                        <li key={`villager${villager.id}`} style={{backgroundColor: getColor()}}>
                            <img src={villager.image ? villager.image : ''} />
                            <div>{villager.name}</div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
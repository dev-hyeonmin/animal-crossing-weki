import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Creature } from "../components/creature";
import { Loading } from "../components/loading";
import { IFishes } from "../constants/interface";


export const Creatures = () => {
    const [data, setData] = useState<IFishes[]>([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const path = location.pathname;
    
    useEffect(() => {
        if (!process.env.REACT_APP_NOOKIPEIA_KEY) { return; }
        setLoading(true);

        let apiUrl = `${process.env.REACT_APP_NOOKIPEIA_URL}/nh/`;
        switch (path) {
            case '/fishes':
                apiUrl += `fish`;
                break;
            case '/bugs':
                apiUrl += `bugs`;
                break;
            case '/seas':
                apiUrl += `sea`;
                break;
        }
        
        fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.REACT_APP_NOOKIPEIA_KEY,
                'Accept-Version': '1.0.0'
            }
        }).then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, [path]);


    return <>
        {
            loading ?
                <div className="wrapper-creature">
                    <Loading />
                </div>
                : < Creature data={data} />
        }
    </>;
}
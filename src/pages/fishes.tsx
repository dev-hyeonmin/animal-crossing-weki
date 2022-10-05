import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { IFishes } from "../constants/interface";
// @ts-ignore
import quote from '../images/quote.png';

export const Fishes = () => {
    const pageCount = 20;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [toggleArr, setToggleArr] = useState<Boolean[]>([]);
    const [fishes, setFishes] = useState<IFishes[]>([]);
  
    useEffect(() => {
        if (!process.env.REACT_APP_NOOKIPEIA_KEY) { return; }
    
        fetch(`${process.env.REACT_APP_NOOKIPEIA_URL}/nh/fish`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.REACT_APP_NOOKIPEIA_KEY,
                'Accept-Version': '1.0.0'
            }
        }).then(response => response.json())
            .then(data => {                
                setFishes(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        for (let i = 0; i < 20; i++) {
            setToggleArr((current) => [...current, ...[false]]);
        }
    }, [page])

    const nextPage = () => {
        setPage((currentPage) => currentPage + 1);
    };

    const toggleDetail = (index: number) => {
        setToggleArr((current) => [
            ...current.slice(0, index),
            ...[!current[index]],
            ...current.slice(index + 1)
        ]);
    }
    return (
        <>
        <div className="wrapper-fishes">
            { !loading && 
            fishes.slice(0, page * pageCount).map((fish, index) =>
                <div key={fish.number + index} className="fish" onClick={() => toggleDetail(index)}>
                    <div className="fish-image" style={{backgroundImage: `url(${fish.image_url})`}}></div>

                    <dl className="fish-info">
                        <dd>{fish.name}</dd>
                        <dd>{fish.location} / {fish.shadow_size}</dd>
                    </dl>

                    <dl className={toggleArr[index] ? "fish-detail active" : "fish-detail"}>
                        <dd>{fish.catchphrases}</dd>

                        <dt>북반구</dt>
                        <dd>{fish.n_availability}</dd>
                        <dt>남반구</dt>
                        <dd>{fish.s_availability}</dd>
                        <dt>출몰시간</dt>
                        <dd>{fish.time}</dd>
                    </dl>
                </div>
            )}   
            
            {loading &&
                <Loading />
            }
        </div>

        <div className="box-button">
            <button className="btn-page" onClick={nextPage}>more</button>
        </div>
        </>
    );
}
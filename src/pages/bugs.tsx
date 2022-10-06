import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { IFishes } from "../constants/interface";
// @ts-ignore
import quote from '../images/quote.png';

const toggleVariant = {
    disable: { height: "81px" },
    enable: { height: "195px" },
}
  
export const Bugs = () => {
    const pageCount = 20;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [toggleArr, setToggleArr] = useState<Boolean[]>([]);
    const [bugs, setBugs] = useState<IFishes[]>([]);
  
    useEffect(() => {
        if (!process.env.REACT_APP_NOOKIPEIA_KEY) { return; }
    
        fetch(`${process.env.REACT_APP_NOOKIPEIA_URL}/nh/bugs`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.REACT_APP_NOOKIPEIA_KEY,
                'Accept-Version': '1.0.0'
            }
        }).then(response => response.json())
            .then(data => {       
                console.log(data);
                setBugs(data);
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
        <div className="wrapper-creature">
            { !loading && 
            bugs.slice(0, page * pageCount).map((bug, index) =>
                <motion.div key={bug.number + index} className="creature" onClick={() => toggleDetail(index)}
                    variants={toggleVariant}
                    initial="disable"
                    animate={toggleArr[index] ? "enable" : "disable"}
                    exit="disable"
                    transition={{ duration: 0.4 }}    
                >
                    <div className="creature-image" style={{backgroundImage: `url(${bug.image_url})`}}></div>

                    <dl className="creature-info">
                        <dd>{bug.name}</dd>
                        <dd>{bug.location}</dd>
                    </dl>

                    <dl className="creature-detail">
                        <dd>{bug.catchphrases}</dd>
                        <dt>북반구</dt>
                        <dd>{bug.n_availability}</dd>
                        <dt>남반구</dt>
                        <dd>{bug.s_availability}</dd>
                        <dt>출몰시간</dt>
                        <dd>{bug.time}</dd>
                    </dl>
                </motion.div>
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
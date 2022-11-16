import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { IFishes } from "../constants/interface";
import { useMutation, useQuery } from "@apollo/client";
import { CREATEFISHRELATION_MUTATION, DELETEFISHRELATION_MUTATION, USERFISHES_QUERY } from "../mutations";
import { UserFishesQuery, UserFishesQuery_userFishes } from "../__generated__/UserFishesQuery";
// @ts-ignore
import clockImg from '../images/clock.png';
// @ts-ignore
import moneyImg from '../images/money.png';
// @ts-ignore
import checkImg from '../images/check.png';
// @ts-ignore
import checkActiveImg from '../images/check-active.png';
import { createFishRelation, createFishRelationVariables } from "../__generated__/createFishRelation";
import { deleteFishRelation, deleteFishRelationVariables } from "../__generated__/deleteFishRelation";

const toggleVariant = {
    disable: { height: "81px" },
    enable: { height: "auto" },
}
  
export const Fishes = () => {
    const pageCount = 20;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [myFishes, setMyFishes] = useState<String[]>([]);
    const [toggleArr, setToggleArr] = useState<Boolean[]>([]);
    const [fishes, setFishes] = useState<IFishes[]>([]);
    const onCompleted = (data: UserFishesQuery) => {
        const result:string[] = [];
        const fishesData = data.userFishes.fishes;

        fishesData?.map((fish) => {
            result.push(fish.name);
        });

        setMyFishes(() => result);
    }
    const { data: userFishes } = useQuery<UserFishesQuery, UserFishesQuery_userFishes>(USERFISHES_QUERY, {
        onCompleted
    });
    const [createFishRelationMutation] = useMutation<createFishRelation, createFishRelationVariables>(CREATEFISHRELATION_MUTATION);
    const [deleteFishRelationMutation] = useMutation<deleteFishRelation, deleteFishRelationVariables>(DELETEFISHRELATION_MUTATION);
  
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
    };

    const createFishRelation = (event: any, name: string) => {
        event.stopPropagation();

        createFishRelationMutation({
            variables: {
                createFishInput: {
                    name
                }
            }
        });
        
        setMyFishes((current) => {
            current.push(name);
            return current;
        });
    };

    const deleteFishRelation = (event: any, name: string) => {
        event.stopPropagation();

        deleteFishRelationMutation({
            variables: {
                deleteFishInput: {
                    name
                }
            }
        });

        setMyFishes((current) => current.filter((fish) => fish !== name))
    };

    return (
        <>
        <div className="wrapper-creature">
            { !loading && 
            fishes.slice(0, page * pageCount).map((fish, index) =>
                <motion.div key={fish.number + index} className="creature" onClick={() => toggleDetail(index)}
                    variants={toggleVariant}
                    initial="disable"
                    animate={toggleArr[index] ? "enable" : "disable"}
                    exit="disable"
                    transition={{ duration: 0.4 }}    
                >
                    <div className="creature-image" style={{backgroundImage: `url(${fish.image_url})`}}></div>

                    <dl className="creature-info">
                        <dd>{fish.name}</dd>
                        <dd>{fish.location} / {fish.shadow_size}</dd>
                    </dl>

                    <dl className="creature-detail">
                        <dd>{fish.catchphrases}</dd>
                        <dt><img src={clockImg}/></dt>
                        <dd>{fish.availability_north[0].months} <span>{fish.availability_north[0].time}</span></dd>
                        <dt><img src={moneyImg}/></dt>
                        <dd><b>{fish.sell_nook.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b></dd>
                    </dl>

                    {
                        myFishes.includes(fish.name) 
                            ? <span className="tag-gain active" onClick={(event) => deleteFishRelation(event, fish.name)}><img src={checkActiveImg} /></span>
                            : <span className="tag-gain" onClick={(event) => createFishRelation(event, fish.name)}><img src={checkImg} /></span>
                    }
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
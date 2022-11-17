import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loading } from "./loading";
import { IFishes } from "../constants/interface";
import { useMutation, useQuery } from "@apollo/client";
import { months } from "../constants/common";
import { CREATECREATURERELATION_MUTATION, DELETECREATURERELATION_MUTATION, USERCREATURES_QUERY } from "../mutations";
import { UserCreaturesQuery, UserCreaturesQuery_userCreatures } from "../__generated__/UserCreaturesQuery";
import { createCreatureRelation, createCreatureRelationVariables } from "../__generated__/createCreatureRelation";
import { deleteCreatureRelation, deleteCreatureRelationVariables } from "../__generated__/deleteCreatureRelation";
// @ts-ignore
import clockImg from '../images/clock.png';
// @ts-ignore
import moneyImg from '../images/money.png';
// @ts-ignore
import checkImg from '../images/check.png';
// @ts-ignore
import checkActiveImg from '../images/check-active.png';

interface ICreature {
    data: IFishes[];
}
const toggleVariant = {
    disable: { height: "81px" },
    enable: { height: "auto" },
}
  
export const Creature = ({ data }: ICreature) => {
    const pageCount = 20;
    const [page, setPage] = useState(1);
    const [myCreatures, setMyCreatures] = useState<String[]>([]);
    const [toggleArr, setToggleArr] = useState<Boolean[]>([]);
    const [creatures, setCreatures] = useState<IFishes[]>(data);
    const onCompleted = (data: UserCreaturesQuery) => {
        const result:string[] = [];
        const creaturesData = data.userCreatures.creatures;

        creaturesData?.map((fish) => {
            result.push(fish.name);
        });

        setMyCreatures(() => result);
    }
    const { data: userCreature } = useQuery<UserCreaturesQuery, UserCreaturesQuery_userCreatures>(USERCREATURES_QUERY, {
        onCompleted
    });
    const [createCreatureRelationMutation] = useMutation<createCreatureRelation, createCreatureRelationVariables>(CREATECREATURERELATION_MUTATION);
    const [deleteCreatureRelationMutation] = useMutation<deleteCreatureRelation, deleteCreatureRelationVariables>(DELETECREATURERELATION_MUTATION);

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

    const createCreatureRelation = (event: any, name: string) => {
        event.stopPropagation();

        createCreatureRelationMutation({
            variables: {
                createCreatureInput: {
                    name
                }
            }
        });
        
        setMyCreatures((current) => {
            current.push(name);
            return current;
        });
    };

    const deleteCreatureRelation = (event: any, name: string) => {
        event.stopPropagation();

        deleteCreatureRelationMutation({
            variables: {
                deleteCreatureInput: {
                    name
                }
            }
        });

        setMyCreatures((current) => current.filter((creature) => creature !== name))
    };

    return (
        <>
        <div className="wrapper-creature">
            { creatures.slice(0, page * pageCount).map((creature, index) =>
                <motion.div key={creature.number + index} className="creature" onClick={() => toggleDetail(index)}
                    variants={toggleVariant}
                    initial="disable"
                    animate={toggleArr[index] ? "enable" : "disable"}
                    exit="disable"
                    transition={{ duration: 0.4 }}    
                >
                    <div className="creature-image" style={{backgroundImage: `url(${creature.image_url})`}}></div>

                    <dl className="creature-info">
                        <dd>{creature.name}</dd>
                        <dd>{creature.location} / {creature.shadow_size}</dd>
                    </dl>

                    <dl className="creature-detail">
                        <dd className="months">
                            {months.map((m) => 
                                <span
                                    key={`month${m}`}
                                    className={creature.n_availability_array.includes(m.toString()) ? "active" : ""}>
                                    {m}월
                                </span>
                            )}
                        </dd>
                        <dd className="time"> 🕑 {creature.time.replace('–', '~')}</dd>
                        <dd className="price"><b>💵 {creature.sell_nook.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</b></dd>
                    </dl>

                    {
                        myCreatures.includes(creature.name) 
                            ? <span className="tag-gain active" onClick={(event) => deleteCreatureRelation(event, creature.name)}><img src={checkActiveImg} /></span>
                            : <span className="tag-gain" onClick={(event) => createCreatureRelation(event, creature.name)}><img src={checkImg} /></span>
                    }
                </motion.div>
            )} 
        </div>

        <div className="box-button">
            <button className="btn-page" onClick={nextPage}>more</button>
        </div>
        </>
    );
}
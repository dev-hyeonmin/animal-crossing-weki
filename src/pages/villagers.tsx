import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../components/loading";
import { MYFAVORITEVILLAGER_QUERY, MYVILLAGER_QUERY, REGISTFAVORITEVILLAGER_MUTATION, REGISTMYVILLAGER_MUTATION, VILLAGERSFILTER_QUERY, VILLAGERS_QUERY } from "../mutations";
import { VillagersQuery, VillagersQueryVariables, VillagersQuery_villagers_villagers } from "../__generated__/VillagersQuery";
import { VillagersFilterQuery, VillagersFilterQuery_villagersFilter } from "../__generated__/VillagersFilterQuery";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
// @ts-ignore
import notFoundImg from '../images/villager-not-found.png';
// @ts-ignore
import maleIcon from '../images/male.png';
// @ts-ignore
import femaleIcon from '../images/female.png';
// @ts-ignore
import emptyHeartIcon from '../images/empty-heart.png';
// @ts-ignore
import heartIcon from '../images/heart.png';
// @ts-ignore
import emptyHomeIcon from '../images/empty-home.png';
// @ts-ignore
import homeIcon from '../images/home.png';
import { registFavoriteVillager, registFavoriteVillagerVariables } from "../__generated__/registFavoriteVillager";
import { myFavoriteVillagerQuery, myFavoriteVillagerQuery_myFavoriteVillager } from "../__generated__/myFavoriteVillagerQuery";
import { myVillagerQuery, myVillagerQuery_myVillager } from "../__generated__/myVillagerQuery";
import { registMyVillager, registMyVillagerVariables } from "../__generated__/registMyVillager";

const headerMotion = {
    hidden: { opacity: 0 },
    scroll: {
        opacity: 1,
        y: -10,
        transition: {
            delay: 0.3
        }
    },
}

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export const Villagers = () => {
    const { id: villagerId } = useParams();
    const [searchName, setSearchName] = useState("");
    const [searchSpecies, setSearchSpecies] = useState("");
    const [searchPersonality, setSearchPersonality] = useState("");
    const [, setSelectedVillager] = useState<VillagersQuery_villagers_villagers | undefined>();
    const { data: villagersFilterData } = useQuery<VillagersFilterQuery, VillagersFilterQuery_villagersFilter>(VILLAGERSFILTER_QUERY);
    const { data: villagersData, loading, refetch } = useQuery<VillagersQuery, VillagersQueryVariables>(VILLAGERS_QUERY);
    const { data: myFavoriteVillagerData, refetch: refetchFavor } = useQuery<myFavoriteVillagerQuery, myFavoriteVillagerQuery_myFavoriteVillager>(MYFAVORITEVILLAGER_QUERY);
    const [registFavoriteVillagerMutation] = useMutation<registFavoriteVillager, registFavoriteVillagerVariables>(REGISTFAVORITEVILLAGER_MUTATION, {
        onCompleted: () => {
            refetchFavor();
        }
    });
    const { data: myVillagerData, refetch: refetchMyVillager } = useQuery<myVillagerQuery, myVillagerQuery_myVillager>(MYVILLAGER_QUERY);
    const [registMyVillagerMutation] = useMutation<registMyVillager, registMyVillagerVariables>(REGISTMYVILLAGER_MUTATION, {
        onCompleted: () => {
            refetchMyVillager();
        }
    });

    useEffect(() => {
        setSelectedVillager(() => villagersData?.villagers.villagers?.find((villager) => villager.id + "" === villagerId));
    }, [villagerId]);

    useEffect(() => {
        refetch({
            villagersInput: {
                name: searchName,
                species: searchSpecies,
                personality: searchPersonality
            }
        });
    }, [searchSpecies, searchPersonality, searchName]);

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 100);

    const registFavoriteVillager = (event: React.MouseEvent, villagerId: number) => {
        event.stopPropagation();
        event.preventDefault();

        registFavoriteVillagerMutation({
            variables: {
                registFavoriteVillagerInput: {
                    villagerId
                }
            }
        });
    };
    const registMyVillager = (event: React.MouseEvent, villagerId: number) => {
        event.stopPropagation();
        event.preventDefault();

        registMyVillagerMutation({
            variables: {
                registMyVillagerInput: {
                    villagerId
                }
            }
        });
    };

    return (
        <>
            <div className="content-header">
                <motion.h1
                    variants={headerMotion}
                    initial={"hidden"}
                    whileInView={"scroll"}
                >
                    Villagers
                </motion.h1>
            </div>


            <div className="content-body" ref={ref}>
                {/* <div className="wrapper-search">
                    <select defaultValue={searchSpecies} onChange={(event) => setSearchSpecies((curr) => event.target.value)}>
                        <option value="">종류</option>
                        {villagersFilterData?.villagersFilter.species?.map((data) =>
                            <option key={data} value={data}>{data}</option>
                        )}
                    </select>

                    <select defaultValue={searchPersonality} onChange={(event) => setSearchPersonality((curr) => event.target.value)}>
                        <option value="">성격</option>
                        {villagersFilterData?.villagersFilter.personalities?.map((data) =>
                            <option key={data} value={data}>{data}</option>
                        )}
                    </select>

                    <input type="text" placeholder="이름" value={searchName} onChange={(event) => setSearchName((curr) => event.target.value)} />
                </div> */}

                <div className="wrapper-villagers">
                    {!loading &&
                        villagersData?.villagers?.villagers?.map((villager, index) =>
                            villager.species !== 'NPC' &&
                            <Link
                                to={`/villagers/${villager.id}`}
                                state={villager}
                                key={villager.name}
                                className="villager">
                                <span className="vi-index">#{index + 1}</span>
                                <span className="vi-speak">{villager.speak}</span>
                                <div className="vi-image" style={{ backgroundImage: `url(${villager.icon?.replaceAll(" ", "%20")})` }}></div>
                                <div className="btn-favorite" onClick={(event) => registFavoriteVillager(event, villager.id)}>
                                    <img src={myFavoriteVillagerData?.myFavoriteVillager.favoriteVillagers.find(favor => favor.id === villager.id) ? heartIcon : emptyHeartIcon} />
                                    </div>
                                <div className="btn-home" onClick={(event) => registMyVillager(event, villager.id)}>
                                    <img src={myVillagerData?.myVillager.myVillagers.find(myV => myV.id === villager.id) ? homeIcon : emptyHomeIcon} />
                                </div>

                                <dl className="vi-info">
                                    <dt>
                                        {villager.name}
                                        <img src={villager.gender === '남' ? maleIcon : femaleIcon} />
                                    </dt>
                                    <dd>
                                        <span>{villager.species}</span>
                                        <span>{villager.personality}</span>
                                    </dd>
                                </dl>
                            </Link>
                        )
                    }

                    {villagersData?.villagers?.villagers?.length === 0 &&
                        <div className="villagers-not-found">
                            <img src={notFoundImg} />
                            Not Found.
                        </div>
                    }
                </div>

                {loading &&
                    <Loading />
                }
            </div>
        </>
    );
}
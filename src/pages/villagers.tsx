import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../components/loading";
import { VILLAGERSFILTER_QUERY, VILLAGERS_QUERY } from "../mutations";
import { VillagersQuery, VillagersQueryVariables, VillagersQuery_villagers_villagers } from "../__generated__/VillagersQuery";
import { VillagersFilterQuery, VillagersFilterQuery_villagersFilter } from "../__generated__/VillagersFilterQuery";
// @ts-ignore
import notFoundImg from '../images/villager-not-found.png';

export const Villagers = () => {
    const { id: villagerId } = useParams();
    const [searchName, setSearchName] = useState("");
    const [searchSpecies, setSearchSpecies] = useState("");
    const [searchPersonality, setSearchPersonality] = useState("");
    const [, setSelectedVillager] = useState<VillagersQuery_villagers_villagers | undefined>();
    const { data: villagersFilterData } = useQuery<VillagersFilterQuery, VillagersFilterQuery_villagersFilter>(VILLAGERSFILTER_QUERY);
    const { data: villagersData, loading, refetch } = useQuery<VillagersQuery, VillagersQueryVariables>(VILLAGERS_QUERY);

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

    return (
        <>
            <div className="wrapper-search">
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
            </div>

            <div className="wrapper-villagers">
                {!loading &&
                    villagersData?.villagers?.villagers?.map((villager) =>
                        villager.species !== 'NPC' &&
                        <Link
                            to={`/villagers/${villager.id}`}
                            state={villager}
                            key={villager.name}
                            className="villager">
                            <div className="vi-image" style={{ backgroundImage: `url(${villager.image?.replaceAll(" ", "%20")})` }}></div>

                            <dl className="vi-info">
                                <dt>{villager.name}</dt>
                                <dd>{villager.favoriteTalk}</dd>
                                <dd>{villager.species} / {villager.personality}</dd>
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

                {loading &&
                    <Loading />
                }
            </div>
        </>
    );
}
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/loading";
import { VILLAGERSFILTER_QUERY, VILLAGERS_QUERY } from "../mutations";
import { VillagersQuery, VillagersQueryVariables, VillagersQuery_villagers_villagers } from "../__generated__/VillagersQuery";
// @ts-ignore
import closeImg from '../images/close-menu.png';
import { VillagersFilterQuery, VillagersFilterQuery_villagersFilter } from "../__generated__/VillagersFilterQuery";

export const Villagers = () => {
    const navigation = useNavigate();
    const location = useLocation();
    // const [, species] = location.search.split("?specie=");
    const { id: villagerId } = useParams();
    const [searchName, setSearchName] = useState("");
    const [searchSpecies, setSearchSpecies] = useState("");
    const [searchPersonality, setSearchPersonality] = useState("");
    const [selectedVillager, setSelectedVillager] = useState<VillagersQuery_villagers_villagers | undefined>();
    const { data: villagersFilterData } = useQuery<VillagersFilterQuery, VillagersFilterQuery_villagersFilter>(VILLAGERSFILTER_QUERY);
    const { data: villagersData, loading, refetch } = useQuery<VillagersQuery, VillagersQueryVariables>(VILLAGERS_QUERY);
    
    useEffect(() => {     
        setSelectedVillager(() =>  villagersData?.villagers.villagers?.find((villager) => villager.id + "" === villagerId));
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
                            <div key={villager.name} className="villager" onClick={() => navigation(`/villagers/${villager.id}`)}>
                                <div className="vi-image" style={{ backgroundImage: `url(${villager.image?.replaceAll(" ", "%20")})` }}></div>

                                <dl className="vi-info">
                                    <dt>{villager.name}</dt>
                                    <dd>{villager.favoriteTalk}</dd>
                                    <dd>{villager.species} / {villager.personality}</dd>
                                </dl>
                            </div>
                    )
                }

                {loading &&
                    <Loading />
                }
            </div>

            {villagerId && 
                <div className="wrapper-villager-detail">
                    <div className="villager-detail-inner">
                        <button onClick={() => navigation("/")}>
                            <img src={closeImg} />
                        </button>

                        <div className="villager-image">
                            <img src={selectedVillager?.image ? selectedVillager?.image : ""} />
                            <span>{selectedVillager?.name} <i>{selectedVillager?.species}</i></span>
                        </div>

                        <p>{selectedVillager?.favoriteTalk}</p>

                        <dl>
                            <dt>생일</dt>
                            <dd>{selectedVillager?.birth}</dd>

                            <dt>성격</dt>
                            <dd>{selectedVillager?.personality}</dd>

                            <dt>성별</dt>
                            <dd>{selectedVillager?.gender}</dd>

                            <dt>취미</dt>
                            <dd>{selectedVillager?.hobby}</dd>

                            <dt>말버릇</dt>
                            <dd>{selectedVillager?.speak}</dd>

                            <dt>대화타입</dt>
                            <dd>{selectedVillager?.speakType}</dd>

                            <dt>스타일</dt>
                            <dd>{selectedVillager?.style} / {selectedVillager?.style2}</dd>

                            <dt>색상</dt>
                            <dd>{selectedVillager?.color} / {selectedVillager?.color2}</dd>
                        </dl>
                    </div>
                </div>
            }
        </>
    );
}
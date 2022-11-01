import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../components/loading";
import { VILLAGERS_QUERY } from "../mutations";
import { VillagersQuery, VillagersQuery_villagers, VillagersQuery_villagers_villagers } from "../__generated__/VillagersQuery";
// @ts-ignore
import closeImg from '../images/close-menu.png';

export const Villagers = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const [, species] = location.search.split("?specie=");
    const { id: villagerId } = useParams();
    const [selectedVillager, setSelectedVillager] = useState<VillagersQuery_villagers_villagers | undefined>();
    const { data: villagersData, loading } = useQuery<VillagersQuery, VillagersQuery_villagers>(VILLAGERS_QUERY);
    
    useEffect(() => {     
        setSelectedVillager(() =>  villagersData?.villagers.villagers?.find((villager) => villager.id + "" === villagerId));
    }, [villagerId]);

    return (
        <>
            <div className="wrapper-search">
                <select>
                    <option value="">종류</option>                
                </select>

                <select>
                    <option value="">성격</option>                
                </select>

                <input type="text" placeholder="이름" />
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
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../components/loading";
import { getPersonality, getSpecies, getVillager, SPECIES } from "../constants/common";
import { IVillager } from "../constants/interface";
// @ts-ignore
import quote from '../images/quote.png';

export const Villagers = () => {
    const pageCount = 20;
    const navigation = useNavigate();
    const location = useLocation();
    const [, species] = location.search.split("?specie=");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [villagers, setVillagers] = useState<IVillager[]>([]);
    const [searchSpecie, setSearchSpecie] = useState('');

    useEffect(() => {
        if (!process.env.REACT_APP_NOOKIPEIA_KEY) { return; }        

        const selectedSpecies = species ? species : '';
        setSearchSpecie(() => selectedSpecies);

        fetch(`${process.env.REACT_APP_NOOKIPEIA_URL}/villagers?game=NH&species=${selectedSpecies}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.REACT_APP_NOOKIPEIA_KEY,
                'Accept-Version': '1.0.0'
            }
        }).then(response => response.json())
            .then(data => {
                setVillagers(data);
                setLoading(false);
            });
    }, [species]);

    const nextPage = () => {
        setPage((currentPage) => currentPage + 1);
    };

    const searchSpecies = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLoading(true);
        navigation({
            pathname: '/',
            search: `?specie=${e.target.value}`        
        })
    };

    return (
        <>
            <div className="wrapper-search">
                <select onChange={(e) => searchSpecies(e)} value={searchSpecie}>
                <option value="">전체</option>
                    {SPECIES.map((specie, index) => 
                        <option key={`specie${index}`} value={specie.eng} selected={specie.eng === searchSpecie}>
                            {specie.kor}
                        </option>
                    )}
                </select>
            </div>
            <div className="wrapper-villagers">
                {!loading &&
                    villagers.slice(0, page * pageCount).map((villager, index) =>
                        <a key={villager.id + index} className="villager" href={villager.url}>
                            <div className="vi-image" style={{ backgroundImage: `url(${villager.image_url})` }}></div>

                            <dl className="vi-info">
                                <dd>{getVillager(villager.id, villager.name)}</dd>
                                <dd>
                                    <img src={quote} alt="quote" />
                                    {villager.quote}
                                    <img src={quote} alt="quote" />
                                </dd>
                                <dd>
                                    <span>#{getSpecies(villager.species)}</span>
                                    <span>#{getPersonality(villager.personality)}</span>
                                    <span>#{villager.gender}</span>
                                    <span>#{villager.sign}</span>
                                </dd>
                                <dd>🎉 {villager.birthday_month} / {villager.birthday_day}</dd>
                            </dl>
                        </a>
                    )
                }

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
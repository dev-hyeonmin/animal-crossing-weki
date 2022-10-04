import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPersonality, getSpecies } from "../../constants/common";
import { IVillager } from "../../constants/interface";
// @ts-ignore
import quote from '../../images/quote.png';

export const Villagers = () => {
  const pageCount = 20;
  const [page, setPage] = useState(1);
  const [villagers, setVillagers] = useState<IVillager[]>([]);
  
  useEffect(() => {
    if (!process.env.REACT_APP_NOOKIPEIA_KEY) { return; }
    
    fetch(`${process.env.REACT_APP_NOOKIPEIA_URL}/villagers?game=NH`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.REACT_APP_NOOKIPEIA_KEY,
        'Accept-Version': '1.0.0'
      }
    }).then(response => response.json())
      .then(data => {
        setVillagers(data);
      });
  }, []);

  const nextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <>
      <div className="wrapper-villagers">
        {villagers.slice(0, page * pageCount).map((villager, index) =>        
          <Link key={villager.id + index} className="villager" to={`/villager/${villager.id}`} state={villager}>
            <div className="vi-image" style={{backgroundImage: `url(${villager.image_url})`}}></div>

            <dl className="vi-info">
              <dd>{villager.name}</dd>
              <dd>
                <img src={quote} />
                {villager.quote}
                <img src={quote} />
              </dd>
              <dd>
                  <span>#{getSpecies(villager.species)}</span>
                  <span>#{getPersonality(villager.personality)}</span>
                  <span>#{villager.gender}</span>
              </dd>
              <dd>🎉 {villager.birthday_month} / {villager.birthday_day}</dd>
            </dl>
          </Link>
        )}        

        {villagers.length === 0 && 
            <div>Not Found.</div>
        }
      </div>

      <div className="box-button">
        <button className="btn-page" onClick={nextPage}>more</button>
      </div>
    </>
  );
}
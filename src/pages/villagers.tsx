import { getPersonality, getSpecies } from "../constants/common";
import { IVillagers } from "../constants/interface";

export const Villagers = () => {
    const villagers:IVillagers[] = [
        {
          "url": "https://nookipedia.com/wiki/Ribbot",
          "name": "Ribbot",
          "alt_name": "",
          "title_color": "bfbfbf",
          "text_color": "5e5e5e",
          "id": "flg01",
          "image_url": "https://dodo.ac/np/images/9/94/Ribbot_NH.png",
          "species": "Frog",
          "personality": "Jock",
          "gender": "Male",
          "birthday_month": "February",
          "birthday_day": "13",
          "sign": "Aquarius",
          "quote": "Never rest, never rust.",
          "phrase": "zzrrbbit",
          "prev_phrases": [
            "toady"
          ],
          "clothing": "Simple Parka",
          "islander": false,
          "debut": "DNM",
          "appearances": [
            "DNM",
            "AC",
            "E_PLUS",
            "WW",
            "CF",
            "NL",
            "WA",
            "NH",
            "HHD",
            "PC"
          ],
          "nh_details": {
            "image_url": "https://dodo.ac/np/images/9/94/Ribbot_NH.png",
            "photo_url": "https://dodo.ac/np/images/0/03/RibbotPicACNH.png",
            "icon_url": "https://dodo.ac/np/images/8/87/Ribbot_NH_Villager_Icon.png",
            "quote": "Never rest, never rust.",
            "sub-personality": "B",
            "catchphrase": "zzrrbbit",
            "clothing": "Simple Parka",
            "clothing_variation": "Light Blue",
            "fav_styles": [
              "Simple",
              "Active"
            ],
            "fav_colors": [
              "Blue",
              "Aqua"
            ],
            "hobby": "Fitness",
            "house_interior_url": "https://dodo.ac/np/images/8/86/House_of_Ribbot_NH.png",
            "house_exterior_url": "https://dodo.ac/np/images/4/42/House_of_Ribbot_NH_Model.png",
            "house_wallpaper": "Circuit-Board Wall",
            "house_flooring": "Future-Tech Flooring",
            "house_music": "K.K. Technopop",
            "house_music_note": ""
          }
        }
      ];
    return (
        <div className="wrapper-villagers">
            {villagers.map((villager) =>        
                <div key={villager.id} className="villager">
                    <div className="vi-image">                        
                        <img src={villager.image_url}/>
                    </div>

                    <dl className="vi-info">
                        <dd>{villager.name}</dd>
                        <dd>"{villager.quote}"</dd>
                        <dd>
                            <span>#{getSpecies(villager.species)}</span>
                            <span>#{villager.gender}</span>
                            <span>#{getPersonality(villager.personality)}</span>
                        </dd>
                        <dd>🎉 {villager.birthday_month} / {villager.birthday_day}</dd>
                    </dl>
                </div>
            )}

            {villagers.length === 0 && 
                <div>Not Found.</div>
            }
        </div>
    );
}
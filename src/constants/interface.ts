export interface IVillager {
    "url": string;
    "name": string;
    "alt_name": string;
    "title_color": string;
    "text_color": string;
    "id": string;
    "image_url": string;
    "species": string;
    "personality": string;
    "gender": string;
    "birthday_month": string;
    "birthday_day": string;
    "sign": string;
    "quote": string;
    "phrase": string;
    "prev_phrases": [string];
    "clothing": string;
    "islander": boolean,
    "debut": string;
    "appearances": string[],
    "nh_details": {
        "image_url": string;
        "photo_url": string;
        "icon_url": string;
        "quote": string;
        "sub-personality": string;
        "catchphrase": string;
        "clothing": string;
        "clothing_variation": string;
        "fav_styles": string[],
        "fav_colors": string[],
        "hobby": string;
        "house_interior_url": string;
        "house_exterior_url": string;
        "house_wallpaper": string;
        "house_flooring": string;
        "house_music": string;
        "house_music_note": string;
    }
}

interface IAvailableTime {
    months: string;
    time: string;
}

export interface IFishes {
    "url": string;
    "name": string;
    "number": number;
    "image_url": string;
    "render_url": string;
    "location": string;
    "shadow_size": string;
    "rarity": string;
    "total_catch": number;
    "sell_nook": number;
    "sell_cj": number;
    "tank_width": number;
    "tank_length": number;
    "catchphrases": [],
    "time": string;
    "n_availability": string;
    "n_availability_array": string[];
    "s_availability": string;
    "s_availability_array": [];
    "shadow_movement": string;
    "availability_north": IAvailableTime[];
}

export interface IEvents {
    "date": string;
    "event": string;
    "type": string;
    "url": string;
}
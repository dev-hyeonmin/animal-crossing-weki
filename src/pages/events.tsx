import { useState } from "react";
import { IEvents } from "../constants/interface";
import Calendar from 'react-calendar';
import '../styles/calendar.css';
// @ts-ignore
import eventImg from '../images/event.png';
// @ts-ignore
import birthImg from '../images/birth.png';
// @ts-ignore
import recipeImg from '../images/recipe.png';

export const Events = () => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState<IEvents[]>([]);
  

    const loadEventByDay = (value: Date) => {
        const date = transDateFormat(value);        
        setLoading(true);
        getEvent(date);
    };

    const transDateFormat = (date: Date) => {
        // YYYY-MM-DD
        const year = date.getFullYear();
        const month = `00${date.getMonth() + 1}`.slice(-2);
        const day = `00${date.getDate()}`.slice(-2);
        
        return `${year}-${month}-${day}`;
    };

    const getEvent = async (date: string) => {
        if (!process.env.REACT_APP_NOOKIPEIA_KEY) { return; }
    
        await fetch(`${process.env.REACT_APP_NOOKIPEIA_URL}/nh/events?date=${date}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.REACT_APP_NOOKIPEIA_KEY,
                'Accept-Version': '1.0.0'
            }
        })
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            });
    }

    const getTypeImage = (type: string) => {
        switch (type) {
            case 'Birthday':
                return birthImg;
            case 'Recipes':
                return recipeImg;
            default:
                return eventImg;
        }
    };

    return (
        <>
            <div className="wrapper-events">
                <Calendar
                    onClickDay={(value) => loadEventByDay(value)}
                    locale="en"
                    showNeighboringMonth={false}
                />
            </div>

            <div className="wrapper-events">
                {loading &&
                    <div className="loading">
                        Loading...    
                    </div>
                }

                {!loading &&
                    <div className="events">
                        {events.map((item, index) => 
                            <dl key={`eventInfo${index}`}>
                                <dt>
                                    <img src={getTypeImage(item.type)} />
                                </dt>
                                <dd key={`event${index}`}>{item.event}</dd>
                            </dl>
                        )}
                    </div>
                }
            </div>
        </>
    );
}
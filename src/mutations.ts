import { gql } from "@apollo/client";

export const VILLAGERS_QUERY = gql`
    query VillagersQuery {
        villagers {
            ok
            error
            villagers {
                id
                image
                species
                name
                personality
                gender
                birth
                speak
                speakType
                hobby
                music
                style
                style2
                color
                color2
                favoriteTalk
            }
        }
    }
`;


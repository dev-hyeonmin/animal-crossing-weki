import { gql } from "@apollo/client";

export const VILLAGERS_QUERY = gql`
    query VillagersQuery ($villagersInput: VillagersInput!) {
        villagers(input: $villagersInput) {
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

export const VILLAGERSFILTER_QUERY = gql`
    query VillagersFilterQuery {
        villagersFilter {
            ok
            species
            personalities
        }
    }
`;
import { gql } from "@apollo/client";

export const VILLAGERS_QUERY = gql`
    query villagers {
        villagers {
            ok
            error
            villagers {
                name
            }
        }
    }
`;
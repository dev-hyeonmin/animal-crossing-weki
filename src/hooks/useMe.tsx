import { gql, useQuery } from "@apollo/client";
import { meQuery, meQuery_me } from "../__generated__/meQuery";

export const ME_QUERY = gql`
    query meQuery {
        me {
            id
            name
            email
            verified
            userImage
            islandName
            islandCode
            fruit
            flower
            hemisphere
        }
    }
`;

export const useMe = () => {
    return useQuery<meQuery, meQuery_me>(ME_QUERY);
}
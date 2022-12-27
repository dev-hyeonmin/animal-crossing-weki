import { gql } from "@apollo/client";

export const VILLAGERS_QUERY = gql`
    query VillagersQuery ($villagersInput: VillagersInput!) {
        villagers(input: $villagersInput) {
            ok
            error
            villagers {
                id
                image
                icon
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

export const VILLAGERCOMMENTS_QUERY = gql`
    query VillagerCommentsQuery ($villagerCommentsInput: VillagerCommentsInput!) {
        villagersComments(input: $villagerCommentsInput) {
            ok
            comments {
                id
                content
                createAt
                user {
                    id
                    name
                }
            }
        }
    }
`;

export const USERCREATURES_QUERY = gql`
    query UserCreaturesQuery {
        userCreatures {
            ok
            error
            creatures {
                name
            }
        }
    }
`;

export const CREATEVILLAGERCOMMENT_MUTATION = gql`
    mutation createVillagerCommentMutation ($createVillagerCommentInput: CreateVillagerCommentInput!) {
        createVillagerComment (input: $createVillagerCommentInput) {
            ok
            error
        }
    }
`;

export const DELETEVILLAGERCOMMENT_MUTATION = gql`
    mutation deleteVillagerCommentMutation ($deleteVillagerCommentInput: DeleteVillagerCommentInput!) {
        deleteVillagerComment (input: $deleteVillagerCommentInput) {
            ok
            error
        }
    }
`;

export const CREATECREATURERELATION_MUTATION = gql`
    mutation createCreatureRelation ($createCreatureInput: CreateCreatureInput!) {
        createCreatureRelation (input: $createCreatureInput) {
            ok
            error
        }
    }
`;

export const DELETECREATURERELATION_MUTATION = gql`
    mutation deleteCreatureRelation ($deleteCreatureInput: DeleteCreatureInput!) {
        deleteCreatureRelation (input: $deleteCreatureInput) {
            ok
            error
        }
    }
`;

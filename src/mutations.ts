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

export const USERFISHES_QUERY = gql`
    query UserFishesQuery {
        userFishes {
            ok
            error
            fishes {
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

export const CREATEFISHRELATION_MUTATION = gql`
    mutation createFishRelation ($createFishInput: CreateFishInput!) {
        createFishRelation (input: $createFishInput) {
            ok
            error
        }
    }
`;

export const DELETEFISHRELATION_MUTATION = gql`
    mutation deleteFishRelation ($deleteFishInput: DeleteFishInput!) {
        deleteFishRelation (input: $deleteFishInput) {
            ok
            error
        }
    }
`;

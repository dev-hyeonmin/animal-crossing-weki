import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    makeVar,
    split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { LOCALSTORAGE_TOKEN, SERVER_URL, SOCKET_URL } from "./constans";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production' 
        ? `${SERVER_URL}/graphql`
        : `${SERVER_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "x-jwt": authTokenVar() || "",
        },
    };
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    authLink.concat(httpLink)
);

export const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLoggedIn: {
                        read() {
                            return isLoggedInVar();
                        },
                        },
                    token: {
                        read() {
                            return authTokenVar();
                        },
                    },
                },
            },
        },
    }),
});
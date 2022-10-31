module.exports = {
    client: {
      includes: ["./src/**/*.{tsx,ts}"],
      tagName: "gql",
      service: {
        name: "animal-crossing-weki-api",
        url: "http://localhost:4000/graphql",
      },
    },
  };
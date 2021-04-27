import {createClient} from "urql";

const client = createClient({
  url: "https://eexy-athena-api.herokuapp.com/graphql",
  requestPolicy: "network-only",
  fetchOptions: () => ({
    credentials: "include"
  })
});

export default client;
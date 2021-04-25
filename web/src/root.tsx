import { createClient, Provider } from "urql";
import { App } from "./App";

const client = createClient({
  url: "https://eexy-athena-api.herokuapp.com/graphql",
  requestPolicy: 'cache-and-network',
  fetchOptions: () => ({
    credentials: 'include',
  })

});

export const Root = () => {
  return (
    <Provider value={client}>
      <App />
    </Provider>
  );
};

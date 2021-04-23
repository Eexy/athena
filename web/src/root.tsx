import { createClient, Provider } from "urql";
import { App } from "./App";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: () => ({
    credentials: 'include'
  })

});

export const Root = () => {
  return (
    <Provider value={client}>
      <App />
    </Provider>
  );
};

import { createClient } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { errorExchange, fetchExchange, makeOperation } from '@urql/core';
import logout from './logout';

const client = createClient({
  url: 'https://eexy-athena-api.herokuapp.com/graphql',
  requestPolicy: 'cache-and-network',
  exchanges: [
    // https://formidable.com/open-source/urql/docs/advanced/authentication/
    errorExchange({
      onError: (error) => {
        const isAuthError = error.graphQLErrors.some((e) =>
          e.message.includes('not authenticated')
        );

        if (isAuthError) {
          logout();
        }
      },
    }),
    authExchange({
      willAuthError: ({ authState }) => {
        if (!authState || !localStorage.getItem('jid')) {
          return true;
        }
        return false;
      },
      getAuth: async ({ authState }) => {
        if (!authState) {
          const token = localStorage.getItem('jid');
          if (token) {
            return { token };
          }
          return null;
        }
        return null;
      },
      addAuthToOperation: ({ authState, operation }) => {
        const state: any = authState;
        if (!authState || !state.token) {
          return operation;
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        const token = state.token;

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${token}`,
            },
          },
        });
      },
    }),
    fetchExchange,
  ],
});

export default client;

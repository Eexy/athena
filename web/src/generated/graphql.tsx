import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ConnectResponse = {
  __typename?: 'ConnectResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Scalars['Boolean'];
  updateTodoStatus: Todo;
  login: ConnectResponse;
  logout: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  deleteMe: Scalars['Boolean'];
  register: ConnectResponse;
};


export type MutationCreateTodoArgs = {
  desc: Scalars['String'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTodoStatusArgs = {
  completed: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
  me: User;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
};


export type QueryTodosArgs = {
  limit?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
  completed?: Maybe<Scalars['Boolean']>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  desc: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
};

export type CreateTodoMutationVariables = Exact<{
  desc: Scalars['String'];
}>;


export type CreateTodoMutation = (
  { __typename?: 'Mutation' }
  & { createTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'desc' | 'completed'>
  ) }
);

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTodo'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'ConnectResponse' }
    & Pick<ConnectResponse, 'ok' | 'error' | 'token'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'ConnectResponse' }
    & Pick<ConnectResponse, 'ok' | 'error' | 'token'>
  ) }
);

export type UpdateTodoStatusMutationVariables = Exact<{
  id: Scalars['String'];
  completed: Scalars['Boolean'];
}>;


export type UpdateTodoStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateTodoStatus: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'completed'>
  ) }
);

export type TodosQueryVariables = Exact<{
  skip?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
  completed?: Maybe<Scalars['Boolean']>;
}>;


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'desc' | 'completed'>
  )> }
);


export const CreateTodoDocument = gql`
    mutation CreateTodo($desc: String!) {
  createTodo(desc: $desc) {
    id
    desc
    completed
  }
}
    `;

export function useCreateTodoMutation() {
  return Urql.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument);
};
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: String!) {
  deleteTodo(id: $id)
}
    `;

export function useDeleteTodoMutation() {
  return Urql.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ok
    error
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    ok
    error
    token
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateTodoStatusDocument = gql`
    mutation updateTodoStatus($id: String!, $completed: Boolean!) {
  updateTodoStatus(id: $id, completed: $completed) {
    completed
  }
}
    `;

export function useUpdateTodoStatusMutation() {
  return Urql.useMutation<UpdateTodoStatusMutation, UpdateTodoStatusMutationVariables>(UpdateTodoStatusDocument);
};
export const TodosDocument = gql`
    query Todos($skip: Float, $limit: Float, $completed: Boolean) {
  todos(skip: $skip, limit: $limit, completed: $completed) {
    id
    desc
    completed
  }
}
    `;

export function useTodosQuery(options: Omit<Urql.UseQueryArgs<TodosQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TodosQuery>({ query: TodosDocument, ...options });
};
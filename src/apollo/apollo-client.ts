import { ApolloClient, InMemoryCache } from '@apollo/client'
import initCache from './Cache'

let client: ApolloClient<any>

export const getApolloClient = async (): Promise<ApolloClient<any>> => {
  if (client) return client

  const cache: InMemoryCache = await initCache()

  const apolloClient: ApolloClient<any> = new ApolloClient({
    uri: process.env.REACT_APP_SPACEX_GRAPHQL_URI,
    cache,
  })

  client = apolloClient

  return apolloClient
}

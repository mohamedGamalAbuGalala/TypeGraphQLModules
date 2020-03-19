import 'reflect-metadata'
import { AppModule } from './modules/app'
import { ApolloServer } from 'apollo-server'

const { schema, context } = AppModule

const serverConfig = {
  introspection: true,
  schema,
  context
}

const server = new ApolloServer(serverConfig)

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

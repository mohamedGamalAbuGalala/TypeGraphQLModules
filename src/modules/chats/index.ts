import { GraphQLModule } from '@graphql-modules/core'
import { ChatsProvider } from './chats.provider'
import { buildSchemaSync } from 'type-graphql'
import { ChatResolver } from './chat.resolver'
import { NeoDBModule } from '../neo-db/neoDB.module'

export const ChatsModule = new GraphQLModule({
  providers: [ChatsProvider, ChatResolver],
  imports: [NeoDBModule],

  extraSchemas: () => [
    buildSchemaSync({
      resolvers: [ChatResolver],
      container: ({ context }) => context.injector
    })
  ]
})

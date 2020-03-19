import { GraphQLModule } from '@graphql-modules/core'

import { ChatsModule } from './chats'
import { MessagesModule } from './messages'
import { NeoDBModule } from './neo-db/neoDB.module'

export const AppModule = new GraphQLModule({
  imports: [NeoDBModule, ChatsModule, MessagesModule]
})

import { GraphQLModule } from '@graphql-modules/core'

import { NeoDBProvider } from './neoDB.provider'

export const NeoDBModule = new GraphQLModule({
  providers: [NeoDBProvider]
})

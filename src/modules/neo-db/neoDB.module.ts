import { Pool, createPool } from 'generic-pool'
import { GraphQLModule } from '@graphql-modules/core'

import Neode from 'neode'

import { NeoDBProvider } from './neoDB.provider'

const url = 'bolt://localhost:7687'
const username = 'neo4j'
const password = 'local'

export const NeoDBModule = new GraphQLModule({
  providers: [
    {
      provide: Pool,
      useFactory: () =>
        createPool({
          create: async (): Promise<Neode> =>
            new Promise(resolve => {
              console.log(
                '*********************** CONNECTION WAS OPENED ****************'
              )

              resolve(new Neode(url, username, password))
            }),
          destroy: async (client: Neode) =>
            new Promise(resolve => {
              console.log(
                '*********************** CONNECTION WAS CLOSED ****************'
              )
              resolve(client.close())
            })
        })
    },
    NeoDBProvider
  ]
})

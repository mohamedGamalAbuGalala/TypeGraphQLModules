import { Injectable, ProviderScope } from '@graphql-modules/di'
import * as Neode from 'neode'
import { OnRequest } from '@graphql-modules/core'

const url = 'bolt://localhost:7687'
const username = 'neo4j'
const password = 'local'

const neoInstance = new Neode(url, username, password)
@Injectable({
  scope: ProviderScope.Application
})
export class NeoDBProvider implements OnRequest {
  private _poolClient: Neode = neoInstance
  constructor () {}
  onRequest (): void {
    if (!this._poolClient) {
      console.log('new instance..........')

      this._poolClient = new Neode(url, username, password)
    }
  }

  public getClient (): Neode {
    return this._poolClient
  }
}

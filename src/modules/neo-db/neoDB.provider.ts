import { Pool } from 'generic-pool'
import { Injectable, ProviderScope } from '@graphql-modules/di'
import { OnRequest, OnResponse } from '@graphql-modules/core'
import Neode from 'neode'

@Injectable({
  scope: ProviderScope.Session
})
export class NeoDBProvider implements OnRequest, OnResponse {
  private _poolClient: Neode
  constructor (private readonly pool: Pool<Neode>) {}

  public async onRequest (): Promise<any> {
    this._poolClient = await this.pool.acquire()
  }

  public async onResponse (): Promise<any> {
    if (this._poolClient) {
      console.log(
        '*********************** CONNECTION SHOULD BE CLOSED ****************'
      )
      await this.pool.release(this._poolClient)
    }
    console.log(
      '*********************** CONNECTION SHOULD BE CLOSED  -*---------------- ****************'
    )
  }

  public getClient (): Neode {
    return this._poolClient
  }
}

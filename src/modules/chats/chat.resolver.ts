import { ChatsProvider } from './chats.provider'
import { Resolver, Mutation, Arg, Int, Query } from 'type-graphql'
import { Chat } from './chat.type'
import Neode from 'neode'
import { NeoDBProvider } from '../neo-db/neoDB.provider'

@Resolver(of => Chat)
export class ChatResolver {
  private client: Neode
  constructor (
    private chatsProvider: ChatsProvider,
    private dbProvider: NeoDBProvider
  ) {
    this.client = this.dbProvider.getClient()
  }

  @Query(() => Number)
  async health (): Promise<number> {
    const countResult = await this.client.cypher(
      'match (n) return count(n) as count',
      {}
    )

    return countResult.records[0].get('count')['low']
  }

  @Query(returns => [Chat])
  chats () {
    return this.chatsProvider.getChats()
  }

  @Query(returns => Chat)
  chat (@Arg('id') id: number) {
    return this.chatsProvider.getChat(id)
  }

  @Mutation(returns => Chat)
  createChat (
    @Arg('title') title: string,
    @Arg('description') description: string
  ) {
    return this.chatsProvider.createChat({
      id: Math.random(),
      title,
      description
    })
  }

  @Mutation(returns => Int)
  deleteChat (@Arg('id') id: number) {
    return this.chatsProvider.deleteChat(id)
  }
}

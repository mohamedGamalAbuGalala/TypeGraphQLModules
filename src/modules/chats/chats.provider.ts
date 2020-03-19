import { Injectable } from '@graphql-modules/di'
import { Chat } from './chat.type'

@Injectable()
export class ChatsProvider {
  private chats: Chat[] = []

  getChats (): Chat[] {
    return this.chats
  }

  getChat (id: number): Chat {
    return this.chats.find(chat => chat.id === id)
  }

  createChat (chat: Chat): Chat {
    const id = Math.floor(Math.random() * 1e6)

    const newChat: Chat = {
      ...chat,
      id
    }

    this.chats.push(newChat)

    return newChat
  }

  deleteChat (id: number): number {
    this.chats = this.chats.filter(chat => chat.id !== id)

    return id
  }
}

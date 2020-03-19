import { Injectable } from '@graphql-modules/di'
import { Message } from './message.type'

@Injectable()
export class MessagesProvider {
  private messages: Message[] = []

  getMessages (chatId: number): Message[] {
    return this.messages.filter(message => message.chatId === chatId)
  }

  getMessage (id: number): Message {
    return this.messages.find(message => message.id === id)
  }

  createMessage (content: string, chatId: number): Message {
    const id = Math.floor(Math.random() * 1000)

    const newMessage: Message = { id, chatId, content }

    this.messages.push(newMessage)

    return newMessage
  }

  deleteMessage (id: number): number {
    const message = this.messages.find(message => message.id === id)
    this.messages.splice(this.messages.indexOf(message), 1)

    return id
  }
}

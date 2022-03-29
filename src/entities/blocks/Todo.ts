import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class Todo extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public todo: { texts: Text[], checked: boolean, color: string }
  ) {
    super('todo', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    const content: string[] = this.todo.texts.map((text: Text) => text.raw)
    return `
      <div class="${options.todo?.container || ''}">
        <input type="checkbox" checked="${this.todo.checked}" class="${options.todo?.input || ''}" />
        <p class="${options.todo?.content || ''}">${content.join(' ')}</p>
      </div>
    `
  }
}
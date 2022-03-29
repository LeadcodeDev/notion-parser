import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'

export default class NumberedList extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public text: { index: number, texts: Text[], color: string }
  ) {
    super('numberedList', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: { [K: string]: any}) {
    const content: string[] = this.text?.texts.map((text: Text) => text.raw)
    return `<div class="${options.numberedList || ''}">${content.join(' ')}</div>`
  }
}
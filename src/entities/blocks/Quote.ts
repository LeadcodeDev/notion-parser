import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'

export default class Quote extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public quote: { texts: Text[], color: string }
  ) {
    super('quote', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: { [K: string]: string}) {
    const blocks: string[] = this.quote?.texts.map((text: Text) => text.raw)
    return `<blockquote class="${options.quote}">${blocks.join(' ')}</blockquote>`
  }
}
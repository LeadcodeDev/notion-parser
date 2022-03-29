import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class Paragraph extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public paragraph: { texts: Text[], color: string }
  ) {
    super('paragraph', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: { [K: string]: HtmlConfig}) {
    const blocks: string[] = this.paragraph.texts.map((text: Text) => text.raw)

    return blocks.length
      ? `<p class="${options.p || ''}">${blocks.join(' ')}</p>`
      : ''
  }
}
import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class BulletedList extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public texts: { texts: Text[], color: string }
  ) {
    super('bulletedList', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    const content: string[] = this.texts?.texts.map((text: Text) => text.raw)
    return `<div class="${options.bulletedList?.content || ''}">${content.join(' ')}</div>`
  }
}
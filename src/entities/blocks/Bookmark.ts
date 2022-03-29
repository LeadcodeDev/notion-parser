import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class Bookmark extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public bookmark: { captions: Text[], url: string }
  ) {
    super('bookmark', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    const blocks: string[] = this.bookmark.captions.map((text: Text) => text.raw)

    if (blocks.length) {
      return `<a href="${this.bookmark.url}" class="${options.a || ''}">${blocks.join(' ')}</a>`
    }
  }
}
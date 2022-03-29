import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class Image extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public image: { captions: Text[], type: string, url: string }
  ) {
    super('image', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    const caption: string[] = this.image.captions.map((text: Text) => text.raw)
    return `
      <div>
        <img src="${this.image.url}" class="${options.image || ''}" alt />
        <div class="${options.image?.caption || ''}">${caption.join(' ')}</div>
      </div>
    `
  }
}
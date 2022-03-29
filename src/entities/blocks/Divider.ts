import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import { HtmlConfig } from '../../interfaces'

export default class Divider extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
  ) {
    super('divider', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    return `<div class="${options.divider || ''}"></div>`
  }
}
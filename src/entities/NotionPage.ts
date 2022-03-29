import { DateTime } from 'luxon'
import NotionMember from './NotionMember'
import { CoverImage, Icon } from '../interfaces'

export default class NotionPage {
  public readonly object: string = 'page'

  constructor (
    public id: string,
    public createdAt: DateTime,
    public updatedAt: DateTime,
    public createdBy: NotionMember,
    public updatedBy: NotionMember,
    public cover: CoverImage,
    public icon: Icon,
    public archived: boolean,
    public properties: any,
    public url: string
  ) {
  }
}
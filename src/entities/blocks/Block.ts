import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import { BlockType } from '../../interfaces'

export default class Block {
  public readonly type: BlockType = 'block'

  constructor (
    type: BlockType,
    public id: string | null,
    public createdAt: DateTime,
    public updatedAt: DateTime,
    public createdBy: NotionMember,
    public updatedBy: NotionMember,
  ) {
    this.type = type
  }

  public toHtml () {

  }
}
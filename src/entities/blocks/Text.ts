import { Annotation, RichText } from '../../interfaces'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Block from './Block'

export default class Text extends Block{
  constructor (
    id: string,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public raw: string,
    public richText: RichText,
    public annotations: Annotation,
    public href: string | null
  ) {
    super('text', id, createdAt, updatedAt, createdBy, updatedBy)
  }
}
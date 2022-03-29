import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import Block from './Block'
import { HeadingLevel } from '../../interfaces'

export default class Title extends Block {
  constructor (
    id: string | null,
    public level: HeadingLevel,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public heading: { texts: Text[], color: string }
  ) {
    super('title', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: { [K: string]: string}) {
    const blocks: string[] = []
    this.heading?.texts.forEach((text: Text) => blocks.push(text.raw))

    const tag = `h${this.level}`
    return `<${tag} class="${options[tag] || ''}">${blocks.join(' ')}</${tag}>`
  }
}
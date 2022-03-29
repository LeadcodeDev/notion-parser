import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class Toggle extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public toggle: { texts: Text[], color: string },
    public content: any
  ) {
    super('toggle', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    return `
    <details class="${options.toggle?.container || ''}">
      <summary class="${options.toggle?.summary || ''}">${this.toggle.texts.map((text) => text.raw)}</summary>
      ${this.content.map((block) => block.render(options)).join('\n')}
    </details>
    `.trim()
  }
}
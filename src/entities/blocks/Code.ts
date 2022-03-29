import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class Code extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public code: { captions: Text[], richTexts: Text[], language: string }
  ) {
    super('quote', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    const code = this.code.richTexts.map((a) => a.richText.content)
    return `<div class="code-container">
      <code class="language-${this.code.language}">
        <pre class="${options.code?.text || ''}">${code}</pre>
      </code>
    </div>
    `
  }
}
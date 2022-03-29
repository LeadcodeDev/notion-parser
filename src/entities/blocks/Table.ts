import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class Table extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public table: { headers: Text[], rows: any[] }
  ) {
    super('table', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    const header = this.table.headers.map((block) => `<td class="${options.table?.head?.td || ''}">${block.raw}</td>`)
    const rows = this.table.rows.map((row) => {
      const items = row.flatMap((blocks) => blocks.map((block) => `<td class="${options.table?.body?.td || ''}">${block.raw}</td>`))
      return `<tr class="${options.table?.body?.tr || ''}">${items.join('')}</tr>`
    })

    return `<table class="${options.table || ''}">
      <thead class="${options.table?.head || ''}">
        <tr class="${options.table?.head?.tr || ''}">${header.join('')}</tr>
      </thead>
      <tbody class="${options.table?.body || ''}">${rows.join('')}</tbody>
      
    </table>`
  }
}
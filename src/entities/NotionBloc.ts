import { BlockContract, HeadingLevel } from '../interfaces'
import { DateTime } from 'luxon'
import NotionMember from './NotionMember'
import Http from './Http'
import Paragraph from './blocks/Paragraph'
import Text from './blocks/Text'
import Title from './blocks/Title'
import Quote from './blocks/Quote'
import Bookmark from './blocks/Bookmark'
import Code from './blocks/Code'
import Video from './blocks/Video'
import Toggle from './blocks/Toggle'
import Image from './blocks/Image'
import BulletedList from './blocks/BulletedList'
import NumberedList from './blocks/NumberedList'
import Divider from './blocks/Divider'
import Table from './blocks/Table'
import Todo from './blocks/Todo'

export default class NotionBloc {
  public blocs: BlockContract[] = []

  constructor (public id: string) {
  }

  public dispatch (payload) {
    return this.wrap(payload)
  }

  private async wrap (payload) {
    const types = {
      paragraph: () => this.createParagraph(payload),
      heading_1: () => this.createHeading(HeadingLevel.h1, payload),
      heading_2: () => this.createHeading(HeadingLevel.h2, payload),
      heading_3: () => this.createHeading(HeadingLevel.h3, payload),
      quote: () => this.createQuote(payload),
      bookmark: () => this.createBookmark(payload),
      code: () => this.createCode(payload),
      video: () => this.createVideo(payload),
      toggle: () => this.createToggle(payload),
      image: () => this.createImage(payload),
      bulleted_list_item: () => this.createBulletedList(payload),
      numbered_list_item: () => this.createNumberedList(payload),
      divider: () => this.createDivider(payload),
      table: () => this.createTable(payload),
      to_do: () => this.createTodo(payload),
    }

    if (payload.type in types) {
      return types[payload.type](payload)
    }
  }

  protected async createParagraph (payload) {
    const texts = payload.paragraph.rich_text?.map((text) => this.createText(payload, text))
    return new Paragraph(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      {
        texts: texts || [],
        color: payload.paragraph.color
      }
    )
  }

  protected async createHeading (level: HeadingLevel, payload) {
    const base = payload[`heading_${level}`]
    const texts = base.rich_text?.map((text) => this.createText(payload, text))

    return new Title(
      payload.id,
      level,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      {
        texts: texts || [],
        color: base.color
      }
    )
  }

  public async createQuote (payload) {
    const texts = payload.quote.rich_text?.map((text) => this.createText(payload, text))

    return new Quote(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        texts: texts || [],
        color: payload.quote.color
      }
    )
  }

  public async createBookmark (payload) {
    const captions = payload.bookmark.caption?.map((text) => this.createText(payload, text))

    return new Bookmark(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        captions: captions || [],
        url: payload.bookmark.url
      }
    )
  }

  protected async createCode (payload) {
    const captions = payload.code.caption.map((text) => this.createText(payload, text))
    const texts = payload.code.rich_text.map((text) => this.createText(payload, text))

    return new Code(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        captions: captions || [],
        richTexts: texts || [],
        language: payload.code.language
      }
    )
  }

  public async createVideo (payload) {
    const captions = payload.video.caption?.map((text) => this.createText(payload, text))

    return new Video(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        captions: captions || [],
        type: payload.video.type,
        url: payload.video.external.url
      }
    )
  }

  protected async createToggle (payload) {
    const texts = payload.toggle.rich_text?.map((text) => this.createText(payload, text))

    const content = payload.has_children
      ? (await Http.createRequest().get(`/blocks/${payload.id}/children`)).data.results
      : []

    const d = await Promise.all(
      content.map(async (block) => {
        console.log('block', await this.wrap(block))
        return this.wrap(block)
      })
    )
    console.log('content', d)

    return new Toggle(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        texts: texts || [],
        color: payload.toggle.color
      },
      d
    )
  }

  public async createImage (payload) {
    const texts = payload.image.caption?.map((text) => this.createText(payload, text))

    return new Image(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        captions: texts || [],
        url: payload.image.file.url,
        type: payload.image.type,
      }
    )
  }

  public async createBulletedList (payload) {
    const texts = payload.bulleted_list_item.rich_text?.map((text) => this.createText(payload, text))

    return new BulletedList(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        texts: texts || [],
        color: payload.bulleted_list_item.color,
      }
    )
  }

  public async createNumberedList (payload) {
    const texts = payload.numbered_list_item.rich_text?.map((text) => this.createText(payload, text))


    return new NumberedList(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        index: 0,
        texts: texts || [],
        color: payload.numbered_list_item.color,
      }
    )
  }

  protected async createDivider (payload) {
    return new Divider(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
    )
  }

  protected async createTable (payload) {
    const content: any[] = payload.has_children
      ? (await Http.createRequest().get(`/blocks/${payload.id}/children`)).data.results
      : []

    const [headers, ...rows] = content.map((row) => {
      return row.table_row.cells.map((cellBlocks) => {
        return cellBlocks.map((block) => this.createText(payload, block))
      })
    })

    return new Table(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      { headers: headers.flat(), rows }
    )
  }

  protected createTodo (payload) {
    const texts = payload.to_do.rich_text?.map((text) => this.createText(payload, text))

    return new Todo(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      payload.has_children,
      payload.archived,
      {
        texts: texts || [],
        checked: payload.to_do.checked,
        color: payload.to_do.color,
      }
    )
  }

  public createText (payload, text) {
    return new Text(
      payload.id,
      DateTime.fromISO(payload.created_time),
      DateTime.fromISO(payload.last_edited_time),
      new NotionMember(payload.created_by.id),
      new NotionMember(payload.last_edited_by.id),
      text.plain_text,
      { content: text.text.content, link: text.text.link },
      text.annotations,
      text.href
    )
  }
}
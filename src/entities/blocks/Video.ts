import Block from './Block'
import { DateTime } from 'luxon'
import NotionMember from '../NotionMember'
import Text from './Text'
import { HtmlConfig } from '../../interfaces'

export default class Video extends Block {
  constructor (
    id: string | null,
    createdAt: DateTime,
    updatedAt: DateTime,
    createdBy: NotionMember,
    updatedBy: NotionMember,
    public hasChildren: boolean,
    public archived: boolean,
    public video: { captions: Text[], type: string, url: string }
  ) {
    super('video', id, createdAt, updatedAt, createdBy, updatedBy)
  }

  public render (options: HtmlConfig) {
    const url = this.video.url.replace('/watch?v=', '/embed/')
    const caption = this.video.captions.map((caption) => caption.raw).join(' ')

    return `<div class="${options.video?.container}">
      <iframe
        width="560"
        height="315"
        src="${url}"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <p class="${options.video?.caption || ''}">${caption}</p>
    </div>`
  }
}
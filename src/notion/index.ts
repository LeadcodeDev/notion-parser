import { DateTime } from 'luxon'
import NotionPage from '../entities/NotionPage'
import Http from '../entities/Http'
import NotionMember from '../entities/NotionMember'
import { BlockContract } from '../interfaces'
import NotionBloc from '../entities/NotionBloc'

export default class NotionClient {
  constructor (public readonly token: string, public readonly version: string) {
    Http.createInstance(token, version)
  }

  public async getPage(id: string) {
    const { data } = await Http.createRequest().get(`/pages/${id}`)

    return new NotionPage(
      data.id,
      DateTime.fromISO(data.created_time),
      DateTime.fromISO(data.last_edited_time),
      new NotionMember(data.created_by.id),
      new NotionMember(data.last_edited_by.id),
      data.cover,
      data.icon,
      data.archived,
      data.properties,
      data.url
    )
  }

  public async getBlocks (id: string): Promise<BlockContract[]> {
    const { data } = await Http.createRequest().get(`/blocks/${id}/children`)

    const notionBlock = new NotionBloc(id)

    const blocs = await Promise.all(
      data.results.map(async (fragment) => {
        return notionBlock.dispatch(fragment)
      })
    )

    return blocs.filter(block => block)
  }
}
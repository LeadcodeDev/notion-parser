import Axios, { AxiosInstance } from 'axios'

export default class Http {
  private static $instance: Http
  public http!: AxiosInstance

  public static createInstance (token: string, version: string) {
    this.$instance = new Http()
    this.$instance.http = Axios.create({
      baseURL: 'https://api.notion.com/v1',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': version,
      }
    })

    return this.$instance
  }

  public static createRequest () {
    return this.$instance.http
  }
}
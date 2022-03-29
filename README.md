# 🧱 Notion parser
```ts  
(async () => {
  const token = 'secret_api_token'
  const notionClient = new NotionClient(token, '2022-02-22')

  const pageId: string = 'pageId'
  const page = await notionClient.getPage(pageId)
  const blocs = await notionClient.getBlocks(pageId)

  const options: HtmlConfig = {
    separator: '\n\n'
  }

  const html = blocs.reduce((acc: string, block) => acc += block.render(options) , '')

  console.log(html)
})()
```
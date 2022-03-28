# 🧱 Notion parser
```ts
(async () => {
  const token = 'secret_api_token'
  const notionClient = new NotionClient(token, '2022-02-22')

  const pageId: string = 'pageId'
  const page = await notionClient.getPage(pageId)
  const blocs = await page.getContent()

  const html = await page.toHtml(blocs, {
    h1: 'text-6xl',
    h2: 'text-4xl',
    h3: 'text-2xl',
    p: 'my-2',
    blockquote: 'blockquote',
    separator: '\n\n'
  })

  console.log(html)
})()
```
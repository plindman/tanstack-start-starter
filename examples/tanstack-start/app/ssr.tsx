import { createRouter } from './router'
import { StartServer } from '@tanstack/start/server'
import { getWebRequest } from 'vinxi/http'

export default createRouterManifest((manifest) => {
  const router = createRouter()
  const request = getWebRequest()

  return (
    <StartServer
      router={router}
      request={request}
      manifest={manifest}
    />
  )
})

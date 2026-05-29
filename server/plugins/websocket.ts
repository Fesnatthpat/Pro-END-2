import ws from 'ws'

export default defineNitroPlugin((nitroApp) => {
  if (!globalThis.WebSocket) {
    globalThis.WebSocket = ws as any
  }
})

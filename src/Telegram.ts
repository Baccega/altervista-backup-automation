import fetch from 'node-fetch'

const TELEGRAM_DOMAIN = 'https://api.telegram.org/'

const TELEGRAM_API = createTelegramAPI()

function createTelegramAPI() {
  return {
    GET: (endpoint: string, ...args: string[]) => {
      const params = [`chat_id=${process.env.TELEGRAM_USER_ID}`, `parse_mode=HTML`, ...args]
      const rawUrl = `${TELEGRAM_DOMAIN}bot${process.env.TELEGRAM_TOKEN}/${endpoint}?${params.join('&')}`
      return fetch(encodeURI(rawUrl))
    },
  }
}

export async function sendTelegramMessage(message: string): Promise<void> {
  await TELEGRAM_API.GET('sendMessage', `text=${message}`)
}

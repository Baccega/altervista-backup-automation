import * as dotenv from 'dotenv'
import { sendTelegramMessage } from './Telegram'
import { createMessage } from './Message'

dotenv.config()

async function main() {
  const message = createMessage({ completed: true, time: new Date() })

  await sendTelegramMessage(message)

  console.log(message)
  console.log('ALL DONE!')
}

main()

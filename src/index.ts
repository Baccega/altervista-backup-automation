import * as dotenv from 'dotenv'
import { sendTelegramMessage } from './Telegram'
import { createMessage } from './Message'
import { downloadBackup } from './AltervistaCrawler'

dotenv.config()

async function main() {
  const { completed } = await downloadBackup()

  const message = createMessage({ completed, time: new Date() })

  await sendTelegramMessage(message)

  console.log(message)
  console.log('ALL DONE!')
}

main()

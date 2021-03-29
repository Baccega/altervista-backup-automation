import * as dotenv from 'dotenv'
import { sendTelegramMessage } from './Telegram'
import { createMessage } from './Message'
import { downloadBackup } from './AltervistaCrawler'
import moment from 'moment'

dotenv.config()

async function main() {
  const { completed } = await downloadBackup({ filename: `backup-${moment().format('DD-MM-YYYY')}` })

  const message = createMessage({ completed, time: new Date() })

  await sendTelegramMessage(message)

  console.log(message)
  console.log('ALL DONE!')
}

main()

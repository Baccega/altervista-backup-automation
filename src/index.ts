import * as dotenv from 'dotenv'
import { sendTelegramMessage } from './Telegram'
import { createMessage } from './Message'
import { downloadBackup } from './AltervistaCrawler'
import moment from 'moment'

dotenv.config()

async function main() {
  const today = moment()
  const { completed } = await downloadBackup({ filename: `backup-${today.format('DD-MM-YYYY')}` })

  const message = createMessage({ completed, today })

  await sendTelegramMessage(message)

  console.log(message)
  console.log('ALL DONE!')
}

main()

import * as dotenv from 'dotenv'
import { sendTelegramMessage } from './Telegram'
import { createMessage } from './Message'
import { downloadBackup } from './AltervistaCrawler'
import { deleteNewBackup, equalToLastBackup } from './FileManagement'
import moment from 'moment'

dotenv.config()

async function main() {
  const today = moment()
  const newBackupName = `backup-${today.format('YYYY-MM-DD')}`
  const { completed } = await downloadBackup({ filename: newBackupName })

  const message = createMessage({ completed, today })

  const isEqualToLastBackup = await equalToLastBackup()
  const isSendingTelegramMessage = !completed || !isEqualToLastBackup

  if (isEqualToLastBackup) {
    console.log('Deleting duplicated backup')
    await deleteNewBackup(newBackupName)
  }

  if (isSendingTelegramMessage) {
    console.log('Sending Telegram Message:')
    await sendTelegramMessage(message)
  }

  console.log(message)
  console.log('ALL DONE!')
}

main()

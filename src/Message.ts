import { Moment } from 'moment'

const WARNING_ICON = '⚠️'
const BACKUP_ICON = '🗄'
const COMPLETED_ICON = '🟢'
const FAILED_ICON = '🔴'

type CreateMessageProps = {
  completed: boolean
  today: Moment
}

export function createMessage({ completed, today }: CreateMessageProps): string {
  const devWarning = process.env.NODE_ENV === 'development' ? `${WARNING_ICON} DEV  ` : ''
  const formattedToday = today.format('DD MMMM YYYY')

  const statusIcon = completed ? COMPLETED_ICON : FAILED_ICON

  const rows = [`${devWarning}${BACKUP_ICON}${statusIcon} <b>Backup gestionale-bertazzo</b>`, `${formattedToday}`]

  const formattedRows = rows.map((cur) => cur.replace(/\./g, ','))
  return formattedRows.join('\n')
}

import moment from 'moment'

const WARNING_ICON = '⚠️'
const COMPLETED_ICON = '🟢'
const FAILED_ICON = '🔴'

type CreateMessageProps = {
  completed: boolean
  time: Date
}

export function createMessage({ completed, time }: CreateMessageProps): string {
  const devWarning = process.env.NODE_ENV === 'development' ? `${WARNING_ICON} DEV  ` : ''
  const formattedTime = moment(time).format('DD MMMM YYYY')

  const statusIcon = completed ? COMPLETED_ICON : FAILED_ICON

  const rows = [`${devWarning}${statusIcon} <b>Backup gestionale-bertazzo</b>`, `${formattedTime}`]

  const formattedRows = rows.map((cur) => cur.replace(/\./g, ','))
  return formattedRows.join('\n')
}

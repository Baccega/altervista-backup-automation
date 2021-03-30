import fs, { unlink } from 'fs'
import path from 'path'
import crypto from 'crypto'

function fileHash(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5')
    const stream = fs.createReadStream(path, { start: 500 })
    stream.on('error', (err) => reject(err))
    stream.on('data', (chunk) => hash.update(chunk))
    stream.on('end', () => resolve(hash.digest('hex')))
  })
}

export async function equalToLastBackup(): Promise<boolean> {
  const directoryPath = path.join(__dirname, '../backups')

  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, async (err, files) => {
      if (err) {
        reject(err)
      }
      if (files.length < 2) {
        return resolve(false)
      }
      files.reverse()
      const newBackupHash = await fileHash(path.join(directoryPath, files[0]))
      const lastBackupHash = await fileHash(path.join(directoryPath, files[1]))
      resolve(newBackupHash === lastBackupHash)
    })
  })
}
export function deleteNewBackup(newBackupName: string): Promise<void> {
  const filePath = path.join(__dirname, `../backups/${newBackupName}.sql`)
  return new Promise((resolve, reject) => {
    unlink(filePath, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

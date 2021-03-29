import { chromium } from 'playwright'

const ALTERVISTA_LOGIN_PAGE = 'https://aa.altervista.org/'

type DownloadBackupProps = {
  filename: string
}
type DownloadBackup = {
  completed: boolean
}

export async function downloadBackup({ filename }: DownloadBackupProps): Promise<DownloadBackup> {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 100 })
    const page = await browser.newPage({ acceptDownloads: true })
    await page.goto(ALTERVISTA_LOGIN_PAGE, { waitUntil: 'load' })
    await page.fill('[name=username]', process.env?.ALTERVISTA_USERNAME || '')
    await page.fill('[name=password]', process.env?.ALTERVISTA_PASSWORD || '')
    await page.click('[type=submit]')

    await Promise.all([page.waitForSelector('text="Accedi a PhpMyAdmin"'), page.waitForTimeout(1000)])
    const link = (await page.$('text="Accedi a PhpMyAdmin"').then((c) => c?.getAttribute('href'))) || ''
    await page.goto(link, { waitUntil: 'load' })

    // await page.waitForTimeout(2000)

    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('.first'),
    ])
    // await page.waitForTimeout(2000)
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('text="Esporta"'),
    ])
    await Promise.all([page.waitForSelector('text="Esegui"'), page.waitForTimeout(1000)])
    const [download] = await Promise.all([page.waitForEvent('download'), page.click('text="Esegui"')])
    await download.saveAs(`./backups/${filename}.sql`)

    await browser.close()
    return { completed: true }
  } catch (e: unknown) {
    console.error(e)
    return { completed: false }
  }
}

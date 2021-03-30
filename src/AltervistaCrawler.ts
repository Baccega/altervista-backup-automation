import { chromium, Page } from 'playwright'

const ALTERVISTA_LOGIN_PAGE = 'https://aa.altervista.org/'
// Found using console.log(await page.evaluate(() => navigator.userAgent))
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.0 Safari/537.36'
const EXTRA_HTTP_HEADERS = { 'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8' }

type DownloadBackupProps = {
  filename: string
}
type DownloadBackup = {
  completed: boolean
}

async function devScreenshot(page: Page, screenshotName: string): Promise<void | unknown> {
  return process.env.NODE_ENV === 'development'
    ? page.screenshot({
        path: `./screenshots/${screenshotName}.png`,
      })
    : Promise.resolve()
}

export async function downloadBackup({ filename }: DownloadBackupProps): Promise<DownloadBackup> {
  try {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({
      acceptDownloads: true,
      userAgent: USER_AGENT,
      extraHTTPHeaders: EXTRA_HTTP_HEADERS,
    })

    await page.goto(ALTERVISTA_LOGIN_PAGE, { waitUntil: 'load' })
    await page.fill('[name=username]', process.env?.ALTERVISTA_USERNAME || '')
    await page.fill('[name=password]', process.env?.ALTERVISTA_PASSWORD || '')
    await devScreenshot(page, 'login')
    await page.click('[type=submit]')

    await Promise.all([page.waitForSelector('text="Accedi a PhpMyAdmin"'), page.waitForTimeout(1000)])
    await devScreenshot(page, 'dashboard')

    const link = (await page.$('text="Accedi a PhpMyAdmin"').then((c) => c?.getAttribute('href'))) || ''
    await page.goto(link, { waitUntil: 'load' })
    await devScreenshot(page, 'phpMyAdmin')

    await page.click('.first')
    await Promise.all([page.waitForSelector('text="articoli"'), page.waitForTimeout(1000)])
    await devScreenshot(page, 'selected-database')

    await page.click('text="Export"')
    await Promise.all([page.waitForSelector('text="Go"'), page.waitForTimeout(1000)])
    await devScreenshot(page, 'export-page')

    const [download] = await Promise.all([page.waitForEvent('download'), page.click('text="Go"')])
    await download.saveAs(`./backups/${filename}.sql`)

    await browser.close()
    return { completed: true }
  } catch (e: unknown) {
    console.error(e)
    return { completed: false }
  }
}

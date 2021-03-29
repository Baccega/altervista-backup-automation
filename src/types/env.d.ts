declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      TELEGRAM_TOKEN: string
      TELEGRAM_USER_ID: string
      ALTERVISTA_WEBSITE: string
      ALTERVISTA_PASSWORD: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}

# altervista-backup-automations

A script that download a backup of your's Altervista MySQL database and sends you a telegram message as a notification (using a Bot).

## Usage

After cloning you need to create a `.env` file with the following data:

```
NODE_ENV=production                           # Or 'development'

ALTERVISTA_USERNAME=YOUR_ALTERVISTA_USERNAME    # Usually XXXX.altervista.org
ALTERVISTA_PASSWORD=YOUR_ALTERVISTA_PASSWORD 

TELEGRAM_TOKEN=YOUR_TELEGRAM_BOT_TOKEN        # Generated with a new bot
TELEGRAM_USER_ID=YOUR_TELEGRAM_USER_ID        # Fetch that using the `/getUpdates` telegram endpoint
```
Then you just:

```bash
yarn 
yarn start
```
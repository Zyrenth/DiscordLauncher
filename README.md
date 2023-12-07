# DiscordLauncher
Ever wanted to go back to the old versions of Discord? Not a problem, go back as early as 2019 using this program.

# How to use it?
1. Clone this repo using:
```bash
git clone https://github.com/Zyrenth/DiscordLauncher.git && cd DiscordLauncher
```

2. Install the deps. and build the project.
```bash
npm i && npm run build
```

3. Run the project.
```bash
npm run start
```

4. Open the version selector using the following url (if you're on the same machine): `http://localhost:3455`.

# Tips
From what I've seen the clients work a lot better if they're being accessed using HTTPS, I won't show how can you do that in this small docs but you can search it up on google.

The clients that require HTTPS won't work without HTTPS (obviously), from what I've experienced the clients after the rspack change require to be run on HTTPS.

# Configuration
This is an example configuration that you can modify in `config.json`.
```json
{
    "secret": "secret text", // Required for express-session
    "port": 3455 // Launcher port
}
```

# Issues with switching back to older clients / Old clients crashing on startup or server switch
Since older clients work differently when you switch to an older client it might crash, to fix this clear the cookies and site data for this project.

# Default presets
This project contains 5 (+1) presets by default:
- November, 2019
- November, 2020
- November, 2021
- November, 2022
- November, 2023
- (+1) Web testing (debug)
These presets have been tested and they work currently (12/7/2023).

# Adding more presets (versions)
1. Go to `web.archive.org` and type in `https://discordapp.com/login` (if the client you want to add is older than 2020 May) and `https://discord.com/login` if it's newer.

2. Select a date and click on it, now we're going to modify that url:
  - From this `https://web.archive.org/web/20190701103558/https://discordapp.com/app`
  - To this `https://web.archive.org/web/20190701103558im_/https://discordapp.com/app`
  - In short, we add `im_` after those numbers, now that we've modified the url press enter.

3. Open the Developer tools by pressing <kbd>F12</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>.

4. Right-click on the `<html>` tag on the top and click `Edit as HTML` (the text might differ in different browsers), select everything and copy it.

5. Now go back to the project files and find the `presets` folder, go ahead and create a new folder inside, you can name it anything (but try not to use special characters just to be safe).

6. Inside that folder create an `index.html` file and paste the code you've just copied from `web.archive.org`.

7. Search for "`integrity`" and "`nonce`" attributes, if you find any remove them because the browser might not load them otherwise.

8. Search for the "`window.GLOBAL_ENV`" object and remove `https://discord.com` or `//discord.com` from them, here is an example of how you should do it:
(As you can see I trimmed some of the values so it doesn't confuse you but these aren't sensitive data and the client needs these and these keys and hashes aren't liked to your account, ip, hardware, etc. these are keys linked to Discord)
<table>
<tr>
<td>

```js
window.GLOBAL_ENV = {
    API_ENDPOINT: '//discord.com/api',
    API_VERSION: 9,
    GATEWAY_ENDPOINT: 'wss://gateway.discord.gg',
    WEBAPP_ENDPOINT: '//discord.com',
    CDN_HOST: 'cdn.discordapp.com',
    ASSET_ENDPOINT: '//discord.com',
    MEDIA_PROXY_ENDPOINT: '//media.discordapp.net',
    WIDGET_ENDPOINT: '//discord.com/widget',
    INVITE_HOST: 'discord.gg',
    GUILD_TEMPLATE_HOST: 'discord.new',
    GIFT_CODE_HOST: 'discord.gift',
    RELEASE_CHANNEL: 'stable',
    DEVELOPERS_ENDPOINT: '//discord.com',
    MARKETING_ENDPOINT: '//discord.com',
    BRAINTREE_KEY: '...', // Trimmed, you shouldn't modify this
    STRIPE_KEY: '...', // Trimmed, you shouldn't modify this
    ADYEN_KEY: '...', // Trimmed, you shouldn't modify this
    NETWORKING_ENDPOINT: '//router.discordapp.net',
    RTC_LATENCY_ENDPOINT: '//latency.discord.media/rtc',
    ACTIVITY_APPLICATION_HOST: 'discordsays.com',
    PROJECT_ENV: 'production',
    REMOTE_AUTH_ENDPOINT: '//remote-auth-gateway.discord.gg',
    SENTRY_TAGS: {"buildId":"...","buildType":"normal"}, // Trimmed, you shouldn't modify this
    MIGRATION_SOURCE_ORIGIN: 'https://discordapp.com',
    MIGRATION_DESTINATION_ORIGIN: 'https://discord.com',
    HTML_TIMESTAMP: Date.now(),
    ALGOLIA_KEY: '...', // Trimmed, you shouldn't modify this
    PUBLIC_PATH: '/assets/'
};
```

</td>
<td>

```js
window.GLOBAL_ENV = {
    API_ENDPOINT: '/api', // Modified
    API_VERSION: 9,
    GATEWAY_ENDPOINT: 'wss://gateway.discord.gg',
    WEBAPP_ENDPOINT: '', // Modified
    CDN_HOST: 'cdn.discordapp.com',
    ASSET_ENDPOINT: '', // Modified
    MEDIA_PROXY_ENDPOINT: '//media.discordapp.net',
    WIDGET_ENDPOINT: '/widget', // Modified
    INVITE_HOST: 'discord.gg',
    GUILD_TEMPLATE_HOST: 'discord.new',
    GIFT_CODE_HOST: 'discord.gift',
    RELEASE_CHANNEL: 'stable',
    DEVELOPERS_ENDPOINT: '', // Modified
    MARKETING_ENDPOINT: '', // Modified
    BRAINTREE_KEY: '...', // Trimmed, you shouldn't modify this
    STRIPE_KEY: '...', // Trimmed, you shouldn't modify this
    ADYEN_KEY: '...', // Trimmed, you shouldn't modify this
    NETWORKING_ENDPOINT: '//router.discordapp.net',
    RTC_LATENCY_ENDPOINT: '//latency.discord.media/rtc',
    ACTIVITY_APPLICATION_HOST: 'discordsays.com',
    PROJECT_ENV: 'production',
    REMOTE_AUTH_ENDPOINT: '//remote-auth-gateway.discord.gg',
    SENTRY_TAGS: {"buildId":"...","buildType":"normal"}, // Trimmed, you shouldn't modify this
    MIGRATION_SOURCE_ORIGIN: '', // Modified
    MIGRATION_DESTINATION_ORIGIN: '', // Modified
    HTML_TIMESTAMP: Date.now(),
    ALGOLIA_KEY: '...', // Trimmed, you shouldn't modify this
    PUBLIC_PATH: '/assets/'
};
```

</td>
</tr>
</table>

9. After that, save the file and in that same folder, create a file called `metadata.json`.

10. Paste this template to your metadata file and modify
  - the `name` value, this will be the nam/title for this preset in the version selector.
  - the `id` value, this must be a unique number.
  - supported `flags`:
    - 1 - requires https
    - 2 - for testing
    - 3 - broken
```json
{
    "name": "Example name",
    "id": 6
}
```

11. Restart (not rebuild) the project to refresh the metadata or the preset list.

12. Congrats you've added a new preset.

# Warnings
Exposing this to the public isn't the best idea since this works by proxying the requests to Discord, this means if someone who's using this gets banned the IP ban might be applied to your IP and not to theirs.

# Designs
- `Web testing (debug)` preset and `Version/preset selector`: [@Zyrenth](https://github.com/Zyrenth) and [@ZyrenthDev](https://github.com/ZyrenthDev)
  - Zyrenth's Design System's license can be found in the `ZDev_Design_License.md` file.
- `Discord` ("client"): [discord.com](https://discord.com)

# Future updates
I'm not sure if I will update this again as this is a side project.
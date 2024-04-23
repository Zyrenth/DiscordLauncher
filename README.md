> [!IMPORTANT]  
> This version of the project is no longer actively maintained. I have plans for a V2 version in the future but I don't have an ETA for that yet.

> [!IMPORTANT]  
> This project is entirely for educational purposes only! Data that can be found in the "presets" folder is strictly owned by Discord.

# DiscordLauncher
Ever wanted to go back to the old versions of Discord? Not a problem, go back as early as 2019 using this program.

<a href="https://github.com/Zyrenth"><img src="https://raw.githubusercontent.com/Zyrenth/Zyrenth/main/GitHub%20Projects%20Profile%20Link.png" /></a>

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

4. Open the version selector using the following URL (if you're on the same machine): `http://localhost:3455`.

> [!TIP]  
> Most clients work a lot better if they're being accessed via HTTPS. You can search it up on Google on how you can "enable" HTTPS access on `Express.js`.
>
> Some clients are marked and requires to be accessed via HTTPS, if you're importing a newer client you'll most likely need to access it via HTTPS.

# Configuration
This is an example configuration, you can edit this in `config.json`.

`secret` - A secret value for `express-session`, you can set this to anything you want, like any gibberish text.

`port` - The port where Discord Launcher will listen on, this is the "number part" on the URL. (`http://localhost:[port]`)
```json
{
    "secret": "secret text",
    "port": 3455
}
```

# Known Issues

- Captchas aren't working, why is this?
  - Since hCaptcha is configured to operate on `discord.com` it will refuse to work outside of that domain, a workaround is to do those things on `discord.com` and then return to Discord Launcher.
  - On older versions that use reCaptcha, the reason they don't work is just because they're old, I'm not sure if Discord still accepts reCaptcha on their older APIs but I can imagine that even if they allow it, it still wouldn't work for the same reason as hCaptcha. The workaround is the same as for hCaptcha.
- I can't log in, register, join a server, etc., why is this?
  - Because that endpoint requires a captcha which doesn't work here. (mentioned above why)
- Older clients crash after using a newer one, why is that?
  - This is because the newer clients use locally saved settings/values that aren't compatible with the older clients, clear your cache and storage for Discord Launcher and try again. (You'll need to log in again so copy your token before.)
- I shared my Discord Launcher instance with my friend who then got banned from a server while using Discord Launcher, now I can't join that server too because it says I'm banned, why is that?
  - This is because Discord Launcher uses a locally running proxy that runs on your machine essentially making your friend browse Discord on your IP. Discord Bans are IP bans so since he got banned through that proxy, the ban is effective for your IP. The solution for this is not to share your Discord Launcher instance with others and if your friend already got banned from a server, the only solution is to change your IP.

# Default presets
By default I provided 5 (+1) presets that you can use out of the box:
- November, 2019
- November, 2020
- November, 2021
- November, 2022
- November, 2023
- (+1) Web testing (debug)

These presets have been tested and they work currently (12/7/2023).

# Adding more presets (versions)
1. Go to `web.archive.org` and type in `https://discord.com/login` (or if the client you want to add is older than May 2020 then type in `https://discordapp.com/login`).

2. Select a date and click on it, now we're going to modify that URL:
  - From this `https://web.archive.org/web/20190701103558/https://discordapp.com/app`.
  - To this `https://web.archive.org/web/20190701103558im_/https://discordapp.com/app`.
  - In short, we add `im_` after those numbers, now that we've modified the URL press enter.

3. Open the Developer tools by pressing <kbd>F12</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>.

4. Right-click on the `<html>` tag on the top and click `Edit as HTML` (the text might be different in other browsers), select everything, and copy it.

5. Now go back to the project files and find the `presets` folder, go ahead and create a new folder inside, you can name it anything (but try not to use special characters just to be safe).

6. Inside that folder create an `index.html` file and paste the code you've just copied from `web.archive.org`.

7. Search for "`integrity`" and "`nonce`" attributes, if you find any remove them because the browser might not load them otherwise.

8. Search for the "`window.GLOBAL_ENV`" object and remove `https://discord.com` or `//discord.com` from them, here is an example of how you should do it:
(Some of the values are trimmed here for better readability, the trimmed values aren't sensitive at all and they're required for Discord to work.)
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
  - the `name` value, this will be the naem/title for this preset in the version selector.
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

# Designs
- `Web testing (debug)` preset and `Version/preset selector`: [@Zyrenth](https://github.com/Zyrenth) and [@ZyrenthDevelopment](https://github.com/ZyrenthDevelopment)
  - Zyrenth's Design System's license can be found in the `ZDev_Design_License.md` file.
- `Discord` ("client"): [discord.com](https://discord.com)

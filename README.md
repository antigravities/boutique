# Boutique
Fast, beautiful, and flexible sites that showcase your [Steam curations](https://store.steampowered.com/about/curators/) with minimal configuration.

The project is in a work-in-progress state, but is mostly functional. I am looking to implement server-side rendering, share buttons, and better ad placement/refresh in the future.

## Set up
All you'll need to start is your curator ID (it's a string of numbers found in your curator's URL) and [Node.js](https://nodejs.com/). Once you have that set up, download this repository, copy config.json.example to config.json and replace `INSERT CURATOR ID HERE` with your curator's ID. Finish setup by opening a command prompt/terminal:

```
cd C:\[location you downloaded Boutique to]\boutique
npm install
```

## Generate
To regenerate and deploy, run `npm run deploy`. The final files can be found in `build`.

Note that when you have new curations to add to your site, you'll need to regenerate and re-deploy your site. Consider running the script as a cron job or scheduled task. If you have more than 500 linked reviews, initial generation may fail due to Steam rate limiting - wait an hour between attempts and try again.

## (Pre)view locally
`index.html` cannot be directly opened in a browser. You'll need to host the file from local Web server:

```
npm i -g serve
serve -s build
```

## Deploy
To show your newly-generated site to the world, you'll need to host it on some sort of Web server. We have built-in quick deployment options, or you can set up manually.

### [Amazon S3](https://s3.amazonaws.com)
You'll want to set up a static Web site first using [this guide](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html). Once you've set up a bucket and any other relevant settings, edit your config.json to match the following:

```json
{
    "curator": "INSERT CURATOR ID HERE",
    "deploy": "aws:YOURBUCKETNAME:ACCESSKEYID:SECRETACCESSKEY"
}
```

Then, run `npm run deploy` to generate the site and deploy to S3.

### [GitHub Pages](https://pages.github.com/)
**If you are on Windows:** first install `windows-build-tools` using `npm i -g windows-build-tools`. Then, run `npm install` again.

You'll need a [Personal Access Token](https://github.com/settings/tokens) (PAT) and repository with a root commit (i.e. has been committed to before) to deploy. Make sure that the repository is set up to build GitHub Pages from the master branch.

Edit your config.json to match the following:

```json
{
    "curator": "INSERT CURATOR ID HERE",
    "deploy": "github:USERNAME/REPO:PAT"
}
```

Then, run `npm run deploy` to generate the site and deploy to GitHub.

### Upload manually
Upload all of the files in the "build" directory to your Web host.

## Extras (optional)
Enhance your site with these extra, but optional, features.

### [Disqus](https://disqus.com/)
To set up Disqus, register on their Web site and get your Disqus subdomain. Edit your config.json to match the following:

```json
{
    "curator": "INSERT CURATOR ID HERE",
    "disqus": "YOUR-DISQUS-SUBDOMAIN"
}
```

Then, run `npm run deploy` to generate the site and deploy your changes.

**NB:** If you are using Disqus' free feature, you may not turn off their ads if you are also using Google AdSense.

### [Google Analytics](https://analytics.google.com/)
To set up Google Analytics, register on their Web site and obtain a tracking ID. Edit your config.json to match the following:

```json
{
    "curator": "INSERT CURATOR ID HERE",
    "google_analytics": "UA_XXXXXXXX"
}
```

Then, run `npm run deploy` to generate the site and deploy your changes.

### [Google AdSense](https://adsense.google.com/)
Currently, one horizontal 728x90px ad is shown at the top of each page. Future Boutique updates may introduce other ad locations.

To set up Google AdSense, register on their Web site and obtain an advertising ID. Edit your config.json to match the following:

```json
{
    "curator": "INSERT CURATOR ID HERE",
    "adsense": "ADVERTISING-ID"
}
```

Then, run `npm run deploy` to generate the site and deploy your changes.

**NB**: You may need to create a file in your document root called `ads.txt` in order to bypass the automated verification. Also, if you are using Disqus' free feature, you may not turn off their ads if you are also using Google AdSense.

## Hacking
Boutique is a [React](https://github.com/facebook/react) app built on top of [create-react-app](https://github.com/facebook/create-react-app). A local Web server with hot reloading can be started with `npm start`.

## License
```
Boutique
Copyright (C) 2019 Alexandra Frock/Cutie Café.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
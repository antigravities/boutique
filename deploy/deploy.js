const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const mkdirp = require("mkdirp");

const config = JSON.parse(fs.readFileSync("config.json"));

const consts = {
  "Not Recommended": -1,
  "Informational": 0,
  "Recommended": 1
};

(async () => {
  let meta = {};

  try {
    await mkdirp("generated/review");
    await mkdirp("generated/list");

    console.log("Fetching metadata...");

    let $ = cheerio.load(await request("https://store.steampowered.com/curator/" + config.curator));
    
    meta.id = config.curator;
    meta.name = $(".curator_name").text().trim();
    meta.avatar = $("#curator_avatar_image > a > img").attr("src");
    
    meta.socialmedia = {};

    $(".socialmedia_accounts > span > a").each((_, item) => {
      if( /^https\:\/\/www\.facebook\.com\/.*/.test($(item).attr("data-tooltip-text")) ){
        meta.socialmedia.facebook = $(item).attr("data-tooltip-text");
      } else if( /^https\:\/\/www\.twitch\.tv\/.*/.test($(item).attr("data-tooltip-text")) ){
        meta.socialmedia.twitch = $(item).attr("data-tooltip-text");
      } else if( /^https\:\/\/twitter\.com\/.*/.test($(item).attr("data-tooltip-text")) ){
        meta.socialmedia.twitter = $(item).attr("data-tooltip-text");
      } else if( /^https\:\/\/www\.youtube\.com\/.*/.test($(item).attr("data-tooltip-text")) ){
        meta.socialmedia.youtube = $(item).attr("data-tooltip-text");
      }
    });

    meta.lists = [];

    $ = cheerio.load(await request("https://store.steampowered.com/curator/" + config.curator + "/lists/"));

    $(".page_section.featured_list").each((_, t) => {
      meta.lists.push($(t).find(".section_title_ctn > .section_title_ctn > a").attr("href").split("/")[6]);
    });

    $(".lists_more_container > .item").each((_, t) => {
      if( meta.lists.indexOf($(t).attr("href").split("/")[6]) < 0 ) meta.lists.push($(t).attr("href").split("/")[6]);
    });

    $ = cheerio.load(await request("https://store.steampowered.com/curator/" + config.curator + "/about/"));

    meta.description = $(".tagline").text().trim().replace("“", "").replace("”", "");

    meta.gtag = config.google_analytics || "";
    meta.disqus = config.disqus || "";
    meta.adsense = config.adsense || "";

    meta.titleFont = config["title-font"] || "";

    fs.writeFileSync("generated/meta.json", JSON.stringify(meta));
  } catch(e){
    console.log("Could not contact the Steam Community");
    console.log(e);
    process.exit(1);
  }

  let html;

  console.log("Fetching curations...");

  try {
    let json = JSON.parse(await request("https://store.steampowered.com/curator/" + config.curator + "/ajaxgetfilteredrecommendations/render/?query=&start=0&count=5000&tagids=&sort=recent&app_types=&curations=&reset=false"));
    if( ! json.success ) throw "";

    html = json.results_html;
  } catch(e){
    console.log("Could not contact the Steam Community");
    console.log(e);
    process.exit(1);
  }

  console.log("Fetching app titles...");
  let apptitles = {};
  JSON.parse(await request("http://api.steampowered.com/ISteamApps/GetAppList/v2")).applist.apps.forEach(i => apptitles[i.appid] = i.name);

  let $ = cheerio.load(html);
  let apps = [];

  console.log("Parsing recommendations...");
  let recommendations = $(".recommendation");
  for( let i=0; i<recommendations.length; i++ ){
    item = recommendations[i];

    let app = {};
    app.id = $(item).find("div > a[data-ds-appid]").attr("data-ds-appid");
    if( ! fs.existsSync("generated/review/" + app.id + ".json")){
      app.recommended = consts[$(item).find("span[class^='color_']").text().trim()];
      app.title = apptitles[app.id] || "Unknown";
      
      // tack the current year on when Steam doesn't give a year
      let rdate = $(item).find(".curator_review_date").text();
      if( rdate.indexOf('201') < 0 && rdate.indexOf('202') < 0 ){
        rdate += ", " + new Date().getFullYear();
      }
      app.reviewdate = new Date(rdate);

      app.short = $(item).find(".recommendation_desc").text().trim();
    
      if( $(item).find(".recommendation_readmore > a").length > 0 ){
        app.readmore = $(item).find(".recommendation_readmore > a").last().attr("href");

        if( /^https?:\/\/steamcommunity\.com\/id\/[A-Za-z0-9-]{0,32}\/recommended\/\d{1,9}\/?/.test(app.readmore) ){
          let $ = cheerio.load(await request(app.readmore));
          app.long = $("#ReviewText").html();
          app.author = "<a href=\"" + $(".profile_small_header_name > a").attr("href") + "\">" + $(".profile_small_header_name > a").html().trim() + "</a>";
        } else if(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/.test(app.readmore)){  // https://stackoverflow.com/a/3726073/11910041
          app.long = "<iframe width='560' height='315' src='https://www.youtube.com/embed/" + /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/.exec(app.readmore)[1] + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
        } else {
          app.long = "<a href='" + app.readmore + "'>Read the full review</a>";
        }
      }
    
      apps.push(app);
    } else {
      console.log("[Skipping read-more analysis for cached app " + app.id + " - delete generated/review/" + app.id + ".json to perform analysis again]");
      apps.push(JSON.parse(fs.readFileSync("generated/review/" + app.id + ".json")));
    }
  };

  let sorted = apps.sort((a, b) => {
    if( a.reviewdate < b.reviewdate ) return -1;
    else if( a.reviewdate > b.reviewdate ) return 1;
    else return 0;
  });

  if( ! fs.existsSync("generated") ){
    fs.mkdirSync("generated");
    fs.mkdirSync("generated/review/");
    fs.mkdirSync("generated/list/");
  }

  for( let i=0; i<sorted.length; i++ ){
    if( sorted[i].image ) continue;

    console.log("Fetching screenshots for " + sorted[i].id);

    try {
      let $ = cheerio.load(await request("https://store.steampowered.com/app/" + sorted[i].id + "/"));

      sorted[i].image = [];
      $(".highlight_screenshot_link").each((_,j) => sorted[i].image.push($(j).attr("href")));
    } catch(e){
      console.log(e);
    }
  }

  console.log("Generating content...");

  fs.writeFileSync("generated/recent.json", JSON.stringify(sorted.reverse().slice(0,20)));

  fs.writeFileSync("generated/all.json", JSON.stringify(sorted));

  let oApps = {};

  apps.forEach(i => {
    fs.writeFileSync("generated/review/" + i.id + ".json", JSON.stringify(i));
    oApps[i.id] = i;
  });

  for( let i=0; i<meta.lists.length; i++ ){
    let $ = cheerio.load(await request("https://store.steampowered.com/curator/" + config.curator + "/list/" + meta.lists[i]));

    let list = {};
    list.title = $(".page_content > h1").first().text();
    list.description = $(".page_content > h3").first().text();
    list.apps = [];

    $(".curator_list > .item_ctn").each((_, i) => {
      list.apps.push(oApps[$(i).find(".capsule > a").attr("data-ds-appid")]);
    });

    fs.writeFileSync("generated/list/" + meta.lists[i] + ".json", JSON.stringify(list));
  }

  console.log("Generation complete.");

  //await require("./build-content")(meta);
  //await require("./deploy-content")(config);
})();
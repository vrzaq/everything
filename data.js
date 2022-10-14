import axios from "axios";
import fetch from "node-fetch";
import formData from "form-data";
import FormData from "form-data";
import * as fileType from "file-type";
import cheerio from "cheerio";
import cp from "child_process"
import vm from "node:vm";
import fs from "node:fs";
import JsO from "javascript-obfuscator";
import acrcloud from "acrcloud";
import gTTS from "gtts";
import puppeteer from "puppeteer";
import Jimp from "jimp"
import jimp from "jimp";
import fakeUa from "fake-useragent";
import TinyColor from "tinycolor2";
import module from "module"
var require = module.createRequire(import.meta.url)
let acropts = {
    host: "identify-eu-west-1.acrcloud.com",
    access_key: "cc0155322ccff43d32eb56e9ffe873da",
    access_secret: "CWny9hlFzguEZZ1EeYwt9H411SGqiZ5fPeUB69BK"
};
export const getCookie = async (...args) => (await axios(...args)).headers["set-cookie"];
export const anonfiles = new anonFiles();
 function anonFiles() {
    this.default = anonDef
    this.upload = anonUpload
    this.download = anonDownload
}
async function pomf2C(file) {
  if(!Array.isArray(file)) file = [file]
  file = file.filter(v => v instanceof fs.ReadStream)
  if(!file[0]) return false
  const form = new FormData()
  file.forEach(function(v) {
    form.append("files[]", v)
  })
  const { data } = await axios({
    url: "https://pomf2.lain.la/upload.php",
    method: "POST",
    data: form,
    headers: form.getHeaders()
  }).catch(({ response }) => response)
return data
}
export async function pomf2(file) {
var ftepe = await fileType.fileTypeFromBuffer(file)
var dta = await simpan(data.scrap.getRandom(ftepe.ext), file)
return await pomf2C([
  fs.createReadStream(dta)])
}
export async function telegra(buffer) {
  var promDt = require ("form-data")
var ftp = await fileType.fileTypeFromBuffer(buffer)
let file = Buffer.isBuffer(buffer) ? simpan(getRandom(ftp.ext), buffer) : buffer
let form = new promDt
form.append("file", fs.createReadStream(file), "kontol.jpg")
let res = await (await fetch("https://telegra.ph/upload", {
  method: "POST",
  body: form
})).json()
return "https://telegra.ph"+res[0].src
}
async function anonDef(buff) {
  let data = await anonUpload(buff)
  let res = await anonDownload(data.url.short)
  return res
}
class TinyURL {
  constructor(apikey) {
    if(!apikey) throw new Error("apikey required!")
    this.apikey = apikey
  }
  short = async function(url, alias = null) {
    if(!url) throw new Error("URL required!")
    if(alias && alias.length < 5) throw new Error("Minimum alias length is 5 letters")
    if(alias && alias.length > 30) throw new Error("Maximum alias length is 30 letters")

    let res
    let err
    try {
      res = (await axios.post("https://api.tinyurl.com/create?api_token=" + this.apikey, { url, alias })).data.data
      res = {
        alias: res.alias,
        tiny_url: res.tiny_url,
        url: res.url,
        expires_at: res.expires_at
      }
    } catch(e) {
      err = e.response.data || e
    }
    if(err) throw err
    return res
  }
}
function baca(path) {
     return fs.readFileSync(path)
}
export let tinyurl = new TinyURL("e7hvDW6vQBw7tsdRqtDNsujeDshU00EcEOYuHa1CBDKZrxA1mqL4JflEN92d")
async function anonUpload(buff, opt = {}) {
    let form = new formData()
    let {
        ext
    } = await fileType.fileTypeFromBuffer(buff)
    form.append("file", buff, "ivanz" + ext)
    try {
        let xontol = await axios({
            url: "https://api.letsupload.cc/upload",
            method: "post",
            data: form,
            headers: form.getHeaders()
        })
        return xontol.data.data.file
    } catch (e) {
        return e.response
    }
}
export function simpan(path, buff) {
    fs.writeFileSync(path, buff)
    return path
}
export function getRandom(ext) {
    ext = ext || ""
    return `${Math.floor(Math.random() * 100000)}.${ext}`
}
async function anonDownload(url) {
    let $ = cheerio.load(await (await axios(url)).data)
    let res = $("#download-url").attr("href")
    return res
}
export function randomBytes(size) {
  return require("crypto").randomBytes(size).toString("hex").substr(0, size)
}
export async function cuaca(daerah) {
  const browser = await puppeteer.connect({ browserWSEndpoint: process.env.PUP_HOST })
  const page = await browser.newPage()
  await page.setViewport({ width: 710, height: 580, deviceScaleFactor: 4})
  await page.goto("https://www.google.co.id/search?q=cuaca+"+encodeURIComponent(daerah)+"&hl=id")
  const capturepage = await page.screenshot()
  await page.close()
  let cuacua = await Jimp.read(capturepage)
  await cuacua.crop(0, 655, 2840, 1662)
  let reh = await cuacua.getBufferAsync(Jimp.MIME_JPEG)
function toCelsius(f) {
  if(f.endsWith("°F")) return "" + Math.ceil(((f.replace(/[^0-9]/g, "")*1) - 32) * 5/9) + "°C"
  else return f
}
let { data } = await axios("https://www.google.co.id/search?q=cuaca%20" + daerah + "&hl=id")
let $ = cheerio.load(data)
let kvKEAb = $("div.kCrYT > div.lnWbdd > div.kvKEAb")
let suhu = toCelsius(kvKEAb.find("div > div > div.BNeawe.iBp4i.AP7Wnd > div > div.BNeawe.iBp4i.AP7Wnd").text().replace("�", "°"))
let waktu = kvKEAb.find("div.BNeawe.tAd8D.AP7Wnd > div > div.BNeawe.tAd8D.AP7Wnd").text().split("\n")[0]
let cuaca = kvKEAb.find("div.BNeawe.tAd8D.AP7Wnd > div > div.BNeawe.tAd8D.AP7Wnd").text().split("\n")[1]
  return { img: reh, suhu, waktu, cuaca, daerah }
}
export async function ttstalk(usrn) {
let puppeteer = require("puppeteer")
let browser = await puppeteer.connect({ browserWSEndpoint: "ws://puppeteer-ws.herokuapp.com/?token=free" })
let page = await browser.newPage()
await page.goto("https://www.tiktok.com/@"+usrn)
let json = await page.evaluate(() => {
  return JSON.parse(document.getElementById("SIGI_STATE").innerHTML).UserModule
})
let result = {}
result.username = json.users[usrn].uniqueId
result.nickname = json.users[usrn].nickname
result.avatar = json.users[usrn].avatarLarger
result.biodata = json.users[usrn].signature
result.followers = json["stats"][usrn].followerCount 
result.following = json["stats"][usrn].followingCount
result.like = json["stats"][usrn].heartCount
result.vidCount = json["stats"][usrn].videoCount
result.isPrivate = json.users[usrn].privateAccount
result.isVerified = json.users[usrn].verified
return result
}
function Stalker() {
  this.ig = igstalk 
  this.tiktok = ttstalk
}
export async function lyric(search) {
  search = search.trim()
  let { data } = await axios("https://www.google.com/search?q=lirik%20" + encodeURIComponent(search) + "&hl=id")
  let $ = cheerio.load(data)
  let result = { creator: null, title: null, lyrics: null }
  result.creator = $($("span.BNeawe.s3v9rd.AP7Wnd").get(-1)).text()
  result.title = $($("span.BNeawe.tAd8D.AP7Wnd").get(-1)).text()
  result.lyrics = $($("div.BNeawe.tAd8D.AP7Wnd").get(3)).text()
  if(!result.lyrics) return { status: 404, message: "Lyrics not found!" }
  return result
}
function YouTube() {
  this.search = yts
  this.dl =async function ytdl(url) {
var { data } = (await axios.post("https://ytpp3.com/newp", new URLSearchParams({ u: url, c: "ID" }))).data
let result = {
  title: data.title,
  duration: data.duration,
  audio: data.mp3.length === 0 ? data.mp3_cdn : "https://ytpp3.com" + data.mp3,
  video: data.mp4.length === 0 ? data.mp4_cdn : "https://ytpp3.com" + data.mp4
}
return result
}
 this.dlv2 = async function dlv2(url) {
var testUrl = /(?:http(?:s|):\/\/|)(?:(?:www\.|)?youtube(?:\-nocookie|)\.com\/(?:shorts\/)?(?:watch\?.*(?:|\&)v=|embed\/|v\/)?|youtu\.be\/)([-_0-9A-Za-z]{11})/.exec(url)[1]
var { data } = await axios("https://api.btclod.com/v1/youtube/extract-infos/?detail="+testUrl)
var aud = "https://dl1.btclod.com/v1/youtube/download/?file_id="+data.data.audios[0].id
var vid = "https://dl1.btclod.com/v1/youtube/download/?file_id="+data.data.videos[0].id
var result = { metadata: data.data.detail, audio: aud, video: vid }
return result
}
}
async function ytd(udl) {
  return await (await savefrom (url)).url[0].url
}
export async function rmbg(buffer) {
let form = new formData
let sep = simpan(getRandom("webp"), buffer)
form.append("size", "auto")
form.append("image_file", fs.createReadStream(sep), "ntah.webp")
let res = await axios({
  url: "https://api.remove.bg/v1.0/removebg",
  method: "POST",
  data: form,
  responseType: "arraybuffer",
  headers: {
    "X-Api-Key": "24yjkNG4jrXeh1WcMdMJMWD2",
    ...form.getHeaders()
  }
})
return res.data
}
export async function yts(q, count = 10) {
  let res = await axios("https://www.youtube.com/results?search_query="+q)
  let data = JSON.parse(/var ytInitialData\s*=\s*(\{.+?\});/.exec(res.data)[1])
  let results = []
  let contents = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
  if (count > contents.length) count = contents.length
  for (let i = 0; i < count; i++) {
    let c = contents[i]
    let type = Object.keys(c)[0]
    switch(type) {
      case "videoRenderer": 
        results.push({
          type: "video",
          videoId: c[type].videoId,
          videoUrl: "https://youtu.be/" + c[type].videoId,
          title: c[type].title.runs[0].text,
          thunbnail: c[type].thumbnail.thumbnails[0],
          duration: c[type].lengthText.simpleText,
          publish: c[type].publishedTimeText.simpleText,
          viewer: c[type].viewCountText.simpleText.replace(" views", ""),
          author: {
            name: c[type].ownerText.runs[0].text,
            url: c[type].ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
            thumbnail: c[type].channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0]
          },
          download: async function download() {
           return { mp3: await (await ytdl("https://youtu.be/" + c[type].videoId)).audio, mp4: await (await ytdl("https://youtu.be/" + c[type].videoId)).video
          }
          }
        })
      break;
      case "radioRenderer":
        results.push({
          type: "playlist",
          playlistId: c[type].playlistId,
          title: c[type].title.simpleText,
          thumbnails: c[type].thumbnail.thumbnails,
          count: c[type].videoCountText.runs[0].text,
          watchUrl: c[type].navigationEndpoint.commandMetadata.webCommandMetadata.url
        })
      break;
    }
  }
  return results
}
export async function couple() {
  let { data } = await axios("https://raw.githubusercontent.com/Aiinne/Aine-MD/main/lib/ppcouple.js")
  let ran = random(data)
  return ran
}

export async function igstalk(username) {
  if(!username) return { error: true, message: "Empty Username" }
  let { data } = await axios({
    url: `https://greatfon.com/v/${username}`,
    method: "GET",
    headers: {
      "User-Agent": fakeUa()
    }
  })
  let $ = cheerio.load(data)
  let result = {}
  let profile = $("div.user__img").attr("style").split("\'")[1]
  let name = $("h1.user__title").text()
  let infos1 = $("ul.user__list").html().split("<li class=\"user__item\">").map(v => v.split("</li>")[0]).filter(v => !!v)
  let posts = infos1[0].replace("Posts", "").trim().replace(/ /gi, ".")
  let followers = infos1[1].replace("Followers", "").trim().replace(/ /gi, ".")
  let following = infos1[2].replace("Following", "").trim().replace(/ /gi, ".")
  let bio = $("div.user__info-desc").html().replace(/(\&amp\;)/gi, "&").replace(/(<([^>]+)?br([^>]+)?>)/gi, "\n").replace(/(<([^>]+)>)/gi, "").trim()

  return {
      username,
      profile,
      name,
      posts,
      followers,
      following,
      bio
    }
  }
  export function ColorToInt (val) {
    val = val || 0; // 0, null, undefined, NaN
    if (typeof val === 'number') 
        return Number(val);
    var color = new TinyColor(val);
    return parseInt(color.toHex8(), 16);
}
export async function bgcolor(img, options = {}) {
var imgres = await rmbg(img)
var warna;
if (options.color == "blue") warna = "#000080"
if (options.color == "red") warna = "#FF0011"
if (options.color.startsWith("#")) warna = options.color
let orang = await Jimp.read(imgres)
await orang.background(ColorToInt(warna))
let wah = await orang.getBufferAsync(Jimp.MIME_JPEG)
return { color: options.color, image: wah }
}
export async function smeme(atas, bawah, img) {
var detec = await fileType.fileTypeFromBuffer(img)
if (/webp/.test(detec.ext)) img = await toImage(img, { ext: "jpeg"})
if (!/http/.test(img)) img = await ( await telegra(img))
  atas = (!atas || atas.length == 0) ? "%F0%9F%97%BF" : atas
  bawah = (!bawah || bawah.length == 0) ? "%F0%9F%97%BF" : bawah
  atas = atas.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
   bawah = bawah.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
   return `https://api-memegen.herokuapp.com/images/custom/${atas}/${bawah}.jpg?background=${img}`
}
async function toImage(buffer, opt={}) {
var filename = getRandom("webp")
                        var out = getRandom(opt ? opt.ext : "png")
                        await simpan(filename, buffer)
                        var outname = await ffmpegDefault(filename, out)
                        return baca(out)
}
function ffmpegDefault(path, out) {
    let ff = cp.execSync(`ffmpeg -i ${path} ${out}`)
    if (ff.length == 0) return out
}
function random(value) {
    if (!value) return new Error("emty value")
    return value[Math.floor(Math.random() * value.length)]
}
export function parseSeconds(sec) {
  let h = Math.floor(sec / 3600)
  let m = Math.floor(sec / 60) % 60
  let s = Math.floor(sec) % 60
  return [h, m, s].map(v => String(v).padStart(2, "0")).join(":")
}

export async function ytdl(url) {
var { data } = (await axios.post("https://ytpp3.com/newp", new URLSearchParams({ u: url, c: "ID" }))).data
let result = {
  title: data.title,
  duration: data.duration,
  audio: data.mp3.length === 0 ? data.mp3_cdn : "https://ytpp3.com" + data.mp3,
  video: data.mp4.length === 0 ? data.mp4_cdn : "https://ytpp3.com" + data.mp4
}
return result
}

export async function ssweb(url, fullPage = false) {
  const browser = await puppeteer.connect({ browserWSEndpoint: "ws://puppeteer-ws.herokuapp.com/?token=free" })
const page = await browser.newPage()
if (!fullPage) {
await page.setViewport({ width: 800, height: 1360 })
await page.goto(url)
await page.waitForTimeout(7000)
return await page.screenshot()
} else {
await page.goto(url)
await page.waitForTimeout(7000)
return await page.screenshot()
}
}
async function savefrom() {
    let body = new URLSearchParams({
        "sf_url": encodeURI(arguments[0]),
        "sf_submit": "",
        "new": 2,
        "lang": "id",
        "app": "",
        "country": "id",
        "os": "Windows",
        "browser": "Chrome",
        "channel": " main",
        "sf-nomad": 1
    });
    let {
        data
    } = await axios({
        "url": "https://worker.sf-tools.com/savefrom.php",
        "method": "POST",
        "data": body,
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://id.savefrom.net",
            "referer": "https://id.savefrom.net/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36"
        }
    });
    let exec = '[]["filter"]["constructor"](b).call(a);';
    data = data.replace(exec, `\ntry {\ni++;\nif (i === 2) scriptResult = ${exec.split(".call")[0]}.toString();\nelse (\n${exec.replace(/;/, "")}\n);\n} catch {}`);
    let context = {
        "scriptResult": "",
        "i": 0
    };
    vm.createContext(context);
    new vm.Script(data).runInContext(context);
    return JSON.parse(context.scriptResult.split("window.parent.sf.videoResult.show(")?.[1].split(");")?.[0])
}

export async function mediafire(url) {
var { data }  = await axios.get(url) 
var $ = cheerio.load(data)
var download_url = $('a#downloadButton').attr('href')
var size = $('a#downloadButton').text().replace('Download', '').split("(")[1].split(")")[0]
var seplit = download_url.split('/')
var filename = seplit[5]
var mime = filename.split('.')
mime = mime[1]
return { filename, mime, size, download_url }
}

function DeepApi() {
    let list = ["0d182ada-c4fb-459b-ab3a-b9193b300564", "990cd8d3-5d3c-4b66-a30f-7fbb73c71049"]
    return list[Math.floor(Math.random() * list.length)]
}
async function deepai(type, files = {}) {
    if (!type) return new Error("no type")
    let form = new formData;
    for (let key of Object.keys(files)) form.append(key, files[key], Buffer.isBuffer(files[key]) ? "kontol.png" : null);
    try {
        let res = await axios.post("https://api.deepai.org/api/" + type, form, {
            headers: {
                "api-key": DeepApi(),
                ...form.getHeaders()
            }
        });
        return res.data
    } catch (e) {
        return new Error(e.response.data.err)
    };
};

function ClashOfClans(token) {
    if (!token) throw new Error("no token");
    this.token = token;
    this.baseURL = "https://api.clashofclans.com";
    this.version = 1;
    this._request = {};
    this.fetchRequest();
}

ClashOfClans.prototype.fetchRequest = function() {
    this._request = axios.create({
        "baseURL": `${this.baseURL}/v${this.version}`,
        "headers": {
            "Authorization": "Bearer " + this.token
        }
    });
};

ClashOfClans.prototype.getPlayers = function() {
    let id = arguments[0];
    if (!id) throw new Error("no id");
    return new Promise(async (res, rej) => {
        this._request(`/players/${encodeURIComponent(id)}`).then(function(data) {
            res({
                "status": 200,
                "result": data.data
            });
        }).catch((err) => {
            rej(err.response.data);
        });
    });
};

ClashOfClans.prototype.languages = function() {
    return new Promise(async (res, rej) => {
        this._request("/languages").then(function(data) {
            res({
                "status": 200,
                "result": data.data
            });
        }).catch((err) => {
            rej(err.response.data);
        });
    });
};

function idML(userId, zoneId) {
    if (!userId) return new Error("no userId")
    if (!zoneId) return new Error("no zoneId")
    return new Promise((resolve, reject) => {
        let body = {
            "voucherPricePoint.id": 4150,
            "voucherPricePoint.price": "1565.0",
            "voucherPricePoint.variablePrice": 0,
            "n": "",
            "email": "",
            "userVariablePrice": 0,
            "order.data.profile": "",
            "user.userId": userId,
            "user.zoneId": zoneId,
            "msisdn": "",
            "voucherTypeName": "MOBILE_LEGENDS",
            "shopLang": "id_ID",
            "impactClickId": "",
            "affiliateTrackingId": "",
            "checkoutId": "",
            "tmwAccessToken": "",
            "anonymousId": ""
        };
        axios({
            "url": "https://order-sg.codashop.com/initPayment.action",
            "method": "POST",
            "data": body,
            "headers": {
                "Content-Type": "application/json; charset/utf-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        }).then(({
            data
        }) => {
            resolve({
                "username": data.confirmationFields.username,
                "country": data.confirmationFields.country,
                "userId": userId,
                "zoneId": zoneId
            });
        }).catch(reject);
    });
}

function idFF(userId) {
    if (!userId) return new Error("no userId");
    return new Promise((resolve, reject) => {
        let body = {
            "voucherPricePoint.id": 8050,
            "voucherPricePoint.price": "",
            "voucherPricePoint.variablePrice": "",
            "n": "",
            "email": "",
            "userVariablePrice": "",
            "order.data.profile": "",
            "user.userId": userId,
            "voucherTypeName": "FREEFIRE",
            "affiliateTrackingId": "",
            "impactClickId": "",
            "checkoutId": "",
            "tmwAccessToken": "",
            "shopLang": "in_ID"
        };
        axios({
            "url": "https://order.codashop.com/id/initPayment.action",
            "method": "POST",
            "data": body,
            "headers": {
                "Content-Type": "application/json; charset/utf-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        }).then(({
            data
        }) => {
            resolve({
                "username": data.confirmationFields.roles[0].role,
                "userId": userId,
                "country": data.confirmationFields.country
            });
        }).catch(reject);
    });
}

function JSObfuscator(code) {
    if (!code) return code;
    let o = JsO.obfuscate(code);
    return o.getObfuscatedCode();
}

async function identifymusic(media, opts) {
    if (!media) return new Error("No media");
    if (opts && !opts.access_key && !opts.access_secret) return new Error("missing options");
    let acr = new acrcloud(opts || acropts);
    let res = await acr.identify(media)
    if (!("metadata" in res)) return new Error(res.status.msg)
    return res.metadata.music[0];
}
async function top4top(bapper) {
    let ftyp = await (await fileType.fileTypeFromBuffer(bapper)).ext
    let form = new formData
    let kontol = () => Math.floor(Math.random() * 10000) + "." + ftyp
    if (Array.isArray(bapper)) {
        for (let i = 0; i < 7; i++) form.append(`file_${i + 1}_`, bapper[i], kontol())
    }
    form.append("file_1_", bapper, kontol())
    form.append("submitr", "[ رفع الملفات ]")
    let res = await axios({
        url: "https://top4top.io/index.php",
        method: "POST",
        data: form,
        headers: {
            ...form.getHeaders()
        }
    })
    let $ = cheerio.load(res.data)
    let result = []
    $("div[class=inputbody]").each(function() {
        let url = $(this).find(".all_boxes").val()
        if (!url.startsWith("[")) return result.push(url)
    })
    if (result[0] === undefined) return "Error: ```unsuported file type!!``` \n*file support jpg/mp3/mp4*"
    if (result) return {
        url: result[0],
        delete_url: result[1]
    }
}
export async function jarak(dari, ke) {

    if (!dari) return "Dari?"

    if (!ke) return "Ke?"

    let url = `https://www.google.com/search?q=${encodeURIComponent("jarak " + dari + " ke " + ke)}&hl=id`

    let {
        data
    } = await axios(url)

    let $ = cheerio.load(data)

    let img = data.split("var s=\'")[1].split("\'")[0]

    return {

        img: await (await top4top(/^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : '')).url,

        desc: $("div.BNeawe.deIvCb.AP7Wnd").text()

    }

}

export async function gdrive(url) {
    let id
    if (!(url && url.match(/drive\.google/i))) throw 'Invalid URL'
    id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
    if (!id) throw 'ID Not Found'
    let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
        method: 'post',
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            'content-length': 0,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'origin': 'https://drive.google.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
            'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
            'x-drive-first-party': 'DriveWebUi',
            'x-json-requested': 'true'
        }
    })
    let {
        fileName,
        sizeBytes,
        downloadUrl
    } = JSON.parse((await res.text()).slice(4))
    if (!downloadUrl) throw 'Link Download Limit!'
    let data = await fetch(downloadUrl)
    if (data.status !== 200) throw data.statusText
    return {
        downloadUrl,
        fileName,
        mimetype: data.headers.get('content-type')
    }
}
export async function mix(emoji1, emoji2) {
    if (!emoji1 || !emoji2) return "Emty Emoji"
    let data = await (await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=g_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)).json()
    if (data) return data
    else return !1
}
export async function gtts(teks, lang) {
    var ran = "./cache/" + getRandom("mp3")
    var _gtts = new gTTS(teks, lang);
    _gtts.save(ran, function() {
        return ran
    })
}
export const stalk = new Stalker()
export const youtube = new YouTube ()
export default () => "Here all functions"
export {
    savefrom,
    JSObfuscator,
    identifymusic,
    top4top,
    deepai
}
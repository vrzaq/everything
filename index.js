import baileys from "@adiwajshing/baileys"
import P from "pino"
import cp from "child_process"
import util from "node:util"
import module from "module"
import express from "express"
import Message, {
owner,
bindSock
} from "./functions.js"
const {
version,
isLatest
} = await baileys.fetchLatestBaileysVersion()

global.setting = {
owner: owner,
prefix: ".",
auth: "auth.json"
}
global.require = module.createRequire(import.meta.url)
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
main(setting.auth, true, owner)
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
 const ftxt = {
	 key:
	 { fromMe: false,
	 participant: `0@s.whatsapp.net`, ...(m.id ? 
	 { remoteJid: "status@broadcast" } : {}) },
	 message: { "extendedTextMessage": {"text": `Group Announce`  }}
	}
    if (m.action == "remove") sock.sendText(m.id, `@${part.split("@")[0]} Keluar dari group`, { mentions: m.participants, quoted: ftxt})
    if (m.action == "add") sock.sendText(m.id, `@${part.split("@")[0]} Welcome..`, { mentions: m.participants, quoted: ftxt})
    if (m.action == "promote") sock.sendText(m.id, `@${part.split("@")[0]} Telah menjadi admin`, { mentions: m.participants, quoted: ftxt})
    if (m.action == "demote") sock.sendText(m.id, `@${part.split("@")[0]} Telah berhenti menjadi admin`, { mentions: m.participants, quoted: ftxt})
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
  if (m.announce) sock.sendText(m.id, `Grup dibuka!`, { quoted: ftxt})
 if (!m.announce) { if (m.subject) return;sock.sendText(m.id, `Grup ditutup!`, { quoted: ftxt})
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
let prefix = setting.prefix
let isCmd = command.startsWith(prefix)

if (m.key.remoteJid === 'status@broadcast') return sock.readMessages([m.key])
function reply(text) {
sock.sendMessage(from, {
text
}, {
quoted: msg
})
}
if (command) {
console.log(`[ MESSAGE ] from ${pushname} text: ${body}`)
}
switch (command) {
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
reply(util.format(e))
}
break;
default:
}
} catch (e) {
console.log(e)
}
})
}
var app = express ()
function startApp() {
app.get("/", function(req, res) {
res.sendFile(process.cwd() + "/index.html")
})
app.listen("80", () => console.log("Connected"))
}
/*
  @ Start This Script 
*/
main(setting.auth, true, owner)
startApp()
process.on("UnhandledPromiseRejection", async qm => {
console.log("[INFO] " + qm)
main(setting.auth, true, true)
})

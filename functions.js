import baileys, {
    S_WHATSAPP_NET,
    downloadContentFromMessage
} from "@adiwajshing/baileys";
import fs from "fs"
export let owner = ["6281361057300@s.whatsapp.net"]
let sock = {};
let store = {};
export default Message
async function streamToBuff(stream) {
    let buff = Buffer.alloc(0)
    for await (const chunk of stream) buff = Buffer.concat([buff, chunk])
    return buff
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
  sendContact: {
  async value(jid, numbers, name, quoted, men) {
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
}
  })
}

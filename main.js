const Discord = require("discord.js")
const client = new Discord.Client();
const ayar = require("./settings.js")
const fs = require("fs");
require('./util/Loader.js')(client);

const mongoose = require('mongoose');
const settings = require("./settings.js");
mongoose.connect(ayar.bot.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(m => setTimeout(() => { console.log('Database bağlandı!') }, 3000)).catch(err => setTimeout(() => { console.log('Database bağlanamadı!!') }, 3000));
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./Commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./Commands/${f}`);
        console.log(`${props.config.name} komutu yüklendi.`);
        client.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, props.config.name);
        });
    });
})

client.on("userUpdate", async (stg, yeni) => {
    var sunucu = client.guilds.cache.get('914513779587428392'); // Buraya Sunucu ID
    var uye = sunucu.members.cache.get(yeni.id);
    var tag = "✧"; // Buraya Ekip Tag
    var tagrol = "914513779725840452"; // Buraya Ekip Rolünün ID
    var logKanali = "914513779855859750"; // Loglanacağı Kanalın ID
  
    if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
    
    if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
      try {
        await uye.roles.add(tagrol);
        await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
      } catch (err) { console.error(err) };
    };
    
    if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
      try {
        await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
        await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
      } catch(err) { console.error(err) };
    };
  });

  
//-----------------------ŞÜPHELİ-HESAP----------------------\\     STG



   


//-----------------------ŞÜPHELİ-HESAP----------------------\\     STG

client.login(ayar.bot.botToken).catch(err => { console.log('Bota giriş yapılırken başarısız olundu!!') })
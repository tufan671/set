const ayar = require('../settings.js');
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
const registerData = require('../models/register.js');
module.exports = async member => {
        let data = await registerData.findOne({ guildID: member.guild.id })
        let kurulus = member.user.createdTimestamp
        let süphe;
        if (Date.now() - kurulus < 1000 * 60 * 60 * 24 * 10 ? süphe = "Şüpheli" : süphe = "Güvenli");

        let olusturma = `(\`${moment.duration(Date.now() - kurulus).format('Y [yıl], M [Ay], D [Gün]')}\`)`
        let channel = member.guild.channels.cache.get(ayar.channels.registerChannel);

        if (süphe === "Güvenli") {
            await member.roles.add(ayar.roles.unregisterRoles).catch(e => {});
            await member.setNickname(ayar.guild.defaultName).catch(e => {});
        
    } else {
await member.roles.set([ayar.roles.suspecious]).catch(e => {});
await member.setNickname(ayar.guild.suspeciousName).catch(e => {});

if(channel) channel.send(`
${member}, Adlı kullanıcı sunucuya katıldı fakat hesabı yeni olduğu için şüpheli hesap rolünü verdim. ${olusturma}`);
    }
};

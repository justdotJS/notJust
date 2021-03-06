const Discord = require('discord.js');
const Command = require('../../cmdModule/commands').Command

class dotCommand extends Command {
  constructor() {
    super({
      name: 'dot',
      help: 'Give or take dots from users'
    })
  }

  hasPermission(message) {
    if (message.guild && message.guild.id == '268970339948691456' && message.author.id == '193908323911860224' && 1 == 0) return true
    return false
  }

  async run(message, args, api) {
    function countWords(str) {
      return str.split(" ").length;
    }
    function isN(num) {
      return !isNaN(num)
    }
    if (!args[1] || !args[2]) {
      return api.error('Please specify a user and amount.')
    }
    var user
      if (args[1]) {
        user = message.guild.member(message.mentions.users.first());
      } else {
        user = message.guild.member(message.author);
      }
    if (user.user.bot) {
      return api.error('Bot dots... don\'t exist. Sorry!')
    }
    const dots = message.client.dots.get(user.id) || { dots: 0, level: 0, time: 0 };
    if (isN(args[2])) {
      var am = Number(args[2])
      dots.dots = dots.dots + Number(args[2])
      } else {
      return api.error('Please specify a numeric amount of dots.')
      }
      var desiredLevel = dots.level + 1
  var xpLeft = dots.dots - (5 / 6 * desiredLevel * (2 * desiredLevel * desiredLevel + 27 * desiredLevel + 91))
  if (xpLeft >= 0) {
    message.channel.send(`**${message.author.tag}** is now **Level ${desiredLevel}**!`).then(msg => {msg.delete(10000)}).catch(err => console.error(err))
    dots.level = desiredLevel;
  }
  /*if (dots.level >= '3') {
    user.addRole(message.guild.roles.find('name','emoji'))
  }*/
  if (dots.level >= '10') {
    user.addRole(message.guild.roles.find('name','color'))
  }
      message.client.dots.set(message.author.id, dots);
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:dots:403826180572053504> `Dots Changed`')
      embed.addField('User', user.user.tag, true)
      embed.addField('Level', dots.level, true)
      embed.addBlankField(false)
      embed.addField('Amount Given', am, true)
      embed.addField('Amount Now', dots.dots, true)
      embed.setColor('#00ff00')
      embed.setFooter('Replying to ' + message.author.tag)
      embed.setDescription(String.fromCharCode(8203))
      message.channel.send({
        embed
      })
    return true
  }
}

module.exports = dotCommand

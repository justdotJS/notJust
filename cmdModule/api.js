const Discord = require('discord.js')
const config = require('../config.json')

class CommandApi {
  /**
   * @param {Discord.Message} message - Message to use when creating command API
   * @param {string[]} args - Arguments
   */
  constructor(message, args, handler) {
    if (!message) throw new TypeError('Message must be a Message.')
    if (!args || !Array.isArray(args)) throw new TypeError('Args must be an array.')

    this.message = message
    this.args = args

    /**
     * User that executed command
     * @type {Discord.User}
     */
    this.user = message.author

    /**
     * Command handler
     * @type {CommandHandler}
     */
    this.handler = handler

    if (message.channel.type !== 'dm') {
      /**
       * GuildMember that executed command
       * @type {Discord.GuildMember}
       */
      this.member = message.member
    }
  }

  checkrole(urole, nrole, user) {
    try {
      if (urole.id == nrole.id) {
        user.removeRole(nrole)
      } else {
        user.addRole(nrole)
      }
    } catch (err) {
      return err
    }
  }

  /**
   * @param {string} text - Text to clean
   */
  clean(text) {
    try {
      let token = config.token
      let zwnj = String.fromCharCode(8203)
      if (typeof text === 'string') {
        return Discord.escapeMarkdown(text).replace(token, 'ReferenceError: token is not defined').replace(/@/g, '@' + zwnj)
        //return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(token, "ReferenceError: token is not defined");
      } else {
        return text
      }
    } catch (err) {
      return err
    }
  }

  /**
   * @param {string} hex - Hex color of the embed
   * @param {string} title - Title of the embed
   * @param {string} description - Description of the embed.
   * @param {string} [time] - Time to delete the embed
   */
  embed(hex, title, description, time = undefined) {
    try {
      let embed = new Discord.RichEmbed()
      embed.setTitle(title)
      embed.setColor(hex)
      //embed.setTimestamp()
      //embed.setFooter('Replying to: ' + this.message.author.tag)
      embed.setFooter('Replying to ' + this.message.author.tag)
      if (description) {
        embed.setDescription(description)
      }
      if (time) {
        this.message.channel.send({ embed })
          .then((msg) => msg.delete(time))
      } else {
        this.message.channel.send({ embed })
      }
      return true
    } catch (err) {
      return err
    }
  }

  /**
   * @param {string} hex - Hex color of the embed
   * @param {string} title - Title of the embed
   * @param {string} field1title - Field 1 title.
   * @param {string} field1value - Field 1 value
   * @param {string} field2title - Field 2 title.
   * @param {string} field2value - Field 2 value
   */
  evalembed(hex, title, field1title, field1value, field2title, field2value) {
    try {
      let embed = new Discord.RichEmbed()
      //embed.setTimestamp()
      embed.setTitle(title)
      embed.setColor(hex)
      //embed.setFooter('Replying to: ' + this.message.author.tag)
      //embed.setTimestamp()
      embed.setFooter('Replying to ' + this.message.author.tag)
      if (field1title && field1value) {
        embed.setDescription(String.fromCharCode(8203))
        embed.addField(field1title, field1value, false)
      }
      if (field2title && field2value) {
        embed.addField(field2title, field2value, false)
      }
      this.message.channel.send({ embed })
      return true
    } catch (err) {
      return err
    }
  }
  
  /**
   * @param {string} hex - Hex color of the embed
   * @param {string} title - Title of the embed
   * @param {string} field1title - Field 1 title.
   * @param {string} field1value - Field 1 value
   * @param {string} field2title - Field 2 title.
   * @param {string} field2value - Field 2 value
   
  customembed(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15) {
    try {
      let embed = new Discord.RichEmbed()
      var variables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      var i;
      for (i = 0;i < variables.length,i++) {
        let dis = variables[i]
        if (dis.indexOf('hex:') > -1) {
          dis.replace('hex:','')
          embed.setColor(dis)
        } else if (dis.indexOf('title:') > -1) {
          dis.replace('title:','')
          embed.setTitle(dis)
        } else if (dis.indexOf('fieldtitle:') > -1 && dis.indexOf('fieldvalue:') > -1) {
          dis.replace('fieldtitle:','').replace('fieldvalue:',', ')
          embed.addField(dis)
        } else if (dis.indexOf('link:') > -1) {
          dis.replace('link:','')
          embed.setLink(dis)
        } else if (dis.indexOf('image:') > -1) {
          dis.replace('image:','')
          embed.setImage(dis)
        } else if (dis.indexOf('thumb:') > -1) {
          dis.replace('thumb:','')
          embed.setThumbnail(dis)
        }
      }
      embed.setFooter('Replying to: ' + this.message.author.tag)
      embed.setTimestamp()
      embed.setFooter('Replying to: ' + this.message.author.tag)
      this.message.channel.send({ embed })
      return true
    } catch (err) {
      return err
    }
  }*/

  /**
   * @param {string} message - Error message
   */
  error(message) {
    try {
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:red_tick:330712188681453590> `Error`')
      embed.setDescription(message)
      embed.setColor('#FF0000')
      //embed.setFooter('Replying to: '+ this.message.author.tag)
      //embed.setTimestamp()
      embed.setFooter('Replying to ' + this.message.author.tag)
      //embed.setTimestamp(new Date())
      //this.message.channel.sendEmbed(embed)
      this.message.channel.send({ embed })
      return true
    } catch (err) {
      return err
    }
  }

  /**
   * @param {string} message - Success message
   */
  success(message) {
    try {
      let embed = new Discord.RichEmbed()
      embed.setTitle('<:green_tick:330712173288488960> `Success`')
      embed.setDescription(message)
      embed.setColor('#00FF00')
      embed.setFooter('Replying to ' + this.message.author.tag)
      //embed.setTimestamp()
      //embed.setFooter('Replying to: ' + this.message.author.tag)
      this.message.channel.send({ embed })
      return true
    } catch (err) {
      return err
    }
  }
}


module.exports = CommandApi

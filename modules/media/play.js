const Discord = require('discord.js');
const yt = require('ytdl-core');
const Command = require('../../cmdModule/commands').Command

class playCommand extends Command {
	constructor() {
		super({
			name: 'play',
			help: 'Play the media queue'
		})
	}

	hasPermission(message) {
		if (message.guild && (message.client.settings.get(message.guild.id).isDonator == true || message.author.id == require('../../config.json').owner)) {
			return true
		} else {
			let embed = new Discord.RichEmbed()

		embed.setTitle('<:red_tick:330712188681453590> `Premium Command`')
		embed.setColor('#00ff00')

		embed.setFooter('Replying to ' + message.author.tag)
		embed.setDescription('**I, the founder of notJust, am just 13 and have to run my servers and sites off donations.**\n\nBecause of this, I have created **notJust Premium**: a premium, paid, server-based upgrade to notJust which gives access to many donator only commands and modules. \nThese include the AI command (chat with an artificial assistant) and Media Module (play music/videos from YouTube in voice channels).\n\n**Get notJust Premium - and support me - by [donating](https://patreon.com/justdotJS)**.')
		//embed.addField('`Premium`', '', false)
				message.channel.send({
			embed
		})
		}//if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return true
		// if (message.author.id == message.guild.ownerID) return true
		return false
	}

	async run(message, args, api) {
		if (!message.client.settings.get(message.guild.id)) {
			// Adding a new row to the collection uses `set(key, value)`
			message.client.settings.set(message.guild.id, message.client.defaultSettings);
		}


		let embed = new Discord.RichEmbed()

		embed.setDescription(String.fromCharCode(8203))
		embed.setColor('#00ff00')
		//embed.setTimestamp()
		embed.setFooter('Replying to ' + message.author.tag)
		embed.setTitle('<:apple_music:372943300753227786> `Now Playing`')

		if (message.client.queue[message.guild.id] === undefined) return api.error('Please add some songs to the queue before playing.');
		if (!message.guild.voiceConnection) return commands.join(message).then(() => commands.play(message));
		if (message.client.queue[message.guild.id].playing) return api.error('Already Playing');
		message.client.dispatcher = ''
		message.client.queue[message.guild.id].playing = true;

		console.log(message.client.queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return api.error('Queue is empty.').then(() => {
				message.client.queue[message.guild.id].playing = false;
				message.member.voiceChannel.leave();
			});
			embed.addField('`Name`', song.title, false)
			message.channel.send({
				embed
			})
			//message.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
			message.client.dispatcher = message.guild.voiceConnection.playStream(yt(song.url, {
				audioonly: true
			}), {
				passes: '5'
			});
			message.client.dispatcher.on('end', () => {
				//collector.stop();
				//play(message.client.queue[message.guild.id].songs.shift());
			});

			message.client.dispatcher.on('error', (err) => {
				return api.error(err)
				/*.then(() => {
						//collector.stop();
						//play(message.client.queue[message.guild.id].songs.shift());
					});*/
			});
			/*let collector = message.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith('m.pause')) {
					message.channel.send('paused').then(() => {
						message.client.dispatcher.pause();
					});
				} else if (m.content.startsWith('m.resume')) {
					message.channel.send('resumed').then(() => {
						message.client.dispatcher.resume();
					});
				} else if (m.content.startsWith('m.skip')) {
					message.channel.send('skipped').then(() => {
						message.client.dispatcher.end();
					});*/
			/*} else if (m.content.startsWith('m.volume+')) {
				if (Math.round(message.client.dispatcher.volume * 50) >= 100) return message.channel.send(`Volume: ${Math.round(message.client.dispatcher.volume*50)}%`);
				message.client.dispatcher.setVolume(Math.min((message.client.dispatcher.volume * 50 + (2 * (m.content.split('+').length - 1))) / 50, 2));
				message.channel.send(`Volume: ${Math.round(message.client.dispatcher.volume*50)}%`);
			} else if (m.content.startsWith('m.volume-')) {
				if (Math.round(message.client.dispatcher.volume * 50) <= 0) return message.channel.send(`Volume: ${Math.round(message.client.dispatcher.volume*50)}%`);
				message.client.dispatcher.setVolume(Math.max((message.client.dispatcher.volume * 50 - (2 * (m.content.split('-').length - 1))) / 50, 0));
				message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
			*/
			/*} else if (m.content.startsWith('m.time')) {
								message.channel.send(`time: ${Math.floor(message.client.dispatcher.time / 60000)}:${Math.floor((message.client.dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((message.client.dispatcher.time % 60000)/1000) : Math.floor((message.client.dispatcher.time % 60000)/1000)}`);
							}
						});*/
		})(message.client.queue[message.guild.id].songs.shift());



		return true
	}
}

module.exports = playCommand

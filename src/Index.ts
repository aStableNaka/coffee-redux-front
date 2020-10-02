import * as Discord from "discord.js";
import {config} from "@config/Provider";

export class Dispatch{
	manager: Discord.ShardingManager;
	constructor(){
		const self = this;

		this.manager = new Discord.ShardingManager("./src/Shard.js",
			{
				token: config.discord.token,
				execArgv:[ '-r', 'tsconfig-paths/register' ],
				mode: "process"
			}
		);


		this.manager.on('shardCreate', (shard)=>{
			console.log( `A new shard has been spawned.\n[ ID ]: ${shard.id}\nCurrently managing ${manager.shards.size} shards` );
		
			shard.on("death", ()=>{
				console.warn(`[ DEATH ] Shard ${shard.id} has died.`);
			});
		
			shard.on("disconnect", ()=>{
				console.log(`[ DISCONNECTED ] Shard ${shard.id} has disconnected from discord.`);
			})
		
			shard.on("ready", ()=>{
				console.log(`[ READY ] Shard ${shard.id} is ready for discord.`);
				shard.send({type:"ready", id:shard.id});
			})
		
			shard.on("reconnecting", ()=>{
				console.warn(`[ RECONNECTING ] Shard ${shard.id} is reconnecting to discord.`);
			})
		
			shard.on("spawn", ()=>{
				console.warn(`[ SPAWNED ] Shard ${shard.id} has spawned.`);
			})
		
			shard.on("message", (msg:any)=>{
				console.log(`[ ${shard.id} ] - ${msg}`);
			})
		
		})
		this.manager.spawn("auto");

		function cleanup(){
			// Make each shard kill itself
			self.manager.shards.map(( shard: Discord.Shard )=>{
				shard.send({type:"kill"})
				// shard.kill(); // threw a scary exception.
			})
			setTimeout(()=>{
				process.exit();
			}, 1000);
		}
		
		['exit', 'SIGINT', 'uncaughtException', 'SIGUSR1', 'SIGUSR2'].map(( eventName )=>{
			process.on(eventName, cleanup.bind(null) );
		})
	}
}







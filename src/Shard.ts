/**
 * FShard.ts
 * (Front-Shard)
 * 
 * The entrypoint for front-shard instances. The FHead( Front head ) is in charge of spawning
 * FShards.
 */

import * as Discord from "discord.js";
import {config} from "@config/Provider";
import {CommandPipeline} from "@pipeline/Pipeline";

const client = new Discord.Client();
client.login( config.discord.token );

const pipeline = new CommandPipeline( config );

// Temporary testing
client.addListener("ready", ()=>{
	client.addListener("message", ( message: Discord.Message )=>{
		pipeline.start( message );
	})
	console.log({ready:true});
})

process.on("message", ( event )=>{
	if(event.type=="ready"){
		console.log({});
	}
	if(event.type=="kill"){
		client.destroy();
		process.kill(0);
	}
})

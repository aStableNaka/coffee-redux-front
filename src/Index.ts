import * as Discord from "discord.js";
import {config} from "@config/Provider";
import {CommandPipeline} from "@pipeline/Pipeline";

const a = new Discord.Client();
a.login( config.discord.token );

const pipeline = new CommandPipeline( config );

// Temporary testing
a.addListener("ready", ()=>{
	a.addListener("message", ( message: Discord.Message )=>{
		pipeline.start( message );
	})
})
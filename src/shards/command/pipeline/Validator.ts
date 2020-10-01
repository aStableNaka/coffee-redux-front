import {CommandsSchema, ConfigSchema} from "../../../utils/config";
import * as Discord from "discord.js";
import { Capsule } from "./Capsule";


/**
 * Validates commands.
 */
export class CommandValidator{
	
	cmdConfig: CommandsSchema;

	constructor( config: ConfigSchema ){
		this.cmdConfig = config.commands;
	}

	validate( capsule: Capsule ): Capsule{
		const type = capsule.message.channel.type;
		let channelName = "PM";
		if(type=="text"){
			channelName = (<Discord.TextChannel>(capsule.message.channel)).name;
		}
		console.log( `[ ${channelName} ] ${capsule.clean.username}: ${capsule.message.content}` );
		return capsule;
	}
}

export default CommandValidator;
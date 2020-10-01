import {CommandsSchema, ConfigSchema} from "../../../utils/config";
import * as Discord from "discord.js";


/**
 * Validates commands.
 */
export class CommandValidator{
	
	cmdConfig: CommandsSchema;

	constructor( config: ConfigSchema ){
		this.cmdConfig = config.commands;
	}

	validate( message: Discord.Message ){
		
	}
}

export default CommandValidator;
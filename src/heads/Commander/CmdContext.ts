import { CommandAction } from "./Commands/Command";

/**
 * The CmdContext encapsulates the request to execute a command. It will parse data
 * and invoke a CommandAction
 */
export class CmdContext{
	cmdAction: CommandAction;
	constructor( cmdAction ){
		
	}
}
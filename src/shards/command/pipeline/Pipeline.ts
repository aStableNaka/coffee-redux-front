import { Message } from "discord.js";
import { ConfigSchema } from "../../../utils/Config";
import * as Validator from "./Validator";

export class CommandPipeline {

	validator: Validator.CommandValidator;
	config: ConfigSchema;

	constructor( config: ConfigSchema ){
		this.config = config;
		this.validator = new Validator.CommandValidator( config );
	}

	handleMessage( message: Message ){
		this.validator.validate()
	}
}
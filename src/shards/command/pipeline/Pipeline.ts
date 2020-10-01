import { Message } from "discord.js";
import { ConfigSchema } from "../../../utils/Config";
import { config } from "@config/Provider";
import * as Validator from "./Validator";
import { CapStat, Capsule, Check } from "./Capsule";

/**
 * The command pipeline is a structure that takes user input and makes it
 * easy for the head to work with.
 */
export class CommandPipeline {

	validator: Validator.CommandValidator;
	config: ConfigSchema;
	checkpoints: Check[];

	constructor( config: ConfigSchema ){
		this.config = config;
		this.validator = new Validator.CommandValidator( config );

		this.checkpoints = [
			this.validator.validate
		]

	}

	/**
	 * Execute the pipeline with the message.
	 * @param message 
	 */
	start( message: Message ){
		const capsule = new Capsule( message, config );
		this.checkpoints.map(( check: Check )=>{
			// Only execute the next action in the pipeline
			// if the status is still clear
			if( capsule.status === CapStat.CLEAR ){
				check( capsule );
			}
		}, this);
	}
}
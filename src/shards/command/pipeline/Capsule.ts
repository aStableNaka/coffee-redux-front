import { clear } from "console";
import { Message } from "discord.js";
import { ConfigSchema } from "../../../utils/Config";
import * as Sanitize from "../../../utils/Sanitize";

/**
 * The status of the capsule. If it passes the whole pipeline with all clears, it
 * gets sent to dispatch. If it is marked for termination (TERM), it will be thrown
 * out by the next section of the pipeline.
 */
export enum CapStat{
	CLEAR,
	TERM
}

export type CleanRoom = {
	message?: string;	// Sanitized
	username?: string;	// Escaped
}

export type Check = (( capsule: Capsule )=>Capsule);

/**
 * A capsule is like a toolbox for handling end-user input.
 * it performs high-level verifications. This is just things like
 * sanitizing text, basic input validation, etc.
 */
export class Capsule{

	message: Message;
	config: ConfigSchema;
	status: CapStat = CapStat.CLEAR;
	checkpoints: (() => Capsule)[];

	clean: CleanRoom = {};

	constructor( message: Message, config: ConfigSchema ){
		this.config = config;
		this.message = message;

		// I felt like it made more sense this way
		// A series of checks. The capsule performs checks on itself. If it
		// cannot be verified as a valid capsule, it will destroy itself.
		this.checkpoints = [
			this.incubate,		// Look for prefix
			this.sanitize,		// Remove unwanted characters
			this.atomize		// Split message into component parts
		];

		this.performChecks();
	}

	performChecks(){
		// TODO
		// for each this.checks[x] -> a function that will only continue if
		// self is not marked for termination
		const self = this;
		this.checkpoints.map(( f: ()=> Capsule )=>{
			if( !this.isMarkedForDisposal ){
				f.bind(self)();
			}
		}, this);
	}

	get isMarkedForDisposal(): boolean{
		return this.status == CapStat.TERM;
	}

	/**
	 * Mark the capsule for disposal.
	 */
	markForDisposal(): void{
		this.status = CapStat.TERM;
	}

	/**
	 * Incubation - 
	 * 		The stage where most messages get filtered away. Like
	 * 		how only a handfull of fish eggs survive their incubation
	 * 		stage, or something./..
	 */

	incubate(): Capsule{
		const self = this;
		return self.incubateWithoutCustomPrefix();
	}

	/**
	 * Future-feature: Custom prefixes. 
	 */
	incubateWithCustomPrefix(): Capsule{
		return this;
	}

	/**
	 * Incubates the capsule without worrying about checking for a user's
	 * custom prefix.
	 */
	incubateWithoutCustomPrefix(): Capsule{
		const cont = this.message.content;
		// Simple prefix check
		// Marks sell 
		if( cont[0] != this.config.command.defaultPrefix ){
			this.markForDisposal();
		}
		return this;
	}

	/**
	 * Sanitizes the user input. The only allowed characters are
	 * "\@[0-9][a-zA-Z]"
	 */
	sanitize(): Capsule{

		const msg = this.message;
		const author = msg.author;

		Object.assign(this.clean, {

			message: Sanitize.text( msg.content ),
			username: escape( author.username ),

		});
		return this;
	}

	/**
	 * The stage where the message gets separated into categories
	 */
	atomize(): Capsule{
		// TODO
		return this;
	}
}

export const Instance = Capsule;
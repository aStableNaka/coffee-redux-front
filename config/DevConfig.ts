import {ConfigSchema} from "../src/utils/Config";

/**
 * Why is the config a ts file? because json files are boring
 */
export const config:ConfigSchema = {
	
	discord:{
		token:"",
		permissionInts:[
			{name:"basic",n:0},
			{name:"elevated",n:0},
			{name:"admin",n:0}
		],
		inviteLinks:[
			{name:"default",link:"https://discordapp.com/api/oauth2/authorize?client_id=350823530377773057&permissions=0&scope=bot"}
		]
	},
	
	commands:{
		defaultPrefix:"~",
		superBlacklist:[], // A list of IDs(string) for blacklisted users
		allowBots: false, // Enable to allow bots to use coffee
	},

	/**
	 * Map<"Snowflake","Username">
	 */
	admins:new Map<string, string>([
		["DISCORD_USERID_SNOWFLAKE", "USER_NAME"]
	]),

	dispatch:{
		token:"",
		endpoint:"",
		timeout:1000
	}

};
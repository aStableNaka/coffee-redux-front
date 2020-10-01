import {ConfigSchema} from "../src/utils/Config";

/**
 * Why is the config a ts file? because json files are boring
 */
export const config:ConfigSchema = {
	
	discord:{
		token:"",
		permissionInts:[
			{ name:"basic", n: 0 },
			{ name:"admin", n: 8 }
		],
		inviteLinks:[
			{
				name:"default",
				link:"https://discordapp.com/api/oauth2/authorize?client_id=350823530377773057&permissions=0&scope=bot"
			}
		]
	},

	user:{
		permissionInts:[
			{ name:"user", n: 0 }
		],

		/**
		 * Map<"Snowflake","Username">
		 */
		admins:new Map<string, string>([
			["133169572923703296", "Naka"]
		]),
		blacklist:[] //a list of blacklisted user snowflakes
	},
	
	command:{
		defaultPrefix:"~",
		allowBots: false, // Enable to allow bots to use coffee
	},

	dispatch:{
		token:"",
		endpoint:"",
		timeout:1000
	}


};
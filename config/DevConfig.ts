import {ConfigSchema} from "./Config";

/**
 * Why is the config a ts file? because json files are boring
 */
export let config:ConfigSchema = {
	
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

	admins:new Map<string, string>([
		["133169572923703296", "Naka"]
	]),

	dispatch:{
		token:"",
		url:"",
		timeout:1000
	}

};
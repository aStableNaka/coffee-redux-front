export let config = {
	
	discord:{
		token:"",
		permissionInts:{
			basic:0,
			elevated:8,
			admin:8,
		},
		inviteLinks:{
			default:"https://discordapp.com/api/oauth2/authorize?client_id=350823530377773057&permissions=0&scope=bot"
		}
	},
	
	commands:{
		defaultPrefix:"~",
		superBlacklist:[], // A list of IDs(string) for blacklisted users
		allowBots: false, // Enable to allow bots to use coffee
	},

	admins:{
		"133169572923703296":{name:"Naka",id:"133169572923703296"}
	},

	dispatch:{
		connectionSecret:"",
		connectionURL:""
	}

};
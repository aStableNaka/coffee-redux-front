export type PermIntFieldType = {name:string, n:number}
export type InvLinkFieldType = {name:string, link:string}

export type DiscordCfgSchema = {
	token: string,
	permissionInts:PermIntFieldType[],
	inviteLinks:InvLinkFieldType[]
}

export type CommandsSchema = {
	defaultPrefix: string,
	superBlacklist: string[],
	allowBots: boolean
}

/**
 * Map< "Snowflake", "Username" >
 */
export type AdminsSchema = Map<string, string>

export type DispatchSchema = {
	token:string | undefined,
	endpoint:string,
	timeout:number,
}

export type ConfigSchema = {
	discord: DiscordCfgSchema,
	commands: CommandsSchema,
	admins: AdminsSchema,
	dispatch: DispatchSchema
}
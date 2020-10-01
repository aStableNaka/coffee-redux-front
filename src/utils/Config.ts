export type PermIntFieldType = {name:string, n:number}
export type InvLinkFieldType = {name:string, link:string}
export type Snowflake = string;

export type DiscordCfgSchema = {
	token: string,
	permissionInts:PermIntFieldType[],
	inviteLinks:InvLinkFieldType[]
}

export type CommandsSchema = {
	defaultPrefix: string,
	allowBots: boolean
}

export type UserSchema = {
	permissionInts:PermIntFieldType[],
	admins: AdminsSchema,
	blacklist: Snowflake[],
}

/**
 * Map< "Snowflake", "Username" >
 */
export type AdminsSchema = Map<Snowflake, string>

export type DispatchSchema = {
	token:string | undefined,
	endpoint:string,
	timeout:number,
}

export type ConfigSchema = {
	discord: DiscordCfgSchema,
	command: CommandsSchema,
	user: UserSchema,
	dispatch: DispatchSchema
}
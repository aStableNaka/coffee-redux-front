export type PermIntFieldType = {name:string, n:number}
export type InvLinkFieldType = {name:string, link:string}

export type DiscordSchema = {
	token: string,
	permissionInts:PermIntFieldType[],
	inviteLinks:InvLinkFieldType[]
}

export type CommandsSchema = {
	defaultPrefix: string,
	superBlacklist: string[],
	allowBots: boolean
}

export type AdminsSchema = Map<string, string>

export type DispatchSchema = {
	token:string,
	url:string
}

export type ConfigSchema = {
	discord: DiscordSchema,
	commands: CommandsSchema,
	admins: AdminsSchema,
	dispatch: DispatchSchema
}
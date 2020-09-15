export type HelpMenuContents = {
	label: string, desc: string
}

/**
 * A CommandAction handles processing data, given that the data is properly
 * formatted and provided by a CmdContext.
 */
export class CommandAction{
	group: string = "None";				// Used by the help menu
	usesDatabase: boolean = false;		// Enable access to the database
	helpMenu:
}

// Includes alphanumerics plus "@,." characters
const textSanPattern: RegExp = /[a-zA-Z\s\d\@\,\.]/g;

/**
 * Sanitize text
 * @param input 
 */
export function text( input: string ): string{
	const match = input.match( textSanPattern ) || [""];
	return match.join("");
}

/**
 * Sanitize by escaping
 * @param input 
 */
export function escape( input: string ): string{
	return escape( input );
}
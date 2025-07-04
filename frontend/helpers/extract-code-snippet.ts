export const detectCodeSnippet = (message: string) => {
	if (message.includes("```")) {
		const blocks = message.split("```");
		return blocks;
	}
};

export const isCodeBlock = (message: string): boolean => {
	if (
		(message.includes("{") && message.includes("}")) ||
		(message.includes("[") && message.includes("]")) ||
		message.includes("#") || 
		message.includes(";")
	) {
		return true;
	}
	return false;
};

export function extractCodeNames(message: string): string[] {
	const codeBlockRegex = /```([a-zA-Z0-9_]+)?([\s\S]*?)```/g;

	let matches: RegExpExecArray | null;
	const codeNames: string[] = [];

	while ((matches = codeBlockRegex.exec(message)) !== null) {
		const codeName: string = matches[1] ?? ""; // Use an empty string if codeName is not present
		codeNames.push(codeName);
	}

	return codeNames;
}

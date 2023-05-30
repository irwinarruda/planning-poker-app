export function mergeClassNames(...classNames: (string | false | null | undefined)[]): string {
	if (classNames.length === 0) return '';
	if (classNames.length === 1) return classNames[0] || '';
	if (classNames.length === 2) {
		return classNames[0] && classNames[1]
			? `${classNames[0]} ${classNames[1]}`
			: classNames[0] || classNames[1] || '';
	}
	return classNames.filter(Boolean).join(' ');
}

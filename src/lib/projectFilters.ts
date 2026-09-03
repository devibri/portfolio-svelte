export type Project = {
	id: string;
	tag: string;
	name: string;
	role?: string;
	with?: string;
	slug?: string;
	description?: string;
	urls?: Array<Record<string, string | undefined>>;
	tools?: string[];
};

export function getAvailableTags(projects: Project[]) {
	const tags = new Set<string>();
	const orderedTags: string[] = [];

	for (const project of projects) {
		if (!project.tag || tags.has(project.tag)) {
			continue;
		}

		tags.add(project.tag);
		orderedTags.push(project.tag);
	}

	return ['all', ...orderedTags];
}

export function filterProjectsByTag(projects: Project[], selectedTag: string) {
	if (selectedTag === 'all') return projects;
	return projects.filter((project) => project.tag === selectedTag);
}

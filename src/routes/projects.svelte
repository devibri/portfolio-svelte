<script lang="ts">
	import { filterProjectsByTag, getAvailableTags } from '../lib/projectFilters';

	type ProjectLink = {
		label: string;
		href: string;
	};

	function getProjectLinks(project: { urls?: Array<Record<string, string | undefined>>; url?: string }): ProjectLink[] {
		if (Array.isArray(project.urls)) {
			const links: ProjectLink[] = [];

			for (const entry of project.urls) {
				for (const [label, href] of Object.entries(entry)) {
					if (typeof href === 'string' && href) links.push({ label, href });
				}
			}

			if (links.length > 0) {
				return links;
			}
		}

		if (project.url) {
			return [{ label: 'Check it out', href: project.url }];
		}

		return [];
	}

	let selectedTag = 'all';

	let projects = [
		{
			id: 'letterlock',
			tag: 'tools',
			name: 'Letter Lock Puzzle Generator',
			role: 'Full-Stack Developer',
			slug: 'letterlock.jpg',
			with: 'Take-Two AI',
			description: "A puzzle generator and editor for the Letter Lock minigame in <em>Words with Friends</em>. Allows designers to generate, edit, and playtest puzzles in the browser. Uses constraint-solving and LLM integration to generate words and puzzles based on inputted puzzle size and theme.",
			tools: ['Python', 'Svelte', 'Typescript', 'AWS', 'LLMs', 'Procedural Content Generation'],
			urls: []
		},
				{
			id: 'match-3',
			tag: 'tools',
			name: 'Match-3 Level Generator',
			role: 'Full-Stack Developer',
			with: 'Zynga Applied AI',
			slug: 'twodots.png',
			description: "A level generator and editor for Match-3 games, created for <em>Harry Potter: Puzzles and Spells</em> and <em>Two Dots</em>. Allows designers to generate and edit levels in-browser using a graphical painting tool, speeding up design time and visualization. Uses PCG system to build valid levels with requested inputs like hazards and symmetry.",
			tools: ['Python', 'Svelte', 'Typescript', 'AWS', 'Procedural Content Generation'],
			urls: []
		},
		{
			id: 'doggone_detective',
			tag: 'games',
			name: 'Dog Gone Detective',
			role: 'Unreal Developer',
			with: 'Idisen Game Jam',
			slug: 'doggone.png',
			description: 'A mystery game where you play as a world-class (dog) investigator. Gather clues by speaking to the witnesses - or accuse a suspect! Created as part of the Idisen Game Jam, 2025.',
			tools: ['Unreal Engine', 'point-and-click', 'branching dialog'],
			urls: [
				{
					"Play Now": "https://idisen.itch.io/dog-gone-detective"
				}
			]
		},
		{
			id: 'ttrpg',
			tag: 'tools',
			name: 'TTRPG Game Master Assistant',
			role: 'Researcher + Developer',
			with: 'Expressive Intelligence Studio @ UCSC',
			slug: 'ttrpg2.png',
			description: 'A co-creative AI assistant for game masters of tabletop roleplaying games. Developed based on interviews with game masters, uses Prolog-based constraint-solving over a Cthulhu Confidential game module to visualize information about the game world and provide suggestions for what can happen next based on the player\'s past actions.',
			tools: ['Prolog', 'JavaScript', 'Research Study'],
			urls: [
				{
					"Read More": "https://devibri.github.io/CompExamPortfolio/ttrpg.html"
				},
				{
					"GitHub Repo": "https://github.com/devibri/FatalFrequenciesFrontend"
				},
				{
					"Demo": "https://devibri.github.io/FatalFrequenciesFrontend"
				}
			]
		},
		{
			id: 'warmer',
			priority: true,
			tag: 'games',
			name: 'Warmer',
			role: 'Unity Developer',
			slug: 'warmer.png',
			description: 'An NSF-funded game about climate change and human impacts on the environment using real environmental models, designed to help students learn about the impacts of actions on global emissions. Includes interactive minigames where players can enact legislation, protest emissions, and fight wildfires, seeing the effects of these actions on global temperatures.',
			tools: ['Unity', 'point-and-click', 'systemic design'],
			with: 'NSF-funded research group @ UCSC',
			urls: [
				{
					"GitHub Repo": "https://github.com/devibri/UCSCClimateGame"
				},
								{
					"Play Now": "https://devibri.github.io/ClimateGamePlayable/"
				}
			]
		},
		{
			id: 'vr',
			tag: 'games',
			role: 'Researcher + Unity Developer',
			name: 'Spatial Cognition in Virtual Reality',
			slug: 'vr.jpg',
			with: 'Iowa State University',
			description: 'A virtual reality research game developed in Unity to help study the effects of different VR navigation methods on spatial orientation, including usage of landmarks, walking and turning, teleporting, and mixed physical and virtual navigation.',
			tools: ['Unity', 'Virtual Reality', 'Research Study'],
			urls: [
				{
					"Read the Paper": "https://devibri.github.io/CompExamPortfolio/ttrpg.html"
				},
				{
					"GitHub Repo": "https://github.com/devibri/ViveGame"
				}
			]
		},
		{
			id: 'escaperoom',
			tag: 'games',
			role: 'Mentor',
			name: 'VR / Physical Escape Room',
			slug: 'escape.png',
			with: 'UCSC Science Internship Program',
			description: "An escape room made in Unity with asymmetrical puzzle-solving in physical and virtual reality spaces. Served as co-mentor teaching research and game development techniques to high schoolers.",
			tools: ['Unity', 'Virtual Reality'],
			urls: [
				{
					"Read More": "https://devibri.github.io/CompExamPortfolio/escaperoom.html"
				},
				{
					"GitHub Repo": "https://github.com/devibri/SIP-Unity-Escape-Room"
				}
			]
		},
		{
			id: 'terasology',
			priority: false,
			tag: 'games',
			name: 'Terasology: Light and Shadow',
			role: 'Java Developer',
			with: 'Google Summer of Code',
			slug: 'terasology.jpg',
			description: 'A capture-the-flag game mode made for open-source voxel game Terasology, made as part of Google Summer of Code.',
			tools: ['Java', 'open-source', 'multiplayer', 'first-person'],
			urls: [
				{
					"Read More": "https://dacharya64.postach.io/post/gsoc-final-project-wrapup"
				},
				{
					"GitHub Repo": "https://github.com/Terasology/LightAndShadow"
				}
			],
		},
		{
			id: 'fusion',
			tag: 'games',
			name: 'Fusion Galaxy',
			role: 'Lead Artist',
			with: 'Massachusetts Digital Games Institute',
			slug: 'cl.jpg',
			description: 'A mobile game about collecting and crafting elements together to discover the universe, made with the Massachusetts Digital Games Institute.',
			tools: ['Unity', 'Photoshop'],
			urls: [
				{
					"Play Now": "https://apps.apple.com/us/app/fusion-galaxy/id999077925#?platform=ipad"
				},
				{
					"Trailer": "https://www.youtube.com/watch?v=umY061u91Dw"
				}
			],
		},
		{
			id: 'red_survivor',
			tag: 'games',
			name: 'Red Survivor',
			role: 'UI Artist',
			with: 'Mustachio Games',
			slug: 'rs2.png',
			description: 'A strategy game where the player fights to survive against killer robots in a war-torn Russia. Shown at Boston Festival of Indie Games, 2014.',
			tools: ['Unity', 'Photoshop', 'point-and-click'],
			urls: [
				{
					"Play Now": "https://mustachiogames.itch.io/red-survivor"
				}
			]
		}
		// {
		// 	id: 'if',
		// 	priority: false,
		// 	tag: 'games',
		// 	name: 'The Abyss and The Ark',
		// 	role: 'Writer',
		// 	slug: 'abyss.jpg',
		// 	description: 'Authored and co-authored several interactive fiction games, including The Abyss--a surreal exploration of the mind--and The Ark--a puzzle game set aboard a derelict spaceship.',
		// 	url: 'https://textadventures.co.uk/games/view/ob1-nceir0a6dpocknuxyw/the-abyss'
		// }
	];

	$: availableTags = getAvailableTags(projects);
	$: filteredProjects = filterProjectsByTag(projects, selectedTag);
</script>

<section class="projects">
	<section class="other-projects">
		<div class="mb-6 flex flex-wrap items-center justify-center gap-3">
			{#each availableTags as tag}
				<button
					type="button"
					class:variant-filled-primary={selectedTag === tag}
					class:variant-soft-primary={selectedTag !== tag}
					class="btn btn-md md:btn-lg capitalize"
					on:click={() => (selectedTag = tag)}
				>
					{tag}
				</button>
			{/each}
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
			{#each filteredProjects as project}
				<div class="card card-hover flex flex-col">
					<img src="/img/{project.slug}" class="rounded-lg w-full h-60 object-cover" alt="Thumbnail for project {project.name}" />
					<section class="p-6">
						<h3 class="h3">{project.name}</h3>
						<h4 class="h4">
							<strong>{project.role}</strong>{#if project.with}<span class="project-role-detail">, {project.with}</span>{/if}
						</h4>
						{#if Array.isArray(project.tools) && project.tools.length > 0}
							<div class="tool-chip-container">
								{#each project.tools as tool}
									<span class="tool-chip">{tool}</span>
								{/each}
							</div>
						{/if}
						<p>{@html project.description}</p>
					</section>
					<footer class="card-footer mt-auto">
						<div class="cardbuttoncontainer">
							{#each getProjectLinks(project) as link}
								<a href={link.href} type="button" class="btn variant-filled cardbutton">
									<span>{link.label}</span>
								</a>
							{/each}
						</div>
					</footer>
				</div>
			{/each}
		</div>
	</section>
</section>

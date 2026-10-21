<script context="module" lang="ts">
	export type Filter = 'all' | 'tools' | 'games';
</script>

<script lang="ts">
	import { tick } from 'svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Cards glide to their new grid slots when a filter is clicked. Filters set from the URL apply
	// instantly, and motion is skipped for reduced-motion users.
	let motion = 0;

	type ProjectLink = {
		label: string;
		href: string;
		external: boolean;
	};


	function getProjectLinks(project: { urls?: Array<Record<string, string | undefined>>; url?: string; page?: string }): ProjectLink[] {
		const links: ProjectLink[] = [];

		if (project.page) {
			links.push({ label: 'Case Study', href: project.page, external: false });
		}

		for (const entry of project.urls ?? []) {
			for (const [label, href] of Object.entries(entry)) {
				if (typeof href === 'string' && href) links.push({ label, href, external: href.startsWith('http') });
			}
		}

		if (links.length === 0 && project.url) {
			links.push({ label: 'Check it out', href: project.url, external: true });
		}

		return links;
	}

	const filters: Array<{ id: Filter; label: string }> = [
		{ id: 'all', label: 'All' },
		{ id: 'tools', label: 'AI + Tools' },
		{ id: 'games', label: 'Games' }
	];

	export let activeFilter: Filter = 'all';
	let grid: HTMLElement;

	// The flip animation measures cards while old ones are removed and before new ones are added,
	// so the page briefly shrinks and the browser clamps the scroll position. Hold the grid's
	// height until the new cards are in place; content-start keeps the rows from stretching to fill it.
	async function setFilter(filter: Filter) {
		motion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1;
		grid.style.minHeight = `${grid.offsetHeight}px`;
		activeFilter = filter;
		await tick();
		grid.style.minHeight = '';
	}

	const projects = [
		{
			id: 'letterlock',
			tag: 'tools',
			name: 'Letter Lock Puzzle Generator',
			role: 'Full-Stack Developer',
			slug: 'letterlock.jpg',
			with: 'Take-Two AI',
			tagline: 'A creativity support tool for generating word puzzles using procedural content generator and LLMs, speeding up puzzle design time for <em>Words with Friends</em> team.',
			description:
				'A puzzle generator and editor for the Letter Lock minigame in <em>Words with Friends</em>. Allows designers to generate, edit, and playtest puzzles in the browser. Uses constraint-solving and LLM integration to generate words and puzzles based on inputted puzzle size and theme.',
			tools: ['Python', 'Typescript', 'AWS', 'LLM', 'PCG'],
			urls: []
		},
		{
			id: 'match-3',
			tag: 'tools',
			name: 'Match-3 Level Generator',
			role: 'Full-Stack Developer',
			with: 'Zynga Applied AI',
			slug: 'twodots.png',
			tagline: 'A tool for generating levels for Match-3 games, made for <em>Harry Potter: Puzzles and Spells</em> and <em>Two Dots</em> game teams to support rapid level design.',
			description:
				'A level generator and editor for Match-3 games, created for <em>Harry Potter: Puzzles and Spells</em> and <em>Two Dots</em>. Allows designers to generate and edit levels in-browser using a graphical painting tool, speeding up design time and visualization. Uses PCG system to build valid levels with requested inputs like hazards and symmetry.',
			tools: ['Python', 'Typescript', 'AWS', 'PCG'],
			urls: []
		},
		{
			id: 'doggone_detective',
			tag: 'games',
			name: 'Dog Gone Detective',
			role: 'Unreal Developer',
			with: 'Idisen Game Jam',
			slug: 'doggone.png',
			tagline: 'An Unreal mystery game where you play as a dog detective questioning suspects and solving the case of the missing Grand Champion.',
			description:
				'A mystery point-and-click game where you play as a world-class (dog) investigator. Gather clues by speaking to the witnesses - or accuse a suspect! Created as part of the Idisen Game Jam, 2025.',
			tools: ['Unreal Engine', 'point-and-click', 'branching dialog'],
			urls: [
				{
					'Play Now': 'https://idisen.itch.io/dog-gone-detective'
				}
			]
		},
		{
			id: 'ep_ads',
			tag: 'tools',
			name: 'Episodic Ads',
			role: 'Unity Developer',
			with: 'Zynga Applied AI',
			slug: 'farmville.jpg',
			tagline: 'An experimental PCG system for procedural ads, changing the contents of future ads based on previous ad choices, helping to increase ad engagement.',
			description:
				"A system for creating short-form, emergent narrative games in Unity using social simulation to model characters' reactions to player choices. Uses <em>Farmville</em> as an example setting, but uses setting-agnostic JSON to support playable experiences for any scenario with custom images, dialog, and stats.",
			tools: ['Unity', 'procedural narrative', 'storylets', 'choice-based', 'systemic design'],
			urls: []
		},
		{
			id: 'ttrpg',
			page: '/ttrpg',
			tag: 'tools',
			name: 'TTRPG Game Master Assistant',
			role: 'Researcher + Developer',
			with: 'Expressive Intelligence Studio',
			slug: 'ttrpg2.png',
			tagline: 'A creativity support tool for game masters of tabletop roleplaying games using an underlying model of the game world to provide improv suggestions.',
			description:
				"A co-creative AI assistant for game masters of tabletop roleplaying games. Developed based on interviews with game masters, the tool uses Prolog-based constraint-solving over a Cthulhu Confidential game module to visualize information about the game world and provide suggestions for what can happen next based on the player's past actions.",
			tools: ['Prolog', 'JavaScript', 'Research'],
			urls: [
				{
					'GitHub Repo': 'https://github.com/devibri/FatalFrequenciesFrontend'
				},
				{
					Demo: 'https://devibri.github.io/FatalFrequenciesFrontend'
				}
			]
		},
		{
			id: 'warmer',
			page: '/warmer',
			priority: true,
			tag: 'games',
			name: 'Warmer',
			role: 'Unity Developer',
			slug: 'warmer.png',
			tagline: 'A Unity game that teaches about human impact on climate change by letting students interact with real climate models through a series of minigames.',
			description:
				'An NSF-funded game about climate change and human impacts on the environment using real environmental models, designed to help students learn about the impacts of actions on global emissions. Includes interactive minigames where players can enact legislation, protest emissions, and fight wildfires, seeing the effects of these actions on global temperatures.',
			tools: ['Unity', 'point-and-click', 'systemic design'],
			with: 'NSF-funded research group @ UCSC',
			urls: [
				{
					'GitHub Repo': 'https://github.com/devibri/UCSCClimateGame'
				},
				{
					'Play Now': 'https://devibri.github.io/ClimateGamePlayable/'
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
			tagline: 'A virtual reality research game developed in Unity to help study the effects of different VR navigation methods on spatial orientation.',
			description:
				'A virtual reality research game developed in Unity to help study the effects of different VR navigation methods on spatial orientation, including usage of landmarks, walking and turning, teleporting, and mixed physical and virtual navigation.',
			tools: ['Unity', 'Virtual Reality', 'Research'],
			urls: [
				{
					'Read the Paper': '/papers/spatial.pdf'
				},
				{
					'GitHub Repo': 'https://github.com/devibri/ViveGame'
				}
			]
		},
		{
			id: 'escaperoom',
			page: '/escaperoom',
			tag: 'games',
			role: 'Mentor',
			name: 'VR / Physical Escape Room',
			slug: 'escape.png',
			with: 'UCSC Science Internship Program',
			tagline: 'An escape room made in Unity with asymmetrical puzzle-solving in physical and virtual reality spaces.',
			description:
				'An escape room made in Unity with asymmetrical puzzle-solving in physical and virtual reality spaces. Served as co-mentor teaching research and game development techniques to high schoolers.',
			tools: ['Unity', 'Virtual Reality'],
			urls: [
				{
					'GitHub Repo': 'https://github.com/devibri/SIP-Unity-Escape-Room'
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
			tagline: 'A capture-the-flag game mode made for open-source voxel game Terasology.',
			description: 'A capture-the-flag game mode made for open-source voxel game Terasology, made as part of Google Summer of Code.',
			tools: ['Java', 'open-source', 'multiplayer'],
			urls: [
				{
					'Read More': 'https://dacharya64.postach.io/post/gsoc-final-project-wrapup'
				},
				{
					'GitHub Repo': 'https://github.com/Terasology/LightAndShadow'
				}
			]
		},
		{
			id: 'fusion',
			page: '/fusion',
			tag: 'games',
			name: 'Fusion Galaxy',
			role: 'Lead Artist',
			with: 'Massachusetts Digital Games Institute',
			slug: 'cl.jpg',
			tagline: 'A Unity mobile game about collecting and crafting elements together to discover the universe.',
			description: 'A mobile game about collecting and crafting elements together to discover the universe, made with the Massachusetts Digital Games Institute.',
			tools: ['Unity', 'Photoshop'],
			urls: [
				{
					'Play Now': 'https://apps.apple.com/us/app/fusion-galaxy/id999077925#?platform=ipad'
				},
				{
					Trailer: 'https://www.youtube.com/watch?v=umY061u91Dw'
				}
			]
		},
		{
			id: 'red_survivor',
			tag: 'games',
			name: 'Red Survivor',
			role: 'UI Artist',
			with: 'Mustachio Games',
			slug: 'rs2.png',
			tagline: 'A Unity strategy game where the player fights to survive against killer robots in a war-torn Russia. Shown at Boston Festival of Indie Games, 2014.',
			description: 'A strategy game where the player fights to survive against killer robots in a war-torn Russia. Shown at Boston Festival of Indie Games, 2014.',
			tools: ['Unity', 'Photoshop', 'point-and-click'],
			urls: [
				{
					'Play Now': 'https://mustachiogames.itch.io/red-survivor'
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

	$: filteredProjects = activeFilter === 'all' ? projects : projects.filter((project) => project.tag === activeFilter);
</script>

<section class="projects">
	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<h2 class="h2 section-title !mb-0">Projects</h2>
		<div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
			{#each filters as filter}
				<button
					type="button"
					class="chip"
					class:variant-filled-primary={activeFilter === filter.id}
					class:variant-soft={activeFilter !== filter.id}
					aria-pressed={activeFilter === filter.id}
					on:click={() => setFilter(filter.id)}>
					{filter.label}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid grid-cols-1 content-start gap-8 md:grid-cols-2 xl:grid-cols-3" bind:this={grid}>
		{#each filteredProjects as project (project.id)}
			<article
				class="card card-hover group flex flex-col overflow-hidden"
				animate:flip={{ duration: 450 * motion, easing: cubicOut }}
				in:scale={{ start: 0.92, duration: 300 * motion, delay: 200 * motion, easing: cubicOut }}>
				<a href={project.page ?? getProjectLinks(project)[0]?.href} class="block overflow-hidden" tabindex="-1" aria-hidden="true">
					<img src="/img/{project.slug}" class="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" alt="" loading="lazy" />
				</a>
				<section class="flex flex-1 flex-col gap-3 p-6">
					<h3 class="h3 font-bold">
						{#if project.page}
							<a href={project.page} class="hover:text-primary-500 transition-colors">{project.name}</a>
						{:else}
							{project.name}
						{/if}
					</h3>
					<p class="text-sm">
						<span class="font-semibold text-primary-600 dark:text-primary-400">{project.role}</span>{#if project.with}<span class="muted">{' · '}{project.with}</span>{/if}
					</p>
					{#if Array.isArray(project.tools) && project.tools.length > 0}
						<div class="flex flex-wrap gap-1.5">
							{#each project.tools as tool}
								<span class="tool-chip">{tool}</span>
							{/each}
						</div>
					{/if}
					{#if project.tagline}
						<p class="text-sm leading-relaxed">{@html project.tagline}</p>
					{/if}
					<!-- <details class="group/desc text-sm">
						<summary class="cursor-pointer select-none font-semibold text-primary-600 dark:text-primary-400">
							<span class="group-open/desc:hidden">Show details</span><span class="hidden group-open/desc:inline">Hide details</span>
						</summary>
						<p class="muted mt-2 leading-relaxed">{@html project.description}</p>
					</details> -->
				</section>
				{#if getProjectLinks(project).length > 0}
					<footer class="card-footer flex flex-wrap justify-center gap-2">
						{#each getProjectLinks(project) as link, i}
							<a href={link.href} class="btn btn-sm {i === 0 ? 'variant-filled-primary' : 'variant-ghost-primary'}">
								<span>{link.label}</span>
								<i class="fa-solid {link.external ? 'fa-arrow-up-right-from-square' : 'fa-arrow-right'} text-xs" aria-hidden="true"></i>
							</a>
						{/each}
					</footer>
				{/if}
			</article>
		{/each}
	</div>
</section>

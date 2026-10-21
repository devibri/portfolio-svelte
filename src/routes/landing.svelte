<script lang="ts">
	import Publications from './publications.svelte';
	import Projects, { type Filter } from './projects.svelte';
	import Bio from './bio.svelte';
	import Speaking from './speaking.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { tick } from 'svelte';
	import { afterNavigate, replaceState } from '$app/navigation';
	import { page } from '$app/stores';

	const sections = [
		{ id: 'projects', label: 'Projects' },
		{ id: 'publications', label: 'Publications' },
		{ id: 'speaking', label: 'Speaking + Mentorship' }
	] as const;

	type SectionId = (typeof sections)[number]['id'];
	type View = { section: SectionId; filter?: Filter };

	// Paths that open a section or project filter directly, e.g. /games or /publications.
	// The route only matches names listed in src/params/view.ts.
	const viewTargets: Record<string, View> = {
		projects: { section: 'projects', filter: 'all' },
		ai: { section: 'projects', filter: 'tools' },
		tools: { section: 'projects', filter: 'tools' },
		games: { section: 'projects', filter: 'games' },
		publications: { section: 'publications' },
		speaking: { section: 'speaking' }
	};

	function pathFor(section: SectionId, filter: Filter) {
		if (section !== 'projects') return `/${section}`;
		return filter === 'tools' ? '/ai' : filter === 'games' ? '/games' : '/projects';
	}

	// Rendered straight from the URL, so the server sends the right section and filter
	const initial = viewTargets[$page.params.view ?? ''];
	let activeSection: SectionId = initial?.section ?? 'projects';
	let projectFilter: Filter = initial?.filter ?? 'all';
	// 1 = wipe left (moving forward), -1 = wipe right (moving back)
	let direction = 1;
	// Off until the first navigation finishes so the page doesn't wipe in on load
	let animate = false;
	let tabs: HTMLElement;
	// The view as of the last URL sync, so the URL only changes when the visitor changes the view
	let syncedPath = pathFor(activeSection, projectFilter);

	// Runs on load and on links or back/forward between views; scroll to the tabs when the URL names one
	afterNavigate(async ({ type }) => {
		const target = viewTargets[$page.params.view ?? ''];
		if (type !== 'enter') {
			selectSection(target?.section ?? 'projects');
			projectFilter = target?.filter ?? 'all';
			syncedPath = pathFor(activeSection, projectFilter);
		}
		if (target) {
			await tick();
			tabs.scrollIntoView({ behavior: animate ? 'smooth' : 'instant', block: 'start' });
		}
		animate = true;
	});

	// Keep the URL in step with what's shown so it can be copied and shared, without adding
	// history entries or scrolling
	$: if (animate) {
		const path = pathFor(activeSection, projectFilter);
		if (path !== syncedPath) {
			syncedPath = path;
			replaceState(path, {});
		}
	}

	function selectSection(id: SectionId) {
		if (id === activeSection) return;
		const ids = sections.map((section) => section.id);
		direction = ids.indexOf(id) > ids.indexOf(activeSection) ? 1 : -1;
		activeSection = id;
	}

	const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Clip-path wipe plus a slight slide. The incoming and outgoing panes share the
	// same wipe edge, so the new section appears to push the old one off screen.
	function wipe(node: Element, { outgoing }: { outgoing: boolean }) {
		const dir = direction;
		return {
			duration: !animate || prefersReducedMotion() ? 0 : 550,
			easing: cubicInOut,
			css: (t: number, u: number) => {
				const edge = outgoing ? u : 1 - u;
				const clip = dir > 0 ? (outgoing ? `inset(0 ${edge * 100}% 0 0)` : `inset(0 0 0 ${(1 - edge) * 100}%)`) : outgoing ? `inset(0 0 0 ${edge * 100}%)` : `inset(0 ${(1 - edge) * 100}% 0 0)`;
				const shift = (outgoing ? -dir : dir) * u * 8;
				return `clip-path: ${clip}; transform: translateX(${shift}%); opacity: ${0.4 + 0.6 * t};`;
			}
		};
	}
</script>

<Bio />
<div class="section-divider" aria-hidden="true"></div>
<div class="my-10 flex scroll-mt-24 justify-center" bind:this={tabs}>
	<div class="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Show projects or publications">
		{#each sections as section}
			<button
				type="button"
				role="tab"
				id="tab-{section.id}"
				aria-selected={activeSection === section.id}
				aria-controls="panel-{section.id}"
				class="btn rounded-full px-6 py-2 text-base font-semibold md:px-8 md:text-lg"
				class:variant-filled-primary={activeSection === section.id}
				class:variant-soft-primary={activeSection !== section.id}
				on:click={() => selectSection(section.id)}>
				{section.label}
			</button>
		{/each}
	</div>
</div>
<div class="section-stage">
	{#each sections as section (section.id)}
		{#if activeSection === section.id}
			<div class="section-pane" role="tabpanel" id="panel-{section.id}" aria-labelledby="tab-{section.id}" in:wipe={{ outgoing: false }} out:wipe={{ outgoing: true }}>
				{#if section.id === 'projects'}
					<Projects bind:activeFilter={projectFilter} />
				{:else if section.id === 'publications'}
					<Publications />
				{:else}
					<Speaking />
				{/if}
			</div>
		{/if}
	{/each}
</div>

<style>
	/* Stack panes in the same grid cell so they overlap while wiping */
	.section-stage {
		display: grid;
		overflow-x: clip;
	}

	.section-pane {
		grid-area: 1 / 1;
		min-width: 0;
	}
</style>

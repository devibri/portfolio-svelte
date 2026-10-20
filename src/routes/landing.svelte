<script lang="ts">
	import Publications from './publications.svelte';
	import Projects from './projects.svelte';
	import Bio from './bio.svelte';
	import Speaking from './speaking.svelte';
	import { cubicInOut } from 'svelte/easing';

	const sections = [
		{ id: 'projects', label: 'Projects' },
		{ id: 'publications', label: 'Publications' },
		{ id: 'speaking', label: 'Speaking + Mentorship' }
	] as const;

	type SectionId = (typeof sections)[number]['id'];

	let activeSection: SectionId = 'projects';
	// 1 = wipe left (moving forward), -1 = wipe right (moving back)
	let direction = 1;

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
			duration: prefersReducedMotion() ? 0 : 550,
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
<div class="my-10 flex justify-center">
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
					<Projects />
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

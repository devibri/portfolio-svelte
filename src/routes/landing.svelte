<script lang="ts">
	import Publications from './publications.svelte';
	import Projects from './projects.svelte';
	import Bio from './bio.svelte';

	const sections = [
		{ id: 'projects', label: 'Projects' },
		{ id: 'publications', label: 'Publications' }
	] as const;

	let activeSection: (typeof sections)[number]['id'] = 'projects';
</script>

<Bio />
<div class="section-divider" aria-hidden="true"></div>
<div class="my-8 flex justify-center">
	<div class="btn-group variant-soft-primary" role="tablist" aria-label="Show projects or publications">
		{#each sections as section}
			<button
				type="button"
				role="tab"
				id="tab-{section.id}"
				aria-selected={activeSection === section.id}
				aria-controls="panel-{section.id}"
				class="btn-lg md:text-xl font-bold"
				class:variant-filled-primary={activeSection === section.id}
				on:click={() => (activeSection = section.id)}
			>
				{section.label}
			</button>
		{/each}
	</div>
</div>
<div role="tabpanel" id="panel-{activeSection}" aria-labelledby="tab-{activeSection}">
	{#if activeSection === 'projects'}
		<Projects />
	{:else}
		<Publications />
	{/if}
</div>

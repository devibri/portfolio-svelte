<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let image: string | undefined = undefined;
</script>

<svelte:head>
	<title>{title} | Devi Acharya</title>
	<meta name="description" content={subtitle} />
</svelte:head>

<article class="projectpage page-container max-w-3xl py-12 md:py-16">
	<a href="/" class="anchor mb-8 inline-flex items-center gap-2 text-sm font-semibold no-underline">
		<i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back to projects
	</a>

	<header class="mb-10">
		<h1 class="h1 font-bold leading-tight">{title}</h1>
		<p class="muted mt-4 text-lg md:text-xl">{subtitle}</p>
		{#if image}
			<img src={image} alt="" class="mt-8 aspect-video w-full rounded-xl object-cover shadow-xl" />
		{/if}
	</header>

	<slot />

	{#if $$slots.actions}
		<div class="mt-12 flex flex-wrap justify-center gap-4 border-t border-surface-500/20 pt-10">
			<slot name="actions" />
		</div>
	{/if}
</article>

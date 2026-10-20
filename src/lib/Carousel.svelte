<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let slides: Array<{ src: string; alt: string; caption?: string }>;
	export let interval = 6000;
	export let label = 'Image carousel';

	let current = 0;
	let hovered = false;
	let focused = false;
	let userPaused = false;
	let reducedMotion = false;
	let timer: ReturnType<typeof setInterval> | undefined;

	$: paused = userPaused || hovered || focused || reducedMotion;
	$: restart(paused);

	function restart(_paused?: boolean) {
		clearInterval(timer);
		if (typeof window !== 'undefined' && !paused && slides.length > 1) {
			timer = setInterval(() => (current = (current + 1) % slides.length), interval);
		}
	}

	function go(index: number) {
		current = (index + slides.length) % slides.length;
		restart();
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		restart();
	});

	onDestroy(() => clearInterval(timer));
</script>

<div
	class="carousel"
	role="region"
	aria-roledescription="carousel"
	aria-label={label}
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	on:focusin={() => (focused = true)}
	on:focusout={() => (focused = false)}>
	<div class="card relative aspect-[4/3] overflow-hidden bg-surface-200 dark:bg-surface-800">
		{#each slides as slide, i}
			<figure
				class="absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none"
				class:opacity-0={i !== current}
				class:pointer-events-none={i !== current}
				role="group"
				aria-roledescription="slide"
				aria-label="{i + 1} of {slides.length}"
				aria-hidden={i !== current}>
				<img src={slide.src} alt={slide.alt} class="h-full w-full object-contain" loading={i === 0 ? 'eager' : 'lazy'} />
			</figure>
		{/each}

		{#if slides.length > 1}
			<button type="button" class="carousel-arrow left-2" aria-label="Previous image" on:click={() => go(current - 1)}>
				<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
			</button>
			<button type="button" class="carousel-arrow right-2" aria-label="Next image" on:click={() => go(current + 1)}>
				<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
			</button>
		{/if}
	</div>

	{#if slides[current].caption}
		<p class="muted mt-3 text-center text-sm" aria-live={paused ? 'polite' : 'off'}>{slides[current].caption}</p>
	{/if}

	{#if slides.length > 1}
		<div class="mt-3 flex items-center justify-center gap-3">
			<button type="button" class="carousel-control" aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'} on:click={() => (userPaused = !userPaused)}>
				<i class="fa-solid {userPaused ? 'fa-play' : 'fa-pause'} text-xs" aria-hidden="true"></i>
			</button>
			{#each slides as _, i}
				<button
					type="button"
					class="h-2.5 rounded-full transition-all {i === current ? 'w-6 bg-primary-500' : 'w-2.5 bg-surface-400 hover:bg-surface-500 dark:bg-surface-500'}"
					aria-label="Show image {i + 1}"
					aria-current={i === current}
					on:click={() => go(i)}></button>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.carousel-arrow {
		@apply absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface-900/50 text-white backdrop-blur transition-colors hover:bg-primary-500;
	}

	.carousel-control {
		@apply flex h-6 w-6 items-center justify-center rounded-full text-surface-600 transition-colors hover:text-primary-500 dark:text-surface-300;
	}
</style>

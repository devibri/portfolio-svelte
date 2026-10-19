<script>
	import Gears from './gears.svelte';

	const education = [
		{ degree: 'M.S.', field: ['Computational Media'], school: 'University of California, Santa Cruz' },
		{ degree: 'B.A.', field: ['Computer Science', 'Film, TV, and Interactive Media'], school: 'Brandeis University' }
	];

	const contacts = [
		{ label: 'Email me', href: 'mailto:devi@devi.rocks', icon: 'fa-solid fa-envelope' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/dacharya/', icon: 'fa-brands fa-linkedin' },
		{ label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=cfJU7JgAAAAJ&hl=en', icon: 'fa-brands fa-google-scholar' }
	];
</script>

<div class="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
	<img
		class="aspect-square w-44 shrink-0 rounded-full object-cover shadow-xl ring-4 ring-primary-500/40 ring-offset-4 ring-offset-surface-50 dark:ring-offset-surface-900 md:w-56"
		src="/img/devi.jpg"
		alt="Portrait of Devi Acharya" />

	<div class="flex flex-col gap-5 text-center md:text-left">
		<h1 class="h1 font-bold">
			<span class="text-primary-500"><Gears /></span>
			Hi, I'm <strong>Devi Acharya</strong>
		</h1>
		<p class="text-lg leading-relaxed md:text-xl">
			I develop applied AI tools for game studios to help accelerate design and development as a part of Take-Two Interactive's AI team. I'm experienced working with client teams to understand their
			needs and build tools and prototypes to support them, ranging from procedural content generators with LLM integration to Unity games and full-stack web applications.
		</p>

		<ul class="muted flex flex-col gap-1 text-sm md:text-base">
			{#each education as item}
				<li class="flex items-start justify-center gap-2 md:justify-start">
					<i class="fa-solid fa-graduation-cap mt-1 opacity-70" aria-hidden="true"></i>
					<span>
						{item.degree} in
						{#each item.field as field, i}{#if i > 0}{' and '}{/if}<strong>{field}</strong>{/each}, {item.school}
					</span>
				</li>
			{/each}
		</ul>

		<div class="flex flex-wrap justify-center gap-3 md:justify-start">
			{#each contacts as contact}
				<a class="btn btn-sm variant-soft-primary" href={contact.href}>
					<i class={contact.icon} aria-hidden="true"></i>
					<span>{contact.label}</span>
				</a>
			{/each}
		</div>
	</div>
</div>

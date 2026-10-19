<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Gears from './gears.svelte';

	const socialLinks = [
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/dacharya/', icon: 'fa-brands fa-linkedin' },
		{ label: 'GitHub', href: 'https://github.com/devibri', icon: 'fa-brands fa-github' },
		{ label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=cfJU7JgAAAAJ&hl=en', icon: 'fa-brands fa-google-scholar' },
		{ label: 'Email', href: 'mailto:devi@devi.rocks', icon: 'fa-solid fa-envelope' }
	];
</script>

<header class="sticky top-0 z-20 border-b border-surface-500/10 bg-surface-50/75 backdrop-blur dark:bg-surface-900/75">
	<div class="page-container flex items-center justify-between gap-4 py-3">
		<a href="/" class="flex items-center gap-2 font-heading-token text-lg font-semibold sm:text-xl">
			<strong>Devi Acharya</strong>
			<span class="hidden items-center gap-2 sm:inline-flex">
				<span class="opacity-40">|</span>
				<Gears /> AI + Games
			</span>
		</a>

		<nav aria-label="Social links">
			<ul class="flex items-center gap-4 sm:gap-6">
				{#each socialLinks as link}
					<li>
						<a class="header-social-link" href={link.href} aria-label={link.label} title={link.label}>
							<i class={link.icon}></i>
						</a>
					</li>
				{/each}
				<li><LightSwitch /></li>
			</ul>
		</nav>
	</div>
</header>

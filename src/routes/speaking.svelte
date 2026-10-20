<script>
	const engagements = [
		{
			role: 'Instructor and Speaker',
			event: 'Girl Scouts Digital Game Design Workshop',
			host: 'Strong Museum of Play',
			date: 'June 2026'
		},
		{
			role: 'Roundtable Speaker',
			event: 'Pathways After a Degree in Film, Games & Media Studies',
			host: 'North Carolina State University',
			date: 'March 2026'
		},
		{
			role: 'Industry Mentor',
			event: 'Industry Review - Game Design',
			host: 'Champlain College',
			date: 'Oct - Nov 2025'
		},
		{
			role: 'Roundtable Speaker',
			event: 'Women in Games - Get in the Game',
			host: 'Strong Museum of Play',
			date: 'Oct 2025'
		},
		{
			role: 'Mentor',
			event: 'Zynga x North Carolina A&T Mentorship Program',
			host: 'North Carolina A&T State University',
			date: 'Sept 2024 - May 2025'
		},
		{
			role: 'IGDA Scholar',
			event: 'Game Developers Conference',
			host: 'International Game Developers Association',
			date: 'March 2019'
		}
	];
</script>

<section class="speaking">
	<h2 class="h2 section-title">Speaking &amp; Mentorship</h2>
	<ol class="relative ml-2 border-l-2 border-primary-500/30">
		{#each engagements as engagement}
			<li class="relative mb-8 pl-8 last:mb-0">
				<span class="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-primary-500 ring-4 ring-surface-50 dark:ring-surface-900" aria-hidden="true"></span>
				<p class="muted text-xs font-semibold uppercase tracking-wider">{engagement.date}</p>
				<h3 class="h4 mt-1 font-semibold">{engagement.event}</h3>
				<p class="text-sm">
					<span class="font-semibold text-primary-600 dark:text-primary-400">{engagement.role}</span>{#if engagement.host}<span class="muted">{' · '}{engagement.host}</span>{/if}
				</p>
			</li>
		{/each}
	</ol>
</section>

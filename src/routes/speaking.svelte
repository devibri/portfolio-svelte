<script>
	import Carousel from '$lib/Carousel.svelte';

	const photos = [
		{
			src: '/img/carousel/path.jpg',
			alt: 'Devi speaking at a podium in front of a slide titled "Finding Your Path"',
			caption: 'Women in Games - Get in the Game, Strong Museum of Play'
		},
		{
			src: '/img/carousel/nc_state.jpg',
			alt: 'Four panelists seated on stage in front of an audience',
			caption: 'Pathways After a Degree in Film, Games & Media Studies, NC State'
		},
		{
			src: '/img/carousel/nc_state_poster.jpg',
			alt: 'Event poster for "Pathways After a Degree in Film, Games & Media Studies" listing Devi Acharya as a speaker',
			caption: 'Pathways After a Degree in Film, Games & Media Studies, NC State'
		}
	];

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
			role: 'Panelist',
			event: 'Storytelling and Roleplaying Games',
			date: '2021',
			host: 'GENeration Analog, Analog Game Studies'
		},
		{
			role: 'IGDA Scholar',
			event: 'Game Developers Conference',
			host: 'International Game Developers Association',
			date: 'March 2019'
		},
		{
			role: 'Panelist',
			event: 'Game Studies, Culture, Play & Practice',
			date: '2019 - 2021',
			host: 'Southwest Popular/American Culture Association'
		},
		{
			role: 'Teaching Assistant',
			event: 'Game Systems, Game Development Experience, Interactive Narrative, Foundations of Video Game Design, and Game Design Studio I, II, and III',
			host: 'University of California, Santa Cruz',
			date: '2014-2018'
		}
	];
</script>

<section class="speaking">
	<h2 class="h2 section-title">Speaking + Mentorship</h2>
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] 2xl:grid-cols-[minmax(0,1fr)_minmax(0,36rem)]">
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
		<div class="lg:sticky lg:top-24 lg:self-start">
			<Carousel slides={photos} label="Speaking and mentorship photos" />
		</div>
	</div>
</section>

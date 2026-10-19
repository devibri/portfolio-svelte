<script>
	let engagements = [
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
			role: 'Roundtable Speaker',
			event: 'Women in Games - Get in the Game',
			host: 'Strong Museum of Play',
			date: 'Oct 2025'
		},
		{
			role: 'Mentor',
			event: 'Zynga x North Carolina A&T Mentorship Program',
			host: 'Noth Carolina State University',
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
	<h1 class="h1">Speaking &amp; Mentorship</h1>
	{#each engagements as engagement}
		<div class="list-dl">
			<div class="article">
				<span class="flex-auto">
					<dt><h4 class="h4">{engagement.event}</h4></dt>
					{#if engagement.host}
						<dd>{engagement.host}</dd>
					{/if}
					<dd>
						<em>{engagement.role}</em>, {engagement.date}
					</dd>
				</span>
			</div>
		</div>
	{/each}
</section>

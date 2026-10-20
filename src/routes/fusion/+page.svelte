<script>
	import CaseStudy from '$lib/CaseStudy.svelte';
</script>

<CaseStudy title="Fusion Galaxy" subtitle="A mobile game about collecting and crafting elements to make life." image="/img/cl.jpg">
	<p>
		I worked on <em>Fusion Galaxy</em> with a team of seven, from ideation to release on the App Store and Google Play. <em>Fusion Galaxy</em> is a mobile game where players collect different elements
		as they fall down the screen, swiping them into matching buckets to collect them. Players can then use the elements that they've collected, crafting them together to discover new elements and even
		find the formula to create life itself!
	</p>

	<p>
		<em>Fusion Galaxy</em> was created as part of the Massachusetts Digital Games Institute's
		<a href="https://www.massdigi.org/programs-services/summer-innovation-program/" class="anchor"> Summer Innovation Program</a>, a program designed to help young game developers develop games and
		learn more about the games industry. I worked as the lead artist on the team, helping create an art bible and assets for the team as well as guiding the team's artists.
	</p>

	<div>
		<iframe
			src="https://www.youtube.com/embed/umY061u91Dw?si=Z1c56cEO3ZSs9EF1"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen></iframe>
	</div>
	<section class="my-8 grid grid-cols-2 gap-4 md:grid-cols-4">
		<div>
			<img class="rounded-lg" src="/img/fusion1.jpg" alt="Fusion Galaxy title screen" />
		</div>
		<div>
			<img class="rounded-lg" src="/img/fusion2.jpg" alt="Fusion Galaxy gathering screen" />
		</div>
		<div>
			<img class="rounded-lg" src="/img/fusion3.jpg" alt="Fusion Galaxy crafting screen" />
		</div>
		<div>
			<img class="rounded-lg" src="/img/fusion4.jpg" alt="Fusion Galaxy powerup screen" />
		</div>
	</section>
	<svelte:fragment slot="actions">
		<a type="button" class="btn btn-lg variant-filled-primary" href="https://apps.apple.com/us/app/fusion-galaxy/id999077925?ls=1"
			><span><i class="fa-brands fa-app-store-ios"></i></span><span>Play now on iOS!</span></a>
	</svelte:fragment>
</CaseStudy>

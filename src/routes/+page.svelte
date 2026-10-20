<script>
	import Landing from './landing.svelte';

	const description = 'Devi Acharya builds applied AI tools for game studios, from procedural content generators with LLM integration to Unity games and full-stack web apps.';
</script>

<svelte:head>
	<title>Devi Acharya | AI + Games</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="Devi Acharya | AI + Games" />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="https://www.devi.rocks/img/devi.jpg" />
	<meta property="og:type" content="website" />
</svelte:head>

<section class="page-container py-12 md:py-20">
	<Landing />
</section>

import type { ParamMatcher } from '@sveltejs/kit';

// Landing page views that have their own URL, e.g. /games or /publications.
// Keep in step with viewTargets in src/routes/landing.svelte.
export const views = ['projects', 'ai', 'tools', 'games', 'publications', 'speaking'];

export const match: ParamMatcher = (param) => views.includes(param);

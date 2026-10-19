<script lang="ts">
	// Two meshing gears drawn as SVG so each can rotate around its own center.
	// Both gears share the same tooth size (module), and the small gear spins
	// faster by the tooth ratio so the teeth stay meshed while turning.
	const MODULE = 4;
	const BIG_TEETH = 10;
	const SMALL_TEETH = 10;
	const BIG_PERIOD_SECONDS = 10;
	const MESH_ANGLE = Math.PI / 4; // small gear sits down and to the right

	function gearPath(teeth: number, phase: number) {
		const pitch = (MODULE * teeth) / 2;
		const tip = pitch + MODULE;
		const root = pitch - 1.25 * MODULE;
		const hole = pitch * 0.4;
		const step = (2 * Math.PI) / teeth;
		const point = (radius: number, angle: number) =>
			`${(radius * Math.cos(angle)).toFixed(2)} ${(radius * Math.sin(angle)).toFixed(2)}`;

		let d = '';
		for (let i = 0; i < teeth; i++) {
			const center = phase + i * step;
			d += `${i === 0 ? 'M' : 'L'} ${point(root, center - step * 0.3)} `;
			d += `L ${point(tip, center - step * 0.17)} `;
			d += `L ${point(tip, center + step * 0.17)} `;
			d += `L ${point(root, center + step * 0.3)} `;
		}
		d += 'Z ';
		// Center hole, cut out with the evenodd fill rule
		d += `M ${hole} 0 A ${hole} ${hole} 0 1 0 ${-hole} 0 A ${hole} ${hole} 0 1 0 ${hole} 0 Z`;
		return d;
	}

	const bigPitch = (MODULE * BIG_TEETH) / 2;
	const smallPitch = (MODULE * SMALL_TEETH) / 2;
	const centerDistance = bigPitch + smallPitch;

	const bigCenter = { x: bigPitch + MODULE + 2, y: bigPitch + MODULE + 2 };
	const smallCenter = {
		x: bigCenter.x + centerDistance * Math.cos(MESH_ANGLE),
		y: bigCenter.y + centerDistance * Math.sin(MESH_ANGLE)
	};
	const size = smallCenter.x + smallPitch + MODULE + 2;

	// A big-gear tooth points at the mesh point, so the small gear needs a gap there
	const bigPath = gearPath(BIG_TEETH, MESH_ANGLE);
	const smallPath = gearPath(SMALL_TEETH, MESH_ANGLE + Math.PI + Math.PI / SMALL_TEETH);

	const smallPeriodSeconds = (BIG_PERIOD_SECONDS * SMALL_TEETH) / BIG_TEETH;
</script>

<svg class="gears" viewBox="0 0 {size.toFixed(2)} {size.toFixed(2)}" aria-hidden="true">
	<g transform="translate({bigCenter.x} {bigCenter.y})">
		<path class="gear gear-big" d={bigPath} style="animation-duration: {BIG_PERIOD_SECONDS}s" />
	</g>
	<g transform="translate({smallCenter.x.toFixed(2)} {smallCenter.y.toFixed(2)})">
		<path class="gear gear-small" d={smallPath} style="animation-duration: {smallPeriodSeconds}s" />
	</g>
</svg>

<style>
	.gears {
		display: inline-block;
		width: 1.15em;
		height: 1.15em;
		vertical-align: -0.2em;
		fill: currentColor;
		overflow: visible;
	}

	.gear {
		fill-rule: evenodd;
		animation-name: spin;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	.gear-small {
		animation-direction: reverse;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.gear {
			animation: none;
		}
	}
</style>

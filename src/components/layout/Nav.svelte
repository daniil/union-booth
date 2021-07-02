<script>
	import { stores } from '@sapper/app';
	import AuthContent from 'components/auth/AuthContent.svelte';
	import ProfileNav from 'components/profile/ProfileNav.svelte';

	export let segment;

	const { session } = stores();
</script>

<style lang="scss">
	nav {
		position: relative;
		z-index: 2;
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}
	ul {
		margin: 0;
		padding: 0;
		&::after {
			content: '';
			display: block;
			clear: both;
		}
	}
	li {
		display: block;
		position: relative;
		float: left;
	}
	.right-aligned {
		float: right;
		&.admin {
			margin-right: 1rem;
		}
	}
	[aria-current] {
		position: relative;
		display: inline-block;
		&::after {
			position: absolute;
			content: '';
			width: calc(100% - 1em);
			height: 2px;
			background-color: #E8B4BC;
			display: block;
			bottom: -1px;
		}
	}
	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
	.logo-link {
		font-size: 18px;
	}
	.logo {
		margin-left: 0.2rem;
		font-family: 'Lora';
		font-weight: 500;
		font-size: 18px;
	}
</style>

<nav>
	<ul>
		<li>
			<a class="logo-link" aria-current="{segment === undefined ? 'page' : undefined}" href=".">
				🙋🏻‍♀️ <span class="logo">Union Booth</span>
			</a>
		</li>
		{#if $session.user}
			<li>
				<a rel="prefetch" aria-current="{segment === 'topics' ? 'page' : undefined}" href="/topics">
					All Topics
				</a>
			</li>
			<li class="right-aligned">
				<ProfileNav/>
			</li>
			<AuthContent role="admin">
				<li class="right-aligned admin">
					<a rel="prefetch" aria-current="{segment === 'admin' ? 'page' : undefined}" href="/admin">Admin</a>
				</li>
			</AuthContent>
		{/if}
	</ul>
</nav>

<script>
	import { stores } from '@sapper/app';
	import AuthContent from 'components/auth/AuthContent.svelte';
	import ProfileNav from 'components/profile/ProfileNav.svelte';
	import MobileNav from 'components/layout/MobileNav.svelte';

	export let segment;

	const { session } = stores();
</script>

<style lang="scss">
	nav {
		position: relative;
		z-index: 2;
		border-bottom: 1px solid rgba(222, 207, 222, 0.5);
		background-color: rgba(247, 243, 247, 0.25);
		font-weight: 300;
		padding: 0 1em;
	}
	ul {
		max-width: 1215px;
    margin: 0 auto;
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
	.nav-item {
		display: none;
		@media (min-width: 48rem) {
			display: block;
		}
	}
	.nav-item.first {
		margin-left: 2rem;
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
			background-color: #DECFDE;
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
		line-height: 20px;
	}
	.logo {
		margin-left: 0.2rem;
		font-family: 'Lora';
		font-weight: 500;
		font-size: 18px;
		color: #5B3345;
	}
	.mobile-nav {
		@media (min-width: 48rem) {
			display: none;
		}
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
			{#if $session.user.isVerified}
				<li class="nav-item first">
					<a rel="prefetch" aria-current="{segment === 'topics' ? 'page' : undefined}" href="/topics">
						All Topics
					</a>
				</li>
			{/if}
			<li class="right-aligned">
				<ProfileNav/>
			</li>
			{#if $session.user.isVerified}
				<li class="right-aligned mobile-nav">
					<MobileNav {segment}/>
				</li>
				<AuthContent role="manager">
					<li class="nav-item right-aligned admin">
						<a rel="prefetch" aria-current="{segment === 'admin' ? 'page' : undefined}" href="/admin">Admin</a>
					</li>
				</AuthContent>
			{/if}
		{/if}
	</ul>
</nav>

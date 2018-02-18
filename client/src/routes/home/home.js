import { h, Component } from "preact"
import Card from "preact-material-components/Card"
import GridList from "preact-material-components/GridList"
import Tabs from "preact-material-components/Tabs"
import "preact-material-components/Tabs/style.css"
import "preact-material-components/Card/style.css"
import Btn from "preact-material-components/Button"
import "preact-material-components/Button/style.css"
import style from "./home.scss"
import { Link } from 'preact-router'

export default class Home extends Component {
	state = {
		posts: []
	}

	async componentWillMount() {
		await fetch("http://localhost:5000/api/posts-list")
			.then(data => data.json())
			.then(data =>
				this.setState(
					{
						posts: data
					},
					this.props.onload
				)
			)
	}

	render({ loaded }, { posts }) {
		return (
			<main class={style.home}>
				<header class={style.home__header}>
					<h1
						className={[
							style.home__header__text,
							(() => (loaded ? style["home__header__text--loaded"] : ""))()
						].join(" ")}
					>
						Da Blog
					</h1>
					<button
						className={[
							style.home__header__btn,
							style["home__header__btn--left"]
						].join(" ")}
					>
						about
					</button>
					<button
						className={[
							style.home__header__btn,
							style["home__header__btn--right"]
						].join(" ")}
					>
						posts
					</button>
				</header>
				<ol class={style.home__posts}>
					{posts.map(post => (
						<li class={style.home__posts__post}>
							<Link href={`/posts/${post._id}`} className={style.home__posts__post__link}>
								<h2
									class={style.home__posts__post__link__title}
									data-text={post.Title}
								>
									{post.Title}
								</h2>
								<p className={style.home__posts__post__link__content}>
									{post.Content[0].Body.split(" ")
										.splice(0, 12)
										.join(" ")}...
								</p>
							</Link>
						</li>
					))}
				</ol>
			</main>
		)
	}
}

/**
 *
 */

import { h, Component } from "preact"
import style from "./post.scss"

export default class Post extends Component {
	state = {
		post: {},
		err: "",
		loaded: false
	}

	whenReady(err) {
		this.setState({
			loaded: true
		})
	}

	async componentWillMount() {
		// location.href.match(/\/(\w+$)/)[1]
		await fetch(`http://localhost:5000/api/posts/${this.props.matches.id}`)
			.then(data => data.json())
			.then(data => {
				this.setState(
					{
						post: data
					},
					this.whenReady
				)
			})
			.catch(err =>
				this.setState(
					{
						err
					},
					this.whenReady
				)
			)
	}

	letterAnimationHandler = e => {
		e.target.classList.add(style["post__header__title__letter--placed"])
	}

	render({}, { post, err, loaded }) {
		if (loaded && post && !err) {
			// Everything is fine AS!
			return (
				<section className={style.post}>
					<header className={style.post__header}>
						<h1 className={style.post__header__title}>
							{post.Title.split("").map((ltr, i) => (
								<span
									onAnimationEnd={this.letterAnimationHandler}
									style={`
										--delay-mult: ${i * Math.random()};
										width: ${ltr === ' ' ? '2vh' : 'auto'};
									`}
									className={style.post__header__title__letter}
								>
									{ltr}
								</span>
							))}
						</h1>
					</header>
					<main className={style.post__main}>
						{
							post.Content.map(section => (
								<article className={style.post__main__section}>
									<h2 className={style.post__main__section__subtitle}>
										{section.Subtitle}
									</h2>
									<p className={style.post__main__section__body}>
										{section.Body}
									</p>
								</article>
							))
						}
					</main>
					<footer className={style.post__footer} />
				</section>
			)
		} else if (!loaded && !err) {
			// Loader
			return <div className="loader" />
		} else if (err) {
			// Error
			return <span className="error">{err}</span>
		}
	}
}
/**
 * .map(section => (
							<article>
								<h1>{section.Subtitle}</h1>
								<p>{section.Body}</p>
							</article>
						))
 */

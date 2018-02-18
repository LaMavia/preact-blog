import { h, Component } from "preact"
import { Link } from "preact-router"
import style from "./Nav.scss"

export default class Nav extends Component {
	render({ paths }) {
		return (
			<nav class={style.nav}>
				<h1 class={style.nav__logo}>
					<Link class={style.nav__logo__link} href="/">Preact Blog</Link>
				</h1>
				<ul class={style.nav__paths}>
					{Array.isArray(paths)
						? paths.map((path, i) => (
								<li
								// style={{'--open': `calc(${this.state.open * 1})`}}
								style={`--nav-path-hsl: hsl(${(i/paths.length + 1) * 360 / 2},80%,50%);`}
									class={style.nav__paths__path}
								>
									<Link
										activeClassName={style.nav__paths__path__link_active}
										href={path.link}
										className={style.nav__paths__path__link}
									>
										{path.name}
									</Link>
								</li>
							))
						: "no proper paths"}
				</ul>
			</nav>
		)
	}
}

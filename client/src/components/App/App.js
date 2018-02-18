import { h, Component } from "preact"
import { Router } from "preact-router"

import Home from "../../routes/home/home"
import Nav from "../Nav/Nav"
import style from "./App.scss"
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
import Post from '../../routes/post/post'

export default class App extends Component {
	state = {
		paths: [
			{ name: "home", link: "/" },
			{ name: "home", link: "/" },
			{ name: "home", link: "/" },
			{ name: "home", link: "/" },
			{ name: "home", link: "/" }
		],
		loaded: false
	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url
	}

	start = () => {
		this.setState({
			loaded: true
		})
	}

	render({}, { paths, loaded }) {
		return (
			<section class={style.app} id="app" style={{ 
				'--nav-paths-length': paths.length
			 }}>
				<Nav default paths={paths} />
				<Router onChange={this.handleRoute}>
					<Home path="/" onload={this.start.bind(this)} loaded={loaded}/>
					<Post path="/posts/:id" />
				</Router>
			</section>
		)
	}
}

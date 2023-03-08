import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect } from "react"
import "@fortawesome/fontawesome-free/css/all.css"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "../styles/style.css"
import "./../styles/Loading.css"
import "./../styles/HeaderNavbar.css"
import "./../styles/HeaderMedia.css"
import "./../styles/Services.css"
import "./../styles/Tours.css"
import "./../styles/Blog.css"
import "./../styles/KnowUs.css"
import "./../styles/Contact.css"
import "./../styles/Reviews.css"
import "./../styles/Footer.css"
import "react-datetime/css/react-datetime.css"
import Layout from "./../components/Layout"

export default function App({ Component, pageProps }) {
	useEffect(() => {
		require("bootstrap/dist/js/bootstrap.bundle.min.js")
		const languaje = localStorage.getItem("lan_w")
		if (!languaje) {
			const languaje_str = navigator.language || navigator.userLanguage
			const languaje_use = languaje_str.substring(0, 2)
			localStorage.setItem("lan_w", languaje_use)
		}
	}, [])

	return (
		<>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}

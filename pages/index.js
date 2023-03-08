import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import HeaderMedia from "./../components/header/HeaderMedia"
import Services from "./../components/services/Services"
import BestTours from "./../components/tours/BestTours"
import TravelersFeedback from "./../components/reviews/TravelersFeedback"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
	return (
		<>
			<main>
				<div className="content">
					<HeaderMedia />
					<Services />
					<BestTours />
					<TravelersFeedback />
				</div>
			</main>
		</>
	)
}

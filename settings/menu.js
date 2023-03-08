export const navbar_menu = {
	es: {
		menu: [
			{
				name: "bolivia_tours",
				txt: "Tours Bolivia",
				path: "",
				children: [
					{
						txt: "Altiplano",
						path: "/Tour?country=Bolivia&category=Altiplano&filter=1",
					},
					{
						txt: "Valle",
						path: "/Tour?country=Bolivia&category=Valle&filter=1",
					},
					{
						txt: "Amazonas",
						path: "/Tour?country=Bolivia&category=Amazon&filter=1",
					},
				],
			},
			{
				name: "latin_america_tours",
				txt: "Tours Latinoamerica",
				path: "/",
				children: [
					{
						txt: "Perú",
						path: "/Tour?country=Peru&filter=1",
					},
					{
						txt: "Argentina",
						path: "/Tour?country=Argentina&filter=1",
					},
					{
						txt: "Chile",
						path: "/Tour?country=Chile&filter=1",
					},
					{
						txt: "Ecuador",
						path: "/Tour?country=Ecuador&filter=1",
					},
					{
						txt: "Nicaragua",
						path: "/Tour?country=Nicaragua&filter=1",
					},
					{
						txt: "Cuba",
						path: "/Tour?country=Cuba&filter=1",
					},
				],
			},
			{
				name: "flight_tickets",
				txt: "Boletos de Avión",
				// path: "#",
				toggle: "modal",
				type: 1,
			},
			{
				name: "our_impact",
				txt: "Nuestro Impacto",
				path: "/blog",
			},
			{
				name: "security",
				txt: "Seguridad",
				// path: "/contact",
				children: [
					{
						txt: "Covid",
						path: "https://www.iatatravelcentre.com/world.php",
						extern: true,
					},
					{
						txt: "Bolivia Segura",
						path: "/bolivia_secure",
					},
					{
						txt: "Seguro de Viaje",
						// path: "#",
						toggle: "modal",
						type: 2,
					},
				],
			},
			{
				name: "know_us",
				txt: "Conocenos",
				// path: "/contact",
				children: [
					{
						txt: "Nuestra Historia",
						path: "/know_us",
					},
					{
						txt: "Nuestro Equipo",
						path: "/know_us#team_us",
					},
					{
						txt: "Reseñas de viajeros",
						path: "/travelers_reviews",
					},
					{
						txt: "Contacto",
						path: "/contact",
					},
				],
			},
		],
		menu_footer: [
			{
				name: "Inicio",
				path: "/",
			},
			{
				name: "Acerca de",
				path: "/know_us",
			},
			{
				name: "Tours",
				path: "/Tour",
			},
			{
				name: "Contactanos",
				path: "/contact",
			},
		],
	},
	en: {
		menu: [
			{
				name: "bolivia_tours",
				txt: "Bolivia Tours",
				path: "",
				children: [
					{
						txt: "Altiplane",
						path: "/Tour?country=Bolivia&category=Altiplano&filter=1",
					},
					{
						txt: "Valley",
						path: "/Tour?country=Bolivia&category=Valle&filter=1",
					},
					{
						txt: "Amazon",
						path: "/Tour?country=Bolivia&category=Amazon&filter=1",
					},
				],
			},
			{
				name: "latin_america_tours",
				txt: "Latin America Tours",
				path: "/",
				children: [
					{
						txt: "Perú",
						path: "/Tour?country=Peru&filter=1",
					},
					{
						txt: "Argentina",
						path: "/Tour?country=Argentina&filter=1",
					},
					{
						txt: "Chile",
						path: "/Tour?country=Chile&filter=1",
					},
					{
						txt: "Ecuador",
						path: "/Tour?country=Ecuador&filter=1",
					},
					{
						txt: "Nicaragua",
						path: "/Tour?country=Nicaragua&filter=1",
					},
					{
						txt: "Cuba",
						path: "/Tour?country=Cuba&filter=1",
					},
				],
			},
			{
				name: "flight_tickets",
				txt: "Flight Tickets",
				// path: "#",
				toggle: "modal",
				type: 1,
			},
			{
				name: "our_impact",
				txt: "Our Impact",
				path: "/blog",
			},
			{
				name: "security",
				txt: "Secutiry",
				// path: "/contact",
				children: [
					{
						txt: "Covid",
						path: "https://www.iatatravelcentre.com/world.php",
						extern: true,
					},
					{
						txt: "Bolivia Secure",
						path: "/bolivia_secure",
					},
					{
						txt: "Travel Insurance",
						// path: "#",
						toggle: "modal",
						type: 2,
					},
				],
			},
			{
				name: "know_us",
				txt: "Know Us",
				// path: "/contact",
				children: [
					{
						txt: "Our History",
						path: "/know_us",
					},
					{
						txt: "Our Team",
						path: "/know_us/#team_us",
						hashid: true,
					},
					{
						txt: "Travelers Reviews",
						path: "/travelers_reviews",
					},
					{
						txt: "Contact",
						path: "/contact",
					},
				],
			},
		],
		menu_footer: [
			{
				name: "Home",
				path: "/",
			},
			{
				name: "About",
				path: "/know_us",
			},
			{
				name: "Tours",
				path: "/Tour",
			},
			{
				name: "Contact",
				path: "/contact",
			},
		],
	},
}

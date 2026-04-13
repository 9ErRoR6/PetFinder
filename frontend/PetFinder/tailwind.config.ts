/** @type {import('tailwindcss').Config} **/
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontSize: {
				text32: '2rem',
				text250: '250px',
			},
			fontFamily: {
				barlow: ['"Barlow"', 'sans-serif'],
				bruno: ['"Bruno Ace"', 'sans-serif'],
			},
			colors: {
				'dark-pink': '#3D1022',
				'bg-nav': '#0C0C0D',
				turquoise: '#19A3BD',
				'auxiliary-dark': '#020C1C',
				'auxiliary-gray': '#898989',
				'auxiliary-light-gray': '#D0D0D0',
				'footer-border': '#959595',
				buyCard: '#19A3BD',
				'basket-border': '#330F1E',
			},
			backgroundImage: {
				'header-bg': "url('/src/assets/header-bg.jpg')",
				'login-bg': "url('/src/assets/bg-login.png')",
				'register-bg': "url('/src/assets/bg-register.png')",
				'whishList-bg': "url('/src/assets/whishList-bg.png')",
				'footer-bg': "url('/src/assets/footer-bg.png')",
				'wishList-bg': "url('/src/assets/wishList-bg.png')",
				'404-bg': "url('/src/assets/404Bg.png')",
				'library-bg': "url('/src/assets/bg-library.png')",
				'news-bg': "url('/src/assets/bg-news.png')",
			},
		},
	},
	plugins: [],
}
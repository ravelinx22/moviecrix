export function getUpc() {
	return [{
		vote_count: 389,
		id: 427641,
		video: false,
		vote_average: 5.9,
		title: "Rampage",
		popularity: 188.516677,
		poster_path: "/30oXQKwibh0uANGMs0Sytw3uN22.jpg",
		original_language: "en",
		original_title: "Rampage",
		genre_ids: [
			28,
			12,
			878

		],
		backdrop_path: "/wrqUiMXttHE4UBFMhLHlN601MZh.jpg",
		adult: false,
		overview: "Primatologist Davis Okoye shares an unshakable bond with George, the extraordinarily intelligent, silverback gorilla who has been in his care since birth. But a rogue genetic experiment gone awry mutates this gentle ape into a raging creature of enormous size. To make matters worse, it’s soon discovered there are other similarly altered animals. As these newly created alpha predators tear across North America, destroying everything in their path, Okoye teams with a discredited genetic engineer to secure an antidote, fighting his way through an ever-changing battlefield, not only to halt a global catastrophe but to save the fearsome creature that was once his friend.",
		release_date: "2018-04-12"

	},
		{
			vote_count: 847,
			id: 447332,
			video: false,
			vote_average: 7.4,
			title: "A Quiet Place",
			popularity: 104.790428,
			poster_path: "/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
			original_language: "en",
			original_title: "A Quiet Place",
			genre_ids: [
				18,
				27,
				53,
				878

			],
			backdrop_path: "/roYyPiQDQKmIKUEhO912693tSja.jpg",
			adult: false,
			overview: "A family is forced to live in silence while hiding from creatures that hunt by sound.",
			release_date: "2018-04-05"

		}];
}

export function getImg(movie) {
	return "http://image.tmdb.org/t/p/w185/" + movie.poster_path; 
}

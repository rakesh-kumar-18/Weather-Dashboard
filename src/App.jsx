import { useEffect, useState } from "react";

const App = () => {
	const [city, setCity] = useState({});
	const [search, setSearch] = useState("Delhi");
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		const fetchApi = async () => {
			if (isFetching) return;
			setIsFetching(true);

			try {
				const appid = import.meta.env.VITE_API_KEY;
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${appid}`;
				const response = await fetch(url);

				const resjson = await response.json();
				setCity(resjson);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setTimeout(() => {
					setIsFetching(false);
				}, 1000);
			}
		};

		fetchApi();
	}, [search, isFetching]);

	return (
		<div className='app'>
			<div className='search'>
				<input
					type='text'
					placeholder='Enter Location'
					onChange={(event) => setSearch(event.target.value)}
				/>
			</div>

			{!city.main ? (
				<p className='errorMsg'>No Data Found</p>
			) : (
				<div className='container'>
					<div className='top'>
						<div className='location'>
							<p>
								{search}, {city.sys.country}
							</p>
						</div>

						<div className='temp'>
							{city.main ? <h1>{city.main.temp.toFixed()}°C</h1> : null}
						</div>

						<div className='description'>
							{city.weather ? <p>{city.weather[0].main}</p> : null}
						</div>
					</div>

					<div className='bottom'>
						<div className='feel'>
							{city.main ? (
								<p className='bold'>{city.main.feels_like.toFixed()}°C</p>
							) : null}
							<p>Feels Like</p>
						</div>

						<div className='humidity'>
							{city.main ? <p className='bold'>{city.main.humidity}%</p> : null}
							<p>Humidity</p>
						</div>

						<div className='wind'>
							{city.wind ? (
								<p className='bold'>{city.wind.speed.toFixed()} MPH</p>
							) : null}
							<p>Winds</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;

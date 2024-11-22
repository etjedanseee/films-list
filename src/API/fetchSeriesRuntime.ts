import { IFetchSeriesRuntimeResponse } from '../types/data'

interface fetchSeriesRuntimeProps {
	id: number
	numberOfSeasons: number
	setSeriesRuntime: (seriesRuntime: number) => void
}

export const fetchSeriesRuntime = async ({
	id,
	numberOfSeasons,
	setSeriesRuntime,
}: fetchSeriesRuntimeProps) => {
	const url = `https://api.themoviedb.org/3/tv/${id}/season`
	const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY
	const ACCESS_TOKEN = process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN
	if (!API_KEY && !ACCESS_TOKEN) {
		throw new Error('No API_KEY and ACCESS_TOKEN')
	}
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${ACCESS_TOKEN || API_KEY}`,
		},
	}
	try {
		const promises = []
		for (let season = 1; season <= numberOfSeasons; season++) {
			const promise = fetch(`${url}/${season}`, options)
				.then((response) => response.json())
				.catch((error) => {
					throw new Error(error)
				})
			promises.push(promise)
		}
		const responses = await Promise.allSettled(promises)
		let seriesRuntime = 0
		responses.forEach((res) => {
			if (res.status === 'fulfilled') {
				const value = res.value as IFetchSeriesRuntimeResponse
				seriesRuntime += value.episodes.reduce(
					(acc, curr) => (acc += curr.runtime),
					0
				)
			}
		})
		setSeriesRuntime(seriesRuntime)
	} catch (e) {
		console.error('Error fetchSeriesRuntime', e)
	}
}

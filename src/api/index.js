import axios from "axios";

const base = "https://api.thevirustracker.com/free-api?";

//Default fetch is for global statistics
export async function fetchData(country) {
	let changeableUrl = `${base}global=stats`;

	try {
		if (country && country !== "global") {
			changeableUrl = `${base}countryTotal=${country}`;

			const {
				data: {
					countrydata: {
						0: { total_cases, total_recovered, total_deaths, total_new_cases_today, total_new_deaths_today },
					},
				},
			} = await axios.get(changeableUrl);

			return { total_cases, total_recovered, total_deaths, total_new_cases_today, total_new_deaths_today };
		} else {
			const {
				data: {
					results: {
						0: { total_cases, total_recovered, total_deaths, total_new_cases_today, total_new_deaths_today },
					},
				},
			} = await axios.get(changeableUrl);

			return { total_cases, total_recovered, total_deaths, total_new_cases_today, total_new_deaths_today };
		}
	} catch (err) {
		console.log(err);
	}
}

//Fetches list of countries for dropdown list
export async function fetchCountries() {
	try {
		const {
			data: {
				countryitems: { 0: country },
			},
		} = await axios.get(`${base}countryTotals=ALL`);

		return Object.keys(country).map((index) => new Object({ name: country[index].title, id: country[index].code }));
	} catch (err) {
		console.log(err);
	}
}

//Fetches daily data timeline for each country
export async function fetchDailyData(country) {
	try {
		const {
			data: {
				timelineitems: { 0: item },
			},
		} = await axios.get(`${base}countryTimeline=${country}`);
		return Object.keys(item).map((index) => new Object({ date: index, dailyCases: item[index].new_daily_cases, dailyDeaths: item[index].new_daily_deaths }));
	} catch (err) {
		console.log(err);
	}
}

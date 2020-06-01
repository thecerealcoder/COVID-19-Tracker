import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Graph.module.css";

function Graph({ data: { total_new_cases_today, total_new_deaths_today }, country }) {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			if (country && country !== "global") setDailyData(await fetchDailyData(country));
		};
		fetchAPI();
	}, [country]);

	//For country daily data
	const lineGraph =
		country && country !== "global" ? (
			<Line
				data={{
					labels: dailyData.map(({ date }) => date),
					datasets: [
						{
							data: dailyData.map(({ dailyCases }) => dailyCases),
							label: "Infected",
							borderColor: "#3333ff",
							fill: true,
						},
						{
							data: dailyData.map(({ dailyDeaths }) => dailyDeaths),
							label: "Deaths",
							borderColor: "red",
							backgroundColor: "rgba(255,0,0,.5)",
							fill: true,
						},
					],
				}}
				options={{
					title: { display: true, text: `Today's Statistics for ${country}` },
				}}
			/>
		) : null;

	//For overall global statistics
	const barGraph = total_new_cases_today ? (
		<Bar
			data={{
				labels: ["Infected", "Deaths"],
				datasets: [
					{
						label: "People",
						backgroundColor: ["rgba(0, 0, 255, 0.5)", "rgba(255, 0, 0, 0.5)"],
						data: [total_new_cases_today, total_new_deaths_today],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Today's Global Statistics` },
			}}
		/>
	) : null;

	return <div className={styles.container}>{country && country !== "global" ? lineGraph : barGraph}</div>;
}

export default Graph;

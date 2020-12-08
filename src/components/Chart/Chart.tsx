import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2'
import { fetchDailyData } from './../../api/index';
import { DailyData, Data } from './../../api/types'
import { CircularProgress } from '@material-ui/core'
import styles from './Chart.module.css'

type Props = {
    data: Data
}

export const Chart: React.FC<Props> = ({
    data: { confirmed, recovered, deaths, country }
}) => {

    const [dailyData, setDailyData] = useState<DailyData[]>([])


    useEffect(() => {
        const fetchAPI = async () => {
            //非同期でデータを取得
            const response = (await fetchDailyData()) as DailyData[];
            setDailyData(response)
        }

        fetchAPI();
    }, [])

    if (!dailyData || !dailyData.length) {
        return <CircularProgress />
    }


    const labelsDates: string[] = dailyData.map((d) => d.reportDate) || []
    const labelsConfirmed: number[] =
        dailyData.map((d) => d.confirmed.total) || []
    const labelsDeaths: number[] = dailyData.map((d) => d.deaths.total) || []


    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                            data: [confirmed.value, recovered.value, deaths.value],
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    );

    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: labelsDates,
                        datasets: [{
                            data: labelsConfirmed,
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            data: labelsDeaths,
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            fill: true,
                        }],
                    }}
                />) : null
    );



    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
}
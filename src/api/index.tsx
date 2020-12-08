//covid_19のでapiを撮ってくる

import axios from 'axios'
import { Data, DailyData, CountryData } from './../api/types'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country?: string): Promise<Data> => {

    let changeableUrl = url as string
    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data } = await axios.get<Data>(changeableUrl);

        return data;

    } catch (error) {
        console.log("エラー")
        return {} as Data

    }
}

export const fetchDailyData = async (): Promise<DailyData[]> => {
    try {
        const { data } = await axios.get<DailyData[]>(`${url}/daily`);
        return data
    } catch (error) {
        console.log("エラー")
        return []

    }
}


export const fetchCountries = async (): Promise<CountryData> => {
    try {
        const { data } = await axios.get<CountryData>(`${url}/countries`);
        return data
    } catch (error) {
        console.log(error)
        return {} as CountryData
    }
}


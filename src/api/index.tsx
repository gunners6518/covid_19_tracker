//covid_19のでapiを撮ってくる

import axios from 'axios'
import {data} from './../api/types'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async ():Promise<data> => {

    try {
        const { data}  = await axios.get<data>(url);

        return data;

    } catch (error) {
        console.log("エラー")
        return {} as data

    }
}

import React, { useEffect, useState, useCallback } from 'react';
import styles from './App.module.css';
import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api'
import { Data } from './api/types'
import image from './images/image.png';

// import { Cards, Chart, CountryPicker } from './components'

export const App: React.FC = () => {
  const [data, setData] = useState<Data>({} as Data)

  useEffect(() => {
    let unmounted = false;

    //非同期無名関数の即時呼び出し
    (async () => {
      if (!unmounted) {
        //非同期でデータを取得
        const fetchedData = (await fetchData()) as Data;
        setData(fetchedData)
      };
    })();

    //クリーンアップ関数を返す
    return () => { unmounted = true; };

  }, []);

  const onHandleCountryChange = useCallback(async (selectedCountry: string) => {
    const response = await fetchData(selectedCountry)
    setData({ ...response, country: selectedCountry })
  }, [])

  return (
    <div className={styles.container} >
      <img className={styles.image} src={image} alt="COVID-19 Tracker" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={onHandleCountryChange} />
      <Chart data={data} />

    </div>
  );
}



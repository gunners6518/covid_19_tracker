import React, { useEffect } from 'react';
import './App.scss';
import { Cards } from './components/Cards/Cards';
import { Chart } from './components/Chart/Chart';
import { CountryPicker } from './components/CountryPicker/CountryPicker';
import { fetchData } from './api'

// import { Cards, Chart, CountryPicker } from './components'

// type Props = {

// };


export const App = () => {
  useEffect(() => {
    let unmounted = false;

    //非同期無名関数の即時呼び出し
    (async () => {
      if (!unmounted) {
        //非同期でデータを取得
        const data = fetchData();
        console.log(data);
      };
    })();

    //クリーンアップ関数を返す
    return () => { unmounted = true; };
  });


  return (
    <div className="container" >
      <Cards />
      <Chart />
      <CountryPicker />
    </div>
  );
}



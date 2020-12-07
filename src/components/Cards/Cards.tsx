import * as React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import styles from './Cards.module.css'
import { data } from './../../api/types'
import CountUp from 'react-countup'
import cx from 'classnames'

// 日付のフォーマット作成
const formatDate = (date?: Date): string => {
    if (!date) {
        return ''
    }
    return new Date(date).toDateString()
}


type Props = {
    data: data
}

export const Cards: React.FC<Props> = ({ data: { confirmed, recovered, deaths, lastUpdate } }, date: Date) => {
    if (!confirmed) {
        return <p>Loading...</p>;
    }
    date =  lastUpdate  as Date
    const formatedDate = formatDate(date || new Date())
    console.log(lastUpdate)

    return (
        <div className="styles.container">
            <Grid container spacing={3}  justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5"><CountUp start={0} end={confirmed.value} duration={2.5} separator="," /></Typography>
                        <Typography color="textSecondary">{formatedDate}</Typography>
                        <Typography variant="body2">Number of active case of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5"><CountUp start={0} end={recovered.value} duration={2.5} separator="," /></Typography>
                        <Typography color="textSecondary">{formatedDate}</Typography>
                        <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5"><CountUp start={0} end={deaths.value} duration={2.5} separator="," /></Typography>
                        <Typography color="textSecondary">{formatedDate}</Typography>
                        <Typography variant="body2">Number of deaths case of COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}
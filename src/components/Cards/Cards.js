import React from 'react';
import {Card, CardContent, Typography, Grid, Divider} from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css'
import cx from 'classnames';

function Cards({data: {total_cases, total_recovered, total_deaths}}) {
    
    const date = new Date();
    
    if(!total_cases) {
        return 'Loading...';
    }

    return(
        <div className={styles.container}>
            <Grid container spacing={5} align="center" justify="center">
                <Grid item xs={12} md={2} className={cx(styles.card, styles.infected)}>    
                        <Typography variant="h6"> Infected </Typography>
                        <Typography className={styles.spacing} variant="h5">
                            [<CountUp start={0} end={total_cases} duration={2} separator=","/>]
                        </Typography>
                        <Typography>{date.toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases for COVID-19</Typography>
                </Grid>
                <Grid item xs={12} md={2} className={cx(styles.card, styles.recovered)}>
                        <Typography variant="h6"> Recovered </Typography>
                        <Typography className={styles.spacing} variant="h5">
                            [<CountUp start={0} end={total_recovered} duration={2} separator=","/>]
                        </Typography>
                        <Typography>{date.toDateString()}</Typography>
                        <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                </Grid>
                  <Grid item xs={12} md={2} className={cx(styles.card, styles.deaths)}>
                        <Typography variant="h6"> Deaths </Typography>
                        <Typography className={styles.spacing} variant="h5">
                            [<CountUp start={0} end={total_deaths} duration={2} separator=","/>]
                        </Typography>
                        <Typography>{date.toDateString()}</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;
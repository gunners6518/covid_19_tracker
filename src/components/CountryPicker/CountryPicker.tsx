import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, CircularProgress } from '@material-ui/core'
import styles from './CountryPicker.module.css'

import { fetchCountries } from '../../api/index';
import { CountryData } from '../../api/types';

type Props = {
    handleCountryChange(e: any): void
}

export const CountryPicker = ({ handleCountryChange }: Props): JSX.Element => {

    const [fetchedCountries, setFetchedCountries] = useState<CountryData>({} as CountryData);

    useEffect(() => {
        ; (async function fetchAPI(): Promise<void> {
            const response = (await fetchCountries()) as CountryData
            setFetchedCountries(response)
        })()
    }, [setFetchedCountries])

    if (!fetchedCountries.countries) {
        return <CircularProgress />
    }

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue=""
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleCountryChange(e.target.value)
                }>
                <option value="global">Global</option>
                {fetchedCountries.countries.map((country, i) => (
                    <option key={i} value={country.name}>
                        {country.name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}
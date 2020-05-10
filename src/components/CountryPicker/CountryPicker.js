import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';

import styles from './CountryPicker.module.css';
import {fetchCountries} from '../../api'

function CountryPicker({handleCountryChange}) {

    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            setCountryData(await fetchCountries());
        }
        fetchAPI();
    }, [setCountryData]);
  
    return(
        <FormControl className={styles.container} variant="outlined">
            <NativeSelect defaultValue="global" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {countryData.map((country, i) => <option key={i} value={country.id}>{country.name}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
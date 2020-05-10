import React from 'react';
import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Graph from './components/Graph/Graph';
import Navbar from './components/Navbar/Navbar';
import {fetchData} from './api'
import styles from './App.module.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const font = "'Lucida Console', Monaco, monospace";

  const theme = createMuiTheme({
    typography: {
     "fontFamily": font,
     "fontSize": 12,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    },
    NativeSelect: {
     "fontFamily": font,
     "fontSize": 12,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });

class App extends React.Component {
    
    state = {
        data: {},
        country: ''
    }
    
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data:fetchedData});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data:fetchedData, country:country});
    }

    render() {
        const {data,country} = this.state;
        return(
            <MuiThemeProvider theme={theme}>
                <div className={styles.container}>
                    <Navbar/>
                    <Cards data={data}/>
                    <CountryPicker handleCountryChange={this.handleCountryChange}/>
                    <Graph data={data} country={country}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App;

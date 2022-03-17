import { React, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./CryptoMonedaComponent.css";
import Axios from "axios";
import ReactApexChart from 'react-apexcharts';

const CryptoMonedaComponent = () => {
  const [options, setOptions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartOption, setChartOptio0n] =  useState({});
  let optionsChart =  {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], 
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      }
    };
  const busqueda = (value) => {
    console.log(value);
    Axios.get("https://api.coingecko.com/api/v3/search?query=" + value)
      .then(function (response) {
        setOptions(response.data.coins);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getChartData = (optionSelected) => {
    Axios.get("https://api.coingecko.com/api/v3/coins/"+ optionSelected.id +"/market_chart?vs_currency=mxn&days=30&interval=daily")
    .then(function (response) {
      console.log( response.data.prices.map(x => { return [new Date(x[0]),x[1]]}));
      let dataChart = [{
          name: 'Precio',
          data: response.data.prices.map(x => { return x[1].toFixed(3)})
      }]
      
      optionsChart.xaxis.categories =  response.data.prices.map(x => { return new Date(x[0]).toISOString().split('T')[0]})
      setChartOptio0n(optionsChart);
      setChartData(dataChart);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Container>
      <Grid item xs={12} align="center">
        <h1>Selecciona una moneda</h1>
      </Grid>
      <Grid item xs={12} align="center">
        <Autocomplete
          id="combo-box"
          options={options}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option === value}
          onChange={(event,selected) => {
            getChartData(selected);
          }}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(input) => {
                busqueda(input.target.value);
              }}
              label="Cripto Moneda"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <div id="chart">
          <ReactApexChart
            options={chartOption}
            series={chartData}
            type="line"
            height={350}
          />
        </div>
      </Grid>
    </Container>
  );
};

CryptoMonedaComponent.propTypes = {};

CryptoMonedaComponent.defaultProps = {};

export default CryptoMonedaComponent;

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { CoinDetailData } from '@models/coin';
import { baseUrl } from '@variables/env';
import { prefixToValue } from '@libs/currency';

type LineChartProps = {
  item: CoinDetailData;
  currency: string;
};

const LineChart = ({ item, currency }: LineChartProps) => {
  const [seriesData, setSeriesData] = useState<[number[]]>([[]]);

  useEffect(() => {
    if (item) {
      (async () => {
        try {
          const url = `${baseUrl}${`/coins/${item.id}/market_chart?vs_currency=${currency}&days=1`}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const json = await response.json();
          if (json.hasOwnProperty('prices')) {
            setSeriesData(json.prices);
          }
        } catch (e) {
          console.log('데이터를 가져올 수 없습니다.');
        }
      })();
    }
  }, [item]);

  const options = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: '',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return prefixToValue(currency, val);
        },
      },
      title: {
        text: 'Price',
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val: number) {
          return prefixToValue(currency, val);
        },
      },
    },
  };

  const series = [
    {
      name: item.name,
      data: seriesData,
    },
  ];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default LineChart;

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { CoinDetailData } from '@models/coin';
import { baseUrl } from '@variables/env';
import { prefixToValue } from '@libs/currency';

type CandleStickChartProps = {
  item: CoinDetailData;
  currency: string;
};

type SeriesDataProps = {
  x: Date;
  y: number[];
};

const CandleStickChart = ({ item, currency }: CandleStickChartProps) => {
  const [seriesData, setSeriesData] = useState<SeriesDataProps[]>([]);
  useEffect(() => {
    if (item) {
      (async () => {
        try {
          const url = `${baseUrl}${`/coins/${item.id}/ohlc?vs_currency=${currency.toLowerCase()}&days=1`}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const json = await response.json();
          const newArray = json.map((item: number[]) => {
            const value = {
              x: new Date(),
              y: [0, 0, 0, 0],
            };

            if (Array.isArray(item) && item.length === 5) {
              value.x = new Date(item[0]);
              value.y = [item[1], item[2], item[3], item[4]];
            }

            return value;
          });
          setSeriesData(newArray);
        } catch (e) {
          console.log('데이터를 가져올 수 없습니다.');
        }
      })();
    }
  }, [item, currency]);

  const series = [
    {
      data: seriesData,
    },
  ];

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    plotOptions: {
      candlestick: {
        colors: {
          // upward: '#3C90EB',
          // downward: '#DF7D46',
        },
      },
    },
    title: {
      text: 'Candle Stick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return prefixToValue(currency, val);
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (val: number) {
            return prefixToValue(currency, val);
          },
        },
      },
    },
  };
  return (
    <div id="chart">
      <Chart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default CandleStickChart;

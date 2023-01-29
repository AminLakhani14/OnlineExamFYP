import React from 'react';
import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const DoughnutChart = ({ height, color = [] }) => {
  const theme = useTheme();

  const option = {
    legend: {
      show: false,
      itemGap: 12,
      icon: 'circle',
      bottom: 0,
      textStyle: {
        color: 'theme.palette.text.secondary',
        fontSize: 12,
        fontFamily: 'roboto',
      },
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    xAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],

    series: [
      {
        name: 'Traffic Rate',
        type: 'pie',
        radius: ['45%', '72.55%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          normal: {
            show: false,
            position: 'center', // shows the description data to center, turn off to show in right side
            textStyle: {
              color: theme.palette.text.secondary,
              fontSize: 13,
              fontFamily: 'roboto',
            },
            formatter: '{a}',
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '14',
              fontWeight: 'normal',
              // color: "rgba(15, 21, 77, 1)"
            },
            formatter: '{b} \n{c} CGPA',
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 3.53,
            name: 'Semester 1',
          },
          {
            value: 2.43,
            name: 'Semester 2',
          },
          {
            value: 2.18,
            name: 'Semester 3',
          },
          {
            value: 1.81,
            name: 'Semester 4',
          },
          {
            value: 3.66,
            name: 'Semester 5',
          },
          {
            value: 1.5,
            name: 'Semester 6',
          },
          {
            value: 2.5,
            name: 'Semester 7',
          },
          {
            value: 2.5,
            name: 'Semester 8',
          },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color],
      }}
    />
  );
};

export default DoughnutChart;

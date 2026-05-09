import { useTheme } from '@emotion/react';
import { Button, Card, styled } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';
import ReactEcharts from 'echarts-for-react';

const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const Paragraph = styled('p')(({ theme }) => ({
  margin: 0,
  paddingTop: '24px',
  paddingBottom: '24px',
  color: theme.palette.text.secondary,
}));

const AdminUpgradeCard = () => {
  const theme = useTheme();

  const barChartOption = {
    grid: { top: '10%', bottom: '10%', right: '5%' },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{a}: {c}',
    },
    legend: { show: false },
    color: ['#223388', 'rgba(34, 51, 136, 0.8)'],
    barGap: 0,
    barMaxWidth: '64px',
    dataset: {
      source: [
        ['Month', 'Website', 'App'],
        ['Subject 1', 3.5,4],
        ['Subject 2', 2.1,4],
        ['Subject 3', 1.2,4],
        ['Subject 4', 2.2,4],
        ['Subject 4', 2.1,4],
      ],
    },
    xAxis: {
      type: 'category',
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: {
        fontSize: 13,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
      },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' }],
  };
  return (
    <CardRoot>
        <ReactEcharts style={{ height: '350px' }} option={{ ...barChartOption }} />
    </CardRoot>
  );
};

export default AdminUpgradeCard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CandlestickChart from '../components/CandlestickChart';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import styles from '../styles/Dashboard.module.css';
// import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [candlestickData, setCandlestickData] = useState<any>(null);
  const [lineChartData, setLineChartData] = useState<any>(null);
  const [barChartData, setBarChartData] = useState<any>(null);
  const [pieChartData, setPieChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candlestickRes, lineRes, barRes, pieRes] = await Promise.all([
          axios.get('/api/candlestick-data'),
          axios.get('/api/line-chart-data'),
          axios.get('/api/bar-chart-data'),
          axios.get('/api/pie-chart-data'),
        ]);

        setCandlestickData(candlestickRes.data);
        setLineChartData(lineRes.data);
        setBarChartData(barRes.data);
        setPieChartData(pieRes.data);
      } catch (err) {
        setError('Failed to fetch chart data');
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>Dashboard</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div className={styles.gridContainer}>
        <div className={styles.chartContainer}>
          {candlestickData ? <CandlestickChart data={candlestickData} /> : <p>Loading Candlestick Data...</p>}
        </div>
        <div className={styles.chartContainer}>
          {lineChartData ? <LineChart data={lineChartData} /> : <p>Loading Line Chart Data...</p>}
        </div>
        <div className={styles.chartContainer}>
          {barChartData ? <BarChart data={barChartData} /> : <p>Loading Bar Chart Data...</p>}
        </div>
        <div className={styles.chartContainer}>
          {pieChartData ? <PieChart data={pieChartData} /> : <p>Loading Pie Chart Data...</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;

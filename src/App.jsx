
import './App.css';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Header from './components/Header';
import Dashboard from './pages/Darsboard';
import Budget from './pages/Budget';
import Report from './pages/Reports';

// Registering necessary chart components
{/*ChartJS.register(ArcElement, Tooltip, Legend);*/}

function App() {
  

  // Data for the Pie chart
 

  return (
    <>
      <Header />
      <Dashboard/>
      <Budget/>
      <Report/>      
      
    </>
  );
}

export default App;

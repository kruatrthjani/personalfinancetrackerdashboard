import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useSelector,useDispatch } from 'react-redux';
import { Pie, Bar } from 'react-chartjs-2';
//const payments=useSelector((state)=>state.Transaction.payment)
export default function Dashboard() {  
// Register necessary Chart.js components
const payments=useSelector((state)=>state.Transaction.payment)
  
  const income = payments.reduce((acc, pay) => {
    return pay.type === "income" ? acc + Number(pay.amount) : acc;
  }, 0);
  const expense = payments.reduce((acc, pay) => {
    return pay.type === "expense" ? acc + Number(pay.amount) : acc;
  }, 0);
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


// Group payments by category and sum amounts
// const categoryTotals = payments.reduce((acc, pay) => {
//   if (pay.type === "expense") {
//     const { category, amount } = pay;
//     if (!acc[category]) {
//       acc[category] = 0; // Initialize if category doesn't exist
//     }
//     acc[category] += Number(amount); // Sum amounts for the category
//   }
//   return acc;
// }, {});
const categoryTotals=payments.reduce((acc,pay)=>{
  if(pay.type==="expense"){
      if(!acc[pay.category]){
        acc[pay.category]=0
      }
      acc[pay.category]+=Number(pay.amount)
  }
  return acc;
},{})
// Destructure to access specific categories dynamically
const { grocery, beverages, petrol, electricity ,entertainment,loan,medical} = categoryTotals;



const pieData = {
  labels: ['Groceries', 'Beverages', 'Petrol', 'Electricity', 'Entertainment', 'Loan/Rent', 'Medical'], // Categories for the Pie chart
  datasets: [
    {
      data: [grocery, beverages, petrol, electricity, entertainment, loan, medical], // Values for expenses
      backgroundColor: [
        'rgba(54, 162, 235, 0.6)',  // Light Blue
        'rgba(255, 159, 64, 0.6)',  // Orange
        'rgba(75, 192, 192, 0.6)',  // Teal
        'rgba(255, 99, 132, 0.6)',  // Pink
        'rgba(153, 102, 255, 0.6)', // Purple
        'rgba(255, 159, 64, 0.6)',  // Orange
        'rgba(75, 192, 192, 0.6)',  // Teal
      ], // Colors for each segment
      borderColor: [
        'rgba(54, 162, 235, 1)',  // Blue
        'rgba(255, 159, 64, 1)',  // Orange
        'rgba(75, 192, 192, 1)',  // Teal
        'rgba(255, 99, 132, 1)',  // Pink
        'rgba(153, 102, 255, 1)', // Purple
        'rgba(255, 159, 64, 1)',  // Orange
        'rgba(75, 192, 192, 1)',  // Teal
      ], // Border colors for each segment
      borderWidth: 1,
    },
  ],
};


const barData = {
  labels: ['Income', 'Expense'], // Labels for the Bar chart
  datasets: [
    {
      label: 'Amount', // Label for the Amount dataset
      data: [income, expense], // Income and Expense values
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'], // Colors for bars
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'], // Border colors for bars
      borderWidth: 1, // Border width for the bars
    },
  ],
};


  const display=(expense/income)*100;
  
  
  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen" id="home">
      {/* Dashboard Container */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Section */}
       <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 text-center shadow-lg">
  <h3 className="text-2xl font-semibold text-white mb-4">Balance</h3>
  <p className="text-4xl font-extrabold text-white mb-8">${income}</p>
  <div className="bg-white rounded-lg shadow-md py-6 px-4">
    
  <div
  className={`flex justify-around text-gray-800 ${
    display < 60
      ? 'bg-green-500'
      : display <= 80 && display > 60
      ? 'bg-yellow-500'
      : 'bg-red-500'
  }`}
>

      <div>
        <p className="text-lg font-bold">Payments</p>
        <p className="text-lg font-medium">{expense}</p>
      </div>
     

    </div>
  </div>
</div>


        {/* Charts Section */}
        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md  ">
            <h3 className="text-lg font-bold text-center text-gray-700 mb-4 ">Expense Breakdown</h3>            
            <Pie data={pieData} />            
          </div>

          {/* Bar Chart Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-center text-gray-700 mb-4">Income vs Expense</h3>
            <Bar
              data={barData}
              options={{
                indexAxis: 'x', // Horizontal Bar Chart
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

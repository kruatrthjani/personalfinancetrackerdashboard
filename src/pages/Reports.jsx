import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
export default function Report() {
// Registering the required components for Chart.js
ChartJs.register(ArcElement, Tooltip, Legend);

const payments=useSelector((state)=>state.Transaction.payment)
console.log("payments=",payments)
const income=payments.reduce((acc,pay)=>{    
    if(pay.type=="income")    {        
        
        acc+=Number(pay.amount);
    }
    return acc;
},0)

const expense=payments.reduce((acc,pay)=>{
    if(pay.type=="expense"){
        acc+=Number(pay.amount);
    }
    return acc;
},0)

    const pieData = {
        labels: ['Income', 'Expense', 'Savings'],
        datasets: [{
            data: [income, expense, income-expense>0?income-expense:0],
            backgroundColor: ['#4caf50', '#f44336', '#2196f3'], // Colors for each section
            borderColor: ['#fff', '#fff', '#fff'], // Border color for each section
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.raw + ' USD'; // Format tooltip to show "USD"
                    }
                }
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-xl" id="reports">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Financial Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Financial Overview */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Overview</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-600">Income:</span>
                            <span className="text-green-600 font-semibold">{income} USD</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-600">Expense:</span>
                            <span className="text-red-600 font-semibold">{expense} USD</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span className="text-gray-600">Savings:</span>
                            <span className="text-blue-600 font-semibold">{income-expense>0?income-expense:0} USD</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Pie Chart */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">Financial Distribution</h3>
                    <div className="flex justify-center">
                        <Pie data={pieData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}

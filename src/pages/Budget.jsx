import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { insertPayment, deletePayment, updatePayment } from "../store/transaction";

export default function Budget() {
    // State for each form field
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        description: "",
        type: "income",  // Default type
    });

    const payments = useSelector((state) => state.Transaction.payment);

    const [editingIndex, setEditingIndex] = useState(null);  // Track the index of the transaction being edited
    const [dropdownIndex, setDropdownIndex] = useState(null); // Track which transaction's dropdown is open
    const [currentPage, setCurrentPage] = useState(1);  // Track the current page
    const [transactionsPerPage] = useState(3);  // Transactions per page
    const dispatch = useDispatch();

    // Calculate income for balance display
    const income = payments.reduce((acc, pay) => {
        if (pay.type === "income") {
            acc += Number(pay.amount);
        }
        return acc;
    }, 0);

    // const expense=payments.reduce((acc,pay)=>{
    //     return  acc.type==="expense"?acc+Number(pay.amount):acc
    // },0)
    const expense = payments.reduce((acc, pay) => {
        return pay.type === "expense" ? acc + Number(pay.amount) : acc;
    }, 0);
    // Refs to track the button and dropdown menu for each transaction
    const dropdownRefs = useRef([]);
    const buttonRefs = useRef([]);  // Add this line to define buttonRefs

    // Handle form data change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,  // Dynamically update the corresponding field in formData
        });
    };

    // Handle form submission
    function handleInputData(e) {
        e.preventDefault();

        if (editingIndex !== null) {
            // Edit existing transaction
            dispatch(updatePayment({ id: editingIndex, data: formData }));
            setEditingIndex(null);  // Reset editing state
        } else {
            // Add new transaction
            const newTransaction = { id: Math.floor(10000 + Math.random() * 90000), ...formData };

            // Log the transaction data
            console.log("New Transaction:", newTransaction);

            // Update the list of transactions
            
            dispatch(insertPayment({ newTransaction }));
        }

        // Reset the form fields after submission
        setFormData({
            amount: "",
            category: "",
            description: "",
            type: "income",
        });
    }

    // Handle Edit button click
    function handleEdit(index, data) {
        setFormData(data);
        setEditingIndex(index);  // Set the index of the transaction being edited
        setDropdownIndex(null); // Close the dropdown when editing
    }

    // Handle Delete button click
    function handleDelete(index, data) {
        
        dispatch(deletePayment({ id: index }));
    }

    // Toggle dropdown visibility
    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index); // Toggle visibility
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                buttonRefs.current[dropdownIndex] &&
                !buttonRefs.current[dropdownIndex].contains(e.target) &&
                dropdownRefs.current[dropdownIndex] &&
                !dropdownRefs.current[dropdownIndex].contains(e.target)
            ) {
                setDropdownIndex(null); // Close the dropdown if clicked outside
            }
        };

        // Add event listener for clicks outside
        document.addEventListener("click", handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropdownIndex]); // Only re-run when dropdownIndex changes

    // Pagination: Calculate the transactions to display on the current page
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = payments.slice(indexOfFirstTransaction, indexOfLastTransaction);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-screen-lg mx-auto p-6 bg-white" id="budget">
            <h1 className="text-3xl font-bold mb-6">Budget Tracker</h1>
            <div className="mb-6">
                <p><strong>Remaining amount:</strong> {income-expense}</p>
            </div>

            <div className="flex space-x-12">
                {/* Form Section */}
                <div className="w-1/2">
                    <h3 className="font-bold text-xl mb-4">{editingIndex !== null ? "Edit Transaction" : "Add Transaction"}</h3>
                    <form onSubmit={handleInputData} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Category</option>
                                <option value="salary">Salary</option>
                                <option value="grocery">Grocery</option>
                                <option value="beverages">Beverages</option>
                                <option value="petrol">Petrol</option>
                                <option value="electricity">Electricity</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="loan">Loan/Rent</option>
                                <option value="medical">Medical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <div>
                                <label className="text-sm font-medium">Type</label><br />
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="income"
                                        checked={formData.type === "income"}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Income
                                </label>
                                <label className="inline-flex items-center ml-4">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="expense"
                                        checked={formData.type === "expense"}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Expense
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-green-500 text-white rounded-md mt-4 hover:bg-green-600"
                        >
                            {editingIndex !== null ? "Update Transaction" : "Add Transaction"}
                        </button>
                    </form>
                </div>

                {/* Transaction History Section */}
                <div className="w-1/2">
                    <h3 className="font-bold text-xl mb-4">Transaction History</h3>
                    <ul className="space-y-4">
                        {currentTransactions.map((transaction) => (
                            <li key={transaction.id} className="border border-gray-200 p-4 rounded-md shadow-sm flex justify-between items-center">
                                <div className="flex-grow">
                                    <strong>{transaction.amount || ''}</strong> - {transaction.category || ''} - {transaction.description || ''} - {transaction.type || ''}
                                </div>

                                {/* 3-Dot Ellipsis Menu */}
                                <div className="relative">
                                    <button
                                        ref={(el) => (buttonRefs.current[transaction.id] = el)} // Add ref to the button
                                        className="text-gray-500 hover:text-gray-700"
                                        onClick={() => toggleDropdown(transaction.id)}
                                    >
                                        <span className="font-bold text-lg">...</span>
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    {dropdownIndex === transaction.id && (
                                        <div
                                            ref={(el) => (dropdownRefs.current[transaction.id] = el)} // Add ref to the dropdown
                                            className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md border border-gray-300"
                                        >
                                            <ul className="py-2">
                                                <li>
                                                    <button
                                                        onClick={() => handleEdit(transaction.id, transaction)}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    >
                                                        Edit
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => handleDelete(transaction.id)}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    {/* Pagination Controls */}
                    <div className="flex justify-center space-x-4 mt-6">
                        {Array.from({ length: Math.ceil(payments.length / transactionsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`py-1 px-3 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

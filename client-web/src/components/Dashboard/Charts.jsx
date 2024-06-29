import React from 'react';
import { Chart } from 'primereact/chart';

const ChartComponent = () => {
    // Dummy data for Pie Chart
    const pieData = {
        labels: ['Pending', 'Resolved', 'Rejected'],
        datasets: [
            {
                data: [300, 200, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    // Dummy data for Line Chart
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Type A',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#FF6384'
            },
            {
                label: 'Type B',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#36A2EB'
            },
            {
                label: 'Type C',
                data: [18, 48, 77, 9, 100, 27, 40],
                fill: false,
                borderColor: '#FFCE56'
            }
        ]
    };

    return (
        <div className="mx-auto m-auto p-4">
            <div className="flex w-4/5 flex-row gap-4">
                <div className="ml-20 m-auto w-3/5 flex-grow bg-white rounded-lg shadow-md p-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-4">Grievance Complaint Status</h5>
                    <Chart type="pie" data={pieData} />
                </div>
                <div className="ml-4 w-3/5 flex-grow bg-white rounded-lg shadow-md p-4">
                    <h5 className="text-lg font-semibold text-gray-800 mb-4">Grievances by Type Over Time</h5>
                    <Chart type="line" data={lineData} />
                </div>
            </div>
        </div>



    );
};

export default ChartComponent;

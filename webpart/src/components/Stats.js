import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function Stats({ stats }) {
  const labels = stats ? Object.keys(stats.byCategory || {}) : [];
  const values = stats ? Object.values(stats.byCategory || {}) : [];
  const valueByCategory = stats?.valueByCategory || {};

  const data = {
    labels,
    datasets: [
      {
        label: "Products per category",
        data: values,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        top: 24,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value, context) => {
          const category = context.chart.data.labels[context.dataIndex];
          const val = valueByCategory[category] || 0;
          return `$${val.toLocaleString()}`;
        },
        font: {
          weight: "bold",
        },
        color: "#374151",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = context.label;
            const value = valueByCategory[category] || 0;
            const count = context.parsed.y;
            return [
              `Products: ${count}`,
              `Total Value: $${value.toLocaleString()}`,
            ];
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h4>Category Breakdown</h4>
      <div style={{ maxWidth: 500 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

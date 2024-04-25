import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Loading from "../components/Loading";
import { Col, Row } from "react-bootstrap";
import { useAppContext } from "../hooks/AppContext";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Expenses reports",
    },
  },
};

function Report() {
  const { state } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    if (state.data != null) {
      generateReport();
    }
  }, [state]);

  const generateReport = async () => {
    try {
      // Fetch expenses, budgets, and financial goals data
      const [expensesResponse, budgetsResponse, goalsResponse] =
        await Promise.all([
          axiosInstance.get("/expenses/user/" + state.data.id),
          axiosInstance.get("/budgets/user/" + state.data.id),
          axiosInstance.get("/financial-goals/user/" + state.data.id),
        ]);

      // Process and transform the data to generate the report
      const reportData = processData(
        expensesResponse.data,
        budgetsResponse.data,
        goalsResponse.data,
      );

      // Update state with the generated report data
      setReportData(reportData);
    } catch (error) {
      console.error("Error generating report:", error);
    }
    setLoading(false);
  };

  const processData = (expenses, budgets, goals) => {
    // Perform data processing and aggregation here
    // Example: calculate total expenses, compare with budgets, track progress towards goals, etc.
    // For demonstration, let's create a bar chart with expenses by category
    return {};
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Budgets",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expenses",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Financial Goal",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };

  return (
    <div className="mt-4">
      {loading && <Loading />}

      {!loading && (
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Bar options={options} data={data} width={400} height={200} />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Report;

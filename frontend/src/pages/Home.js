import React from "react";

function Home() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <h2>Welcome to Expense Tracker</h2>
            <p>
              This is the home page of the Expense Tracker application. You can
              use this app to track your expenses, manage budgets, and analyze
              spending habits.
            </p>
          </div>
          <div>
            <h3>Features:</h3>
            <ul className="list-group">
              <li className="list-group-item">
                Track expenses: Record your expenses with details like amount,
                category, and date.
              </li>
              <li className="list-group-item">
                Manage budgets: Set up budget limits for different categories
                and track your spending against them.
              </li>
              <li className="list-group-item">
                Generate reports: View detailed reports and visualizations of
                your spending habits over time.
              </li>
              <li className="list-group-item">
                Financial goals: Set financial goals and track your progress
                towards achieving them.
              </li>
              <li className="list-group-item">
                User authentication: Securely authenticate users to access their
                personalized data.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import React from "react";

function About() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <h2>About Expense Tracker</h2>
            <p>
              Expense Tracker is a web application designed to help users track
              their expenses, manage budgets, and analyze spending habits
              effectively.
            </p>
          </div>
          <div>
            <h3>Specifications:</h3>
            <ul className="text-left">
              <li>
                <strong>Users:</strong> Individuals who want to manage their
                finances and track expenses.
              </li>
              <li>
                <strong>Features:</strong>
                <ul>
                  <li>
                    Expense tracking: Users can record their expenses with
                    details like amount, category, and date.
                  </li>
                  <li>
                    Budget management: Set budget limits for different
                    categories and track spending against them.
                  </li>
                  <li>
                    Reports generation: View detailed reports and visualizations
                    of spending habits over time.
                  </li>
                  <li>
                    Financial goals: Set and track progress towards financial
                    goals.
                  </li>
                  <li>
                    User authentication: Securely authenticate users to access
                    their data.
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              For more details, please visit the{" "}
              <a
                href="https://github.com/maharishi-university/final-project-whuan132-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

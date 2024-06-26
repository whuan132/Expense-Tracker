import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAppContext } from "../hooks/AppContext";
import logo from "../logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setState } = useAppContext();
  const [buttonLb, setButtonLb] = useState("Login");
  const [activeKey, setActiveKey] = useState(1);

  useEffect(() => {
    setButtonLb(location.pathname === "/login" ? "Register" : "Login");
    // set title
    const str = location.pathname.split("/")[1];
    document.title =
      "Expense Tracker - " +
      (str === "" ? "Home" : str.charAt(0).toUpperCase() + str.slice(1));

    // set active key
    if (location.pathname.endsWith("/home")) setActiveKey(1);
    else if (
      location.pathname.endsWith("/expenses") ||
      location.pathname.endsWith("/add-expense") ||
      location.pathname.startsWith("/edit-expense/")
    )
      setActiveKey(2);
    else if (
      location.pathname.endsWith("/budgets") ||
      location.pathname.endsWith("/add-budget") ||
      location.pathname.startsWith("/edit-budget/")
    )
      setActiveKey(3);
    else if (
      location.pathname.endsWith("/financial-goals") ||
      location.pathname.endsWith("/add-financial-goal") ||
      location.pathname.startsWith("/edit-financial-goal/")
    )
      setActiveKey(4);
    else if (location.pathname.endsWith("/report")) setActiveKey(5);
    else if (location.pathname.endsWith("/about")) setActiveKey(6);
    else if (str === "") setActiveKey(1);
    else setActiveKey(0);
  }, [location]);

  const logoutHandler = () => {
    setState({ token: null, data: null });
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const buttonHandler = () => {
    buttonLb === "Login" ? navigate("/login") : navigate("/register");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">
          <img
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {state.data != null ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav justify variant="tabs" activeKey={activeKey}>
              <Nav.Item>
                <Nav.Link href="/home" eventKey="1">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/expenses" eventKey="2">
                  Expenses
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/budgets" eventKey="3">
                  Budgets
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/financial-goals" eventKey="4">
                  FinancialGoals
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/report" eventKey="5">
                  Report
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about" eventKey="6">
                  About
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav justify variant="tabs" activeKey={activeKey}>
              <Nav.Item>
                <Nav.Link href="/home" eventKey="1">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about" eventKey="6">
                  About
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        )}

        {state.data != null ? (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/update-info">{state.data.email}</a>
            </Navbar.Text>
            <Button variant={"link"} onClick={logoutHandler}>
              Logout
            </Button>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-success" onClick={buttonHandler}>
              {buttonLb}
            </Button>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;

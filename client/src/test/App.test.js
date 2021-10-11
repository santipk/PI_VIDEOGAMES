import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const linkElement = screen.getByText(/ingresar/i);
  expect(linkElement).toBeInTheDocument();
});
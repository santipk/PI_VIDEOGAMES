import { render, screen } from "@testing-library/react";
import LandingPage from "../components/landingPage/Landing";
import { BrowserRouter as Router } from "react-router-dom";

test("la landing debe tener un boton de ingresar", () => {
    render(
        <Router>
            <LandingPage />
        </Router>
    );

    const linkElement = screen.getByText(/ingresar/i);
    expect(linkElement).toBeInTheDocument();
}); 
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import inicio from "./resources/inicio.gif";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CryptoMonedaComponent from "./components/CryptoMonedaComponent/CryptoMonedaComponent";

function App() {
  return (
    <Container>
      <Grid item xs={12} align="center">
        <h1>CryptoCurrency</h1>
      </Grid>
      <Grid item xs={12} align="center">
        <img src={inicio}></img>
      </Grid>

      <BrowserRouter>
        <div className="links">
        </div>
        <Routes>
          <Route
            path="/"
            element={<CryptoMonedaComponent />}
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

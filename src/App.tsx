import { Container, Toolbar } from "@material-ui/core";
import { Footer, Header } from "modules/common/components/";
import Home from "modules/home/components/Home";

import "./App.css";
function App() {
  return (<div>
      <Header />
      <Toolbar /> 
      <Container>
        <Home />
      </Container>
      <Footer />
    </div>
  );
}

export default App;

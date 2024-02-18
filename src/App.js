import './App.css';
import { BusTable } from './components/BusTable/BusTable';
import { Header } from './components/Header/Header';
import { Container } from './layouts/Container/Container';

function App() {

  return (
    <Container>
      <Header />
      <BusTable />

    </Container>
  );
}

export default App;

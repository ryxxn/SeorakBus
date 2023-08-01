import './App.css';
import { BusTable } from './components/BusTable';

function App() {

  return (
    <div className="container">
      <header>
        <h1>{"설악 - 잠실 버스"}</h1>
      </header>
      <BusTable />
      <footer>
        <p>Copyright © dochi</p>
        <address>사이트 문의 : dochi00@gmail.com</address>
      </footer>
    </div>
  );
}

export default App;

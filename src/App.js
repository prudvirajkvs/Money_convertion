import Login from './Login';
import MoneyConvertion from './MoneyConvertion';

function App() {
  const user = false;
  return (
    <div className="App container">
      {user ? <MoneyConvertion /> : <Login />}
    </div>
  );
}

export default App;

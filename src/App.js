import Login from './Login';
import MoneyConvertion from './MoneyConvertion';
import { useSelector } from 'react-redux';
import store from './store';
import { actionTypes } from './reducer';
import { useEffect } from 'react';

function App() {
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (localStorage.getItem('user')?.length > 0) {
      store.dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(localStorage.getItem('user'))?.user,
      });
    }
  }, [localStorage.getItem('user')]);
  return (
    <div className="App container">
      {user ? <MoneyConvertion /> : <Login />}
    </div>
  );
}

export default App;

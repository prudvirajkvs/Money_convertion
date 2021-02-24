import { Button } from 'react-bootstrap';
import { actionTypes } from './reducer';
import store from './store';
const Header = ({ user }) => {
  const signOut = () => {
    localStorage.setItem('user', null);
    store.dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
  };
  return (
    <div className="container bg-dark text-white rounded-bottom text-center ">
      <h1 className="display-4 mb-3"> Money Convertion</h1>
      {user && (
        <>
          <span>Welcome </span>
          <span className="text-info">{user}</span>
          <Button variant=" bg-warning ml-4 mb-1 " onClick={signOut}>
            <img src="'.images/danger.png" alt="" />
            Sign out
          </Button>
        </>
      )}
    </div>
  );
};
export default Header;

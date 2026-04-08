import { Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './Context/AuthContext'; 
import Login from './Page/Login';
import Dashboard from './Page/Dashboard';
import SingUp from './Page/SingUp';
import ForgotPassword from './Page/ForgotPassword';
import {Provider} from 'react-redux'
import { persistor, store } from './Context/store';
import { PersistGate } from 'redux-persist/integration/react';
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset" element={<ForgotPassword />} />
      </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
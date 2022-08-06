import './App.css';
import Content from './Components/Content';
import Footer from './Components/Footer';
import {useMoralis} from 'react-moralis';
import { createContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NewBlog from './Pages/NewBlog';
import Blogs from './Pages/Blogs';
import Profile from './Pages/Profile';
import SingleBlog from './Pages/SingleBlog';
import Side from './Components/Side';

export const AppContext = createContext();

function App() {
  const {authenticate, isAuthenticated, user, logout} = useMoralis();
  let navigate = useNavigate();
  var [currentUser, setCurrentUser] = useState();
  const handleLogin = async() =>{
    if(!currentUser){
      try {
        await authenticate({ signingMessage: "Login with your wallet" }).then(
          function (user) {
            console.log("logged in user:", user);
            setCurrentUser(user?.get("ethAddress"));
          }
        );
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  }
  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    alert("Logged out");
    navigate("/");
  }
  return (
    <>
      <AppContext.Provider
        value={{
          handleLogout,
          isAuthenticated,
          handleLogin,
          currentUser,
        }}
      >
        <div className="app">
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/newBlog" element={<NewBlog />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blog/:url" element={<SingleBlog />} />
            </Routes>
          ) : (
            <div className="hero min-h-screen bg-base-200">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="text-5xl font-bold">Hello there</h1>
                  <p className="py-6">
                    To get started connect your wallet using this button. Please
                    use Polygon Mumbai Testnet for testing.
                  </p>
                  <button className="btn btn-primary" onClick={handleLogin}>
                    Connect Wallet
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* <Footer /> */}
          <Side />
        </div>

      </AppContext.Provider>
    </>
  );
}

export default App;

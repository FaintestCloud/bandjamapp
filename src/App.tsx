import { useEffect, useState } from 'react'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from './firebaseConfig'
import Home from './pages/Home'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

const handleLogin = async () => signInWithPopup(auth, provider);
const handleLogout = async () => signOut(auth);

return (
  <div className="p-4 max-w-md mx-auto" >
    {!user ? (
      <button
       onClick={handleLogin} 
       className="w-full bg-blue-500 text-white py-2 rounded-lg" 
       >
        Sign in with Google
      </button>
    ) : (
      <>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg">Welcome, {user.displayName}</p>
          <button onClick={handleLogout} className="text-red-500">
            Logout
          </button>
        </div>
        <Home user={user} />
      </>
    )}
  </div>
);
}

export default App;

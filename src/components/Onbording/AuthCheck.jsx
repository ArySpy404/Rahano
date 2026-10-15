import { useEffect, useState } from "react";
import { createContext } from "react";


  export const AuthContext = createContext();
export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

   useEffect(() => {
     async function CheckAuth() {
       try {
         const res = await fetch("http://localhost:3001/api/me", {
           method: "GET",
           credentials: "include",
         });

         if (res.ok) {
           const result = await res.json();
           setUser(result);
           console.log(result);
         } else {
          setUser(null);
           console.log(res.status);
         }
       } catch (err) {
         console.error(err);
         setUser(null);
       } finally {
         setLoading(false);
       }
     }
     CheckAuth();
   }, []);

  return (
    <AuthContext.Provider value={{ user , loading , setUser}}>
      {children}
      </AuthContext.Provider>
  )
}

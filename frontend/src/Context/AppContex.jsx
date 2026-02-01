// import { createContext, useContext, useEffect, useState } from "react";

// const AppContex = createContext();

// export const AppProvider = ({children})=>{

//     // states manegments

//     const [Loading, SetLoading]=useState(false);

//     const [CurrenUser,setCurrenUser]=useState(()=>{
//         const storeUser= localStorage.getItem('current-usre-data');
//         return storeUser ? JSON.parse(CurrenUser):null;

//     })

//     const [error,Seterror]=useState(null)

//     useEffect(()=>{
//         if(CurrenUser){
//             localStorage.setItem('current-usre-data', JSON.stringify(CurrenUser));
//         } else {
//             localStorage.removeItem('current-usre-data')
//         }
//     },[CurrenUser])
//     // action

//     const signInStart = ()=>SetLoading(true);

//     const signInSuccess = (user)=>{
//         setCurrenUser(user),
//         Seterror(null),
//         SetLoading(false)
//     }

//     const signInFailure =(errorMessage)=>{
//         SetLoading(false),
//         Seterror(errorMessage)
//     }

//     // 
//     const value={
//         error,
//         Loading,
//         CurrenUser,
//         signInStart,
//         signInSuccess,
//         signInFailure
//     }
    
//    return <AppContex.Provider value={value}>{children}</AppContex.Provider>
// }

// export const useAppContext =()=>{
//     const Context= useContext(AppContex);

//     if(!Context){
//         throw new Error ("useAppContex must be used within an AppProvider");
  
//     }

//         return Context;
// }



import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('current-user-data');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        'current-user-data',
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem('current-user-data');
    }
  }, [currentUser]);

  // actions
  const signInStart = () => {
    setLoading(true);
  };

  const signInSuccess = (user) => {
    setCurrentUser(user);
    setError(null);
    setLoading(false);
  };

  const signInFailure = (errorMessage) => {
    setLoading(false);
    setError(errorMessage);
  };

  const updateStart= ()=>{
    setLoading(true);
  }

  const updateSuccess= (updatedUser)=>{
    setCurrentUser(updatedUser);
    setError(null);
    setLoading(false)
  }
  const updateFailure= (errorMessage)=>{
    setLoading(false);
    setError(errorMessage);
  }
  



  
  const deleteStart= ()=>{
    setLoading(true);
  }

  const deleteSuccess= ()=>{
    setCurrentUser(null);
    setError(null);
    setLoading(false);
    localStorage.removeItem('current-user-data');
  }
  
  const deleteFailure= (errorMessage)=>{
    setLoading(false);
    setError(errorMessage);
  }




  
  const signOutStart= ()=>{
    setLoading(true);
  }

  const signOutSuccess= ()=>{
    setCurrentUser(null);
    setError(null);
    setLoading(false);
    localStorage.removeItem('current-user-data');
  }

  const signOutFailure= (errorMessage)=>{
    setLoading(false);
    setError(errorMessage);
  }

  


  
  

  const value = {
    loading,
    error,
    currentUser,
    signInStart,
    signInSuccess,
    signInFailure,
    updateStart,
    updateSuccess,
    updateFailure,
    deleteStart,
    deleteSuccess,
    deleteFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};

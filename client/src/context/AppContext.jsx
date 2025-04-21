import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isloggedin, setIsloggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const getAuthState = async () => {
    try {
      // First check for admin authentication
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        try {
          const { data } = await axios.get(
            `${backendUrl}/api/owner/verify-admin`,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
              },
            }
          );

          if (data.success && data.admin) {
            setIsloggedin(true);
            setIsAdmin(true);
            return;
          }
        } catch (error) {
          console.error("Admin verification failed:", error);
          localStorage.removeItem("adminToken");
        }
      }

      // Check owner authentication
      try {
        const { data } = await axios.get(`${backendUrl}/api/owner/verify-owner`, {
          withCredentials: true
        });
        if (data.success) {
          setIsloggedin(true);
          setIsAdmin(false);
          setUserData(data.owner);
          return;
        }
      } catch (ownerError) {
        console.log('No owner session');
      }

      // If not admin, check regular user authentication
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsloggedin(true);
        setIsAdmin(false);
        getUserData();
      } else {
        setIsloggedin(false);
        setIsAdmin(false);
        setUserData(false);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      localStorage.removeItem("adminToken");
      setIsloggedin(false);
      setIsAdmin(false);
      setUserData(false);
      toast.error(error.response?.data?.message || "Authentication failed");
    }
  };

  // Update getAuthState function
  // const getAuthState = async () => {
  //     try {
  //       // First check admin status
  //       try {
  //         const { data } = await axios.get(`${backendUrl}/api/owner/verify-admin`, {
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
  //           }
  //         });

  //         if (data.success && data.isAdmin) {
  //           setIsloggedin(true);
  //           setIsAdmin(true);
  //           return; // Exit after successful admin verification
  //         }
  //       } catch (adminError) {
  //         // Silent fail for admin check
  //         localStorage.removeItem('adminToken');
  //       }

  //       // Regular user check only if not admin
  //       const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
  //       if (data.success) {
  //         setIsloggedin(true);
  //         getUserData();
  //       } else {
  //         setIsloggedin(false);
  //       }
  //     } catch (error) {
  //       // Generic error handling
  //       setIsloggedin(false);
  //       setIsAdmin(false);
  //     }
  //   };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error(error.response?.data?.message || "Failed to fetch user data");
    }
  };

  const logout = async () => {
    try {
      // Clear tokens and reset states
      localStorage.removeItem("adminToken");

      // Perform backend logout for admin if needed
      if (isAdmin) {
        await axios.post(`${backendUrl}/api/owner/admin/logout`);
      }

      // Clear all tokens and cookies
    localStorage.removeItem('adminToken');
    document.cookie = 'ownerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Perform backend logouts
    await axios.post(`${backendUrl}/api/owner/logout`);

      // Reset all states
      setIsloggedin(false);
      setIsAdmin(false);
      setUserData(false);

      // Show logout success message
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isloggedin,
    setIsloggedin,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    isAdmin,
    setIsAdmin,
    logout,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

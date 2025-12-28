import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios.js";
import { MatxLoading } from "app/components";
import * as authService from "app/services/auth.service";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  return true; // Bypass JWT validation for now
  // const decodedToken = jwtDecode(accessToken)
  // const currentTime = Date.now() / 1000
  // return decodedToken.exp > currentTime
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password, type) => {
    const response = await authService.login(email, password, type);
    const { token, user } = response.data;

    // Normalize user data
    const normalizedUser = {
      id: user.id || user.ID,
      role: user.type || user.Type || "GUEST",
      name: user.userName || user.UserName,
      email: user.email || user.Email,
      avatar: "/assets/images/face-6.jpg",
      ...user,
    };

    localStorage.setItem("userId", normalizedUser.id);
    setSession(token);

    dispatch({
      type: "LOGIN",
      payload: { user: normalizedUser },
    });
  };

  const register = async (email, username, password) => {
    const response = await authService.register({
      Email: email,
      UserName: username,
      Password: password,
      Type: "GUEST", // Default role
      Age: "0", // Default
      Country: "",
      City: "",
    });

    const user = response.data;

    const normalizedUser = {
      id: user.id || user.ID,
      role: user.type || user.Type || "GUEST",
      name: user.userName || user.UserName,
      email: user.email || user.Email,
      avatar: "/assets/images/face-6.jpg",
      ...user,
    };

    const accessToken = "dummy-token-" + normalizedUser.id;
    localStorage.setItem("userId", normalizedUser.id);

    setSession(accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user: normalizedUser,
      },
    });
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("userId");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const userId = window.localStorage.getItem("userId");

        if (accessToken && isValidToken(accessToken) && userId) {
          setSession(accessToken);
          const response = await authService.getUserById(userId);
          const user = response.data;

          const normalizedUser = {
            id: user.id || user.ID,
            role: user.type || user.Type || "GUEST",
            name: user.userName || user.UserName,
            email: user.email || user.Email,
            avatar: "/assets/images/face-6.jpg",
            ...user,
          };

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user: normalizedUser,
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

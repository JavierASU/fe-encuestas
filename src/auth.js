import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const BASE_AUTH_URL =
  process.env.NODE_ENV == "production"
    ? "https://intranet.fibra360.net/api"
    : "https://intranet.fibra360.net/api";

export const STATIC_URL =
  process.env.NODE_ENV == "production"
    ? "/static_files/"
    : "http://localhost:5000/static/";

const URL_REFRESH_TOKEN = BASE_AUTH_URL + "jwt/refresh/";
const STORAGE_KEY = "TOKEN_AUTH";
const { fetch: originalFetch } = window;

const createTokenProvider = () => {
  let observers = [];

  const getTokenInternal = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    const token = (data && JSON.parse(data)) || null;
    return token;
  };

  const getUser = () => {
    return !!_token ? _token.user : null;
  };

  let _token = getTokenInternal();
  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }
    return Date.now() > exp;
  };

  const getToken = async () => {
    if (!_token) {
      return null;
    }

    if (isExpired(getExpirationDate(_token.access_token))) {
      setToken(null);
    }

    return _token && _token.access_token;
  };

  const isLoggedIn = () => {
    return !!getTokenInternal();
  };

  const subscribe = (observer) => {
    observers.push(observer);
  };

  const unsubscribe = (observer) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setToken = (token) => {
    if (token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    _token = getTokenInternal();
    notify();
  };

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe,
    getUser,
    getTokenInternal,
  };
};

const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const login = (newTokens) => {
    tokenProvider.setToken(newTokens);
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  let cancelToken;

  const httpWrapper = () => {
    const http = axios.create({
      // withCredentials: true,
      baseURL: BASE_AUTH_URL,
    });

    http.interceptors.request.use(async (config) => {
      const token = await tokenProvider.getToken();
      console.log(token);
      if (token) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
    http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          if ("detail" in error.response?.data) {
            console.log("Permisos insuficientes");
            toast.warning("No tienes los permisos suficientes");
          } else {
            logout();
          }
          // window.location = "/login";
        } else if (error.response?.status === 503) {
          toast.warning(
            "360Control está fuera de servicio por mantenimiento. Vuelva pronto 😊",
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          logout();
        }
        return Promise.reject(error);
      }
    );

    return http;
  };

  const http = httpWrapper();

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());
    const [user, setUser] = useState(tokenProvider.getUser());

    const listener = useCallback(
      (newIsLogged) => {
        setIsLogged(newIsLogged);
        setUser(tokenProvider.getUser());
      },
      [setIsLogged]
    );

    useEffect(() => {
      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, [listener]);

    // return [true, {id: 1, username: "ignacio", scopes: "all"}]
    return [isLogged, user, tokenProvider];
  };

  return [useAuth, http, login, logout];
};

export const [useAuth, http, login, logout] = createAuthProvider();

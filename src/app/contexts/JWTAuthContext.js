import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';


const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (formData) => {
        const response = await axios.post('https://localhost:7040/api/Registration/Login',formData)
        console.log(response)
        if(response.status===200){
            let user={...response?.data , accessToken:response?.data?.accessToken ?? ""}
            debugger
            const accessToken = jwt.sign({ userId: user.userName }, JWT_SECRET, {
            expiresIn: JWT_VALIDITY,
        });
        
        let registerResponse=await axios.get("https://localhost:7040/api/Registration/Get-Register")
        let filterRecord=registerResponse?.data?.find(x=>x.userName?.trim()===user?.userName?.trim())
             localStorage.setItem('accessToken',filterRecord?.id)
             localStorage.setItem('loginUserId',filterRecord?.id)
             localStorage.setItem('userData',JSON.stringify(user))
    
             setSession(user.accessToken)
            dispatch({
                type: 'LOGIN',
                payload: {
                    user,
                    isAuthenticated: true,
                },
            })
        

        }else{
            console.log('something went wrong')
        }
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data
        setSession(accessToken)
        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        console.log('LOGOUT')
        localStorage.removeItem('User')
        localStorage.removeItem('userData')
        localStorage.removeItem('loginUserId')
        localStorage.removeItem('accessToken')
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('loginUserId')
                debugger
                if (accessToken) {
                    // const response = await axios.get('/api/auth/profile')
                    let getuserData=JSON.parse(localStorage.getItem("userData"));

                    // const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            getuserData,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

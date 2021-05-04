import {createContext, useReducer } from "react"
import { lightTheme, darkTheme } from '../styles/theme.css';
import {ThemeProvider} from "styled-components"

export const ThemeContext = createContext();

export default ({ children }) => {
    const value = lightTheme;
    const initialState = {currentTheme: value == darkTheme ? darkTheme : lightTheme}

    const [state, dispatch] = useReducer(reducer, initialState);
    const {currentTheme} = state;

    return (
        <ThemeProvider theme={currentTheme}>
            <ThemeContext.Provider value={{...state, dispatch}}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    )
}

export function reducer(state, action) {
    switch(action.type) {
        // case "setTheme":
        //     return {...state, currentTheme: action.value};
        // case "updateTheme":
        //     return {
        //         ...state,
        //         currentTheme: { ...theme[state.currentTheme], ...action.value }
        //     };
            
        case "toggleTheme": {
            const newTheme = state.currentTheme.id == "light" ? darkTheme : lightTheme
            return { ...state, currentTheme: newTheme};
        }
        default:
            throw new Error("problem with toggling theme dark and light.");
    }
}
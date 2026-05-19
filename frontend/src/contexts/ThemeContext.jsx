import {createContext,useContext,useState} from "react"

import modernDark from "../themes/modernDark"

import terminalTheme from "../themes/terminalTheme"


const ThemeContext=createContext()


export function ThemeProvider({children}){

const [theme,setTheme]=useState(
modernDark
)


const toggleTheme=()=>{

setTheme(

prev=>

prev.name==="modern"

?terminalTheme

:modernDark

)

}


return(

<ThemeContext.Provider

value={{

theme,

toggleTheme

}}

>

{children}

</ThemeContext.Provider>

)

}


export const useTheme=()=>
useContext(
ThemeContext
)
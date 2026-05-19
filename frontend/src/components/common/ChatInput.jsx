import {useTheme}
from "../../contexts/ThemeContext"

function ChatInput(){

const {theme}=useTheme()

const isTerminal=
theme.name==="terminal"

return(

<div

style={{

display:"flex",

background:
isTerminal
?"#111111"
:"#1E293B",

border:
isTerminal
?"1px solid #FF8C00"
:"none",

borderRadius:
isTerminal
?"8px"
:"20px",

overflow:"hidden",

width:"100%"

}}

>

<input

placeholder={
isTerminal
?"Ask a coding question..."
:"Ask anything..."
}

style={{

flex:1,

padding:"14px",

background:"transparent",

border:"none",

outline:"none",

color:
theme.text,

fontFamily:
theme.font,

fontSize:"16px"

}}

/>


<button

style={{

width:"60px",

border:"none",

cursor:"pointer",

background:

isTerminal
?"#FF8C00"
:"#7C3AED",

color:"white",

fontSize:"20px",

fontWeight:"bold"

}}

>

➤

</button>

</div>

)

}

export default ChatInput
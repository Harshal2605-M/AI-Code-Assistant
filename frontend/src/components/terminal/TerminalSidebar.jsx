import {useTheme}
from "../../contexts/ThemeContext"

function TerminalSidebar(){

const {toggleTheme}=useTheme()

return(

<div
style={{

width:"260px",

height:"100vh",

background:"#0A0A0A",

color:"#39FF14",

padding:"25px",

fontFamily:"monospace",

display:"flex",

flexDirection:"column",

borderRight:
"1px solid #262626"

}}
>

<div
style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"25px"

}}
>

<h2
style={{

textShadow:
"0 0 8px #39FF14"

}}
>

AI Code Assistant

</h2>


<button

onClick={toggleTheme}

style={{

background:"transparent",

border:"none",

color:"#FF8C00",

fontSize:"18px",

cursor:"pointer"

}}

>

🎨

</button>

</div>


<button

style={{

background:"transparent",

border:
"1px solid #FF8C00",

padding:"12px",

color:"#39FF14",

cursor:"pointer",

borderRadius:"6px",

marginBottom:"25px"

}}

>

+ New Chat

</button>


<div
style={{

color:"#BFBFBF",

fontSize:"12px",

marginBottom:"15px"

}}
>

TODAY

</div>


<div
style={{

padding:"12px",

background:"#171717",

border:
"1px solid #262626",

borderRadius:"6px",

color:"#FF8C00"

}}
>

Explain deadlock

</div>

<div style={{marginTop:"12px"}}>

C++ Inheritance

</div>

<div style={{marginTop:"12px"}}>

DBMS Normalization

</div>

<div style={{marginTop:"12px"}}>

CSS Flexbox

</div>


<div
style={{

marginTop:"auto",

borderTop:
"1px solid #262626",

paddingTop:"20px"

}}
>

⚙ Settings

</div>

</div>

)

}

export default TerminalSidebar
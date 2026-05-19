import { useTheme } from "../../contexts/ThemeContext"

function ModernSidebar(){

const {toggleTheme}=useTheme()

return(

<div
style={{

width:"280px",

height:"100vh",

background:"#0F172A",

color:"white",

padding:"24px",

display:"flex",

flexDirection:"column",

gap:"20px",

borderRight:"1px solid #2A3441"

}}
>

<div
style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}
>

<h2>

⚡ AI Assistant

</h2>


<button

onClick={toggleTheme}

style={{

background:"transparent",

border:"none",

color:"#7C3AED",

fontSize:"20px",

cursor:"pointer"

}}

>

🎨

</button>

</div>


<button

style={{

background:"#7C3AED",

border:"none",

padding:"14px",

borderRadius:"16px",

color:"white",

cursor:"pointer",

fontWeight:"600"

}}

>

+ New Chat

</button>


<p
style={{

color:"#94A3B8",

fontSize:"12px"

}}
>

RECENT CHATS

</p>


<div
style={{

padding:"16px",

background:"#1E293B",

borderRadius:"18px",

boxShadow:
"0 0 20px rgba(124,58,237,.25)"

}}

>

Explain deadlock

</div>

<div>C++ Inheritance</div>

<div>DBMS Normalization</div>

<div>CSS Flexbox</div>


<div
style={{

marginTop:"auto"

}}
>

⚙ Settings

</div>

</div>

)

}

export default ModernSidebar
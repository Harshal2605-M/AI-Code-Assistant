import {useTheme}
from "../../contexts/ThemeContext"

import {useChat}
from "../../contexts/ChatContext"


function ModernSidebar(){

const {toggleTheme}=
useTheme()

const {

clearChat,
history,
loadChat

}=useChat()


return(

<div
style={{

width:"300px",

height:"100vh",

background:
"#0F172A",

padding:"28px",

display:"flex",

flexDirection:"column",

borderRight:
"1px solid #23304E",

color:"white"

}}
>

{/* Header */}

<div
style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"30px"

}}
>

<h1
style={{

fontSize:"28px",
fontWeight:"700",
margin:0

}}
>

⚡ AI Assistant

</h1>


<button

onClick={toggleTheme}

style={{

border:"none",

background:"transparent",

fontSize:"24px",

cursor:"pointer"

}}

>

🎨

</button>

</div>



{/* New Chat */}

<button

onClick={clearChat}

style={{

padding:"18px",

border:"none",

borderRadius:"22px",

background:
"linear-gradient(90deg,#7C3AED,#A855F7)",

color:"white",

fontSize:"24px",

fontWeight:"600",

cursor:"pointer",

marginBottom:"40px"

}}

>

+ New Chat

</button>



<div
style={{

fontSize:"14px",

opacity:.7,

marginBottom:"18px"

}}
>

RECENT CHATS

</div>


<div
style={{

flex:1,

overflowY:"auto"

}}
>

{

history.length===0?

(

<div
style={{

opacity:.5,

fontSize:"14px"

}}
>

No chats yet

</div>

)

:

history.map(chat=>(

<div

key={chat.id}

onClick={()=>loadChat(chat.id)}

style={{

padding:"18px",

marginBottom:"14px",

background:"#1E2A44",

borderRadius:"20px",

cursor:"pointer",

transition:"0.3s"

}}

>

{chat.title}

</div>

))

}

</div>



<div
style={{

marginTop:"auto",

paddingTop:"20px",

borderTop:
"1px solid #23304E",

fontSize:"18px"

}}
>

⚙ Settings

</div>

</div>

)

}

export default ModernSidebar
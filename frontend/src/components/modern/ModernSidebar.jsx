import {useTheme}
from "../../contexts/ThemeContext"

import {useChat}
from "../../contexts/ChatContext"

function ModernSidebar(){

const {toggleTheme}=useTheme()

const {

clearChat,
history,
loadChat,
activeChatId

}=useChat()


return(

<div
style={{

width:"300px",
height:"100vh",

background:"#0F172A",

padding:"28px",

display:"flex",

flexDirection:"column",

borderRight:
"1px solid #23304E",

color:"white"

}}
>

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


<button

onClick={clearChat}

style={{

padding:"18px",

border:"none",

borderRadius:"22px",

background:
"linear-gradient(90deg,#7C3AED,#A855F7)",

color:"white",

fontSize:"18px",

fontWeight:"600",

cursor:"pointer",

marginBottom:"30px"

}}

>

+ New Chat

</button>



<div
style={{

fontSize:"13px",

opacity:.6,

marginBottom:"18px",

letterSpacing:"1px"

}}
>

TODAY

</div>


<div
style={{

flex:1,

overflowY:"auto"

}}
>

{

history.length===0

?

<div
style={{

opacity:.45,

fontSize:"14px",

padding:"20px"

}}
>

No recent chats

</div>

:

history.map(chat=>(

<div

key={chat.id}

onClick={()=>loadChat(chat.id)}

style={{

padding:"16px",

marginBottom:"10px",

background:

activeChatId===chat.id
?"#2A3757"
:"#1E2A44",

border:

activeChatId===chat.id
?"1px solid #7C3AED"
:"1px solid transparent",

borderRadius:"18px",

cursor:"pointer",

transition:".3s",

whiteSpace:"nowrap",

overflow:"hidden",

textOverflow:"ellipsis"

}}

>

💬 {chat.title}

</div>

))

}

</div>


<div
style={{

marginTop:"auto",

paddingTop:"20px",

borderTop:
"1px solid #23304E"

}}
>

⚙ Settings

</div>

</div>

)

}

export default ModernSidebar
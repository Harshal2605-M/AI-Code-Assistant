import {useTheme}
from "../../contexts/ThemeContext"

import {useChat}
from "../../contexts/ChatContext"

function TerminalSidebar(){

const {toggleTheme}=useTheme()

const {

clearChat,
history=[],
loadChat,
activeChatId=null

}=useChat()


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
borderRight:"1px solid #262626"

}}
>

{/* Header */}

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

margin:0,
textShadow:"0 0 8px #39FF14"

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
fontSize:"22px",
cursor:"pointer"

}}

>

🎨

</button>

</div>



<button

onClick={clearChat}

style={{

background:"transparent",
border:"1px solid #FF8C00",
padding:"14px",
color:"#39FF14",
cursor:"pointer",
borderRadius:"8px",
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

TODAY.LOG

</div>



<div
style={{

flex:1,
overflowY:"auto"

}}
>

{

history.length===0 ?

(

<div
style={{

color:"#777"

}}
>

No chats

</div>

)

:

history.map(chat=>(

<div

key={chat.id}

onClick={()=>loadChat(chat.id)}

style={{

padding:"14px",

background:

activeChatId===chat.id
?"#061206"
:"#171717",

border:

activeChatId===chat.id
?"1px solid #39FF14"
:"1px solid #262626",

borderRadius:"8px",

color:"#FF8C00",

cursor:"pointer",

marginBottom:"12px",

whiteSpace:"nowrap",
overflow:"hidden",
textOverflow:"ellipsis",

transition:"0.25s"

}}

>

&gt; {chat.title}

</div>

))

}

</div>



<div
style={{

marginTop:"auto",
borderTop:"1px solid #262626",
paddingTop:"20px"

}}
>

⚙ Settings

</div>

</div>

)

}

export default TerminalSidebar
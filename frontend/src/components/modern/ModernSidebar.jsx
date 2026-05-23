import {useState}
from "react"

import {useTheme}
from "../../contexts/ThemeContext"

import {useChat}
from "../../contexts/ChatContext"

function ModernSidebar(){

const [search,setSearch]=
useState("")

const {toggleTheme}=useTheme()

const {

clearChat,
history,
loadChat,
deleteChat,
activeChatId

}=useChat()


const filteredHistory=

history.filter(chat=>

chat.title
.toLowerCase()
.includes(

search.toLowerCase()

)

)


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

marginBottom:"20px"

}}

>

+ New Chat

</button>



<div
style={{

marginBottom:"20px"

}}
>

<input

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

placeholder="🔍 Search chats..."

style={{

width:"100%",

padding:"14px",

border:"none",

outline:"none",

borderRadius:"14px",

background:"#1E2A44",

color:"white",

boxSizing:"border-box"

}}

/>

</div>




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

filteredHistory.length===0

?

<div
style={{

opacity:.45,

padding:"20px"

}}
>

No recent chats

</div>

:

filteredHistory.map(chat=>(

<div

key={chat.id}

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

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

borderRadius:"18px"

}}

>

<div

onClick={()=>

loadChat(chat.id)

}

style={{

flex:1,

cursor:"pointer",

whiteSpace:"nowrap",

overflow:"hidden",

textOverflow:"ellipsis"

}}

>

💬 {chat.title}

</div>



<div

onClick={(e)=>{

e.stopPropagation()

deleteChat(chat.id)

}}

style={{

cursor:"pointer",

fontSize:"16px"

}}

>

🗑

</div>

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
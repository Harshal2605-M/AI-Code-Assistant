import {useState}
from "react"

import {useTheme}
from "../../contexts/ThemeContext"

import {useChat}
from "../../contexts/ChatContext"

function TerminalSidebar(){

const [search,setSearch]=
useState("")

const {toggleTheme}=useTheme()

const {

clearChat,
history=[],
loadChat,
deleteChat,
activeChatId=null

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
marginBottom:"20px"

}}

>

+ New Chat

</button>



<div
style={{marginBottom:"20px"}}
>

<input

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

placeholder="Search..."

style={{

width:"100%",

padding:"12px",

background:"#171717",

color:"#39FF14",

border:
"1px solid #262626",

outline:"none",

boxSizing:"border-box",

fontFamily:"monospace"

}}

/>

</div>




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

filteredHistory.length===0 ?

<div
style={{color:"#777"}}
>

No chats

</div>

:

filteredHistory.map(chat=>(

<div

key={chat.id}

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

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

marginBottom:"12px"

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

textOverflow:"ellipsis",

color:"#FF8C00"

}}

>

&gt; {chat.title}

</div>



<div

onClick={(e)=>{

e.stopPropagation()

deleteChat(chat.id)

}}

style={{

cursor:"pointer"

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
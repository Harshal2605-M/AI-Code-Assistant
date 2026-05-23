import { useState } from "react"
import { useChat } from "../../contexts/ChatContext"
import { useTheme } from "../../contexts/ThemeContext"

function ChatInput(){

const [text,setText]=useState("")

const {

sendMessage,
isLoading

}=useChat()

const {theme}=useTheme()

const isModern=
theme.name==="modern"


const handleSend=()=>{

if(!text.trim()) return

if(isLoading) return

sendMessage(text)

setText("")

}


const handleKeyDown=(e)=>{

if(e.key==="Enter"){

e.preventDefault()

handleSend()

}

}


return(

<div
style={{

display:"flex",
alignItems:"center",
width:"100%",

opacity:
isLoading
?.8
:1,

background:

isModern
?"#1E293B"
:"#0A0A0A",

border:

isModern
?"none"
:"1px solid #FF8C00",

borderRadius:

isModern
?"28px"
:"10px",

overflow:"hidden",

boxShadow:

isModern
?"0 8px 30px rgba(0,0,0,.35)"
:"0 0 12px rgba(255,140,0,.15)"

}}
>

<input

disabled={isLoading}

value={text}

onChange={(e)=>{

setText(
e.target.value
)

}}

onKeyDown={handleKeyDown}

placeholder={

isLoading

?isModern
?"AI is thinking..."
:"SYSTEM BUSY..."

:isModern
?"Ask anything..."
:"Ask a coding question..."

}

style={{

flex:1,

padding:"22px",

background:"transparent",

border:"none",

outline:"none",

fontSize:"18px",

fontFamily:

isModern
?"Inter"
:"monospace",

color:

isModern
?"white"
:"#39FF14"

}}

/>


<button

disabled={isLoading}

onClick={handleSend}

style={{

width:"90px",
height:"72px",

border:"none",

cursor:
isLoading
?"not-allowed"
:"pointer",

fontSize:"24px",

background:

isModern
?"linear-gradient(135deg,#7C3AED,#A855F7)"
:"#FF8C00",

color:"white"

}}
>

{

isLoading

?(
isModern
?"..."
:"[RUN]"
)

:"➤"

}

</button>

</div>

)

}

export default ChatInput
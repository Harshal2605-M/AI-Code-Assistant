import { useEffect, useRef, useState } from "react"

import { useChat } from "../../contexts/ChatContext"

import TerminalMessageBubble
from "../common/TerminalMessageBubble"

import ChatInput
from "../common/ChatInput"

import SourceCard
from "../common/SourceCard"


function TerminalChatWindow(){

const {messages}=useChat()

const chatRef=useRef(null)
const bottomRef=useRef(null)

const [autoScroll,setAutoScroll]=
useState(true)



useEffect(()=>{

if(autoScroll){

bottomRef.current?.scrollIntoView({

behavior:"smooth"

})

}

},[messages,autoScroll])



const handleScroll=()=>{

const el=chatRef.current

if(!el) return

const threshold=150

const atBottom=

el.scrollHeight-
el.scrollTop-
el.clientHeight
<
threshold


setAutoScroll(atBottom)

}



return(

<div
style={{

flex:1,

height:"100vh",

background:"#000",

display:"flex",

flexDirection:"column",

overflow:"hidden",

position:"relative"

}}
>


{/* TOP BAR */}

<div
style={{

padding:"25px 40px",

borderBottom:
"1px solid rgba(255,140,0,.15)"

}}
>

<div
style={{

textAlign:"center",

fontSize:"22px",

color:"#FF8C00",

fontFamily:
"'Share Tech Mono', monospace",

textShadow:
"0 0 10px rgba(255,140,0,.7)"

}}
>

Explain deadlock in operating system

</div>

</div>



<div

ref={chatRef}

onScroll={handleScroll}

style={{

flex:1,

overflowY:"auto",

padding:"30px 40px",

display:"flex",

flexDirection:"column",

width:"100%",

maxWidth:"1500px",

margin:"0 auto"

}}
>

{

messages.map(

(msg,index)=>(

<div
key={index}
>

<TerminalMessageBubble

role={msg.role}

message={msg.text}

/>


{

msg.role==="assistant"
&&
msg.sources
&&
msg.sources.length>0
&&

<SourceCard
sources={msg.sources}
/>

}

</div>

)

)

}


<div ref={bottomRef}/>

</div>



{!autoScroll && (

<div
style={{

position:"absolute",

bottom:"100px",

left:"50%",

transform:"translateX(-50%)",

zIndex:100

}}
>

<button

onClick={()=>{

setAutoScroll(true)

bottomRef.current?.scrollIntoView({

behavior:"smooth"

})

}}

style={{

padding:"10px 18px",

borderRadius:"999px",

border:
"1px solid rgba(255,140,0,.2)",

background:"#111",

color:"#FF8C00",

cursor:"pointer",

fontFamily:
"'Share Tech Mono'",

boxShadow:
"0 0 10px rgba(255,140,0,.2)"

}}

>

↓ RETURN TO LIVE

</button>

</div>

)}



<div
style={{

padding:"25px 40px",

borderTop:
"1px solid rgba(255,140,0,.15)"

}}
>

<ChatInput/>

</div>

</div>

)

}

export default TerminalChatWindow
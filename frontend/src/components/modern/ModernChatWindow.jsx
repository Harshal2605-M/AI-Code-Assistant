import { useEffect, useRef, useState } from "react"

import ModernMessageBubble from "../common/ModernMessageBubble"
import ChatInput from "../common/ChatInput"
import Topbar from "../common/Topbar"
import SourceCard from "../common/SourceCard"

import { useChat } from "../../contexts/ChatContext"

function ModernChatWindow(){

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

background:"#050816",

display:"flex",

flexDirection:"column",

padding:"30px",

boxSizing:"border-box",

overflow:"hidden",

position:"relative"

}}
>

<Topbar
title="Explain deadlock in operating system"
/>


<div
style={{

flex:1,

display:"flex",

flexDirection:"column",

marginTop:"25px",

overflow:"hidden"

}}
>

<div

ref={chatRef}

onScroll={handleScroll}

style={{

flex:1,

overflowY:"auto",

paddingRight:"10px"

}}
>

{

messages.map(

(msg,index)=>(

<div
key={index}
>

<ModernMessageBubble

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

bottom:"110px",

left:"50%",

transform:"translateX(-50%)",

zIndex:10

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

border:"1px solid rgba(255,255,255,.08)",

background:"#1a2236",

color:"#fff",

cursor:"pointer",

fontSize:"14px",

boxShadow:
"0 8px 20px rgba(0,0,0,.4)"

}}

>

↓ View latest response

</button>

</div>

)}



<div
style={{

paddingTop:"20px"

}}
>

<ChatInput/>

</div>

</div>

</div>

)

}

export default ModernChatWindow
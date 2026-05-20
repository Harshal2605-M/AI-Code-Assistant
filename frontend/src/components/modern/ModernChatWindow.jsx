import ModernMessageBubble from "../common/ModernMessageBubble"
import ChatInput from "../common/ChatInput"
import Topbar from "../common/Topbar"

import {useChat} from "../../contexts/ChatContext"

function ModernChatWindow(){

const {messages}=useChat()

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

overflow:"hidden"

}}
>

{/* HEADER */}

<Topbar
title="Explain deadlock in operating system"
/>


{/* CHAT AREA */}

<div
style={{

flex:1,

display:"flex",

flexDirection:"column",

marginTop:"25px",

overflow:"hidden"

}}
>


{/* MESSAGES */}

<div
style={{

flex:1,

overflowY:"auto",

paddingRight:"10px",

scrollBehavior:"smooth"

}}
>

{

messages.map(

(msg,index)=>(

<ModernMessageBubble

key={index}

role={msg.role}

message={msg.text}

/>

)

)

}

</div>



{/* INPUT */}

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
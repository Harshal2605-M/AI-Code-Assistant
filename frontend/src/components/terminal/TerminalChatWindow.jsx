import {useChat} from "../../contexts/ChatContext"
import TerminalMessageBubble from "../common/TerminalMessageBubble"
import ChatInput from "../common/ChatInput"

function TerminalChatWindow(){

const {messages}=useChat()

return(

<div
style={{

flex:1,
height:"100vh",

background:"#000",

display:"flex",

flexDirection:"column",

overflow:"hidden"

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



{/* CHAT AREA */}

<div
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

<TerminalMessageBubble

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
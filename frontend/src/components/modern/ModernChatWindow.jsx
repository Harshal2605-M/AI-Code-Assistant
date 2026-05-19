import ModernMessageBubble from "../common/ModernMessageBubble"
import ChatInput from "../common/ChatInput"
import SourceCard from "../common/SourceCard"
import Topbar from "../common/Topbar"

function ModernChatWindow(){

return(

<div
style={{

flex:1,

height:"100vh",

background:"#0B1020",

display:"flex",

flexDirection:"column",

padding:"30px",

overflow:"hidden"

}}
>

<Topbar
title="Explain deadlock in operating system"
/>


<div
style={{

flex:1,

display:"grid",

gridTemplateColumns:"1fr 320px",

gap:"25px",

overflow:"hidden"

}}
>

{/* chat */}

<div
style={{

display:"flex",

flexDirection:"column",

gap:"25px",

overflowY:"auto",

paddingRight:"10px"

}}
>

<ModernMessageBubble

role="user"

message="Explain deadlock"

/>

<ModernMessageBubble

role="assistant"

message="
Deadlock occurs when two or more
processes wait indefinitely for resources."

/>

</div>


{/* sources */}

<div>

<SourceCard/>

</div>

</div>


<div
style={{

paddingTop:"20px",

maxWidth:"1000px",

width:"100%",

margin:"0 auto"

}}
>

<ChatInput/>

</div>

</div>

)

}

export default ModernChatWindow
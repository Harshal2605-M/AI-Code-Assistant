import TerminalMessageBubble
from "../common/TerminalMessageBubble"

import ChatInput
from "../common/ChatInput"

import TerminalSourcePanel
from "../common/TerminalSourcePanel"

function TerminalChatWindow(){

return(

<div
style={{

flex:1,

height:"100vh",

background:"#050505",

display:"flex",

flexDirection:"column",

padding:"25px",

fontFamily:"monospace",

overflow:"hidden"

}}
>

{/* Title */}

<div
style={{

textAlign:"center",

color:"#FF8C00",

fontSize:"18px",

marginBottom:"25px"

}}
>

Explain deadlock in operating system

</div>



{/* Main content */}

<div
style={{

flex:1,

display:"flex",

gap:"30px",

overflow:"hidden",

flexWrap:"wrap"

}}
>

{/* Chat messages */}

<div
style={{

flex:"3",

minWidth:"500px",

display:"flex",

flexDirection:"column",

gap:"30px",

overflowY:"auto",

paddingRight:"10px"

}}
>

<TerminalMessageBubble

role="user"

message="
Explain deadlock in operating system"

/>


<TerminalMessageBubble

role="assistant"

message="
Deadlock is a situation in which
two or more processes wait indefinitely."

/>

</div>


{/* Source Panel */}

<div
style={{

flex:"1",

minWidth:"120px"

}}
>

<TerminalSourcePanel/>

</div>

</div>


{/* Input Area */}

<div
style={{

paddingTop:"20px",

maxWidth:"1100px",

width:"100%",

margin:"0 auto"

}}
>

<ChatInput/>

</div>

</div>

)

}

export default TerminalChatWindow
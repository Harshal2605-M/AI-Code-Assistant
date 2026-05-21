import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"

function TerminalMessageBubble({

role,
message

}){

const isUser=role==="user"


// Remove accidental inline code from PDFs
// preserve real fenced code blocks

const cleanedMessage=

message

.split("```")

.map((part,index)=>{

if(index%2!==0){

return "```"+part+"```"

}

return part.replace(

/`([a-zA-Z_][a-zA-Z0-9_:<>()[\].-]*)`/g,

"$1"

)

})

.join("")



return(

<motion.div

initial={{

opacity:0,
x:-20

}}

animate={{

opacity:1,
x:0

}}

transition={{

duration:.35

}}

style={{

display:"flex",

flexDirection:"column",

alignItems:
isUser
?"flex-end"
:"stretch",

width:"100%",

marginBottom:"14px"

}}

>

<div
style={{

fontSize:"14px",

fontWeight:"700",

marginBottom:"6px",

fontFamily:
"'Share Tech Mono', monospace",

color:
isUser
?"#ff9900"
:"#39ff14",

textShadow:
isUser
?"0 0 8px rgba(255,153,0,.3)"
:"0 0 4px rgba(57,255,20,.15)"

}}
>

{isUser?"YOU":"AI"}

</div>



<div
style={{

width:
isUser
?"320px"
:"100%",

background:"#010101",

border:
"1px solid rgba(0,100,0,.45)",

borderRadius:"14px",

padding:
isUser
?"14px 20px"
:"18px 22px",

boxShadow:
"inset 0 0 60px rgba(0,20,0,.95)",

fontFamily:
"'Share Tech Mono', monospace",

overflow:"hidden"

}}
>

<ReactMarkdown

components={{

h1:({children})=>

<h1
style={{

fontSize:"24px",

margin:"0 0 12px",

color:"#39ff14",

fontWeight:"700"

}}
>

{children}

</h1>,


h2:({children})=>

<div
style={{

display:"flex",

gap:"8px",

margin:"14px 0 8px",

fontWeight:"700",

fontSize:"18px",

color:"#5cff5c"

}}
>

<span>{">>"}</span>

<span>{children}</span>

</div>,



p:({children})=>

<p
style={{

fontSize:"13px",

lineHeight:"1.5",

margin:"0 0 8px",

color:"#32CD32"

}}
>

{children}

</p>,



strong:({children})=>

<span
style={{

fontWeight:"700",

color:"#7CFC00"

}}
>

{children}

</span>,



ul:({children})=>

<div
style={{

margin:"5px 0"

}}
>

{children}

</div>,



ol:({children})=>

<div
style={{

margin:"5px 0"

}}
>

{children}

</div>,



li:({children})=>

<div
style={{

display:"flex",

alignItems:"flex-start",

gap:"8px",

marginBottom:"5px",

fontSize:"13px",

lineHeight:"1.5"

}}
>

<div
style={{

color:"#39ff14",

fontWeight:"700",

minWidth:"30px"

}}
>

{">>"}

</div>

<div
style={{

flex:1,

color:"#32CD32"

}}
>

{children}

</div>

</div>,



code({

inline,
className,
children

}){

const text=
String(children)
.trim()


const isRealCodeBlock=

!inline &&
className?.includes(
"language-"
)



if(!isRealCodeBlock){

return(

<span
style={{

color:"#7CFC00",

fontWeight:"600",

background:"transparent",

padding:0,

fontSize:"13px"

}}
>

{text}

</span>

)

}



return(

<div
style={{

marginTop:"12px",

marginBottom:"12px",

border:
"1px solid rgba(0,100,0,.4)",

borderRadius:"8px",

overflow:"hidden",

background:"#020202"

}}
>

<div
style={{

display:"flex",

justifyContent:
"space-between",

alignItems:"center",

padding:"8px 14px",

background:"#061206",

borderBottom:
"1px solid rgba(0,100,0,.4)",

color:"#39ff14",

fontSize:"12px"

}}
>

<span>

{className
?.replace(
"language-",
"" ) || "code"}

</span>


<button

style={{

background:"transparent",

border:"none",

color:"#39ff14",

cursor:"pointer",

fontSize:"12px",

fontFamily:
"'Share Tech Mono'"

}}

onClick={()=>{

navigator.clipboard.writeText(
text
)

}}

>

📋 copy

</button>

</div>


<pre
style={{

margin:0,

padding:"12px 16px",

background:"#010101",

overflowX:"auto",

fontSize:"12px",

lineHeight:"1.45",

color:"#39ff14"

}}
>

<code>

{text}

</code>

</pre>

</div>

)

}

}}

>

{cleanedMessage}

</ReactMarkdown>

</div>

</motion.div>

)

}

export default TerminalMessageBubble
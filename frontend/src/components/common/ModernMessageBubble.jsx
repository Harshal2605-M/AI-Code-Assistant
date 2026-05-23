import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"

import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter"

import { atomDark }
from "react-syntax-highlighter/dist/esm/styles/prism"


function ModernMessageBubble({

role,
message

}){

const isUser=
role==="user"


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
y:15

}}

animate={{

opacity:1,
y:0

}}

transition={{

duration:.3

}}

style={{

display:"flex",

flexDirection:"column",

alignItems:
isUser
?"flex-end"
:"stretch",

width:"100%",

marginBottom:"18px"

}}

>

<div

style={{

width:
isUser
?"340px"
:"100%",

maxWidth:
isUser
?"340px"
:"1250px",

margin:
isUser
?"0"
:"0 auto",

background:
isUser
?"linear-gradient(135deg,#7c3aed,#9333ea)"
:"#0f172a",

padding:
isUser
?"16px 22px"
:"30px 40px",

borderRadius:"22px",

border:
isUser
?"none"
:"1px solid rgba(255,255,255,.05)",

overflow:"hidden"

}}

>

<ReactMarkdown

components={{

h1:({children})=>

<h1
style={{

fontSize:"28px",

fontWeight:"800",

margin:"0 0 18px",

color:"#fff",

lineHeight:"1.3"

}}
>

{children}

</h1>,


h2:({children})=>

<h2
style={{

fontSize:"20px",

fontWeight:"700",

color:"#fff",

margin:"28px 0 14px",

padding:0,

lineHeight:"1.4",

textAlign:"left"

}}
>

{children}

</h2>,


h3:({children})=>

<h3
style={{

fontSize:"18px",

fontWeight:"700",

color:"#fff",

margin:"22px 0 12px",

lineHeight:"1.4"

}}
>

{children}

</h3>,


p:({children})=>

<p
style={{

fontSize:"15px",

lineHeight:"1.8",

margin:"0 0 14px 0",

padding:0,

color:"#e2e8f0",

textAlign:"left"

}}
>

{children}

</p>,


strong:({children})=>

<strong
style={{

fontWeight:"700",

color:"#fff"

}}
>

{children}

</strong>,


ol:({children})=>

<ol
style={{

paddingLeft:"22px",

margin:"12px 0",

lineHeight:"1.8",

color:"#fff"

}}
>

{children}

</ol>,


ul:({children})=>

<ul
style={{

margin:"12px 0",

paddingLeft:"22px",

color:"#fff"

}}
>

{children}

</ul>,


li:({children})=>

<li
style={{

marginBottom:"10px",

fontSize:"15px",

lineHeight:"1.8",

paddingLeft:"0px",

color:"#fff"

}}
>

{children}

</li>,


code({

inline,
className,
children

}){

const text=
String(children)
.replace(/\n$/,"")

const match=
/language-(\w+)/.exec(
className || ""
)


if(inline){

return(

<code
style={{

background:"#1e293b",

padding:"2px 6px",

borderRadius:"5px",

fontSize:"13px",

color:"#c084fc"

}}
>

{text}

</code>

)

}


if(!match){

return(

<span>

{text}

</span>

)

}


return(

<div
style={{

margin:"18px 0",

overflow:"hidden",

borderRadius:"14px",

background:"#111827",

border:
"1px solid rgba(255,255,255,.05)"

}}
>

<div
style={{

height:"46px",

display:"flex",

alignItems:"center",

justifyContent:"space-between",

padding:"0 18px",

background:"#1f2937"

}}
>

<span
style={{

fontSize:"13px",

fontWeight:"600",

color:"#d1d5db"

}}
>

{match[1]}

</span>


<button

onClick={()=>
navigator.clipboard.writeText(
text
)
}

style={{

background:"transparent",

border:"none",

cursor:"pointer",

fontSize:"13px",

color:"#c084fc"

}}

>

📋 Copy

</button>

</div>


<SyntaxHighlighter

language={match[1]}

style={atomDark}

wrapLongLines

customStyle={{

margin:0,

padding:"16px",

fontSize:"13px",

lineHeight:"1.6",

background:"#0b1120"

}}

>

{text}

</SyntaxHighlighter>

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

export default ModernMessageBubble
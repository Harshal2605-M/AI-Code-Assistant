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


// preserve real fenced code
// remove accidental inline PDF code

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
y:20

}}

animate={{

opacity:1,
y:0

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

marginBottom:"22px"

}}

>

<div

style={{

width:
isUser
?"380px"
:"100%",

background:
isUser
?"linear-gradient(135deg,#7c3aed,#9333ea)"
:"#0f172a",

padding:
isUser
?"16px 22px"
:"26px",

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

fontSize:"32px",

fontWeight:"800",

color:"#ffffff",

margin:"0 0 18px",

lineHeight:"1.3"

}}
>

{children}

</h1>,


h2:({children})=>

<h2
style={{

fontSize:"28px",

fontWeight:"800",

color:"#ffffff",

margin:"26px 0 14px",

lineHeight:"1.3"

}}
>

{children}

</h2>,



h3:({children})=>

<h3
style={{

fontSize:"22px",

fontWeight:"700",

color:"#ffffff",

margin:"20px 0 10px"

}}
>

{children}

</h3>,




p:({children})=>

<p
style={{

fontSize:"17px",

lineHeight:"1.9",

marginBottom:"14px",

color:"#e2e8f0"

}}
>

{children}

</p>,



strong:({children})=>

<strong
style={{

fontWeight:"800",

color:"#ffffff"

}}
>

{children}

</strong>,



ol:({children})=>

<ol
style={{

paddingLeft:"30px",

margin:"14px 0",

lineHeight:"1.9",

color:"#ffffff"

}}
>

{children}

</ol>,



ul:({children})=>

<ul
style={{

paddingLeft:"26px",

margin:"14px 0",

lineHeight:"1.9"

}}
>

{children}

</ul>,



li:({children})=>

<li
style={{

marginBottom:"12px",

fontSize:"16px",

lineHeight:"1.9",

color:"#ffffff"

}}
>

<div
style={{

color:"#ffffff",

fontWeight:"600"

}}
>

{children}

</div>

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

padding:"3px 8px",

borderRadius:"6px",

fontSize:"14px",

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

borderRadius:"16px",

background:"#111827",

border:
"1px solid rgba(255,255,255,.06)"

}}
>

<div
style={{

height:"50px",

display:"flex",

alignItems:"center",

justifyContent:"space-between",

padding:"0 18px",

background:"#1f2937",

borderBottom:
"1px solid rgba(255,255,255,.04)"

}}
>

<span
style={{

fontSize:"14px",

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

fontSize:"14px",

color:"#c084fc"

}}

>

📋 Copy

</button>

</div>



<SyntaxHighlighter

language={
match[1]
}

style={atomDark}

wrapLongLines

customStyle={{

margin:0,

padding:"20px",

fontSize:"14px",

lineHeight:"1.65",

background:"#0b1120",

borderRadius:0,

overflowX:"auto"

}}

codeTagProps={{

style:{

fontFamily:
"'Fira Code', monospace",

textRendering:
"optimizeLegibility"

}

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
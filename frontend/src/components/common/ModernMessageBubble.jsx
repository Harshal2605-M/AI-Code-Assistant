import ReactMarkdown from "react-markdown"

import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter"

import { vscDarkPlus }
from "react-syntax-highlighter/dist/esm/styles/prism"


function ModernMessageBubble({

role,
message

}){

const isUser=
role==="user"


return(

<div
style={{

display:"flex",

justifyContent:
isUser
?"flex-end"
:"flex-start",

width:"100%",

marginBottom:"32px"

}}
>


<div
style={{

maxWidth:
isUser
?"70%"
:"850px",

width:
isUser
?"auto"
:"100%",

padding:
isUser
?"18px 26px"
:"28px",

borderRadius:"24px",

background:

isUser
?"linear-gradient(135deg,#7C3AED,#A855F7)"
:"#111827",

border:

isUser
?"none"
:"1px solid #1E293B",

boxShadow:
"0 6px 20px rgba(0,0,0,.25)",

color:"white",

lineHeight:"1.9",

fontSize:"17px"

}}
>


{

isUser

?

message

:

<ReactMarkdown

components={{

h1:({children})=>

<h1 style={{

fontSize:"34px",
marginBottom:"18px",
marginTop:"15px"

}}>

{children}

</h1>,


h2:({children})=>

<h2 style={{

fontSize:"28px",
marginTop:"25px",
marginBottom:"15px"

}}>

{children}

</h2>,


h3:({children})=>

<h3 style={{

fontSize:"22px",
marginTop:"20px",
marginBottom:"10px"

}}>

{children}

</h3>,


p:({children})=>

<p style={{

marginBottom:"18px",

color:"#E5E7EB"

}}>

{children}

</p>,


li:({children})=>

<li style={{

marginBottom:"10px"

}}>

{children}

</li>,


strong:({children})=>

<strong style={{

color:"#fff"

}}>

{children}

</strong>,


code({

inline,
className,
children

}){

const match=
/language-(\w+)/.exec(
className||""
)


if(!inline){

return(

<div
style={{

marginTop:"25px",

marginBottom:"25px",

borderRadius:"16px",

overflow:"hidden",

border:
"1px solid #273449"

}}
>

<div
style={{

background:"#1E293B",

padding:"12px 16px",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}
>

<span>

Code

</span>

<button

onClick={()=>

navigator.clipboard.writeText(

String(children)

)

}

style={{

background:"#7C3AED",

border:"none",

padding:"8px 15px",

borderRadius:"8px",

color:"white",

cursor:"pointer"

}}
>

Copy

</button>

</div>


<SyntaxHighlighter

language={
match
?match[1]
:"javascript"
}

style={vscDarkPlus}

customStyle={{

margin:0,

padding:"22px"

}}

>

{

String(children)

.replace(/\n$/,"")

}

</SyntaxHighlighter>

</div>

)

}


return(

<code
style={{

background:"#1E293B",

padding:"4px 8px",

borderRadius:"6px"

}}
>

{children}

</code>

)

}

}}

>

{message}

</ReactMarkdown>

}

</div>

</div>

)

}

export default ModernMessageBubble
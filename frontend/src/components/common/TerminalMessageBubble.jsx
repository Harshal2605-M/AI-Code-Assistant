import ReactMarkdown from "react-markdown"

function TerminalMessageBubble({

role,
message

}) {

const isUser = role === "user"

return (

<div
style={{

display:"flex",

flexDirection:"column",

alignItems:
isUser
? "flex-end"
: "stretch",

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
? "#ff9900"
: "#39ff14",

textShadow:
isUser
? "0 0 8px rgba(255,153,0,.3)"
: "0 0 4px rgba(57,255,20,.15)"

}}

>

{isUser ? "YOU" : "AI"}

</div>



<div

style={{

width:
isUser
? "320px"
: "100%",

background:"#010101",

border:
"1px solid rgba(0,100,0,.5)",

borderRadius:"14px",

padding:
isUser
? "14px 20px"
: "18px 22px",

boxShadow:
`
inset 0 0 35px rgba(0,25,0,.85)
`,

fontFamily:
"'Share Tech Mono', monospace",

overflow:"hidden"

}}

>


<ReactMarkdown

components={{


h1:({children}) =>

<h1
style={{

fontSize:"25px",

margin:"0 0 12px",

color:"#39ff14",

fontWeight:"700"

}}

>

{children}

</h1>,


h2:({children}) =>

<div
style={{

margin:"14px 0 8px",

fontSize:"17px",

fontWeight:"700",

color:"#5cff5c",

display:"flex",

alignItems:"center",

gap:"8px"

}}

>

<span>{">>"}</span>

<span>{children}</span>

</div>,




p:({children}) =>

<p

style={{

fontSize:"13px",

lineHeight:"1.35",

margin:"0 0 6px",

letterSpacing:"0px",

color:"#32CD32",

textShadow:
"0 0 2px rgba(0,255,0,.08)"

}}

>

{children}

</p>,




strong:({children}) =>

<span
style={{

color:"#7CFC00",

fontWeight:"700"

}}
>

{children}

</span>,




ul:({children}) =>

<div
style={{

margin:"4px 0"

}}

>

{children}

</div>,




li:({children}) =>

<div

style={{

display:"flex",

alignItems:"flex-start",

gap:"8px",

marginBottom:"3px",

fontSize:"13px",

lineHeight:"1.35",

color:"#32CD32"

}}

>

<span
style={{

color:"#39ff14",

fontWeight:"700",

minWidth:"28px"

}}

>

{">>"}

</span>


<div
style={{flex:1}}
>

{children}

</div>

</div>,




code({

inline,
children

}){


if(inline){

return(

<code
style={{

background:"#071007",

padding:"2px 6px",

borderRadius:"4px",

color:"#ff9900",

fontSize:"12px",

border:
"1px solid rgba(0,255,0,.08)"

}}
>

{children}

</code>

)

}



return(

<div
style={{

marginTop:"14px",

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

background:"#080808",

borderBottom:
"1px solid rgba(0,100,0,.4)",

color:"#39ff14",

fontSize:"12px"

}}

>

<span>

python

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
String(children)
)

}}

>

📋 copy

</button>

</div>



<pre

style={{

margin:0,

padding:"10px 14px",

background:"#010101",

overflowX:"auto",

fontSize:"12px",

lineHeight:"1.45",

color:"#32CD32"

}}

>

<code>

{children}

</code>

</pre>

</div>

)

}

}}

>

{message}

</ReactMarkdown>

</div>

</div>

)

}

export default TerminalMessageBubble
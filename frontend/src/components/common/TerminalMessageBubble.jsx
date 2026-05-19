function TerminalMessageBubble({

role,
message

}){

const isUser=
role==="user"

return(

<div
style={{

marginBottom:"30px",

fontFamily:"monospace"

}}
>

<p
style={{

color:

isUser
?"#FF8C00"
:"#39FF14",

marginBottom:"8px"

}}
>

{isUser
?"You"
:"AI Assistant"}

</p>


<div
style={{

padding:"15px",

border:
"1px solid #262626",

background:"#111111",

color:"#39FF14"

}}
>

{message}

</div>

</div>

)

}

export default TerminalMessageBubble
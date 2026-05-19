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

marginBottom:"20px"

}}
>

<div
style={{

maxWidth:"70%",

padding:"18px",

borderRadius:

isUser
?"20px 20px 0px 20px"
:"20px 20px 20px 0px",

background:

isUser
?"#7C3AED"
:"#1E293B",

color:"white"

}}

>

{message}

</div>

</div>

)

}

export default ModernMessageBubble
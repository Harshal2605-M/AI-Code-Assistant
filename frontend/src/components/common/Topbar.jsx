function Topbar({title}){

return(

<div
style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

padding:"16px 24px",

marginBottom:"25px",

background:"#111827",

borderRadius:"20px",

border:"1px solid #1E293B",

boxShadow:
"0 8px 25px rgba(0,0,0,.25)"

}}
>

<div>

<div
style={{

fontSize:"13px",

color:"#94A3B8",

marginBottom:"6px"

}}
>

PDF-RAG Assistant

</div>

<div
style={{

fontSize:"22px",

fontWeight:"600",

color:"white"

}}
>

{title}

</div>

</div>


<div
style={{

display:"flex",

gap:"18px",

fontSize:"22px",

alignItems:"center"

}}
>

<div style={{cursor:"pointer"}}>

🔍

</div>

<div style={{cursor:"pointer"}}>

⚙

</div>

<div
style={{

width:"35px",

height:"35px",

background:"#7C3AED",

borderRadius:"50%",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontSize:"14px",

fontWeight:"bold"

}}
>

A

</div>

</div>

</div>

)

}

export default Topbar
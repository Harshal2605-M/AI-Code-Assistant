function SourceCard(){

const files=[

"Operating System Notes.pdf",

"OS Concepts.pdf",

"Computer Networking Notes.pdf"

]

return(

<div
style={{

background:"#111827",

border:"1px solid #1E293B",

borderRadius:"24px",

padding:"22px",

color:"white",

display:"flex",

flexDirection:"column",

gap:"16px",

width:"100%",

boxSizing:"border-box"

}}
>

<div
style={{

display:"flex",

alignItems:"center",

gap:"12px",

marginBottom:"8px"

}}
>

<div style={{fontSize:"36px"}}>

📄

</div>

<div
style={{

fontSize:"20px",

fontWeight:"700"

}}
>

Sources

</div>

</div>



{

files.map((file,index)=>(

<div

key={index}

style={{

background:"#1E293B",

padding:"14px",

borderRadius:"14px",

fontSize:"14px",

color:"#CBD5E1"

}}

>

{file}

</div>

))

}



<button

style={{

marginTop:"10px",

padding:"14px",

border:"none",

borderRadius:"14px",

background:
"linear-gradient(90deg,#7C3AED,#9333EA)",

fontWeight:"700",

fontSize:"15px",

color:"white",

cursor:"pointer"

}}

>

View All Sources

</button>

</div>

)

}

export default SourceCard
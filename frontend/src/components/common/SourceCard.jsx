import { useChat }
from "../../contexts/ChatContext"

function SourceCard({

sources=[]

}){

const {sendMessage}=useChat()

if(!sources || sources.length===0){

return null

}


const isTerminal=

document.body.innerText
.includes(
"AI Code Assistant"
)


return(

<div
style={{

background:
isTerminal
?"#020202"
:"#111827",

border:
isTerminal
?"1px solid rgba(0,100,0,.45)"
:"1px solid #1E293B",

borderRadius:"24px",

padding:"22px",

color:
isTerminal
?"#39ff14"
:"white",

display:"flex",

flexDirection:"column",

gap:"16px",

width:"100%",

boxSizing:"border-box",

marginTop:"18px",

fontFamily:
isTerminal
?"'Share Tech Mono', monospace"
:"Inter"

}}
>

<div
style={{

display:"flex",

alignItems:"center",

gap:"12px"

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

sources.map((source,index)=>{

const fileName=

typeof source==="string"

?source

:source.file ||
source.source ||
source.name ||
"Unknown document"


const page=

source?.page ||
source?.pageNumber ||
1


return(

<div

key={index}

onClick={()=>{

sendMessage(

`Explain page ${page} from ${fileName}`

)

}}

style={{

background:
isTerminal
?"#061206"
:"#1E293B",

padding:"14px",

borderRadius:"14px",

cursor:"pointer",

transition:".3s",

color:
isTerminal
?"#7CFC00"
:"#CBD5E1"

}}

>

<div
style={{

fontSize:"14px",

fontWeight:"600"

}}
>

📄 {fileName}

</div>


<div
style={{

fontSize:"12px",

opacity:.7,

marginTop:"4px"

}}
>

Page {page}

</div>

</div>

)

})

}

</div>

)

}

export default SourceCard
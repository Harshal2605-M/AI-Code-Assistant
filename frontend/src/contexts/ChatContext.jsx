import {
createContext,
useContext,
useState
} from "react"

import axios from "axios"

const ChatContext=createContext()

export function ChatProvider({children}){

const initial=[

{
role:"assistant",
text:"Hello 👋 Ask anything"
}

]

const [messages,setMessages]=
useState(initial)

const [history,setHistory]=
useState([])

const [chatId,setChatId]=
useState(Date.now())



const sleep=(ms)=>{

return new Promise(

resolve=>
setTimeout(
resolve,
ms
)

)

}



const sendMessage=async(text)=>{

if(!text?.trim()) return


const isTerminal=

document.body.innerText
.includes(
"AI Code Assistant"
)



const steps=

isTerminal

?[

"[SCAN] Searching documents...",

"[RAG] Retrieving context...",

"[GEN] Generating output..."

]

:[

"Searching PDFs...",

"Analyzing context...",

"Generating response..."

]



setMessages(prev=>[

...prev,

{
role:"user",
text
},

{
role:"assistant",
text:steps[0]
}

])



try{


await sleep(1500)


setMessages(prev=>{

const updated=[...prev]

updated[updated.length-1]={

role:"assistant",

text:steps[1]

}

return [...updated]

})



await sleep(1300)


setMessages(prev=>{

const updated=[...prev]

updated[updated.length-1]={

role:"assistant",

text:steps[2]

}

return [...updated]

})



const response=

await axios.post(

"http://localhost:5000/chat",

{

message:text

}

)



const aiResponse=

response.data.answer ||
"No response received"



const sources=

response.data.sources || []



setMessages(prev=>{

const updated=[...prev]

updated.pop()

updated.push({

role:"assistant",

text:aiResponse,

sources

})

return updated

})




setHistory(old=>{

const filtered=

old.filter(

item=>item.id!==chatId

)


return[

{

id:chatId,

title:text,

messages:[

...messages,

{

role:"user",

text

},

{

role:"assistant",

text:aiResponse,

sources

}

]

},

...filtered

].slice(0,6)

})


}catch(error){

console.log(error)


setMessages(prev=>{

const updated=[...prev]

updated.pop()

updated.push({

role:"assistant",

text:"Backend connection error"

})

return updated

})

}

}



const loadChat=(id)=>{

const selected=

history.find(

chat=>chat.id===id

)


if(selected){

setMessages(

selected.messages

)

}

}



const clearChat=()=>{

setMessages(initial)

setChatId(

Date.now()

)

}



return(

<ChatContext.Provider

value={{

messages,

sendMessage,

clearChat,

history,

loadChat

}}

>

{children}

</ChatContext.Provider>

)

}



export function useChat(){

return useContext(
ChatContext
)

}
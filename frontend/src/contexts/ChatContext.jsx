import {
createContext,
useContext,
useState,
useEffect
} from "react"

import axios from "axios"

import {chatStorage}
from "../services/chatStorage"

const ChatContext=createContext()

export function ChatProvider({children}){

const initial=[

{
role:"assistant",
text:"Hello 👋 Ask anything"
}

]

const [messages,setMessages]=useState(initial)

const [history,setHistory]=
useState([])

const [chatId,setChatId]=
useState(Date.now())

const [isLoading,setIsLoading]=
useState(false)

const [activeChatId,setActiveChatId]=
useState(null)

const [loaded,setLoaded]=
useState(false)



/* LOAD ONCE */

useEffect(()=>{

const savedHistory=

chatStorage.getHistory()

const savedActive=

chatStorage.getActiveChat()


setHistory(savedHistory)

setActiveChatId(savedActive)


if(savedActive){

const selected=

savedHistory.find(
x=>x.id===savedActive
)

if(selected){

setMessages(
selected.messages
)

setChatId(
selected.id
)

}

}

setLoaded(true)

},[])



/* SAVE ONLY AFTER LOAD */

useEffect(()=>{

if(!loaded) return

chatStorage.saveHistory(
history
)

},[history,loaded])



useEffect(()=>{

if(!loaded) return

chatStorage.saveActiveChat(
activeChatId
)

},[activeChatId,loaded])




const sendMessage=async(text)=>{

if(!text?.trim()) return

setIsLoading(true)


setMessages(prev=>[

...prev,

{
role:"user",
text
},

{
role:"assistant",
text:"Generating..."
}

])


try{

const response=

await axios.post(

"http://localhost:5000/chat",

{
message:text
}

)


const aiResponse=

response.data.answer ||
"No response"


const sources=

response.data.sources || []


setMessages(prev=>{

const updated=[...prev]

updated.pop()


const finalMessages=[

...updated,

{

role:"assistant",

text:aiResponse,

sources

}

]


/* FIXED PART */

setHistory(old=>{

const newHistory=[

{

id:chatId,

title:

text.length>35

?text.slice(0,35)+"..."

:text,

messages:finalMessages

},

...old.filter(

x=>x.id!==chatId

)

].slice(0,20)

return newHistory

})


setActiveChatId(
chatId
)

return finalMessages

})

}

catch(error){

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

finally{

setIsLoading(false)

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

setChatId(id)

setActiveChatId(id)

}

}

const deleteChat=(id)=>{

const updated=

history.filter(

chat=>chat.id!==id

)

setHistory(updated)


if(activeChatId===id){

setMessages(initial)

setActiveChatId(null)

setChatId(Date.now())

}

}

const clearChat=()=>{

setMessages(initial)

const newId=Date.now()

setChatId(newId)

setActiveChatId(null)

}



return(

<ChatContext.Provider

value={{

messages,
sendMessage,
clearChat,
history,
loadChat,
deleteChat,
isLoading,
activeChatId

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
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


const sendMessage=async(text)=>{

if(!text.trim()) return


setMessages(prev=>[

...prev,

{
role:"user",
text
},

{
role:"assistant",
text:"● ● ●"
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
response.data.answer


const sources=
response.data.sources


setMessages(prev=>{

const updated=[...prev]

updated.pop()

updated.push({

role:"assistant",

text:aiResponse,

sources:sources

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

sources:sources

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

ChatContext)

}
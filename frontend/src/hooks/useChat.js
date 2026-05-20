import {useState} from "react"

function useChat(){

const initialMessage=[

{

role:"assistant",

text:"Hello 👋 Ask anything"

}

]

const [messages,setMessages]=
useState(initialMessage)

const sendMessage=(text)=>{

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


setTimeout(()=>{

setMessages(prev=>{

const updated=[...prev]

updated.pop()

updated.push({

role:"assistant",

text:"This is AI response simulation 🚀"

})

return updated

})

},1000)

}


const clearChat=()=>{

setMessages(initialMessage)

}

return{

messages,

sendMessage,

clearChat

}

}

export default useChat
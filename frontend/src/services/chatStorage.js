const CHAT_KEY="chat_history"

const ACTIVE_KEY="active_chat"


export const chatStorage={

getHistory(){

try{

const data=

localStorage.getItem(
CHAT_KEY
)

return data
?JSON.parse(data)
:[]

}catch{

return []

}

},



saveHistory(history){

localStorage.setItem(

CHAT_KEY,

JSON.stringify(
history
)

)

},



getActiveChat(){

const id=

localStorage.getItem(
ACTIVE_KEY
)

return id
?Number(id)
:null

},



saveActiveChat(id){

if(id===null){

localStorage.removeItem(
ACTIVE_KEY
)

return

}

localStorage.setItem(

ACTIVE_KEY,

id

)

},



clear(){

localStorage.removeItem(
CHAT_KEY
)

localStorage.removeItem(
ACTIVE_KEY
)

}

}


/*

PRODUCTION SWITCH:

Replace methods with:

axios.get("/history")
axios.post("/history")
axios.delete("/history")

No component changes required.

*/
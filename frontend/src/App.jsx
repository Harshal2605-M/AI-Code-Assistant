import {useTheme}
from "./contexts/ThemeContext"

import ModernSidebar
from "./components/modern/ModernSidebar"

import ModernChatWindow
from "./components/modern/ModernChatWindow"

import TerminalSidebar
from "./components/terminal/TerminalSidebar"

import TerminalChatWindow
from "./components/terminal/TerminalChatWindow"


function App(){

const {theme}=useTheme()

return(

<div
style={{

display:"flex",

height:"100vh"

}}
>

{

theme.name==="terminal"

?

<>

<TerminalSidebar/>

<TerminalChatWindow/>

</>

:

<>

<ModernSidebar/>

<ModernChatWindow/>

</>

}

</div>

)

}

export default App
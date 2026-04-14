
import './App.css'
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from './MyContext.jsx';
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt, setPrompt] = useState(""); //state to hold the prompt value
  const [reply, setReply] = useState(null); //state to hold the reply value
  const [currThreadId, setCurrThreadId] = useState(uuidv1()); //state to hold the current thread id, can be used to fetch the chat history for that thread
  const [prevChats, setPrevChats] = useState([]); //state to hold the previous chats, can be used to display the chat history in the sidebar
  const [newChat, setNewChat] = useState(true); //state to hold the new chat state, can be used to reset the chat window when user clicks on new chat button in the sidebar
  const [allThreads,setAllThreads] = useState([]); //state to hold all the thread ids, can be used to display the list of threads in the sidebar
  const providerValues = {prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, newChat, setNewChat, prevChats, setPrevChats, allThreads, setAllThreads}; //passing values to the provider, can be an object with multiple values

  return (
    
      <div className='app'>
        <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
        </MyContext.Provider>
      </div>
    
  )
}

export default App

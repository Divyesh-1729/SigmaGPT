import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from './MyContext.jsx';
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";


function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext); //destructuring values from the context
    //We required all four of them because the primpt needs tonbe displayed in the input box, input value is equal to primpt value. Also in the chat the priompt and reply will be printed, so we need the values there as well. setPrompt and setReply will be used to update the values when user types something or when we get a reply from the server.
    const [loading, setLoading] = useState(false); //state to hold the loading state, can be used to show a loader when we are waiting for a reply from the server
    const [isOpen, setIsOpen] = useState(false); //state to hold the state of the dropdown menu in the navbar, can be used to show or hide the dropdown menu when user clicks on the user icon in the navbar

    const getReply = async () => {
        setLoading(true);   //when user clicks on submit button, we can set the loading state to true to show the loader until we get the reply from the server
        setNewChat(false); //when user clicks on submit button, we can set the newChat state to false to show the chat history along with the new reply, and that will trigger a re-render of the chat window to show the chat history along with the new reply.
        console.log("Prompt:", prompt);
        const options ={
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message : prompt,
                threadId: currThreadId //thread id can be generated using uuid or any other method, for now we are using a static id
            })
        };
        try{

            const response = await fetch("http://localhost:3000/api/chat", options);
           const res =await response.json();
            console.log(res);
            setReply(res.reply);


        }
        catch(err)
        {
            console.log(err);
        }
        setLoading(false); //after getting the reply from the server, we can set the loading state to false to hide the loader
    }


    //Append new chat to the previous chats when we get a new reply from the server, we can use useEffect hook to listen for changes in the reply state and update the previous chats state accordingly
    useEffect(() => {
        if(prompt && reply){
            setPrevChats(prevChats => (
                [...prevChats,
                {role: "user", content: prompt},
                {role: "assistant", content: reply}
                ]
            ));
            setPrompt(""); //after getting the reply from the server, we can clear the input box by setting the prompt state to an empty string
        }

    }, [reply]) //Only depend on reply, not prompt - prevents re-running when user types

    const handleProfileClick = () => {
        setIsOpen(!isOpen); //toggle the state of the dropdown menu when user clicks on the user icon in the navbar
    }





    return (
        <div className="chatWindow">
            <div className="navbar">
            <span>SigmaGPT <i className="fa-solid fa-angle-down"></i></span>
            <div className="userIconDiv" onClick={handleProfileClick}>
               <span className="userIcon"><i className="fa-solid fa-user"></i></span>
            </div>

            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-regular fa-circle-up"></i>Upgrade Plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</div>
                    
                    </div>
            }
            <Chat></Chat>


            <ScaleLoader color="#fff" loading={loading} >

            </ScaleLoader>
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask Anything" 
                    value= {prompt} 
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter'? getReply() : ''} //when user presses enter key, getReply function will be called{
                    >   
                    
                    </input>
                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes.Check important info. See Cookie Preferences
                </p>
            </div>
        </div>
    )

}

export default ChatWindow;
import "./Chat.css";
import React, {useContext, useState, useEffect} from "react";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

//react-markdown 
//rehype-highlight

function Chat()
{
    const {newChat,prevChats, reply} = useContext(MyContext); //destructuring values from the context
    const [latestReply, setLatestReply] = useState(null); //state to hold the latest reply, can be used to show the latest reply in the chat window
    //we required newChat value from the context because when user clicks on new chat button in the sidebar, we can reset the chat window by setting newChat state to true, and we can use that value here to reset the chat window by conditionally rendering the chat messages based on the newChat state.

    useEffect(() => {
        if(reply === null){
            setLatestReply(null); //reset the latest reply when there is no reply from the server, this can be used to clear the chat window when user starts a new chat or when user clicks on a thread from the list of threads in the sidebar to view the chat history for that thread.
            return;
        }
        if(!reply || !prevChats?.length) return;

        const content = reply.split(" "); //Individual words
        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0,idx+1).join(" ")); 

                idx++;
                if(idx >= content.length)
                {
                    clearInterval(interval);
                }



        }, 40); //100ms delay between each word, can be adjusted based on the typing speed you want to achieve
        return () => clearInterval(interval); 
        //latest Reply seperate state me isliye rakha hai taki jab bhi new reply aaye to usko latestReply state me store kar sake aur uske basis pe chat window ko update kar sake, without using latestReply state, we will have to rely on prevChats state to get the latest reply, but prevChats state me multiple chats honge, so we will have to get the last chat from the prevChats array to get the latest reply, which is not efficient. Also, by using latestReply state, we can easily show a loader in the chat window when we are waiting for a reply from the server, and hide the loader when we get the reply from the server.
        //typing effect

    }, [prevChats, reply]) //useEffect hook will run whenever there is a change in the prevChats state, which means whenever we get a new reply from the server, we can update the latestReply state with the new reply, and that will trigger a re-render of the chat window to show the new reply.
        return (
            <>
            {newChat && <h1>Start a New Chat</h1>}
            <div className="chats">
                {
                    prevChats?.slice(0,-1).map((chat,idx)=>
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            {
                                chat.role === "user" ? 
                                <p className="userMessage">{chat.content}</p> : 
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }

                        </div>
                    
                    
                    )
                }

                {
                    prevChats.length>0 && (
                        <>
                        {
                            latestReply === null ? (
                                <div className="gptDiv" key={"non-typing"}>
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                        </div>
                            ) : (
                                <div className="gptDiv" key={"typing"}>
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                        </div>
                            )
                        }
                        
                        
                        </>
                    )
                }

 
            </div>
            </>
        )
}


export default Chat;
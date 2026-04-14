import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

function Sidebar()
{
    const {allThreads, setAllThreads, currThreadId, setNewChat,setPrompt, setReply, setCurrThreadId,setPrevChats} = useContext(MyContext); //destructuring values from the context, we required allThreads and setAllThreads because we need to display the list of threads in the sidebar, and we need to update the list of threads when user starts a new chat or when user clicks on a thread from the list to view the chat history for that thread.

    const getAllThreads = async () => {

        try{
            const response = await fetch("http://localhost:3000/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title})); //we can use the content of the first chat as the title of the thread, if there are no chats in the thread, we can set the title as "New Chat"
            //console.log(filteredData);
            setAllThreads(filteredData); //update the allThreads state with the fetched threads, and that will trigger a re-render of the sidebar to show the list of threads in the sidebar.

            //threadId, title

        }catch(err)
        {
            console.log(err);
        }

    };

    useEffect(() => {
        getAllThreads();

    }, [currThreadId]) //useEffect hook will run only once when the component mounts, we can use this to fetch the list of threads from the server and update the allThreads state with the fetched threads, and that will trigger a re-render of the sidebar to show the list of threads in the sidebar.



    const createNewChat = () => {
        setNewChat(true); //when user clicks on new chat button, we can set the newChat state to true to reset the chat window, and that will trigger a re-render of the chat window to show the new chat window.
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1()); //generate a new thread id for the new chat, and that will trigger a re-render of the sidebar to show the new thread in the list of threads in the sidebar.
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId); //when user clicks on a thread from the list of threads in the sidebar, we can set the currThreadId state to the threadId of the clicked thread, and that will trigger a re-render of the chat window to show the chat history for that thread.

        try{
            const response = await fetch(`http://localhost:3000/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res); //update the prevChats state with the fetched chat history for the selected thread, and that will trigger a re-render of the chat window to show the chat history for that thread.
            setNewChat(false); //set the newChat state to false to show the chat history for the selected thread, and that will trigger a re-render of the chat window to show the chat history for that thread.
            setReply(null); //reset the reply state to null to clear the chat window, and that will trigger a re-render of the chat window to show the chat history for the selected thread without any reply in the chat window.
        } catch(err)
        {
            console.log(err);
        }
    }

    const deleteThread = async (threadId) => {
        try{
            const response = await fetch(`http://localhost:3000/api/thread/${threadId}`, {method: "DELETE"});
            const res = await response.json();
            console.log(res);

            //updated threads rerender
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId)); //update the allThreads state by filtering out the deleted thread, and that will trigger a re-render of the sidebar to show the updated list of threads in the sidebar after deletion.
            if(threadId === currThreadId){
                createNewChat(); //if the deleted thread is the currently selected thread, we can create a new chat to reset the chat window, and that will trigger a re-render of the chat window to show the new chat window.
            }

        }
        catch(err)
        {
            console.log(err);
        }
    }




    return (
        <section className="sidebar">
            {/*New chat button*/}
            <button onClick={createNewChat}>
                <img src="/src/assets/blacklogo.png" alt="gpt logo" className = "logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>


            {/*Chat history*/}
            <ul className="history">
                {
                    allThreads?.map((thread, idx)=>(
                        <li key={idx}
                            onClick={(e)=>changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted" : ""} //add active class to the currently selected thread, and that will highlight the currently selected thread in the sidebar.
                        
                        
                        >{thread.title}
                        <i className="fa-solid fa-trash"
                            onClick={(e) =>{
                                e.stopPropagation();  //stop event bubbling
                                deleteThread(thread.threadId);
                            }}
                        
                        ></i>
                        
                        
                        </li>
                    ))
                }
                
            </ul>



            {/*Settings and other options*/}
            <div className = "sign">
                <p>
                    By Divyesh Puranik &hearts; 
                </p>
            </div>

        </section>
        
    )
}

export default Sidebar
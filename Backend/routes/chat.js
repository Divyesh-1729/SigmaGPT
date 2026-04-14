import express from 'express';
import Thread from '../models/Thread.js';
import getOpenAIAPIResponse from '../utils/openai.js';


const router = express.Router();

//test route
router.post("/test", async (req, res) => {
    try{
        const thread = new Thread({
            threadId: "12345yzabc",
            title: "Testing new thread5"
        });

        const response = await thread.save();
        res.send(response);

    }catch(err){
        console.log("Error:", err.message);
        res.status(500).json({error: err.message});
    }
});

//Get all threads
router.get("/thread", async (req, res) => {
    try{
       const threads =  await Thread.find({}).sort({updatedAt: -1});
       //Descending order of UpdatedAt
       res.json(threads);

    }

    catch(err){
        console.log("Error:", err.message);
        res.status(500).json({error: err.message});
    }
});


//Route to send the information of a particular thread based on the threadId
router.get("/thread/:threadId", async (req, res) => {
    const threadId = req.params.threadId;
    try{
        const thread = await Thread.findOne({threadId});
        if(!thread){
            return res.status(404).json({error: "Thread not found"});
        }
        res.json(thread.messages);
    }
    catch(err){
        console.log("Error:", err.message);
        res.status(500).json({error: "Failed to fetch chat"});
    }   
});


//Delete route for a thread

router.delete("/thread/:threadId", async (req, res) => {
    const threadId = req.params.threadId;
    try{
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error: "Thread not found"});
        }
        res.status(200).json({message: "Thread deleted successfully"});

    }
    catch(err){
        console.log("Error:", err.message);
        res.status(500).json({error: "Failed to delete thread"});
    }
});

//Post Route---
//1- Validate threadId and message content
//2- Find the thread by threadId
//3- If threadId is not in Db, create a new thread with the provided threadId and add the message to it
//4- Save the message (user) in the thread's messages array


router.post("/chat", async (req, res) => {
    const threadId = req.body.threadId;
    const message = req.body.message;

    if(!threadId || !message){
        return res.status(400).json({error: "threadId and message are required"});
    }

    try{
        let thread = await Thread.findOne({threadId});
        if(!thread){
            //Create a new thread
            thread = new Thread({
                threadId,
                title:message.substring(0, 20), // Set the title as the first 20 characters of the message
                messages: [{role: "user", content: message}]
            });
        }
        else{
            thread.messages.push({role: "user", content: message});
        }

        const assistantReply = await getOpenAIAPIResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();
        await thread.save();

        res.json({reply: assistantReply});


    }
    catch(err){
        console.log("Error:", err.message);
        res.status(500).json({error: "Something went wrong"});
    }
});

export default router;
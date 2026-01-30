import {StreamChat} from 'stream-chat';

const apiKey=process.env.STREAM_API_KEY;
const apiSecret=process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream api key or secret is missing");
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret);

export const createStreamUser= async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]); 
        return userData
    }
    catch(error){
        console.error("error upserting user",error);
    }
};
export const generateStreamToken= (userId)=>{
    try{
        return streamClient.createToken(userId);
    }
    catch(error){
        console.error('error generating stream token', error);
        return null;
    }
};

// backward-compatible alias expected by controllers
export const upsertStreamUser = createStreamUser;
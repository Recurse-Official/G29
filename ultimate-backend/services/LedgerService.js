import redisClient from "../config/redisClient"
 const PushToQueue=async (enrollmentId,publicKey,questionId,selectedOption,signature,isverified)=>{
   try{
    const timeStamp=new Date().toISOString()
    const data={enrollmentId,publicKey,questionId,selectedOption,signature,isverified,timeStamp }
    await redisClient.rpush("StudentQueue",JSON.stringify(data))
    const items = await redisClient.lrange("StudentQueue", 0, -1);
items.forEach((item, index) => {
    console.log(`Item ${index + 1}:`, JSON.parse(item));
})
console.log(items)
   }catch(error){
    console.log("error")
   }
}

PushToQueue(
    "12345",
    "public-key-abc",
    "q-678",
    "Option A",
    "signature-xyz",
    true
);


const getQueueItems=async(socket)=>{
    try{
     const dataItems=await redisClient("StudentQueue",0,-1);
     if(!dataItems || dataItems.length===0){
        console.log("Error occured while fetching the data")
        socket.emit("queueData",[])
        return
     }
     const items=dataItems.map((item)=>JSON.parse(item))
       socket.emit("queueData",items)
    }catch(error){
        console.log(error)
    }
}
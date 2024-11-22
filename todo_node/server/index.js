import exp from "express"
import mon from "mongoose"
import dot from "dotenv"
import cors from "cors"

const app = exp();
dot.config();
app.use(exp.json());
app.use(cors());

const tschema = new mon.Schema({
 title:String,
 description:String
})

const todocollection = mon.model('todo',tschema)

app.post('/todos', async(req,res)=>{
    const data ={title:req.body.title, description:req.body.description}

    try{
        const entry = new todocollection(data);
        await entry.save();
        res.status(200).json(entry);
    }
     catch(err){
        res.status(400).json(err);
     }
    })

    const middleware = (req, res, next) => {
        console.log("Middleware");
        const user = true;
        if (user) {
            next();
        } else {
            res.status(400).json("Invalid user")
        }
    }

     app.get('/todos', middleware, async (req,res)=>{
        try{
        const data =await todocollection.find({}).exec();
        res.status(200).json(data)
        }
        catch(err){
            res.status(400).json(err)
        }
    })
        app.put('/todos/:id', async(req,res)=>{
            try{
                const entry = await todocollection.findByIdAndUpdate(req.params.id,req.body,{new:true});
                res.status(200).json(entry)
            }
            catch(err){
                res.status(400).json(err)
            }
       })

       app.delete('/todos/:id', async(req,res)=>{
        try{
            await todocollection.findByIdAndDelete(req.params.id)
            res.status(200).json({message:`deleted ${req.params.id} is succesfully`})
        }
        catch(err){
            res.status(400).json(err);
            
        }
    
})


const connect = async()=>{
    try{
    await mon.connect(process.env.MONGO)
    console.log("connected Mongo DB")
}
catch(err){
    console.log(err)
}
}

app.listen(process.env.PORT,()=>{
connect();
console.log("server is running on..")
})

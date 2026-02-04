const express= require('express')
const app= express()
const cors= require('cors')
const noteModel= require('./model/notes.js')
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

app.post('/api/notes',async(req,res)=>{
   const {title, description} = req.body

  const notes=await noteModel.create({
    title,
    description,
   })
  
   res.status(201).json({
    message:"Note created Successfully",
    notes
   })

})
app.get('/api/notes',async(req,res)=>{
   const notes= await noteModel.find()

   res.status(200).json({
    message:"Notes fetched Successfully",
    notes
   })
})
app.delete('/api/notes/:id',async(req,res)=>{
    const id = req.params.id

   await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Note deleted successfully"
    })
})
app.patch('/api/notes/:id',async(req,res)=>{
    const id = req.params.id
    const {title,description} =req.body

   const updatedNotes= await noteModel.findByIdAndUpdate(id,req.body,{new:true})
   res.status(200).json({
    message:"Note partially updated"
   })
})
app.put('/api/notes/:id',async(req,res)=>{
    const id = req.params.id
    const {title,description} = req.body

   await noteModel.findByIdAndUpdate(id,{title,description})

    res.status(200).json({
        message:"Note Updated Successfully"
    })
})
module.exports= app;
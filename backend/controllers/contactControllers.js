const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id})
    console.log(contacts,'werty')
    res.status(200).json({contacts})
})
//to make all these private add a new field to contact which contains the user id of the user who creates,updates or deletes the contact
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error('no permission for the user')
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.status(200).json({updatedContact})
})

const createContact = asyncHandler(async (req,res)=>{
    // we wont recieve data by simply writing below code
    //console.log(req.body)
    //we need middleware provided by express called as bodyparser which lets the server recieve data from the frontend or the client
    //well we know where we use the middlewares ie the server.js there see line 7
    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const contact = Contact.create({
        name:name,
        email:email,
        phone:phone,
        user_id:req.user.id
    })
    res.status(201).json({contact})
})

const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(200).json({contact})
})

const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error('no permission for the user')
    }
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json({contact})
})




module.exports = {getContacts,getContact,createContact,updateContact,deleteContact}
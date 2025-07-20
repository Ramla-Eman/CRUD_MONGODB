import Contact from "../models/contacts.models.js"
import mongoose from "mongoose"

// Get All Contacts
export const getContacts = async (req, res) => { 
  try{

    const contacts = await Contact.find()
    res.render('home', {contacts}) 
    
  }catch(error){
    res.render('500',{message: error})
  }
}

// Get Single Contact
export const getContact = async (req, res) => { 

  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.render('404', { message: "Invalid Id"})
  }

  try{
    const contact = await Contact.findById( req.params.id )
    if(!contact) return res.render('404', { message: "Contact not found."})
    res.render('show-contact', { contact })
  }catch(error){
    res.render('500',{message: error})
  }
  
}

// Open Add Contact Page
export const addContactPage = (req, res) => { res.render('add-contact') }

// Save : Add Contact Page
export const addContact =  async (req, res) => {

  try{
    await Contact.create(req.body)
    res.redirect("/")
  }catch(error){
    res.render('500',{message: error})
  }
  
}

// Open Update Contact Page
export const updateContactPage = async (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.render('404', { message: "Invalid Id"})
  }

  try{
    const contact = await Contact.findById( req.params.id )
    if(!contact) return res.render('404', { message: "Contact not found."})
    res.render('update-contact', { contact }) 
  }catch(error){
    res.render('500',{message: error})
  }
  
}

// Save : Update Contact Page
export const updateContact = async (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.render('404', { message: "Invalid Id"})
  }

  try{
   const contact = await Contact.findByIdAndUpdate( req.params.id , req.body)
    if(!contact) return res.render('404', { message: "Contact not found."})
    res.redirect("/")
  }catch(error){
    res.render('500',{message: error})
  }
  
}

// Delete Contact
export const deleteContact = async (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.render('404', { message: "Invalid Id"})
  }

  try{
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if(!contact) return res.render('404', { message: "Contact not found."})
    res.redirect("/")
  }catch(error){
    res.render('500',{message: error})
  }

}
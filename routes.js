const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get("/", function(req, res){
    return res.redirect('/teachers')
})

routes.get("/teachers", function(req, res){
    return res.render('teachers/home')
})

routes.get("/teachers/create-point", function(req, res){
    return res.render('teachers/create-point')
})

routes.get("/teachers/:id", teachers.show)

routes.get("/teachers/:id/edit", teachers.edit)

routes.post("/teachers", teachers.post)

routes.put("/teachers", teachers.put)

module.exports = routes
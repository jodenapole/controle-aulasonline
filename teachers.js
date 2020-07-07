const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')


//show
exports.show = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeacher){
        return res.send("teacher not found!")
    }

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth_date),
        class_type: foundTeacher.class_type.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", {teacher})
}


//create
exports.post = function(req, res){


    //Organizando os dados
    let {avatar_url, name, birth_date, school_level, teaching_type, class_type} = req.body

    //Tratamento dos dados
    birth_date = Date.parse(birth_date)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    //Adicionando um novo objeto ao array
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth_date,
        school_level,
        teaching_type,
        class_type,
        created_at
    })

    //Escrevendo o objeto no data.json
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err){
            return res.send("write fil error!")
        }
        return res.redirect("/teachers")
    })

}


//edit
exports.edit = function(req,res){
    
    const { id } = req.params

        const foundTeacher = data.teachers.find(function(teacher){
            return teacher.id == id
        })

        if(!foundTeacher){
            return res.send("teacher not found!")
        }

        const teacher = {
            ...foundTeacher,
            birth_date: date(foundTeacher.birth_date)
        }

        return res.render("teachers/edit", {teacher})

}

//put
exports.put = function(req, res){
    const {id} = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (teacher.id == id){
            index = foundIndex
            return true 
        }
    })
    
    // if(!foundTeacher){
    //     return res.send("teacher not found!")
    // }

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth_date: Date.parse(req.body.birth_date),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err){
            return res.send("write file error")
        }

        return res.redirect(`/teachers/${id}`)
    })

}
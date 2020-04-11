let express = require ("express")
let app = express()
let Patient = require ("./models/Patient")


app.get('/Patient', function(req, res){

})


app.listen (3000, function (){
    Patient.getPatients().then(function(response){
        console.log(response)
    })
    console.log ("server is running on port 3000")
})
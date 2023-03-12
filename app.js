
const express = require('express')//its like import statement
const app = express() //now app can be used function
const port = 3000

const employees = []

app.get('/api/getData', (req, res) => {

    res.status(200).json(employees)
//   res.status(200).json({
//     id: 1,
//     name: "employee1"
//   })
})

app.use(express.json());

app.post('/api/add', (req, res) => {
   
    const index = employees.findIndex(e => e.id === req.body.id);
    if(index === -1){
      employees.push(req.body);
      res.status(200).json({msg: "added success"});
    }
    else{
      res.status(400).json({msg: "Employee Exist with Same id..!"});
    }
})

app.put('/api/put', (req, res)=>{

    const index = employees.findIndex(e => e.id === req.body.id);
    if(index !== -1){

      employees.splice(index, 1);
      employees.push(req.body);
      res.status(200).json({msg: "updated success"});
    }
    else{
      res.status(400).json({msg: "NO Employee found with given id.!"});
    }

})

app.delete('/api/delete', (req, res) => {
  
  const id = req.body.id;
  console.log(id)
  const index = employees.findIndex(e => e.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
  }
  res.status(200).json({msg: "deleted success"});
})

app.listen(port, () => {
  console.log(`Example app listenin on port ${port}`)
})

// http://localhost:3000/
// body json
// {
//     "msg": "addes success"
//   }
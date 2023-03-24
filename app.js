
const express = require('express')//its like import statement
const app = express() //now app can be used function
const port = 3000


const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200',
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


const employees = []

app.use(express.json());

// app.use((req, res, next)=>{
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });


app.get('/get', (req, res) => {

  res.status(200).json(employees)
//   res.status(200).json({
//     id: 1,
//     name: "employee1"
//   })
})


app.post('/add', (req, res) => {
   
    const index = employees.findIndex(e => e.id === req.body.id);
    if(index === -1){
      employees.push(req.body);
      return res.status(200).json({msg: "added success"});
    }
    else{
     return res.status(400).json({msg: "Employee Exist with Same id..!"});
    }
})

app.put('/put', (req, res)=>{

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

app.delete('/delete/:id', (req, res) => {
  
  // const id = req.body.id;
  const id = req.params.id;
  console.log('delete id : ')
  console.log(id)
  // const index = employees.findIndex(e => e.id === id);
  const index = employees.findIndex(e => e.id === parseInt(id));
  console.log(index)
  if (index === -1) {
    console.log('not found')
  res.status(400).json({msg: "delete failed"});
   
  }
  else{
    console.log('found')
    employees.splice(index, 1);
    res.status(200).json({msg: "deleted success"});
  }
})

app.listen(port, () => {
  console.log(`Example app listenin on port ${port}`)
})
//OR simply app.listen(4000)

//app.listen(4000);

// http://localhost:3000/
// body json
// {
//     "msg": "addes success"
//  }
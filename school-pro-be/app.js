
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

 
const errorController = require('./app/controllers/error');
const studentRoutes = require('./app/routes/student.routes');
const profesorRoutes = require('./app/routes/profesor.routes');
const subjectRoutes = require('./app/routes/subject.routes');
const cityRoutes = require('./app/routes/city.routes');
const examRoutes = require('./app/routes/exam.routes');
const examperiodRoutes = require('./app/routes/exam-period.routes');
const authRoutes=require('./app/routes/auth');
const gradeRoutes=require('./app/routes/grade.routes');

/* Setting up the port and the cors options. */
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:4200"
};
app.use(bodyParser.json())

////////////////////////////////////////////////////////
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Custom-Header, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// /* Enabling CORS. *//
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "'GET, POST, PUT, DELETE,HEAD,OPTIONS'");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Custom-Header, x-client-key, x-client-token, x-client-secret, Authorization");
//   next();
// });
/* A route that is used to test the CORS configuration. */
// app.post("/",cors(),  (req, res)=>{
//   console.log(req.body);
//   res.status(200).send({"message" : "data received"});
// });
 app.use(cors(corsOptions));
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());
app.use('/student', studentRoutes);
app.use('/profesor', profesorRoutes);
app.use('/subject', subjectRoutes);
app.use('/city', cityRoutes);
 app.use('/exam', examRoutes);
 app.use('/examperiod',examperiodRoutes);
 app.use('/auth',authRoutes);
 app.use('/grade',gradeRoutes);

app.use(errorController.get404);
app.use(errorController.get500);



 

////////////////////////////////////////////////////////////////////////////////
//   app.use(student.model);
//  require("./routes/student.routes.js");
// // app.listen(...);
////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => console.log(`Listening  on PORT ${PORT}`))
////////////////////////////////////////////////////////////////////////////////
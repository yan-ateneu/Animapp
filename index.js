const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
app.use(express.json());
var bodyParser = require("body-parser");
var path = require('path');
// multer for files
var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    if(file.fieldname === "userProfileImage"){
      cb(null, 'uploads/');
    }
    else{
      const dirName = 'uploads/' + req.body.animalId; 
      if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
    }
      cb(null, dirName);
    }
    
  },
  filename: (req, file, cb) => {
    const uploadDate = new Date(req.body.date);
    const formatDate = uploadDate.toISOString();
    const windowsDate = formatIsoDateForWindows(formatDate);
    const filePath = file.fieldname + "@" + windowsDate + path.extname(file.originalname);
    //deleteFile(filePath);

    //delete previous profile image
    const profileImage = findProfileImage(__dirname + '/uploads/', "userProfileImage"); 
    if(profileImage)
      deleteFile(profileImage);

    cb(null, filePath);
  }
});
var upload = multer({ storage: storage });

var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// var imgModel = require('./model');

const formatIsoDateForWindows = function(isoDate){
  return isoDate.replace(/:/g, '_');
}

const formatWindowsDateForIso = function(windowsDate){
  return windowsDate.replace(/_/g, ':');
}

const x = { 
    'NrPostari': 10,
    'NrUrmaritori': 20,
    'NrUrmareste': 5,
    'Categorie': "caine",
    'NumeProfil': "Zidaru",
    'Descriere': "destept"
};
const y= {
  'LocatiePozaProfil': __dirname + "/Zidaru.jpg"
};


const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/Licenta';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));


const Animal = require('./models/Animal.js');

const Utilizator = require('./models/Utilizator.js');
const { reset } = require('nodemon');

app.get('/', (req, res) => {
  res.send(x);
});
app.get('/profil/poza', (req, res) => {
  res.sendFile(y.LocatiePozaProfil);
});
app.get('/profil', async (req, res) => {

    res.send(x);
});

app.get('/feed', (req, res) => {
  res.send(z);
});

app.get('/test', async (req, res) => {
  
  const animale = await Animal.find();
  console.log(animale);
});



app.get('/getUtilizatori/:id', async (req, res) => {
  console.log(req.params.id);
  //const utilizatori = await Utilizator.find();u
  res.send({utilizatori});
});

app.get('/getAnimaleByEmail/:email', async (req, res) => {
  const emailPrimit = req.params.email;
  const proprietar = await Utilizator.findOne({Email: emailPrimit});
  if(!proprietar){
    res.send({
      code: 500,
      message: "Utilizator negasit"
    });
  };
  const animale = await Animal.find({Proprietar: proprietar.id});
  console.log(animale);
  res.send({
    code: 200,
    animals: animale
  });
});

app.get('/getPozaProfilByAnimalId/:animalId', async (req, res) => {
  const animalId = req.params.animalId;
  const animal = await Animal.findOne({_id: animalId});
  if(!animal){
    res.send({
      code: 500,
      message: "Animal negasit"
    });
  }
  res.sendFile(animal.img_profil);
});


app.get('/findByNumeUtilizator/:numeutilizator', async (req, res) => {
  console.log(req.params.numeutilizator);
  const numeUtilizatorPrimit=req.params.numeutilizator;
  const query=await Animal.find({NumeUtilizator: numeUtilizatorPrimit})
  console.log(query);
  if(query.length!=0)
      res.send(query[0]);
  else 
      res.send("nu exista animal cu acest nume de utilizator")
});

app.get('/findByIdAnimal/:id', async (req, res)=>{
  const animalId=req.params.id;
  const animal=await Animal.findOne({_id: animalId});
  console.log(animalId);
  if(!animal){
    res.send({
      code: 500,
      message: "Animal negasit"
    });
  }
  let photos = [];
  for(let photo of animal.poze){
    const tokens = photo.split("@");
    photos.push(tokens[1]);
  }
  res.send({
    _id: animal._id,
    NumeAnimal: animal.NumeAnimal,
    Rasa: animal.Rasa,
    Varsta: animal.Varsta,
    Descriere: animal.Descriere,
    Categorie: animal.Categorie,
    Adoptie: animal.Adoptie,
    img_profil: animal.img_profil,
    poze: photos
  });
});

app.post('/findOrCreateUser', async (req, res)=> {
  const emailPrimit = req.body.email;
  console.log(emailPrimit);
  const query = await Utilizator.find({Email : emailPrimit});
  console.log(query);
  if(query.length != 0){
    res.send({
      code: 200,
      message: "ok"
    });
  }
  else{
    const user_nou=new Utilizator({
      'Nume': 0,
      'Email':emailPrimit,
      'Descriere': ''
    });
    user_nou.save();
    res.send({
      code: 200,
      message: "ok"
    });
  }
});

app.post('/addAnimal', async (req, res) => {
  
  const emailPrimit=req.body.email;
  const proprietar = await Utilizator.findOne({Email: emailPrimit});
  let image;
  if(req.body.categorie=='Dog')image=__dirname + '/uploads/'+'Droopy_dog.png';
  if(req.body.categorie=='Cat')image=__dirname + '/uploads/'+'garfield-final.jpg';
  if(req.body.categorie=='Hamster')image=__dirname + '/uploads/'+'hamster.jpg';
  if(req.body.categorie=='Chinchilla')image=__dirname + '/uploads/'+'chinchilla.jpg';
  const animal = new Animal({
    Proprietar: proprietar._id,
    NumeAnimal: req.body.nume,
    Rasa: '',
    Varsta: 0,
    Descriere: '',
    Categorie: req.body.categorie,
    Adoptie: false,
    img_profil: image,
    poze: []
  });
  
  animal.save();
  
  res.send({
    code: 200,
    message: "ok"
  })
});

app.get('/findByEmail/:email', async (req, res) => {
  const emailPrimit=req.params.email;
  const query=await Utilizator.find({Email: emailPrimit});

  if(query.length!=0)
      res.send(query[0]);
  else 
      res.send("nu exista utilizator cu acest email")
});

app.delete('/deleteUser',async (req, res)=>{
  const emailPrimit=req.body.email;
  console.log(emailPrimit);
  await Utilizator.deleteOne({ Email: emailPrimit }).then(function(){
    res.send("S-a sters")// Success
  }).catch(function(error){
     res.send(error); // Failure
  });
});



app.delete('/deleteAnimal/:idAnimal',async (req, res)=>{
  const idAnimal = req.params.idAnimal;
  await Animal.deleteOne({ _id: idAnimal }).then(function(){
    res.send({res: "S-a sters"})// Success
  }).catch(function(error){
     res.send(error); // Failure
  });
});



app.post('/createUser', async (req, res) => {
  const emailPrimit=req.body.email;
  console.log(emailPrimit);
  res.send(emailPrimit);
  const user_nou=new Utilizator({
    'Nume': 0,
    'Email':emailPrimit
  });
  user_nou.save();
});
/*
const animal = new Animal({
  NumeUtilizator: 'Zidaru',
  NumeAnimal: 'Tapirdea',
  Rasa: 'Programator',
    Varsta: 24,
    Descriere: 'Salariu mare, fara viata sociala',
    Categorie: 'Prof',
    img_profil:{
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + 'tapi.jpg')),
      contentType: 'image/jpg'
  }
});
animal.save();
*/

const deleteFile = function(path){
  try{
    fs.unlink(path);
  }
  catch(err) {
    console.log(err);
  }
}

const findProfileImage = function(dir, tag){
  const files = fs.readdirSync(dir);
  for(let file of files){
    //const filename = file.split('.').slice(0, -1).join('.');
    const tokens = file.split("@");
    if(tokens[0] === tag){
      return file;
    }
  }
  return false;
}

app.post('/UploadUserProfileImage', upload.single('userProfileImage'), async (req, res)=>{
  const uploadDate = new Date(req.body.date);
  const formatDate = uploadDate.toISOString();
  const windowsDate = formatIsoDateForWindows(formatDate);
  const fileName = "userProfileImage@" + windowsDate + path.extname(req.file.originalname);

  const imgPath = __dirname + '/uploads/' + fileName; 
  const email = req.body.email;
  const a = await Utilizator.findOneAndUpdate(
    {Email: email}, 
    {img_profil: imgPath}, 
    {upsert: true}, 
    function(err, doc){
    if(err) {console.log(err); return res.send(500, {error: err})};
  });
  res.send("Imagine profil incarcata cu succes");
});

app.post('/UploadProfileImage', upload.single('profileImage'), async (req, res)=>{
  const uploadDate = new Date(req.body.date);
  const formatDate = uploadDate.toISOString();
  const windowsDate = formatIsoDateForWindows(formatDate);
  const fileName = "profileImage@" + windowsDate + path.extname(req.file.originalname);

  const imgPath = __dirname + '/uploads/' + req.body.animalId  + '/' + fileName; 
  const animalId = req.body.animalId;
  const a = await Animal.findOneAndUpdate(
    {_id: animalId}, 
    {img_profil: imgPath}, 
    {upsert: true}, 
    function(err, doc){
    if(err) {console.log(err); return res.send(500, {error: err})};
  });
  res.send("Imagine profil incarcata cu succes");
});

app.post('/UploadAnimalPhoto', upload.single('image'), async (req, res)=>{
  const uploadDate = new Date(req.body.date);
  console.log("aa");
  console.log(uploadDate);
  const formatDate = uploadDate.toISOString();
  const windowsDate = formatIsoDateForWindows(formatDate);
  const fileName = "image@" + windowsDate + path.extname(req.file.originalname);

  const imgPath = __dirname + '/uploads/' + req.body.animalId  + "/" + fileName; 
  console.log(imgPath);
  Animal.findOneAndUpdate(
    {_id: req.body.animalId},
    { $push: { poze: imgPath } },
    {upsert: true}, 
    function(err, doc){
      if(err) 
      {
        console.log(err); return res.send(500, {error: err})
      }
      else{
        res.send("Imagine profil incarcata cu succes");
      }
    }
  );
  
});

app.get('/GetAnimalPhotosList/:animalId', async(req, res) => {
  const animal = await Animal.findOne({_id: req.params.animalId});
  let photos = [];
  for(let photo of animal.poze){
    const tokens = photo.split("@");
    photos.push(tokens[1]);
  }
  res.send({
    code: 200,
    photos: photos
  });
});

app.get('/GetUserProfileImage/:email', async (req, res) => {
  const email = req.params.email;
  const query=await Utilizator.find({Email: email}); 
  if(query.length != 0){
    const file = findProfileImage(__dirname + '/uploads/', "userProfileImage"); 
    if(file){
      res.sendFile(query[0].img_profil);
    }
    else{
      res.send("Nu a fost gasit.");
    }
  }
});

app.get('/GetProfileImage/:animalId', async (req, res) => {
  const animalId = req.params.animalId;
  const query=await Animal.find({_id: animalId});  
  if(query.length != 0){
    const file = findProfileImage(__dirname + '/uploads/' + animalId); 
    if(file){
      res.sendFile(query[0].img_profil);
    }
    else{
      res.send("Nu a fost gasit.");
    }
  }
});

app.get('/GetAnimalPhotoByName/:animalId/:name', async (req, res) => {
  const animalId = req.params.animalId;  
  const animal = await Animal.findOne({_id: animalId});
  for(let photo of animal.poze){
    const tokens = photo.split("@");
    if(tokens[1] === req.params.name){
      res.sendFile(photo);
      return;
    }
  }
  res.status(500).send({message: "Poza nu a fost gasita"});
}); 

app.get('/GetAnimalByRaceAndCategory/:email/:category/:race', async (req, res) => {
  const email = req.params.email; 
  const category = req.params.category;
  const race = req.params.race;
  let query;
  //TODO query user by email -> list of user's animals
  if(race === "null"){
    query = {Categorie: category};
  }
  else{
    query = {Categorie: category, Rasa: race};
  }
  const animale = await Animal.find(query);
  res.status(200).send({
    animals: animale
  })
}); 

app.get('/GetCaringUsers/:email', async(req, res) => {
  const email = req.params.email;
  let useri = await Utilizator.find({Ingrijire: true});
  useri = useri.filter(x => x.Email !== email);
  res.status(200).send({ 
    users: useri
  });
});




 
app.post('/createAnimal', async (req, res) => {
  const numeUtilizatorPrimit=req.body.numeutilizator;
  console.log(numeUtilizatorPrimit);
  res.send(numeUtilizatorPrimit);
  const user_nou=new Animal({
    'NumeAnimal': 0,
    'Rasa': 0,
    'Varsta': 0,
    'Categorie': 0,
    'Descriere': 0,
    'NumeUtilizator':numeUtilizatorPrimit,
  //   'img': {
  //     'data':0,
  //     'contentType':0
  // }
  });
  user_nou.save();
})

app.get('/getUser/:email', async (req, res) => {
  const emailPrimit = req.params.email;
  const user = await Utilizator.findOne({Email: emailPrimit});
  if(user){
    res.status(200).send(user);
  }
  else{
    res.status(500).send("Utilizatorul nu a fost gasit");
  }
});

app.put('/editUser',async (req, res)=> {
  const emailPrimit=req.body.email;
  const Utilizator_editat={
    Nume: req.body.NumeProfil,
    Descriere: req.body.Descriere,
    Ingrijire: req.body.Ingrijire
  };
  Utilizator.findOneAndUpdate({Email: emailPrimit}, Utilizator_editat, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.status(200).send({response: 'Utilizator editat cu succes'});
});
 
})

app.put('/editAnimal',async (req, res)=> {
  const idPrimit=req.body.animalId;``
  console.log(idPrimit);
  const Animal_editat={
      NumeAnimal: req.body.numeanimal,
      Rasa: req.body.rasa,
      Varsta: req.body.varsta,
      Categorie: req.body.categorie,
      Descriere: req.body.descriere,
      Adoptie: req.body.adoptie,
    };

    Animal.findOneAndUpdate({_id: idPrimit}, Animal_editat, {upsert: true}, function(err, doc) {
      if (err) return res.send(500, {error: err});
      return res.send({result: 'Animal editat cu succes'});
  });
 
})
// app.put('/editAnimal',async (req, res)=> {
//   const numeUtilizatorPrimit=req.body.numeutilizator;
//     var Utilizator_editat={
//       NumeAnimal: req.body.numeanimal,
//       Rasa: req.body.rasa,
//       Varsta: req.body.varsta,
//       Categorie: req.body.categorie,
//       Descriere: req.body.descriere,
//       NumeUtilizator:numeUtilizatorPrimit
//     //   img: {
//     //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//     //     contentType: 'image/png'
//     // }
//     };

//     Animal.findOneAndUpdate({NumeUtilizator: numeUtilizatorPrimit}, Animal_editat, {upsert: true}, function(err, doc) {
//       if (err) return res.send(500, {error: err});
//       return res.send('Animal editat cu succes');
//   });
 
// })



app.post('/utilnou', async(req, res) => {
  const datePrimite = req.body;
  console.log(datePrimite);
  res.send(datePrimite);
  const utilizator_nou = new Utilizator(datePrimite);
  utilizator_nou.save();
})

app.post('/edit', async(req, res) => {
  const datePrimite = req.body;
  console.log(datePrimite);
  res.send(datePrimite);
  const utilizator_nou = new Utilizator(datePrimite);
  utilizator_nou.save();
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


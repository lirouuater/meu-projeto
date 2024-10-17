const express    = require('express');
const exphbs     = require('express-handlebars');
const app        = express();
const path       = require('path')
const db         = require('./db/connection')
const bodyParser = require('body-parser');
 
const PORT = 3001;
 
 
// Configurando o Handlebars como engine de view
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
// Definindo a rota principal
app.get('/', (req, res) => {
    res.render('home'); // Certifique-se de que o arquivo 'home.handlebars' existe
});
 

app.listen(PORT, () => {
    console.log(`O Express está rodando na porta ${PORT}`);
});
//body parser 
app.use(bodyParser.urlencoded({extended: false }));
 
//handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('hanblebars', exphbs.engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');



 
 
//static folder//
 
 
app.use(express.static(path.join(__dirname, 'public')));
 
//db connection
db.authenticate()
  .then(() => {
    console.log('Conectou ao banco de dados com sucesso');
  })
  .catch(err => {
    console.log('Ocorreu um erro ao conectar', err);
  });
 
//routes
 
app.get('/', (req, res) => {
    res.render('index');
});
 
// jobs routes
app.use('/jobs', require('./routes/jobs'));
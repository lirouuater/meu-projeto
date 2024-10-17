const express = require('express');
const exphbs = require('express-handlebars').engine
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
 
const PORT = 3001;
 
// Configurando o Handlebars como engine de view
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
 
// Definindo a pasta de views
app.set('views', path.join(__dirname, 'views'));
 
// Definindo a pasta estática
app.use(express.static(path.join(__dirname, 'public')));
 
// Conexão com o banco de dados
db.authenticate()
  .then(() => {
    console.log('Conectou ao banco de dados com sucesso');
  })
  .catch(err => {
    console.log('Ocorreu um erro ao conectar', err);
  });
 
// Definindo a rota principal
app.get('/', (req, res) => {
  res.render('home'); // Certifique-se de que o arquivo 'home.handlebars' existe
});
 
// Jobs routes
app.use('/jobs', require('./routes/jobs'));
 
// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`O Express está rodando na porta ${PORT}`);
});
const md5 = require('md5');
require("dotenv-safe").config();
const fetch = require('node-fetch');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

module.exports.getComics = async function(application,req, res){
    
    let timeStamp = Math.floor(Date.now() / 1000);
    let publicKey = process.env.PUBLIC_KEY;
    let privateKey = process.env.PRIVATE_KEY;
    let marvelApi = process.env.MARVEL_API;
   
    await fetch(marvelApi + "&ts=" + timeStamp + "&apikey=" + publicKey + "&hash=" + md5(timeStamp + privateKey + publicKey))
    .then(result => result.json())
    .then(json => {
        let comics = [];
        comics = json.data.results;

        (comics).forEach(comic => {
            comic.title = comic.title;
            console.log(comic.title);
        });

        const csvWriter = createCsvWriter({
        path: 'comics.csv',
        fieldDelimiter: ';',
        header: [
            {id: 'id', title: 'Id'},
            {id: 'title', title: 'Título'}
        ]
    });
        csvWriter
        .writeRecords(comics)
        .then(()=> console.log("O Arquivo CSV foi gerado com sucesso na raiz do projeto!!"))
        .then(() => res.send("O Arquivo CSV foi gerado com sucesso na raiz do projeto!!"));
    })
   }
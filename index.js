const express = require('express')
const app = express()
const file_reader = require('fs')

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Node JS");
})


app.post('/list_book', (req,res) =>{

    file_reader.readFile("db.json", function(err, data){
            var books_detail = JSON.parse(data);
            res.send(books_detail);
        }); 
});


app.post('/add_book', (req,res) =>{
    
    let new_bk = req.body;
    file_reader.readFile("db.json", function(err, data){
                let books_detail = JSON.parse(data);        
                books_detail.push(new_bk);         
                file_reader.writeFileSync("db.json", JSON.stringify(books_detail, null, 2));     
                res.send({ "message": "successfully inserted" });
        }); 
});

app.delete('/delete_book', (req,res) =>{
    
        let author = req.body.author;
        file_reader.readFile("db.json", function(err, data){
                var books_detail = JSON.parse(data);
                var books_detail = books_detail.filter(note => {
                    return note['author'] != author;
                })
                file_reader.writeFileSync("db.json", JSON.stringify(books_detail, null, 2));
                res.send({"message": "successfully deleted"});
            
        });
});


app.listen(process.env.PORT || 3000)
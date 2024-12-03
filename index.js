import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public", {
  setHeaders: (res, path) =>{
      if(path.endsWith(".css")){
          res.set("Content-Type", "text/css")
      }
  }
}))

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "12345",
  port: "5432"
})

db.connect()


let countries_visited = []


const result =  db.query("SELECT * FROM visited_countries", (err, res)=>{
  if(err){
    console.error("Error executing query", err.stack)
  }else{
    countries_visited = res.rows
  }
})

console.log(result)

app.get("/", async (req, res) => {
  res.render("index.ejs", {countries: result})
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

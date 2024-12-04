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

app.get("/", async (req, res) => {
const result = await db.query ("SELECT country_code FROM visited_countries")
let countries = []
result.rows.forEach((country) =>{
  countries.push(country.country_code)
})
console.log(result.rows);
res.render("index.ejs", {countries: countries, total: countries.length})
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = process.env.PORT || 3000;

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

app.post("/add", async (req, res)=>{
  const input = req.body["country"] //Retorno do input digitado pelo usuario
  console.log(input)

  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",  // seleciona o country_code da tabele countries
    [input]                                                   // com a comparação WHERE selecio o codigo do pais digitado pelo usuario
  )
  
  if(result.rows.length !== 0){ //Verifica se o nome digitado pelo usuario não é igual a zero ou seja se tem no banco de dados 
    const data = result.rows[0]
    const countryCode = data.country_code //colocando o resultado em uma constante 

    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", //Inserindo na tabela visited_countries na coluna country_code o valor retornado no countryCode
      [countryCode]
    )
    res.redirect("/")
  }
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

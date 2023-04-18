import { Response, Request, Router } from "express";
import axios from "axios";
import cheerio from "cheerio";

const router = Router();

router.get("/data", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://precioaceitedeoliva.net/");
    const $ = cheerio.load(response.data);
    const tableTr = $("table").eq(0).find("tr");
    const tableStructured = {
      title: tableTr.eq(0).find("th").text(),
      date: tableTr.eq(1).find("th").eq(0).text(),
      header: tableTr.eq(1).find("th").eq(1).text(),
      items: [
        {
          name: tableTr.eq(2).find("td").eq(0).text(),
          price: tableTr.eq(2).find("td").eq(1).text(),
        },
        {
          name: tableTr.eq(3).find("td").eq(0).text(),
          price: tableTr.eq(3).find("td").eq(1).text(),
        },
        {
          name: tableTr.eq(4).find("td").eq(0).text(),
          price: tableTr.eq(4).find("td").eq(1).text(),
        },
      ],
    };
    res.send(tableStructured);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error al obtener los datos");
  }
});

export { router };

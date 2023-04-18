import { Response, Request, Router } from "express";
import axios from "axios";
import cheerio from "cheerio";

const router = Router();

router.get("/data", async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://precioaceitedeoliva.net/");
    const $ = cheerio.load(response.data);
    const data = $("table").eq(0).text().replace(/\s\s+/g, " ");
    res.send(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error al obtener los datos");
  }
});

export { router };

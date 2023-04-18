"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const router = (0, express_1.Router)();
exports.router = router;
router.get("/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://precioaceitedeoliva.net/");
        const $ = cheerio_1.default.load(response.data);
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
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Error al obtener los datos");
    }
}));

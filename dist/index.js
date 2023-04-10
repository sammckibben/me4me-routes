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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const dotenv = require("dotenv");
dotenv.config();
const envir = process.env;
const app = (0, express_1.default)();
const PORT = 3000;
function getTextMessageInput(recipient, text) {
    return JSON.stringify({
        messaging_product: "whatsapp",
        // preview_url: false,
        // recipient_type: "individual",
        to: recipient,
        type: "template",
        template: {
            name: "hello_world",
            language: {
                code: "en_US",
            },
        },
    });
}
function sendMessage(data) {
    var config = {
        method: "post",
        url: `https://graph.facebook.com/${envir.API_VERSION}/${envir.FROM_PHONE_NUMBER_ID}/messages`,
        headers: {
            Authorization: `Bearer ${envir.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        data,
    };
    return (0, axios_1.default)(config);
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const textMessageInput = getTextMessageInput(envir.TO_PHONE_NUMBER, "Hello there!");
    sendMessage(textMessageInput)
        .then((response) => {
        console.log("SUCCESS HERE");
        console.log(response);
        console.log("SUCCESS HERE");
    })
        .catch((error) => {
        console.log("FAILED HERE");
        console.log(error.response);
        console.log("FAILED HERE");
    });
}));
app.listen(PORT, () => {
    console.log("app listening on port 3000");
});

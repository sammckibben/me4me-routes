import axios from "axios";
import express from "express";

const dotenv = require("dotenv");
dotenv.config();
const envir = process.env;

const app = express();
const PORT = 3000;

function getTextMessageInput(recipient: string, text: string) {
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

function sendMessage(data: string) {
  var config = {
    method: "post",
    url: `https://graph.facebook.com/${envir.API_VERSION}/${envir.FROM_PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${envir.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data,
  };

  return axios(config);
}

app.get("/", async (req, res) => {
  const textMessageInput = getTextMessageInput(
    envir.TO_PHONE_NUMBER,
    "Hello there!"
  );

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
});

app.listen(PORT, () => {
  console.log("app listening on port 3000");
});

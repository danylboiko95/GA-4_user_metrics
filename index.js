const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const link = `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.MEASUREMENT_ID}&api_secret=${process.env.API_SECRET}`;

function sendToAnalytics(bitcoinPrice) {
  axios
    .post(link, {
      client_id: "87158099.1677149454",
      events: [
        {
          name: "bitcoin_price",
          params: {
            items: [],
            name: "bitcoin",
            count: bitcoinPrice,
          },
        },
      ],
    })
    .then(() => {
      console.log("Data sent to Google Analytics successfully.");
    })
    .catch((error) => {
      console.error("Error sending data to Google Analytics:", error);
    });
}
function sendToAnalytics2(bitcoinPrice) {
  axios
    .post(link, {
      client_id: "1718217255.1675100581",
      events: [
        {
          name: "future_bitcoin_price",
          params: {
            items: [],
            name: "bitcoin_future",
            price: bitcoinPrice,
            currency: "USD",
          },
        },
      ],
    })
    .then(() => {
      console.log("Data sent to Google Analytics successfully.");
    })
    .catch((error) => {
      console.error("Error sending data to Google Analytics:", error);
    });
}
function sendToAnalytics3(bitcoinPrice) {
  axios
    .post(link, {
      client_id: "4718217255.4675100581",
      events: [
        {
          name: "test",
          params: {
            items: [],
            price: bitcoinPrice,
          },
        },
      ],
    })
    .then(() => {
      console.log("Data sent to Google Analytics successfully.");
    })
    .catch((error) => {
      console.error("Error sending data to Google Analytics:", error);
    });
}

function fetchBitcoinPrice() {
  axios
    .get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    )
    .then((response) => {
      const bitcoinPrice = response.data.bitcoin.usd;
      console.log("Bitcoin Price:", bitcoinPrice);

      sendToAnalytics(bitcoinPrice);
      sendToAnalytics2(bitcoinPrice - 12493);
      sendToAnalytics3(bitcoinPrice - 22493);
    })
    .catch((error) => {
      console.error("Error fetching Bitcoin price:", error);
    });
}
fetchBitcoinPrice();
setInterval(fetchBitcoinPrice, 30000);

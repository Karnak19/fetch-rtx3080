const axios = require("axios");
const open = require("open");

async function main() {
  try {
    const { data } = await axios.get(
      "https://in-and-ru-store-api.uk-e1.cloudhub.io/DR/products/fr_fr/EUR/5394903200,5336531100,5256301100",
      {
        credentials: "omit",
        headers: {
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:81.0) Gecko/20100101 Firefox/81.0",
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
        },
        referrer: "https://www.nvidia.com/fr-fr/shop/geforce/?page=1&limit=9&locale=fr-fr",
        mode: "cors",
      }
    );
    const { product } = data.products;

    const clearedDatas = product.map((e) => {
      return e.displayName;
    });

    const isInStock = !!clearedDatas.find((e) => e.includes("3080"));

    if (isInStock) {
      await open("https://www.nvidia.com/fr-fr/shop/geforce/?page=1&limit=9&locale=fr-fr");
    } else {
      console.log("Not in stock yet, retry later...");
    }
  } catch (error) {
    console.log("Eeeeeh, something bad happened... Don't spam that much, you will have one :)");
    console.log(error.response.statusText);
  }
}

main();

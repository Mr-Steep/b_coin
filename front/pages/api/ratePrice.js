import https from "https";
let cachedData = null; // Variable to store cached data
let cacheTimestamp = 0; // Variable to store the timestamp of the cached data

export default async function ratePrice(req, res) {
    let dataParse  =  [];
    const currentTime = Date.now();
    // If data is cached and not expired (1 minute)
    if (cachedData && currentTime - cacheTimestamp < 5000) {
        return res.status(200).json(cachedData);
    }

    const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BNBBUSD'
    https.get(url, apiResponse => {
        let data = "";
        apiResponse.on("data", chunk => {
            data += chunk;
        })
        apiResponse.on("end", () => {
            dataParse = JSON.parse(data);
            cachedData = dataParse;
            cacheTimestamp = currentTime;
            return res.status(200).json(dataParse);
        });
    });
}
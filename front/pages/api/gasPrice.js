import https from "https";

let cachedData = null; // Variable to store cached data
let cacheTimestamp = 0; // Variable to store the timestamp of the cached data

export default async function gasPrice(req, res) {
    const currentTime = Date.now();

    // If data is cached and not expired (1 minute)
    if (cachedData && currentTime - cacheTimestamp < 60000) {
        return res.status(200).json(cachedData);
    }

    let dataParse  =  [];

    const url = 'https://api.bscscan.com/api?module=gastracker&action=gasoracle'
    https.get(url, apiResponse => {
        let data = "";
        apiResponse.on("data", chunk => {
            data += chunk;
        })
        apiResponse.on("end", () => {
            const dataParse = JSON.parse(data);
            if (dataParse.message === "NOTOK") {
                return setTimeout(async () => {
                    await this.getGasPrice()
                }, 1000)
            }
            const gasPrice = dataParse.result.SafeGasPrice

            cachedData = gasPrice;
            cacheTimestamp = currentTime;
            return res.status(200).json(gasPrice);
        });
    });
}
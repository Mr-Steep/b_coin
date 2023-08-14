import https from 'https';

let cachedData = null;
let cacheTimestamp = 0;

export default async function gasPrice(req, res) {
    const currentTime = Date.now();

    // If data is cached and not expired (1 minute)
    if (cachedData && currentTime - cacheTimestamp < 60000) {
        return res.status(200).json(cachedData);
    }

    await fetchData(res, currentTime);
}

async function fetchData(res, currentTime) {
    const url = 'https://api.bscscan.com/api?module=gastracker&action=gasoracle';

    try {
        https.get(url, apiResponse => {
            let data = "";
            apiResponse.on("data", chunk => {
                data += chunk;
            })
            apiResponse.on("end", async () => {
                const dataParse = JSON.parse(data);
                if (dataParse.message === "NOTOK") {
                    // If NOTOK, wait and retry
                    setTimeout(async () => {
                        await fetchData(res, currentTime);
                    }, 1000);
                } else {
                    const gasPrice = dataParse.result.SafeGasPrice;

                    cachedData = gasPrice;
                    cacheTimestamp = currentTime;
                    return res.status(200).json(gasPrice);
                }
            });
        });
    } catch (error) {
        console.log(error);
        // Handle error response here
        return res.status(500).json({ error: "Internal server error" });
    }
}

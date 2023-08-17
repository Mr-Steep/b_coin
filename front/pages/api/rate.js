export default async function rate(req, res) {
    let dataParse
    const currentDomain = req.headers.host;
    const requestRate = await fetch(`http://${currentDomain}/api/ratePrice`, {
        method: 'POST'
    });
    const requestGas = await fetch(`http://${currentDomain}/api/gasPrice`, {
        method: 'POST'
    });
    dataParse =  await requestRate.json()
    dataParse.gas = await requestGas.json()
    return res.status(200).json(dataParse);
}

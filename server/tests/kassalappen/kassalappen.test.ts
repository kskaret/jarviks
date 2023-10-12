import { getProduct, getProductAndPriceFromAllBrands } from "../../src/kassalappen/kassalappen";

describe(getProduct, () => {
    it.only("should be able to get product data", async () => {
        const answer = await getProduct({
            productName: 'Frydenlund lager', 
            brand: undefined
        })
        console.log(answer)
    })

    it("should be able to get product data", async () => {
        const answer = await getProductAndPriceFromAllBrands({
            productName: 'Kjøttdeig'
        })
        console.log(answer)
    })
})
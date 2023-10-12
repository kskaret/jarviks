import { getServerLocation } from "../../src/yr/utils";
jest.setTimeout(60000)
describe(getServerLocation, () => {
    it('1', async () =>{
        const laks = await getServerLocation();
        console.log(laks);
    })
})
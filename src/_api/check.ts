import { Sywac } from "./index"

let t:Sywac<{}>;
async function test(){
    const t2 = await t.boolean("test",{required:true}).parseAndExit()
}

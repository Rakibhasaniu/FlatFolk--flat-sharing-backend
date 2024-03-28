import { Server } from "http"
import app from "./app";



async function main(){
    const server:Server = app.listen(5000, () => {
        console.log(`Server Is Running On Port 5000`)
      })
}

main();
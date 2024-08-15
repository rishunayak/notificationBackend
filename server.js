import connectToMongoDb from './config/connectToMongoDb.js';
import { ROUTES } from './config/route-constants.js';
import app from './index.js';



const serverPort = 5001;


(async () => {

    app.listen(serverPort, async() => {
       await connectToMongoDb()
       console.log(
            `Swagger-ui is available on http://localhost:${serverPort}${ROUTES.SWAGGER_ROUTE}`,
        );
    });
})();
//import { handler } from "../src/services/hello";
import { postSpaces } from "../src/services/spaces/PostSpaces";
import { handler } from "../src/services/spaces/handler";


process.env.AWS_REGION = "eu-west-1";
process.env.TABLE_NAME = 'SpaceTable-068e7469d831'

handler({
    httpMethod: 'GET',
    // body: JSON.stringify({
    //     location: 'Dublin'
    // })
} as any, {} as any);
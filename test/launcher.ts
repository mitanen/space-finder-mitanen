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
    queryStringParameters: {
        id: '3bb0e645-b435-4217-9d93-ba525185c775'
    }    
} as any, {} as any);
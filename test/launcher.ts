//import { handler } from "../src/services/hello";
import { postSpaces } from "../src/services/spaces/PostSpaces"; 
import { APIGatewayProxyEvent } from "aws-lambda";




// Mock API Gateway event
const event: APIGatewayProxyEvent = {
    httpMethod: "POST",
    body: JSON.stringify({
        location: "Dublin"
    }),
} as any; // Type assertion to bypass missing fields

// Call Lambda function
(async () => {
    const response = await postSpaces(event, {} as any);
    console.log("Lambda Response:", response);
})();
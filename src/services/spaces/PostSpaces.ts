import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";


export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<any> {
    console.log("Received Event:", JSON.stringify(event, null, 2)); // Log request

    try {
        // Ensure event.body exists before parsing
        if (!event.body) {
            console.log("Error: Missing event.body!");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Request body is missing" }),
            };
        }

        const body = JSON.parse(event.body); // Parse the body
        console.log("Parsed Body:", body); // Log parsed body

        if (!body.location) {
            console.log("Error: Missing 'location' field!");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required field: location" }),
            };
        }

        const randomId = v4();
        const item = {
            id: { S: randomId },
            location: { S: body.location },
        };

        console.log("Writing to DynamoDB:", item);

        const result = await ddbClient.send(new PutItemCommand({
            TableName: process.env.TABLE_NAME,
            Item: item
        }));

        console.log("DynamoDB PutItem Result:", result);

        return {
            statusCode: 201,
            body: JSON.stringify({ id: randomId }),
        };
    } catch (error) {
        console.error("Error in Lambda:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
        };
    }
}
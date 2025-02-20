import { AuthService } from "./AuthService";
import { fetchAuthSession } from 'aws-amplify/auth';  // Import the function
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'MyUserPool',
        'MyUserPoolPass01$'
    );
    const idToken = await service.getIdToken();

    const authSession = await fetchAuthSession();
    console.log(authSession.tokens?.idToken?.toString());

    // console.log(idToken);
    const credentials = await service.generateTemporaryCredentials();
    
    //console.log(credentials);
    const buckets = await listBuckets(credentials);
    console.log(buckets);    

}

async function listBuckets(credentials: any){
    const client = new S3Client({
        credentials: credentials
    });
    const command = new ListBucketsCommand({});
    const result = await client.send(command);
    return result;
}
testAuth();

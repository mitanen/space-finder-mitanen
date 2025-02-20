import { AuthService } from "./AuthService";
import { fetchAuthSession } from 'aws-amplify/auth';  // Import the function

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
    const a = 5;    

}
testAuth();

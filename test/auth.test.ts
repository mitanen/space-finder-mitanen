import { AuthService } from "./AuthService";
async function testAuth() {
    const service = new AuthService();
    const loginResult = await service.login(
        'MyUserPool',
        'MyUserPoolPass01$'
    );
    const idToken = await service.getIdToken();
    
}
testAuth();
var jwtDecode = require('jwt-decode');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var CognitoUser = AmazonCognitoIdentity.CognitoUser;

var userPool = new CognitoUserPool({UserPoolId:'', ClientId:'');
app.get('/app', function(req, res){
    var cognitoUser = userPool.getCurrentUser();
    if(cognitoUser != null){
        cognitoUser.getSession(function(err, session) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('session validity: ' + session.isValid());

            var sessionIdInfo = jwtDecode(session.getIdToken().jwtToken);
            console.log(sessionIdInfo['cognito:groups']);
        });
    }
});
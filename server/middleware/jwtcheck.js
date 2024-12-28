import {auth} from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({

    audience: 'http://localhost/',
    issuerBaseURL: 'https://dev-p3yzo1q2ipqqpdii.us.auth0.com',
    tokenSigningAlg: 'RS256'
  });

  export default jwtCheck;
  
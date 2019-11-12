const jwt = require('jsonwebtoken');

//make sure the user is logged in - Authentication
exports.loginRequired = function(req, res, next ) {
    try{
        // get token from http Header
        const token = req.headers.authorization //.split('')[1];  "Bearer" in authorization header
        
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            //if successfully decoded move on
            if ( decoded) {  
                return next();
            } else {
            //if unauthorized
                return next({
                    status: 401,  // Unauthorized
                    message: 'Please log in first'
                });
            }
        });
    } catch (err) {
        return next({
            status: 401,
            message: 'Please log in first'
        });
    }
}

//  /api/users/:id/messages
//make sure we get the correct user - Authorization 
exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization //.split('')[1]; // to remove "Bearer" from the authorization header
 
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            //console.log(`TOKEN ID:  ${decoded.id}`);
            if( decoded && decoded.id === req.params.id ) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                });
            }
        });
    } catch (e) {
        return next({
            status: 401,
            message: "Unauthorized"
        });
    }
};
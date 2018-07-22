import jwt from 'jsonwebtoken';


export default (req, res, next) => {

    const header = req.headers.authorization;

    let token
    if (header) token = header.split(" ")[1];
    console.log(token)

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).json({ errors: "invalid token" })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ errors: "no token" })
    }
}
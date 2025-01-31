
import connectAndQuery from '../postgresQuery.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

async function loginController(req, res){

    const {username, password} = req.body;
    const result = await connectAndQuery(`SELECT * FROM users where username = '${username}';`);
    if (await bcrypt.compare(password, result.rows[0].password)){
        const token = await jwt.sign({ id: result.rows[0].userid, username: username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.json({ message: 'Login successful' });
    }

    
}

export default loginController;

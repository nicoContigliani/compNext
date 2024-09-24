import * as jwt from 'jsonwebtoken';

const secret = 'tu_secreto_muy_seguro';

const payload:any = {
    user: {
        id: 1,
        email: 'usuario@example.com',
        role: 'admin'
    }
};




export const createToken = (
    // data: any
) => {
    try {
        const token:any = jwt.sign(payload, secret, { expiresIn: '1h' });

        console.log(token);

    } catch (error) {
        console.log("🚀 ~ createToken ~ error:", error)

    }
}
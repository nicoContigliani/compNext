const db = require('@/services/dbConection.services');

// export const get = async () => {
//     let data
//     //  createTableUser()
//     //  seederUser()
//     try {
//         const todo = db.all('SELECT * FROM users', (err: any, rows: any | any[] | undefined) => {
//             if (err) {
//                 console.error(err.message);
//             }
//             // console.log(rows);
//         });
//         console.log("🚀 ~ todo ~ todo:", todo)

//         return todo

//     } catch (error) {

//     }
// }

export const get = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err: any, rows: unknown) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};


export const getId = () => {
    let data

    db.all('SELECT * FROM users where id = 1', (err: any, rows: any | any[] | undefined) => {
        if (err) {
            console.error(err.message);
        }
        console.log(rows);
        data = rows
    });

}

export const post = () => {

}





export const createTableUser = () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    fullname TEXT NOT NULL,                -- Nombre completo del usuario, campo obligatorio
    password TEXT NOT NULL,                -- Contraseña, campo obligatorio
    mailuser TEXT,                         -- Correo del usuario
    mailsecretkey TEXT,                    -- Llave secreta asociada al correo
    calendaruser TEXT,                     -- Usuario de calendario
    calendarkey TEXT,                      -- Llave de acceso del calendario
    phone TEXT,                            -- Número de teléfono
    configuration TEXT,                    -- Datos de configuración almacenados como texto (puede ser JSON)
    extraData TEXT                         -- Campo para datos adicionales almacenados como texto (puede ser JSON)
);`);

}


export const seederUser = () => {
    db.run('INSERT INTO users (fullname, password, mailuser, mailsecretkey, calendaruser, calendarkey, phone, configuration, ExtraData) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        'Nicolas Contigliani',
        '1',
        'nico.contigliani',
        'your_mail_secret_key',
        'your_calendar_user',
        'your_calendar_key',
        '+1234567890',
        '{"theme": "dark", "language": "en"}', // Example JSON data for configuration
        '{"custom_data": "some_value"}' // Example JSON or other text data
    ]);
}

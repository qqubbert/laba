const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'abobaPenisDickHYUzalupka';

const authApp = express();

authApp.use(express.json());
authApp.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5500', 'http://localhost:3000','http://localhost:3001', 'http://localhost:3002'], // Массив разрешенных источников
    credentials: true,
};

authApp.use(cors(corsOptions));

authApp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || corsOptions.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "spiritbinge",
    database: "lab",
});

authApp.get('/', (req, res) => {
    res.send("Hello, world!");
});

authApp.get('/cookieclear', async (req, res) => {
    res.cookie('token', null, {
        httpOnly: true,       
        secure: false,        
        sameSite: 'Lax',
    });
    res.cookie('userid', null, {
        httpOnly: true,       
        secure: false,        
        sameSite: 'Lax',
    });
    res.cookie('admin', null, {
        httpOnly: true,       
        secure: false,        
        sameSite: 'Lax',
    });
    res.json({ message: 'cookie с токеном очищен' })
})

authApp.post('/register', async (req, res) => {
    let access = false;
    const {regKey} = req.cookies;
    console.log(regKey);
    const keyQuery = `
    SELECT * FROM registerKeys WHERE regKey = ?;
    `
    try {
        db.query(keyQuery, 
            [regKey],  
            (err, result) => {
            if (err) {
                console.error('Ошибка при проверке ключа:', err);
                return res.status(500).json({ message: "Ошибка сервера" });
            } else if (result.length >= 1) {
                access = true;
                console.log('Заебумба')
                if (access) {
                    const { login, password, 
                        email, phone, firstname, 
                        lastname, surname, 
                        birthday, academdeg, 
                        workexp, gender, childrencount,
                        familstat } = req.body;
            
                    console.log(req.body);
            
                    const queryUser = `
                    SELECT * FROM Users WHERE Login = ?;
                    `
            
                    db.query(queryUser, [login], async (err, result) => {
                        if (err) {
                            console.error('Ошибка сервера');
                            return res.status(500).json({ message: "Ошибка сервера" })
                        } else if (result.length >= 1) {
                            console.log('Пользователь уже существует');
                            return res.status(409).json({ message: "Пользователь уже зарегистрирован" });
                        } else {
                            const queryReg = `
                            INSERT INTO Users 
                                (Login, 
                                Pass, 
                                Gender, 
                                Birthday,
                                Email, 
                                AcademicDegree,
                                HavingChildren,
                                WorkExperience, 
                                PhoneNumber,
                                FirstName, 
                                LastName, 
                                Surname,
                                FamilyStatus,
                                DepID,
                                Salary,
                                Permission)
                            VALUES 
                                (?, 
                                ?, 
                                ?, 
                                ?, 
                                ?, 
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                ?,
                                13,
                                0,
                                'user')
                            `;
            
                            try {
                                const hashedPassword = await bcrypt.hash(password, 10);
                                db.query(queryReg, 
                                    [
                                        login,
                                        hashedPassword,
                                        gender,
                                        birthday,
                                        email,
                                        academdeg,
                                        req.body.havingChildren || 0, // Добавьте обработку для `HavingChildren`
                                        workexp,
                                        phone,
                                        firstname,
                                        lastname,
                                        surname,
                                        familstat,
                                    ],  
                                    (err, result) => {
                                    if (err) {
                                        console.error('Ошибка при регистрации:', err);
                                        return res.status(500).json({ message: "Ошибка сервера" });
                                    }
                                    console.log('Пользователь создан')
                                    const keyDeleteQuery = `
                                    DELETE FROM registerKeys WHERE regKey = ?;
                                    `
                                    db.query(keyDeleteQuery, [regKey], (err, rs) => {
                                        console.log(rs);
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("Ключ удалён и пользователь зарегистрирован");
                                            const query = `
                                            SELECT * FROM Users WHERE Login = ?
                                            `;
                                            db.query(query, [login], async (err, result) => {
                                                if (err) {
                                                    console.error('Ошибка при логине:', err);
                                                    return res.status(500).json({ message: "Ошибка сервера" });
                                                }
                                        
                                                const user = result[0];
                                                const isPasswordValid = await bcrypt.compare(password, user.Pass);
                                        
                                                if (!isPasswordValid) {
                                                    return res.status(400).json({ message: "Неправильный пароль" });
                                                }
                                        
                                                console.log(user);
                                        
                                                if (user.Isblocked) {
                                                    return res.status(400).json({message: "Вы уволены"});
                                                }
                                                
                                                const token = jwt.sign({ id: user.ID, permission: user.Permission }, JWT_SECRET, { expiresIn: '1h' });
                                                res.cookie('token', token, {
                                                    httpOnly: true,       
                                                    secure: false,        
                                                    sameSite: 'Lax',    
                                                    // maxAge: 100
                                                    maxAge: 10 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
                                                });
                                                res.cookie('userid', user.ID, {
                                                    httpOnly: true,       
                                                    secure: false,        
                                                    sameSite: 'Lax',    
                                                    // maxAge: 100
                                                    maxAge: 10 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
                                                });
                                                res.cookie('admin', user.Permission, {
                                                    httpOnly: true,       
                                                    secure: false,        
                                                    sameSite: 'Lax',       
                                                    // maxAge: 100
                                                    maxAge: 10 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
                                                });
                                                res.json({ token, message: 'Пользователь зарегистрирован и авторизован', userid: user.ID, permission: user.Permission });
                                            });
                                        }
                                    });
                                });
                            } catch (err) {
                                console.error('Ошибка при хэшировании пароля:', err);
                                res.status(500).json({ message: "Ошибка сервера" });
                            }      
                        }
                    })
                }  
            } else {
                access = false
                res.status(403).json({access: false, message: "Неправильный код регистрации"});
            }
        });
    } catch (err) {
        console.error('Ошибка: ', err);
        res.status(500).json({ message: "Ошибка сервера" });
    }  
});

authApp.post('/login', (req, res) => {
    const { login, password } = req.body;

    const query = `
    SELECT * FROM Users WHERE Login = ?
    `;

    console.log('login: ' + login);
    console.log('password: ' + password);

    db.query(query, [login], async (err, result) => {
        if (err) {
            console.error('Ошибка при логине:', err);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "Пользователь не найден" });
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.Pass);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Неправильный пароль" });
        }

        console.log(user);

        if (user.Isblocked) {
            return res.status(400).json({message: "Вы уволены"});
        }
        
        const token = jwt.sign({ id: user.ID, permission: user.Permission }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,       
            secure: false,        
            sameSite: 'Lax',    
            // maxAge: 100
            maxAge: 10 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
        });
        res.cookie('userid', user.ID, {
            httpOnly: true,       
            secure: false,        
            sameSite: 'Lax',    
            // maxAge: 100
            maxAge: 10 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
        });
        res.cookie('admin', user.Permission, {
            httpOnly: true,       
            secure: false,        
            sameSite: 'Lax',       
            // maxAge: 100
            maxAge: 10 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
        });
        res.json({ token, message: 'Пользователь авторизован', userid: user.ID, permission: user.Permission });
    });
});

authApp.get('/cookiecheck', (req, res)=>{
    const userid = req.cookies.userid;
    const admin = req.cookies.admin;
    res.json({ userid: userid, permission: admin });
})

authApp.get("/keys", (req, res) => {
    const isAdmin = req.cookies.admin == "admin";
    console.log(isAdmin);
    const getKeys = `
    SELECT * FROM registerKeys;
    `
    if (isAdmin) {
        db.query(getKeys, [], (err, rs) => {
            console.log(rs);
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(rs);
            }
        });
    } else {
        res.status(403).json({ message: "Отказано в доступе" })
    }
});

authApp.post('/keycheck', (req, res)=>{
    const {key} = req.body;
    const keyQuery = `
    SELECT * FROM registerKeys WHERE regKey = ?;
    `
    try {
        db.query(keyQuery, 
            [key],  
            (err, result) => {
            if (err) {
                console.error('Ошибка при проверке ключа:', err);
                return res.status(500).json({ message: "Ошибка сервера" });
            } else if (result.length >= 1) {
                res.cookie('regKey', key, {
                    httpOnly: true,       
                    secure: false,        
                    sameSite: 'Lax',   
                    maxAge: 2 * 60 * 60 * 1000, // Срок жизни 2 дней
                });
                res.status(201).json({ access: true, message: "Вы можете зарегистрироваться" });
            } else {
                res.status(403).json({access: false, message: "Неправильный код регистрации"});
            }
        });
    } catch (err) {
        console.error('Ошибка: ', err);
        res.status(500).json({ message: "Ошибка сервера" });
    }     
})

authApp.post('/addkey', (req, res)=>{
    const {key} = req.body;
    const {user_id} = req.cookies.userid;
    const addKey = `
    INSERT INTO registerKeys (regKey, keyCreatorID) VALUES (?, ?);
    `;
    db.query(addKey, [key, user_id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            console.log("Key created");
            res.status(200).json(rs);
        };
    });
})

authApp.post('/protected', (req, res) => {
    const token = req.cookies.token;
    const user_id = req.cookies.userid;
    let haveAccess = true;
    let accessMsg = "";

    if (!token) {
        return res.status(401).json({ message: "Доступ запрещён" });
    }

    const query = `
    SELECT * FROM Users WHERE ID = ?
    `;

    db.query(query, [user_id], async (err, result) => {
        if (err) {
            console.log(err)
        } else if (result.length >= 1) {
            console.log(result);
            const user = result[0];
            console.log(user.Isblocked);

            if (user.Isblocked) {
                haveAccess = false;
                accessMsg = 'Вы уволены';
            }

            console.log(haveAccess);

            if (haveAccess) {
                jwt.verify(token, JWT_SECRET, (err, user) => {
                    if (err) {
                        return res.status(403).json({ message: "Неправильный токен", access: false });
                    }
                    res.json({ message: `Привет пользователь с ID: ${user.id}`, access: true });
                });
            } else {
                res.json({ message: accessMsg, access: false });
            }
        } else {
            res.status(401).json({ message: "Ваш профиль удалён", access: false });
        }

    })
});


module.exports = authApp;
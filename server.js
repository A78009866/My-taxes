const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// المسارات (Routes)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));

// استقبال بيانات التسجيل
app.post('/api/register', (req, res) => {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.send('<script>alert("كلمة المرور غير متطابقة!"); window.location.href="/register";</script>');
    }
    console.log('طلب تسجيل:', req.body);
    res.send('<script>alert("تم إرسال طلب الولوج بنجاح!"); window.location.href="/login";</script>');
});

// استقبال بيانات تسجيل الدخول
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('محاولة دخول:', username);
    res.send('<script>alert("تم تسجيل الدخول بنجاح!"); window.location.href="/";</script>');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
module.exports = app;

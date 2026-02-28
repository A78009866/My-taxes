const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// إعدادات لقراءة بيانات النماذج (Forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// تحديد مجلد public للملفات الثابتة (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// مسار الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// مسار صفحة التسجيل (طلب الولوج)
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// مسار استقبال بيانات التسجيل
app.post('/api/register', (req, res) => {
    const { nif, name, activity, phone, username, password, confirmPassword } = req.body;
    
    // التحقق من تطابق كلمة المرور
    if (password !== confirmPassword) {
        return res.status(400).send(`
            <h2 style="color:red; text-align:center; font-family:tahoma; margin-top:50px;">
                كلمة المرور غير متطابقة! <a href="/register">الرجوع</a>
            </h2>
        `);
    }

    // هنا في العادة نقوم بحفظ البيانات في قاعدة البيانات (Database)
    console.log('طلب تسجيل جديد:', req.body);
    
    res.status(200).send(`
        <div style="text-align:center; font-family:tahoma; margin-top:50px; direction:rtl;">
            <h2 style="color:green;">تم إرسال طلبك بنجاح!</h2>
            <p>رقم التعريف الجبائي الخاص بك: ${nif}</p>
            <p>سيتم مراجعة طلبك والرد عليك قريباً.</p>
            <a href="/" style="padding:10px 20px; background:#0056b3; color:#fff; text-decoration:none; border-radius:5px;">العودة للرئيسية</a>
        </div>
    `);
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// ضروري من أجل Vercel
module.exports = app; 

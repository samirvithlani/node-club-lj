const nodemailer = require('nodemailer');

const sendingMail = async(to,subject,text) => {

    const options = {
        from:'pythonforsamir@gmail.com',
        to:to,
        subject:subject,
        // text:text,
        html:`<h1 style ="color:red;">${text}</h1>`
    }

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'pythonforsamir@gmail.com',
            pass:'fykwujelmcqtihkm'
        }
    })

    const res = await transporter.sendMail(options)
    console.log(res)



}

module.exports = {sendingMail}
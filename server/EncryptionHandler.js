const crypto = require('crypto');
const secret = 'aabcdeaaaabcdeaaaabcdeaaaabcdeaa';



const encrypt = (password)=>{
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr',Buffer.from(secret),iv);
    const encryptedPassword = Buffer.concat([cipher.update(password),cipher.final(),])

    return {iv:iv.toString("hex"),password:encryptedPassword.toString("hex"),};
}


const decrypt = (encryption) => {
    const iv = Buffer.from(encryption.iv, 'hex'); // Ensure iv is in buffer format
    const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(secret), iv);
    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password, 'hex')),  // Ensure password is in buffer format
        decipher.final(),
    ]);
    return decryptedPassword.toString(); // Convert to string after decryption
};


module.exports = {encrypt,decrypt};
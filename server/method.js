function randPassword() {
    const text=['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '1234567890', '~!@#$%^&*()_+";",./?<>'];
    const rand = function (min, max) {
        return Math.floor(Math.max(min, Math.random() * (max+1)));
    }
    const len = rand(8, 16); // 长度为8-16
    let pw = ''; 
    for (let i=0; i<len; ++i) 
    { 
        const strpos = rand(0, 3); 
        pw += text[strpos].charAt(rand(0, text[strpos].length)); 
    }
    return pw;
}

module.exports = randPassword;
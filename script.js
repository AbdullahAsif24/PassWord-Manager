function encryptPassword(password, key) {
    return CryptoJS.AES.encrypt(password, key).toString();
}

function decryptPassword(encryptedPassword, key) {
    var bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function maskPassword(pass) {
    let str = ''
    for (let i = 0; i < pass.length; i++) {
        str += '*'
    }
    return str
}

function copyText(txt) {
    navigator.clipboard.writeText(txt)
        .then(() => {
            // alert("Copied to clipboard");
            alertCopied.innerHTML = '(Copied Successfully)'
            alertCopied.style.display = 'inline'
            setTimeout(() => {
                alertCopied.style.display = 'none'
            }, 3000);
        })
        .catch((error) => {
            console.error("Copy failed:", error);
            // alert("Copy failed");
        });
}


const deletePassword = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    let arrUpdate = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem('passwords', JSON.stringify(arrUpdate))

    //show delete message
    alertCopied.style.display = 'inline'
    alertCopied.innerHTML = `(Successfull deleted "${website}")`
    setTimeout(() => {
        alertCopied.style.display = 'none'
    }, 3000);
    showPassword()
}

// logic to fill the table
const showPassword = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")

    if (data == null) {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`
    } else {
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`

        let arr = JSON.parse(data);
        let str = ''
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];



            str += `<tr>
                <td>${element.website}  <i class="fa-solid fa-copy" onclick="copyText('${element.website}')"></i></td>
                <td>${element.username} <i class="fa-solid fa-copy" onclick="copyText('${element.username}')"></i></td>    
                <td>${maskPassword(decryptPassword(element.password, "HackerNotAllowed"))} <i class="fa-solid fa-copy" onclick="copyText('${decryptPassword(element.password, "HackerNotAllowed")}')"></i></td>
                <td><button class="btn btn-primary btn-sm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`
        }

        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ''
    username.value = ''
    password.value = ''
}

showPassword()


document.querySelector(".butn").addEventListener("click", (e) => {
    e.preventDefault()

    if (!website.value || !username.value || !password.value) {
        alertCopied.style.display = 'inline';
        alertCopied.innerHTML = '(Please provide values for all fields)';
        setTimeout(() => {
            alertCopied.style.display = 'none';
        }, 3000);
        return;  // Exit the function if validation fails
    }

    console.log('clicked');
    console.log(username.value, password.value);
    let passwords = localStorage.getItem('passwords')
    console.log(passwords);

    if (passwords == null) {
        // If there are no passwords stored, add the new password
        let json = [];
        json.push({ username: username.value, password: encryptPassword(password.value, "HackerNotAllowed"), website: website.value });
        localStorage.setItem('passwords', JSON.stringify(json));

        // Show saved message
        alertCopied.style.display = 'inline';
        alertCopied.innerHTML = `(Successfully added "${website.value}")`;
        setTimeout(() => {
            alertCopied.style.display = 'none';
        }, 3000);
        showPassword();
    } else {
        // Check if the website already exists
        let json = JSON.parse(passwords);
        if (json.some(item => item.website === website.value)) {
            alertCopied.style.display = 'inline';
            alertCopied.innerHTML = '(Website already exists. Please choose a different website.)';
            setTimeout(() => {
                alertCopied.style.display = 'none';
            }, 3000);
        } else {
            // If the website does not exist, add the new password
            json.push({ username: username.value, password: encryptPassword(password.value, "HackerNotAllowed"), website: website.value });
            localStorage.setItem('passwords', JSON.stringify(json));

            // Show saved message
            alertCopied.style.display = 'inline';
            alertCopied.innerHTML = `(Successfully added "${website.value}")`;
            setTimeout(() => {
                alertCopied.style.display = 'none';
            }, 3000);
            showPassword();
        }
    }
});

// Encrypt
var encryptedMessage = CryptoJS.AES.encrypt("Hello, World!", "SecretKey123").toString();
console.log("Encrypted:", encryptedMessage);

// Decrypt
var bytes = CryptoJS.AES.decrypt(encryptedMessage, "SecretKey123");
var decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
console.log("Decrypted:", decryptedMessage);

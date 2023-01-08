// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARxf5TRxQrrzdJPwgcx-GRzCSTI2F9IJw",
    authDomain: "datasiswa-bec6b.firebaseapp.com",
    databaseURL: "https://datasiswa-bec6b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "datasiswa-bec6b",
    storageBucket: "datasiswa-bec6b.appspot.com",
    messagingSenderId: "163296876291",
    appId: "1:163296876291:web:90a07eeaeb82d04a0a3b36"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
var ref = database.ref('dataname')

var stdNo = 0;
var tbody = document.getElementById('tb1');

function listing(peminta, alamat, sembako) {
    let trow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    td1.innerHTML = ++stdNo;
    td2.innerHTML = peminta;
    td3.innerHTML = alamat;
    td4.innerHTML = sembako;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);

    tbody.appendChild(trow);

}

function getdata(theStudent) {
    stdNo = 0;
    tbody.innerHTML = "";
    theStudent.forEach(element => {
        listing(element.peminta, element.alamat, element.sembako);
    })
}

function showdata() {
    ref.get()
        .then((snapshot) => {
            var student = [];
            snapshot.forEach(ChildSnapshot => {
                student.push(ChildSnapshot.val())
            })
            getdata(student)
            // console.log(student)
            // alert('Success')
        })
}

let permissionadmin = Notification.permission

const show = document.getElementById('show')
show.addEventListener("click", () => {
    // console.log('show clicked')
    if (permissionadmin === "granted") {
        showNotification();
    } else if (permissionadmin === "default") {
        requestAndShowPermission();
    } else {
        alert("Use normal alert");
    }

    function requestAndShowPermission() {
        Notification.requestPermission(function (permissionadmin) {
            if (permissionadmin === "granted") {
                showNotification();
            }
        });
    }
    function showNotification() {
        let tag = "Show Data Success";
        let title = " Data Changed";
        let icon = 'image/icon-144.png'; //this is a large image may take more time to show notifiction, replace with small size icon
        // let body = innerHTML ;
        let body = `Someone input another data`;
        // let innerHTML = `<h2>${data[0].name.common}</h2>`;

        let notification = new Notification(title, { tag, body, icon });
        notification.onclick = () => {
            notification.close();
            window.focus('../admin.html');
        }
        setTimeout(() => notification.close(), 2 * 1000)
    }
})
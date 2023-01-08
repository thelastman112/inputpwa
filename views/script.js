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
var std

// Set up our register function
function regprocess() {
  // Get all our input fields
  fullname = document.getElementById('nameInp').value
  email = document.getElementById('emailInp').value
  username = document.getElementById('userInp').value
  password = document.getElementById('passInp').value


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(fullname) == false || validate_field(username) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email: email,
        fullname: fullname,
        username: username,
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      // Done
      alert('User Created!!');
      window.location.href = 'login.html';
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      // var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}

// Set up our login function
function logprocess() {
  // Get all our input fields
  email = document.getElementById('emailInp').value
  password = document.getElementById('passInp').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is needed!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        last_login: Date.now()
      }

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      // DOne
      alert('User Logged In!!')
      window.location.href = '../admin.html'

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
      alert('User is not registered.')

      // alert(error_message)
    })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

function outprocess() {
  auth.signOut()
  alert('User Logged Out!!')
  window.location.href = '../index.html'
}

function inputdata() {
  nik = document.getElementById('nik').value
  peminta = document.getElementById('peminta').value
  alamat = document.getElementById('alamat').value
  sembako = document.getElementById('sembako').value

  if (nik == "" || peminta == "" || alamat == "" || sembako == "") {
    alert('Please Input Data!!')
    return
    // Don't continue running the code
  } else {
    var data = {
      nik: nik,
      peminta: peminta,
      alamat: alamat,
      sembako: sembako
    }
    database.ref('dataname/' + nik).set(data)
  
    // alert('Success')
    document.getElementById('forminput').reset()
  }
}

var ref = database.ref('dataname')

// it used to show the data from firebase
// function showdata() {
  // ref.child('2').child('userid').get().then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

// }


//its working but avoid using it
// var stdNo=0;
// function listing(firstname, lastname, socialmedia){
//   var ul = document.getElementById('list')
//   var header = document.createElement('h2')

//   var _firstname = document.createElement('li');
//   var _lastname =  document.createElement('li');
//   var _socialmedia =  document.createElement('li') 

//   header.innerHTML = 'Student-' + (++stdNo);

//   _firstname.innerHTML = 'name : ' + firstname;
//   _lastname.innerHTML = 'name : ' + lastname;
//   _socialmedia.innerHTML = 'name : ' + socialmedia;

//   ul.appendChild(header);
//   ul.appendChild(_firstname);
//   ul.appendChild(_lastname);
//   ul.appendChild(_socialmedia);

// }

// function showdata() {
//   ref.once('value', function(snapshot){
//     snapshot.forEach(
//       function(ChildSnapshot){
//         let sfirstname = ChildSnapshot.val().firstname;
//         let slastname = ChildSnapshot.val().lastname;
//         let ssocialmedia = ChildSnapshot.val().socialmedia;
//         console.log(sfirstname, slastname, ssocialmedia);
//         listing(sfirstname,slastname,ssocialmedia)
//       }
//     )
//   })
// }

// its working at its finest
// var stdNo = 0;
// var tbody = document.getElementById('tb1');
// function listing(peminta, alamat, sembako) {
//   let trow = document.createElement('tr');
//   let td1 = document.createElement('td');
//   let td2 = document.createElement('td');
//   let td3 = document.createElement('td');
//   let td4 = document.createElement('td');

//   td1.innerHTML = ++stdNo;
//   td2.innerHTML = peminta;
//   td3.innerHTML = alamat;
//   td4.innerHTML = sembako;

//   trow.appendChild(td1);
//   trow.appendChild(td2);
//   trow.appendChild(td3);
//   trow.appendChild(td4);

//   tbody.appendChild(trow);

// }

// function getdata(theStudent) {
//   stdNo = 0;
//   tbody.innerHTML = "";
//   theStudent.forEach(element => {
//     listing(element.peminta, element.alamat, element.sembako);
//     getid(element.nik)
//   })
// }

// function showdata() {
//   ref.get()
//     .then((snapshot) => {
//       var student = [];
//       snapshot.forEach(ChildSnapshot => {
//         student.push(ChildSnapshot.val())
//       })

//       getdata(student)
//     })
// }

// function getid(userid){
//   let uid = userid
//   console.log(uid)
//   return uid
// }

let permission = Notification.permission

const input = document.getElementById('input')
console.log('clicked')
input.addEventListener("click", () => {
  if (permission === "granted") {
    showNotification();
  } else if (permission === "default") {
    requestAndShowPermission();
  } else {
    alert("Use normal alert");
  }

  function requestAndShowPermission() {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        showNotification();
      }
    });
  }

  

  function showNotification() {
    let tag = "Input Data Success";
    let title = " Data Changed";
    let icon = 'image/icon-144.png'; //this is a large image may take more time to show notifiction, replace with small size icon
    // let body = innerHTML ;
    let body = `Data Input Successfully Updated`;
    // let innerHTML = `<h2>${data[0].name.common}</h2>`;

    let notification = new Notification(title, { tag, body, icon });
    notification.onclick = () => {
      notification.close();
      window.focus('../admin.html');
    }
    setTimeout(() => notification.close(), 5 * 1000)
  }
})

// const show = document.getElementById('show')
// show.addEventListener("click", () => {
//   if (permission === "granted") {
//     showNotification();
//   } else if (permission === "default") {
//     requestAndShowPermission();
//   } else {
//     alert("Use normal alert");
//   }

//   function requestAndShowPermission() {
//     Notification.requestPermission(function (permission) {
//       if (permission === "granted") {
//         showNotification();
//       }
//     });
//   }

  

//   function showNotification() {
//     let gid = new getid
//     let tag = "PWA notification";
//     let title = " Data Changed";
//     let icon = 'image/icon-144.png'; //this is a large image may take more time to show notifiction, replace with small size icon
//     // let body = innerHTML ;
//     let body = `Someone input another data, new data is ${highid}`;
//     // let innerHTML = `<h2>${data[0].name.common}</h2>`;

//     let notification = new Notification(title, { tag, body, icon });
//     notification.onclick = () => {
//       notification.close();
//       window.focus('../admin.html');
//     }
//     setTimeout(() => notification.close(), 5 * 1000)
//   }
// })

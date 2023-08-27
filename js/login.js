import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-analytics.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxLfphXH363O2mD2Exo6NL9lsJezv1mx0",
  authDomain: "blogging-app-hakathon.firebaseapp.com",
  databaseURL: "https://blogging-app-hakathon-default-rtdb.firebaseio.com",
  projectId: "blogging-app-hakathon",
  storageBucket: "blogging-app-hakathon.appspot.com",
  messagingSenderId: "410730877490",
  appId: "1:410730877490:web:792bc1cfb06dc23d5d222b",
  measurementId: "G-LV5L0H156D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var btn = document.getElementById("loginBtn")
btn.addEventListener("click", () => {
  var email = document.getElementById("email").value
  var password = document.getElementById("pass").value
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        text: `User Signed Up !`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = '../dashboard/dashboard.html'
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      if (errorMessage === "Firebase: Error (auth/invalid-email).") {
        Swal.fire({
          text: `Invalid Email Address`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
        Swal.fire({
          text: `This email Is Not Signed Up`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/missing-password).") {
        Swal.fire({
          text: `Enter Password First`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
        Swal.fire({
          text: `Wrong Password Entered`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
})

onAuthStateChanged(auth, async (user) => {
  if (user) {
      location.replace("../dashboard/dashboard.html")
  }
})
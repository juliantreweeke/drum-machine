$(document).ready(function(){
  
  // var a = firebase.auth().createUserWithEmailAndPassword("chicken@gmail.com", "chicken").catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.log(error);
  // });
  
  // ============
  
  // Get current user: 
  var user = firebase.auth().currentUser;
  
  // but better to set up an observer:
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // $( '#userlog' ).toggleClass('show');
      console.log('signed in');
      // User is signed in.
    } else {
      console.log('not signed in');
      // No user is signed in.
    }
  });
  
  // =========
  
  //get node value, once:
  // (here for a top-level node called 'grid')
  // (nested object nodes are accessed like 'grid/childKey/anotherKey')
  firebase.database().ref('grid').once('value').then(function(snapshot) {
    var val = snapshot.val();
    debugger;
  });
  
  // set node value:
  // Arrays are potentially handled a bit weirdly in Firebase, beware!
  database.ref('grid').set([
    [false,false,false,false,false, false, false, false,false, false, false, false,false, false,false, false],[false,false,false,false,false, false, false, false,false, false, false, false,false, false,false, false]
  ]);
  
  // console.log(database.ref('grid'));
  
  
  
  
  
  
  
  
  // listen for changes to node:
  // (i.e. by other users)
  
  var gridRef = firebase.database().ref('grid');
  gridRef.on('value', function(snapshot) {
    var val = snapshot.val();
    // console.log(val);
  });
  
  // get elements
  
  var emailtext = document.getElementById('usertext');
  var passtext = document.getElementById('passtext');
  var loginbutton = document.getElementById('logbutton');
  var signupbutton = document.getElementById('signupbutton');
  
  // $('#logbutton').click(function(){
  //   alert('clicked');
  // })
  // 
  // add login event
  
  loginbutton.addEventListener("click", function(){
  
    var email = emailtext.value;
    var pass = passtext.value;
    var auth = firebase.auth();
    
    var promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch( e => console.log(e.message));
    
  });
  
  logoutbutton.addEventListener("click", function(){
    firebase.auth().signOut();
  });
  
  signupbutton.addEventListener("click", function(){
  
    var email = emailtext.value;
    var pass = passtext.value;
    var auth = firebase.auth();
    // TO DO -- CHECK FOR REAL EMAIL
    var promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch( e => console.log(e.message));
    
  });
  
  // add a realtime Listener
  
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      logoutbutton.classList.remove('hide');
    } else {
      console.log('not logged in');
      logoutbutton.classList.add('hide');
    }
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
})




/*
The code below is for a firefox extension that combats the ongoing threat
of wallet drainage. It is meant to warn users when they visit a webpage
that they will be required to sign a seaport txn when they connect
their wallets.(It is currently only adivsed to sign these txn on OpenSea only)

So if you get such a warning upon loading a site, please leave the site 
immediately. I am about to give a breifing of how the code works. 

This code will attach an action listener to the "window.onload" event,
which executes when the webpage finishes loading. The action listener
will select all buttons on the webpage using "querySelectorAll" and iterate
thorugh them all. Fore each button, it will check if the button has an 
action listener atached to it, if the button leads to a valid desitnation
on the web or not. It will then check if the user will be required to sign 
a Seaport txn when he/she clicks one of the buttons. 
If any of these conditons are met, a warning message will be displayed 
using the "alert"funciton. 

However, I need to implement the "isValidUrl" and "isSeaportTransaction"
functions to check if a Url is valid and the user is asked to sign 
a seaport txn.

Update1, i have implemented the "isValidUrl" and the "isSeaportTransaction"
functions.

Update 2, I have added the manifest.json file and have already deployed
the extension of firefox temporarily in order to test it. It works but
when i navigate to opensea it will display warning of no action listener
attached. However, i do not want that. It also does not display the warning
that i will be required to sign a seaport txn when i know for sure that i will
have to do that.
*/


// First, attach an action listener to the "window.onload" event, which will 
// execute your code as soon as the webpage has finished loading
window.addEventListener('load', function() {
  // Check if current url is opensea.io
  if (window.location.href === "https://opensea.io/"){
    // If it is, exit function
    return;
  }// Another check to test on the testnets page if this part of the code is working

  //if (window.location.href==="https://testnets.opensea.io/"){return}
  // Select all of the buttons on the page using "querySelectorAll"
  var buttons = document.querySelectorAll('button');
  
  // Iterate through the buttons
  buttons.forEach(function(button) {

    // Check if the button has an action listener attached to it
    if (!buttons.hasAttribute('onclick')) {
      // If the button does not have an action listener, display a warning message
      alert('Warning: this button does not have an action listener attached to it');
    }

    // Check if the button leads to a valid destination
    var href = button.getAttribute('href');
    if (href && !isValidUrl(href)) {
      // If the button leads to an invalid destination, display a warning message
      alert('Warning: this button leads to an invalid destination');
    }

    // Attach an action listener to the button
    button.addEventListener('click', function() {
      // Check if the user is being asked to sign a Seaport transaction
      if (isSeaportTransaction()) {
        // If the user is being asked to sign a Seaport transaction, display a warning
        // message
        alert('Warning: this button will require you to sign a Seaport transaction');
      }
    });
  });
});

// Function to check if a URL is valid
function isValidUrl(url) {
  // Create a new Headers object
  var headers = new Headers();
  // Define an options object with the headers and method
  var options = {headers: headers, method: 'HEAD'};

  // Use the fetch API to make a request to the URL
  return fetch(url, options)
    .then(function(response) {
      // If the status code is 200 OK, the URL is valid
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(function() {
      // If an error occurs, the URL is not valid
      return false;
    });
}

// Function to check if the user is being asked to sign a Seaport transaction
function isSeaportTransaction() {
  // code to check if the user is being asked to sign a Seaport transaction
  // checking for a specific classname or id present in the page or checking if the current page is a seaport transaction page


  // Check if the current page contains a specific classname indicating a seaport transaction
  if (document.querySelectorAll(".Signature request").length > 0) {
    return true;
  }
  // Check if the current page contains a specific id indicating a seaport transaction
  if (document.getElementById("Signature request")) {
    return true;
  }
  // Check if the current page is a seaport transaction page
  if (window.location.href.includes("signature.io/request")) {
    return true;
  }
  // If none of the above conditions are met, the user is not being asked to sign a Seaport transaction
  return false;
}



  
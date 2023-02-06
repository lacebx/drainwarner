# drainwarner
This code is supposed to find and warn users about what could possibly drain their wallets on said sites.
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

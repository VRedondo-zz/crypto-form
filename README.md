# crypto-form
Draft for test form criptation data

#EncryptForm
This file holds the Object that manage the logic to encrypt the form values in to a encrypted encoded URL, there are some small configurations you need to get setup before using this Object

1. Include the JS in your html
2. Execute the constructor method new EncryptForm('#formID') and send by parameter the ID of the form tag
3. Add the data-attribute data-target="true" to the anchor that is going to hold the final encoded URL to the end point

#Run Example
To run this example please run first `npm install` after that run `npm start`
the command is going to start up a server at localhost:3333, open a browser tab and browser to that direction at the page index.html

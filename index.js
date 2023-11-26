import bodyParser from 'body-parser';
import logger from 'morgan';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3100;

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('This is a short tutorial on USSD app')
});

app.post('*',(req,res) => {

    let {sessionId, servveCode, phoneNumber, text} = req.body;

    // first level response
    if( text === ""){
        let response = `
        CON Welcome to Geacon Security Services. What would you like to do?
        1. Staff Role Call
        0. Exit
        `;
    res.send(response);

    } else if( text === '1') {
        // buz logic for first level
       let response = `
       CON Staff Role Call Menu:
       1. Submit Attendance and Location
       0. Go Back to Main Menu
       `;
       res.send(response);

    } else if(text === '3') {
        let response = `END Success! Attendance marked for user ${userId} at location: ${gsmLocation}`;
        res.send(response);
    } else if(text === '0'){
        let response = `END Exiting the Staff Role Call System. Goodbye!`;
        res.send(response);

    } else if(text === '1*1'){
        const gsmLocation = getGsmLocation();
        let response = `END Success! Attendance marked for user ${userId} at location: ${gsmLocation}`;
        res.send(response);

    } else if(text === '1*0'){
        let response = `
        CON Welcome to Geacon Security Services. What would you like to do?
        1. Staff Role Call
        0. Exit
        `;
        res.send(response);
    
    } else {
        res.status(400).send('Bad request');
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})


// Simulated function to get GSM location coordinates
function getGsmLocation() {
  // Replace this with actual logic to get GSM location coordinates
  const latitude = Math.random() * 90;
  const longitude = Math.random() * 180;
  return { latitude, longitude };
}

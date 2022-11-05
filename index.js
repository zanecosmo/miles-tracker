
require("dotenv").config();
const app = require('express')();

app.get('/', (req, res) => {
    console.log("WE GOT ACTION BABY");
    res.send("HELLO THERE BUDDY");
});

app.get('/test-get', (req, res) => {
    console.log("WE GOT ACTION BABY");
    res.send("HELLO THERE BUDDY: WE SEE THAT YOU ARE TRYING TO TEST");
});

app.listen(process.env.PORT, () => console.log(`SERVER RUNNIG ON PORT ${process.env.PORT}`));
const express = require('express')
const app = express();

const port = 3000;
const cors = require('cors');
app.use(cors())
app.use(express.static(__dirname));

app.get(('/'), (req,res)=>{
   res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

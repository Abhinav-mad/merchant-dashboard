const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

app.get('/', (req, res) => res.send({ ok: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
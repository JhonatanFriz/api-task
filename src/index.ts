import 'dotenv/config';
import app from '../api/app.js';

const PORT = Number(process.env.PORT ?? 3000);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

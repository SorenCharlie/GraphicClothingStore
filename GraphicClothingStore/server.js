const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const { User } = require('./models');

app.use('/api/auth', authRoutes);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        // if we connect, create new user
        console.log('Connected to MongoDB');

        try {
            const newUSer = await User.create ({
                username: "",
                password:"",
            })

            console.log(newUSer);

        } catch (error) {
            console.log(error);
        }

    })
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

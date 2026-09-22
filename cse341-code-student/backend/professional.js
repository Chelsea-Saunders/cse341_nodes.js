const express = require('express');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');

const router = express.Router();

const professionalSchema = new mongoose.Schema({
    professionalName: String,
    base64Image: String,

    nameLink: {
        firstName: String,
        url: String
    },
    primaryDescription: String,
    workDescription1: String,
    workDescription2: String,
    linkTitleText: String, 

    linkedInLink: {
        text: String,
        link: String
    },

    githubLink: {
        text: String,
        link: String
    },
});

const Professional = mongoose.model('Professional', professionalSchema);

//read me.png and convert to base64 string
const imagePath = path.join(__dirname, 'me.png');
const base64Image = fs.readFileSync(imagePath).toString('base64');

const myData = {
    professionalName: "Chelsea Saunders", 
    base64Image: base64Image,
    nameLink: {
        firstName: "Chelsea: ",
        url: "http://example.com"
    },
    primaryDescription: "A mother of 4 and been married for 19 years",
    workDescription1: "My work first experience",
    workDescription2: "My second work experience",
    linkTitleText: "My links:",
    linkedInLink: {
        text: "LinkedIn", 
        link: "www.linkedin.com/in/chelsea-saunders-6b220a112",
    },
    githubLink: {
        text: "Github", 
        link: "https://github.com/Chelsea-Saunders/cse341_nodes.js.git"
    }
};

// insert my data once or updates if it already exists
router.post('/seed', async(req, res) => {
    try {
        const savedProfessional = await Professional.findOneAndUpdate(
            {}, 
            myData, 
            { returnDocument: 'after', upsert: true, runValidators: true }
        );

        res.status(200).json(savedProfessional);
        console.log(`Data entered has been saved.`);
    } catch (error) {
        res.status(404).json()
        console.log(`Error Message: ${error.message}`);
    }
});

router.get('/', async (req, res) => {
    try {
        const professional = await Professional.findOne();

        if (!professional) {
            console.log('No professional data has been added yet')
            return res.status(404).json();
        }

        res.status(200).json(professional);
    } catch (error) {
        console.error("Database fetch error:", error.message)
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); // returns a piece of middleware

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID is not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) { return res.status(400).send(error.details[0].message);
        
    }
    
    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    // if not existing, returning 404 (not found)
    
    //validate
    const { error } = validateCourse(req.body); // result.error
    //if invalid, return 400 error - bad request
    if (error) { return res.status(400).send(error.details[0].message)};

    // update course
    course.name = req.body.name;
    // return updated course to client
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        // shape of course object
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

app.delete('/pi/courses/:id', (req, res) => {
    // look up course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the same course
    res.send(course);
});





// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
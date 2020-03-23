const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const courses = [
    { id: 1, name: "Math" }, { id: 2, name: "Urdu" }, { id: 3, name: "English" }
]
app.get('/', (req, res) => {
    res.send('Hellow World!!!123!');
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});


app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error);
    const course = { id: courses.length + 1, name: req.body.name }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course not found");

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error);
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course not found");
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

function validateCourse(course) {
    const schma = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schma);

}

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(x => x.id === parseInt(req.params.id));
    if (!course) res.status(404).send("Course not found");
    res.send(course);
});


app.get('/posts/:year/:month', (req, res) => {
    res.send(req.params);
});
const port = process.env.port || 3000;
app.listen(port, () => { console.log(`I am Listening ${port}`) });
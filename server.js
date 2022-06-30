
require('dotenv').config()
const { app } = require('./app');

//models
const { User } = require('./models/users.model')
const { Task } = require('./models/tasks.model')

// Utils
const { db } = require('./utils/db.util');

const { PORT } = process.env

// db.sync({force: true})
// .then(()=>{
//     app.listen(PORT, () => {
//         console.log(`Running on port ${PORT}`)
//     })    
// })



db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// //Establish model´s relations
User.hasMany( Task, {foreignKey: 'userId' } );
Task.belongsTo( User );

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(PORT, () => {
	console.log('Express app running!!');
});

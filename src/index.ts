import server from './server';
import colors from 'colors';

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(colors.green.bold('Welcome to REST API!'));
    console.log(colors.green.bold(`listening on port ${port}...`));
})
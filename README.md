# Express & ES6 API Boilerplate
> Tested on Node v6 and above
> This project uses boilerplate setup from https://github.com/kylealwyn/node-rest-api-boilerplate.git

## Getting Started
First, ensure you have node and mongo installed on your system.

- Install dependencies
npm install

- Run it
npm start

- Try it!
Visit http://localhost:4567/track/list


## Below is not necessary for running, but you can connect your own MongoDB with it.
- Environment Variables
Place a `.env` file in the top level of the directory you've cloned. These variables will be automatically assigned to `process.env` when the application boots. It is gitignored by default as it's not good practice to store your environment variables in your remote repository.
Your `.env` file can look something like this:

```shell
MONGO_URI=mongodb://somewhere:27017
SESSION_SECRET=lolthisissecret
```

Now we can access one of these variables with something like `process.env.MONGO_URI`!


## License
MIT

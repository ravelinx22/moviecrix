# MovieCrix

Web app that allows users to check on latest movies. You are able to check on latest movies, upcoming movies, popular movies and more. Also you are able to see the activy related with a movie on twitter.

## Deployment

You can find the web app here https://moviecrix.herokuapp.com. If you want to run locally the project you must follow the next steps.

#### Clone the repository
```
git clone https://github.com/ravelinx22/moviecrix.git
```
#### Install dependencies
```
cd moviecrix
meteor npm install
```
#### You need to create a file named settings.json with the next information. API key from The movie database and keys from twitter API.

```
{
	"TMDBAPIKEY": "--------------------------------------",
	"TWITTER_CONSUMER_KEY": "--------------------------------------",
	"TWITTER_CONSUMER_SECRET": "--------------------------------------",
	"TWITTER_ACCESS_TOKEN_KEY": "--------------------------------------",
	"TWITTER_ACCESS_TOKEN_SECRET": "--------------------------------------"
}
```

#### Run the project
```
meteor --settings settings.json
```

The project runs in http://localhost:3000/

#### Running tests
In Windows you need to run the terminal as administrator
```
meteor test --driver-package=cultofcoders:mocha --port 3100
```

## Technologies

- Meteor
- React
- NPM
- The Movie Database API
- Twitter API


## Authors
- William Ravelo Mendez **-ravelinx22**
- Nicolas Aguilar Leon **-naguilar12**

## License
MIT



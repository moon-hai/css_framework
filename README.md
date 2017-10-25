## Stack

* [Grunt - task runner](https://gruntjs.com/)
* [jQuery 3](https://jquery.com/)
* [minireset.css](https://github.com/jgthms/minireset.css/blob/master/minireset.css)
* [SCSS - CSS preprocessor](http://sass-lang.com/)
* [ECT - template engine](http://ectjs.com/)
* [SCSS Lint](https://github.com/brigade/scss-lint)

## Browser support

* Chrome/Edge/Firefox/Safari/Opera: latest
* Internet Explorer: 9+

## Installation

### Install SASS and SCSS Lint
```
gem install sass scss_lint
```

### node and npm
```
brew install node@6
```

### Grunt - task runner
```
npm install -g grunt-cli
```

### Config npm path
```
echo 'export PATH="/usr/local/opt/node@6/bin:$PATH"' > ~/.bash_profile
source ~/.bash_profile
```

### Install dependencies
```
cd /path/to/html-starter && npm install
```

## Usage

### Start a server
```
npm run server
```

### Build scss and js files
```
grunt build
```

### Watch files change
```
grunt watch
```

### Check css style
```
npm run scss-lint
```

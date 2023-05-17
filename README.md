# MMM-LesJoiesDuCode

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

MMM-LesJoiesDuCode provides the last posts from [Les Joies Du Code](https://lesjoiesducode.fr), or [TheCodingLove](https://thecodinglove.com) (The english version).


![Demo](https://github.com/Tomadelostacos/MMM-LesJoiesDuCode/blob/master/images/demo.gif)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FTomadelostacos%2FMMM-LesJoiesDuCode.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FTomadelostacos%2FMMM-LesJoiesDuCode?ref=badge_shield)

## Using the module

To install, clone this repo into `~/MagicMirror/modules` directory. Then move in the folder and install required libraries
```
cd ~/MagicMirror/modules
git clone https://github.com/Tomadelostacos/MMM-LesJoiesDuCode
cd MMM-LesJoiesDuCode
npm install
```

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
  modules: [
    {
      module: "MMM-LesJoiesDuCode",
      position: "top_center",
      config: {
        updateInterval: 3600000,
        rotateInterval: 60000,
        grayscale: true,
        language: "fr"
      }
    }
  ]
}
```

## Configuration options


| Option           | Description
|----------------- |-----------
| `updateInterval` | *Optional* How frequently you want it to update (in ms). By default: One hour
| `rotateInterval` | *Optional* Rotate time between each GIFs (in ms). By default: 60 secs
| `grayscale`      | *Optional* Makes all GIFs black and white (Looks better i think). By default: true
| `language`       | *Optional* "fr" for French, and "en" for English By default: "fr"



## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FTomadelostacos%2FMMM-LesJoiesDuCode.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FTomadelostacos%2FMMM-LesJoiesDuCode?ref=badge_large)

# MMM-LesJoiesDuCode

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

MMM-LesJoiesDuCode provides the last post from [Les Joies Du Code](https://lesjoiesducode.fr), or [TheCodingLove](https://thecodinglove.com) (The english version). 


![Demo](https://github.com/Tomadelostacos/MMM-LesJoiesDuCode/blob/master/images/demo.gif)

## Using the module

To install, clone this repo into `~/MagicMirror/modules` directory. Then move in the folder and install required libraries
```
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
                updateInterval: 600000,
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
| `updateInterval` | *Optional* How frequently you want it to update. By default: One hour
| `grayscale`      | *Optional* Makes all GIFs black and white (Looks better i think). By default: Yep ! <br/> <br/>
| `language`       | *Optional* "fr" for French, and "en" for English By default: "en" for English <br/> <br/>


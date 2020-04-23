# Web Component Spinners
[![npm](https://img.shields.io/npm/v/wc-spinners.svg?style=popout-square)](https://www.npmjs.com/package/wc-spinners)
[![npm](https://img.shields.io/npm/l/wc-spinners.svg?style=popout-square)](https://github.com/craigjennings11/wc-spinners/blob/master/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/2280cdf4-8574-476c-9b18-3e122a32f32e/deploy-status)](https://app.netlify.com/sites/wc-spinners/deploys)


Web Component implementations of 
- [Epic Spinners](https://github.com/epicmaxco/epic-spinners) by [EpicMax](https://epicmax.co/)
- [React Spinners](https://www.react-spinners.com/) by [davidhu2000](https://github.com/davidhu2000)
- [React Spinners CSS](https://bit.dev/joshk/react-spinners-css) by [JoshK2](https://github.com/JoshK2)

## Installation

`yarn add wc-spinners`

OR

`npm i --save wc-spinners`

## Usage

### Javascript

```js
  import 'wc-spinners';
  
  const spinner = document.createElement('atom-spinner');
  document.body.append(spinner);
```

or for a specific spinner

```js
  import 'wc-spinners/dist/atom-spinner.js';

  const spinner = document.createElement('atom-spinner');
  document.body.append(spinner);
```

### HTML

```html
<body>
  <atom-spinner></atom-spinner>

  <script src="wc-spinners.js"></script>
</body>
```

or for a specific spinner

```html
<body>
  <atom-spinner></atom-spinner>

  <script src="wc-spinners/dist/atom-spinner.js"></script>
</body>
```

## Configuration

You can easily configure a spinner's display by either setting an attribute on the spinner element or by assigning a value to a corresponding css variable.

**Note**: When setting an attribute the unit is implied (e.g. size="60" becomes `60px` automatically). If you want to change the unit type, use css variables instead (`--spinner__size: 60rem`)

### Attributes

```html
<atom-spinner
  color="#ff1d5e"
  duration="1"
  size="60"
></atom-spinner>
```

### CSS Variables (CSS Custom Properties)

```html
<style>
  atom-spinner {
    --atom-spinner__color: #ff1d5e;
    --atom-spinner__duration: 1s;
    --atom-spinner__size: 60px;
  }
</style>

<atom-spinner></atom-spinner>
```

## Attribute list

### Epic Spinners

**NOTE**: `count` is not supported by css variables

Default color: `#ff1d5e`

|                            Spinner | size | duration | count |
| ---------------------------------: | :--: | :------: | :---: |
|                       atom-spinner | `60` | `1`      |
|           breeding-rhombus-spinner | `65` | `2`      |  `3`  |
|       circles-to-rhombuses-spinner | `15` | `1.2`    |
|                fingerprint-spinner | `64` | `1.5`    |
|                     flower-spinner | `70` | `2.5`    |
| fulfilling-bouncing-circle-spinner | `50` | `4`      |
|          fulfilling-square-spinner | `50` | `4`      |
|                half-circle-spinner | `60` | `1`      |
|                hollow-dots-spinner | `15` | `1`      |  `3`  |
|       intersecting-cirlces-spinner | `35` | `1.2`    |
|          looping-rhombuses-spinner | `15` | `2.5`    |
|                      orbit-spinner | `55` | `1.2`    |
|                      pixel-spinner | `70` | `2`      |
|                      radar-spinner | `60` | `2`      |
|            scaling-squares-spinner | `65` | `1.25`   |
|     self-fulfilling-square-spinner | `10` | `6`      |
|                  semipolar-spinner | `65` | `2`      |
|                     spring-spinner | `60` | `3`      |
|           swapping-squares-spinner | `65` | `1`      |
|              trinity-rings-spinner | `60` | `1.5`    |

### React Spinners

Default color: `#36d7b7`

|              Spinner | size | height | width | radius | margin |
| -------------------: | :--: | :----: | :---: | :----: | :----: |
|          bar-spinner |      | `4`    | `100` |        |
|         beat-spinner | `15` |        |       |        | `2`    |
|       bounce-spinner | `60` |
|       circle-spinner | `60` |
| climbing-box-spinner | `15` |
|         clip-spinner | `35` |
|          dot-spinner | `60` |
|         fade-spinner |      | `15`   | `5`   |  `10`  |
|         grid-spinner | `15` |        |       |        | `2`    |
|         hash-spinner | `50` |
|         moon-spinner | `60` |
|       pacman-spinner | `25` |        |       |        | `2`    |
|    propagate-spinner | `15` |
|        pulse-spinner | `15` |        |       |        | `2`    |
|         ring-spinner | `60` |
|         rise-spinner | `15` |        |       |        | `2`    |
|       rotate-spinner | `15` |        |       |        | `5`    |
|        scale-spinner |      | `35`   | `4`   |  `2`   | `2`    |
|         skew-spinner | `20` |
|       square-spinner | `50` |
|         sync-spinner | `15` |        |       |        | `2`    |

### React Spinners CSS

Default color: `#7f58af`

|              Spinner | size |
| -------------------: | :--: |
|   rsc-circle-spinner | `64` |
|      default-spinner | `80` |
|    dual-ring-spinner | `80` |
|     ellipsis-spinner | `80` |
|     facebook-spinner | `80` |
|     rsc-grid-spinner | `80` |
|        heart-spinner | `80` |
|    hourglass-spinner | `80` |
|     orbitals-spinner |      |
|     ouroboro-spinner |      |
|     rsc-ring-spinner | `80` |
|       ripple-spinner | `80` |
|       roller-spinner |      |
|      spinner-spinner |      |

## Support?
- Star the repo :star:
- Create pull requests

## License
[MIT](https://github.com/craigjennings11/wc-spinners/blob/master/LICENSE) license.

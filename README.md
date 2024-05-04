# Face Age & Gender Detection

This a Node.js package that utilizes the FacialAge API to determine the gender and approximate age of a person's face from an image.

## Installation

You can install the package via npm:
```bash
npm install age-gender-recognition
```

## Usage

To use this package, follow these steps:

1. Import the package into your Node.js application:

```javascript
const genderage = require('age-gender-recognition');
```

2. Call the `genderage` function with the ImageStream you want to analyze:

```javascript
const imagestream = fs.createReadStream('your-image.jpg');
genderage(imagestream)
  .then(result => {
    console.log('Gender:', result.gender);
    console.log('Age:', result.age);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

Replace `'your-image.jpg'` with the image you want to analyze.

3. The function will return an object containing the detected gender and age of the face in the image.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

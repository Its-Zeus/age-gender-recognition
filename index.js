const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');

const apiUrl = 'https://www.facialage.com/';

async function genderage(imageStream) {
    try {
        const response = await axios.get(apiUrl);
        const html = response.data;
        const $ = cheerio.load(html);
        const tokenValue = $('input[name="_token"]').val();
        const cook = response.headers;

        if (!tokenValue) {
            throw new Error('Token not found.');
        }

        const data = new FormData();
        //const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
        //const imageStream = imageResponse.data;

        if (!imageStream) {
            throw new Error('Image data is undefined');
        }

        data.append('_token', tokenValue);
        data.append('face', imageStream);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl,
            headers: {
                'Cookie': cook['set-cookie'],
                ...data.getHeaders()
            },
            data: data
        };

        const apiResponse = await axios.request(config);
        const dat = apiResponse.data;
        const $parsed = cheerio.load(dat);
        const ageRegex = /Your face age is: (\d+) years old/;
        const match = $parsed('li.entry__meta-slack').text().replace('Gender:', '').trim();
        const match1 = $parsed('h4.entry__title').text().match(ageRegex);

        if (!match1 || !match1[1] || !match) {
            console.log('No face found');
            return { gender: null, age: null };
        }

        const theage = match1[1];
        const thegender = match;
        return { gender: thegender, age: theage };
    } catch (error) {
        console.error('Error:', error.message);
        return { gender: null, age: null };
    }
}

module.exports = genderage;
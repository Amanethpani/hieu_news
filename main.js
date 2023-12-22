const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');

const previousArticles = [];
const options = {
  url: 'https://www.hirunews.lk',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
  }
};

// test

const checkForNewArticles = () => {
  request(options, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      let articles = [];
      let i = 0;
      // select only the 3rd article on the page
      $('.col-md-6').each((index, element) => {
        if (i == 2) {
          const title = $(element).find('a').text();
          const link = $(element).find('a').attr('href');
          const summary = $(element).find('p').text();
          const image_link = $(element).find('img').attr('data-src');
          const image = $(element).find('img').attr('src');


          articles.push({ title, link, summary, image_link, image });

          // check if the article is new

          // if start
          //if (!previousArticles.some(a => a.title === title && a.link === link)) {
           // console.log(articles[0]);

           async function getFullNews(link) {
            const fullNews = await getFullNewsFromUrl(link);
                 const inputString = `${title}`
                 const newstitle = inputString.replace("Read More..", "*");
                 const input = `${fullNews}`
                 //const newsout = input.replace('<div id="taboola-mid-article-thumbnails"></div>', '');
                 const newsartical = input.replace('<div id="taboola-mid-article-thumbnails"></div>', '').replace(/<br><br>/g, " ").replace(/<br><br><em><strong>/g, " ").replace('</strong></em> <br><br></br>', " ").replace('</strong></em><br><em><strong>', " ").replace('</strong></em><br><em><strong>', " ");

          }

          getFullNews(link);

          
          async function getFullNewsFromUrl(url) {
            const response = await axios.get('https://www.hirunews.lk/' + encodeURIComponent(url.split('.lk/')[1]));
            const $ = cheerio.load(response.data);
            return $('div[id="article-phara"]').html().split('<script')[0].trim();

          }
            previousArticles.push(articles[0]);
          
        
        //if finished
        //}
        }
        i++;
      });
    } else {
      console.log(`Error: ${error}`);
      console.log(`Status code: ${response.statusCode}`);
    }
  });
};


//checkForNewArticles()
setInterval(checkForNewArticles, 3*1000);

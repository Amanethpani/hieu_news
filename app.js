const request = require('request');
const cheerio = require('cheerio');
const axios = require ('axios')
const options = {
    url: 'https://www.hirunews.lk',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    }
  };
  
  request(options, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const articles = [];
      let i=0;
      // select only the 3rd article on the page
      $('.col-md-6').each((i, element) => {
        if(i==2)
        {
        
          const title = $(element).find('a').text();
          const link = $(element).find('a').attr('href');
          const summary = $(element).find('p').text();
          const image_link = $(element).find('img').attr('data-src');
          const image = $(element).find('img').attr('src');
  
          articles.push({ title, link, summary, image_link,image });
          console.log(articles[0]);
          const parts = link.split('/');
            const desiredPart = parts[parts.length - 2];
            console.log(desiredPart);
        }
        i++;
      
    
        async function getFullNews(link) {
            const fullNews = await getFullNewsFromUrl(link);
                 const inputString = `${title}`
                 const newstitle = inputString.replace("Read More..", "*");
                 const input = `${fullNews}`
                 //const newsout = input.replace('<div id="taboola-mid-article-thumbnails"></div>', '');
                 const newsartical = input.replace('<div id="taboola-mid-article-thumbnails"></div>', '').replace(/<br><br>/g, " ").replace(/<br><br><em><strong>/g, " ").replace('</strong></em> <br><br></br>', " ").replace('</strong></em><br><em><strong>', " ").replace('</strong></em><br><em><strong>', " ");
    
          }
    
          async function getFullNewsFromUrl(url) {
            const response = await axios.get('https://www.hirunews.lk/' + encodeURIComponent(url.split('.lk/')[1]));
            const $ = cheerio.load(response.data);
            return $('div[id="article-phara"]').html().split('<script')[0].trim();
    
          }
    
    
    
    
    
    
    
    });
      




    } else {
      console.log(`Error: ${error}`);
      console.log(`Status code: ${response.statusCode}`);
    }
  });
  
const rp = require('request-promise');
const $ = require('cheerio');
const sitemap = process.argv[2];
const searchTerm = process.argv[3];
const index = sitemap.split('.com')[0] + '.com';


function parseSite(extention){
  //parse each page and pull out the p tags in each page.
  rp(index + extention)
  .then(function(html){
    console.log('***************************');
    console.log('Parsing ' + extention );
    let parsedText = $('p', html).text();

    //split each block of text into an array
    // iterate over the array looking for the word
    let parsedArray = parsedText.split(' ')
    parsedArray.forEach(function(word) {
      if(word == searchTerm){
        console.log('word found in  ' + extention );
        console.log(word)
      }
    })

  })
  .catch(function(err){
  });
}

function Runner(startingURL){
  //Start off by getting the url from the CLI argument,
  // grab all the links from the sitemap page
  //iterate over array to parse information
  rp(startingURL)
  .then(function(html){
    var siteURls = $('.site_map_category > li > a', html);
    var siteURlsSize = ($('.site_map_category > li > a', html).length );
    for(var i = 0; i < siteURlsSize; i++){
      parseSite(siteURls[i].attribs.href)
    }
  })
  .catch(function(err){
  });
}

Runner(sitemap)

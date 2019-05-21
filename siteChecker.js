const rp = require('request-promise');
const $ = require('cheerio');
const url = 'http://wolfriver.infostarproductions.com/sitemap_page/';

rp(url)
  .then(function(html){
    //success!
    var siteURls = $('.site_map_category > li > a', html);
    var siteURlsSize = ($('.site_map_category > li > a', html).length );
    for(var i = 0; i < siteURlsSize; i++){
      console.log(siteURls[i].attribs.href);
    }
  })
  .catch(function(err){
    //handle error
  });

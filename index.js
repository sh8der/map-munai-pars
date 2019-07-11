var readline = require('linebyline');
var rl = readline('./map-data.js');
var fs  = require('fs');

var data = [];
var secondLine = false;
var i = 0;

var lr = rl.on('line', function(line, lineCount, byteCount) {
    var findStringIndex = line.search(/contentString\d{1,3}/i);
    var lineLength = line.length;
    if ( findStringIndex != -1) {
      
      if (findStringIndex === 4) {
        data.push({
          'desc': line.substring(23, lineLength - 2)
        });
        
        secondLine = false;
      
      } else if ( findStringIndex === 13 ) {
      
        data[i].desc += line.substring(32, lineLength - 1)
        i++
        secondLine = true;

      }
    }
    if ( secondLine ) {
      
      var findStringIndex = line.search(/icon\:/i);
      if (findStringIndex === 4) {
        data[i - 1].iconType = line.substring(10, lineLength - 1)
      }

      var findStringIndex = line.search(/title\:/i);
      if (findStringIndex === 4) {
        data[i - 1].title = line.substring(12, lineLength - 2)
      }

    }
})
.on('error', function(e) {
 console.log(e);
})
.on('end', function (e) {

  var json = JSON.stringify(data);
  fs.writeFile('myjsonfile.json', json, 'utf8', function(){});

});

var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
        botRegex = /^\/cool guy/; botRegexOW = /^\/ratings/; botRegexSalt = /^\/salt/; botRegexSDL = /^\/SDL/i;  botRegexFour = /^\/4th/i;
        botRegexJN = /^\/trade/; botRegexRules = /^\/rules/; botODB = /(.*\s+)(.*odb)(\s+.*)/i; 
        botDuck = /^\/duck/; botRegexP = /^\/PDL/i;  botRegexTw = /^\/twitch/i;
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }
  else if(request.text && botRegexOW.test(request.text)) {
    this.res.writeHead(200);
    postMessage("www.daddyleagues.com/maddenrating/");
    this.res.end();
  } 
  else if(request.text && botRegexSalt.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.imgur.com/B5BSVqH.png");
    this.res.end();
  } 
  else if(request.text && botRegexFour.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.groupme.com/1430x1102.png.cf3f5ba64ceb45dfb305a82cc3c39066.large");
    this.res.end();
  } 
  else if(request.text && botRegexJN.test(request.text)) {
    this.res.writeHead(200);
    postMessage("To Submit a Trade click: https://goo.gl/forms/6Jelu8s4PaZvWqZT2");
    this.res.end();
  }
  else if(request.text && botRegexRules.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://docs.google.com/document/d/1592OKl5dxzIlVVDUzwPGWfawb93H-1ovZ7LVnNxsigk/edit");
    this.res.end();
  } 
  else if(request.text && botRegexP.test(request.text)) {
    this.res.writeHead(200);
    var req = request.text.substring(5,request.text.length);
    var rep = req.replace(/ /,"+");
    postMessage("http://www.daddyleagues.com/TLOA/players?name="+rep+"&position=all&team=all");
    
    this.res.end();
  }  
    else if(request.text && botRegexSDL.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/TLOA/team/"+request.text.substring(5,8)+"/schedule");
    this.res.end();
  } 
  
  else if(request.text && botRegexTw.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.twitch.tv/"+request.text.substring(8,request.text.length));
    this.res.end();
  }  
  else if(request.text && botODB.test(request.text)) {
    this.res.writeHead(200);
    postMessage("OBJ*");
    this.res.end();
  } 
  else if(request.text && botDuck.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://media3.giphy.com/media/YCseTHF2I6CCA/giphy.gif");
    this.res.end();
  } 
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;

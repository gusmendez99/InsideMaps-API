const expect = require('chai').expect;
const nock = require('nock');
const request = require('superagent')

//TEST TO GET A MAP
var getMap = function(mapId, callback){
  request
  .get(`https://inside-maps-api.herokuapp.com/api/v1/map/${mapId}`)
  .end(function(error,  res){
    if(!error){
      let maps = res.body.map(function(map){
        return map
      });
      callback(null,maps);
    }else{
      callback('Error Ocurred');
    }
  })
}

describe('GET map', function(){
  beforeEach(function(){
    let mapResponse = [{
      "message": "Map retrieved successfully",
      "result": {
          "_id": "5f41473baea6570024e0e8bf",
          "name": "apartamentos 101",
          "description": "Edificio de apartamentos mapa oficial",
          "id_place": "16fsd78sd77f",
          "level": 1,
          "year": 1,
          "location": {
              "coordinates": [
                  -90.51865405575928,
                  14.58571205294565
              ],
              "type": "Point"
          },
          "active": true,
          "graph": {
              "1": {
                  "2": 0.538,
                  "3": 3.579,
                  "4": 3.96
              },
              "2": {
                  "1": 0.538,
                  "16": 3.228
              },
              "3": {
                  "1": 3.579,
                  "6": 0.59
              },
              "4": {
                  "1": 3.96,
                  "5": 2.567
              },
              "5": {
                  "4": 2.567
              },
              "6": {
                  "3": 0.59,
                  "7": 1.24
              },
              "7": {
                  "6": 1.24,
                  "8": 1.488,
                  "9": 1.238,
                  "10": 1.238,
                  "11": 1.539
              },
              "8": {
                  "7": 1.488
              },
              "9": {
                  "7": 1.238
              },
              "10": {
                  "7": 1.238
              },
              "11": {
                  "7": 1.539,
                  "12": 1.205,
                  "13": 1.252,
                  "14": 1.692,
                  "15": 1.895
              },
              "12": {
                  "11": 1.205
              },
              "13": {
                  "11": 1.252
              },
              "14": {
                  "11": 1.692
              },
              "15": {
                  "11": 1.895
              },
              "16": {
                  "2": 3.228,
                  "17": 1.205
              },
              "17": {
                  "16": 1.205,
                  "18": 3.6982
              },
              "18": {
                  "17": 3.6982,
                  "19": 1.141,
                  "20": 0.59
              },
              "19": {
                  "18": 1.141,
                  "31": 3.2729
              },
              "20": {
                  "18": 0.59,
                  "21": 1.598,
                  "22": 2.11
              },
              "21": {
                  "20": 1.598,
                  "22": 1.397
              },
              "22": {
                  "20": 2.11,
                  "21": 1.397,
                  "23": 2.764,
                  "24": 1.978,
                  "25": 3.319
              },
              "23": {
                  "22": 2.764,
                  "24": 2.06
              },
              "24": {
                  "22": 1.978,
                  "23": 2.06
              },
              "25": {
                  "22": 3.319,
                  "26": 0.641,
                  "27": 0.69,
                  "28": 3.396
              },
              "26": {
                  "25": 0.641
              },
              "27": {
                  "25": 0.69
              },
              "28": {
                  "25": 3.396,
                  "29": 0.641,
                  "30": 0.59
              },
              "29": {
                  "28": 0.641
              },
              "30": {
                  "25": 0.59
              },
              "31": {
                  "19": 3.2729,
                  "32": 1.205
              },
              "32": {
                  "31": 1.205,
                  "33": 3.6982
              },
              "33": {
                  "32": 3.6982,
                  "34": 0.59
              },
              "34": {
                  "33": 0.59,
                  "35": 1.598,
                  "36": 2.11
              },
              "35": {
                  "34": 1.598,
                  "36": 1.397
              },
              "36": {
                  "34": 2.11,
                  "35": 1.397,
                  "37": 2.764,
                  "38": 1.978,
                  "39": 3.319
              },
              "37": {
                  "36": 2.764,
                  "38": 2.06
              },
              "38": {
                  "36": 1.978,
                  "37": 2.06
              },
              "39": {
                  "36": 3.319,
                  "40": 0.641,
                  "41": 0.69,
                  "42": 3.396
              },
              "40": {
                  "39": 0.641
              },
              "41": {
                  "39": 0.69
              },
              "42": {
                  "39": 3.396,
                  "43": 0.641,
                  "44": 0.59
              },
              "43": {
                  "42": 0.641
              },
              "44": {
                  "42": 0.59
              }
          },
          "__v": 0
      }
  }];

  nock('https://inside-maps-api.herokuapp.com')
  .get('/api/v1/map/5f41473baea6570024e0e8bf')
  .reply(200, mapResponse)
  });

  it('returns maps with id 5f41473baea6570024e0e8bf', function(done){
    const mapId = '5f41473baea6570024e0e8bf'
    getMap(mapId, function(err,map){
      expect(Array.isArray(map)).to.equal(true)
    })
    done()
  })
})

//TEST LOGING
const getLoging = function(email,password ,callback){
    request
    .get(`https://inside-maps-api.herokuapp.com/api/v1/auth/signin/`)
    .end(function(error,  res){
      if(!error){
        let maps = res.body.map(function(map){
          return map
        });
        callback(null,maps);
      }else{
        callback('Error Ocurred');
      }
    })
  }

  describe('Post logging', function(){
    beforeEach(function(){
      let signinResponse ={
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1c0BnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZWEzYjQyMmRkMDQ3MTUyMThjMDZkOWUiLCJyb2xlIjoyLCJpYXQiOjE1OTk1ODUzMjIsImV4cCI6MTU5OTU4ODkyMn0.fnQUlxlj-h5SsBoAtuFdhLwzn44ojreyeTakdMtvUqM",
            "expiresIn": 3600,
            "_id": "5ea3b422dd04715218c06d9e"
        }
  
    nock('https://inside-maps-api.herokuapp.com')
    .get('/api/v1/auth/signin/',{email:'gus@gmail.com', password:'12345'})
    .reply(200, signinResponse)
    });
  
    it('returns logging of user gus@gmail.com', function(done){
      const email = 'gus@gmail.com'
      const password = '12345'
      getLoging(email,password ,function(err,user){
        expect(Array.isArray(user)).to.equal(false)
      })
      done()
    })
  })
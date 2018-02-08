const Counter = require('../../models/Counter');
const request = require('request');
const axios = require('axios');
module.exports = (app) => {
  app.get('/foods', async (req, res, next) => {
  //   request('https://api.nal.usda.gov/ndb/reports/?format=jsonp&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&ndbno=beans&type=f', (err, response, body) => {
  //   console.log('body', body)
  //  })
  //const encodedURI = window.encodeURI(`https://api.nal.usda.gov/ndb/reports/?format=jsonp&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&ndbno=beans&type=f`)
     
      // .then((response) => {
      //     console.log('response', response)
      //     });

      try {
        const user = await axios.get(`https://api.nal.usda.gov/ndb/reports/?format=jsonp&api_key=Uexsdv07ZLPp9MU9LUtJQ5iEgASowWwa6s1yEcI8&ndbno=beans&type=f`)
        res.json(user);
      } catch (e) {
        //this will eventually be handled by your error handling middleware
        throw e; 
      }
  });

  app.get('/api/counters', (req, res, next) => {
    Counter.find()
      .exec()
      .then((counter) => res.json(counter))
      .catch((err) => next(err));
  });

  app.post('/api/counters', function (req, res, next) {
    const counter = new Counter();

    counter.save()
      .then(() => res.json(counter))
      .catch((err) => next(err));
  });

  app.delete('/api/counters/:id', function (req, res, next) {
    Counter.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((counter) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/counters/:id/increment', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count++;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/counters/:id/decrement', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count--;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};

const request = require('supertest');
const express = require('express');

const app =  require('../express/app');

request(app)
  .get('./movies?page=a')
  .expect('Content-Type', /json/)
  .expect(500)
  .end(function(err, res) {
    if (err) throw err;
  });
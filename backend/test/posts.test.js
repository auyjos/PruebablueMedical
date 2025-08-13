/* eslint-disable no-unused-expressions */
/**
 * Posts API Integration Tests
 * Tests for the posts endpoints
 */

import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/app.js'

chai.use(chaiHttp)
const { expect } = chai

describe('Posts API', () => {
  describe('GET /api/posts', () => {
    it('should return posts data with success status', (done) => {
      chai.request(app)
        .get('/api/posts')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('array')
          expect(res.body).to.have.property('meta')
          expect(res.body.meta).to.have.property('count')
          expect(res.body.meta).to.have.property('timestamp')
          done()
        })
    }).timeout(10000)

    it('should return filtered posts when name parameter is provided', (done) => {
      chai.request(app)
        .get('/api/posts?name=Luke')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.be.an('array')
          expect(res.body.meta).to.have.property('filter', 'Luke')
          done()
        })
    }).timeout(10000)

    it('should return 400 error for invalid name parameter', (done) => {
      chai.request(app)
        .get('/api/posts?name[]=invalid')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('error', 'Bad Request')
          done()
        })
    })
  })

  describe('GET /api/posts/stats', () => {
    it('should return posts statistics', (done) => {
      chai.request(app)
        .get('/api/posts/stats')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.have.property('totalUsers')
          expect(res.body.data).to.have.property('totalPosts')
          expect(res.body.data).to.have.property('averagePostsPerUser')
          done()
        })
    }).timeout(10000)
  })

  describe('GET /api/health', () => {
    it('should return health check status', (done) => {
      chai.request(app)
        .get('/api/health')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('message', 'API is running')
          expect(res.body).to.have.property('timestamp')
          expect(res.body).to.have.property('uptime')
          done()
        })
    })
  })

  describe('GET /api', () => {
    it('should return API documentation', (done) => {
      chai.request(app)
        .get('/api')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('success', true)
          expect(res.body).to.have.property('endpoints')
          done()
        })
    })
  })

  describe('404 Error Handling', () => {
    it('should return 404 for non-existent routes', (done) => {
      chai.request(app)
        .get('/api/nonexistent')
        .end((err, res) => {
          if (err) return done(err)
          expect(res).to.have.status(404)
          expect(res.body).to.have.property('error', 'Not Found')
          done()
        })
    })
  })
})

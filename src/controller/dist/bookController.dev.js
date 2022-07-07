"use strict";

var bookModel = require('../model/bookModel');

var createBook = function createBook(req, res) {
  var data, newBook;
  return regeneratorRuntime.async(function createBook$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          data = req.body;

          if (!data) {
            _context.next = 9;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(bookModel.create(data));

        case 5:
          newBook = _context.sent;
          res.status(201).send({
            status: true,
            data: newBook
          });
          _context.next = 10;
          break;

        case 9:
          res.status(400).send({
            status: false,
            message: "No Data Found"
          });

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            status: false,
            Error: _context.t0
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

module.exports.createBook = createBook;

var getBook = function getBook(req, res) {
  var condition, books, _books;

  return regeneratorRuntime.async(function getBook$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          condition = req.query;

          if (!condition) {
            _context2.next = 9;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(bookModel.find(condition, {
            _id: 1,
            title: 1,
            excerpt: 1,
            userId: 1,
            category: 1,
            releasedAt: 1,
            reviews: 1
          }));

        case 5:
          books = _context2.sent;

          if (books) {
            res.status(200).send({
              status: true,
              data: books
            });
          } else {
            res.status(404).send({
              status: false,
              message: "No Data Found"
            });
          }

          _context2.next = 14;
          break;

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bookModel.find({
            isDeleted: false
          }, {
            _id: 1,
            title: 1,
            excerpt: 1,
            userId: 1,
            category: 1,
            releasedAt: 1,
            reviews: 1
          }));

        case 11:
          _books = _context2.sent;

          if (_books) {
            res.status(200).send({
              status: true,
              data: _books
            });
          }

          res.status(404).send({
            status: false,
            message: "No Data Exist"
          });

        case 14:
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send({
            status: false,
            Error: _context2.t0
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};
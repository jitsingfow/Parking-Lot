var fs = require('fs');


var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();


var server = require('../app');
var utils = require('../config/utils');


var commands = [];
var parkingCapacity;
var parkingLotArray = [];

describe('Basic Mocha String Test', function () {
    it('Read test input', function (done) {
        fs.readFile('./input.txt', 'utf-8', function (err, data) {
            if (err) {
                throw "Unable to read file";
            }
            commands = JSON.parse(JSON.stringify(data)).split("\n");
            done();
        });
    });
});


describe("Testing Functions", function () {
    
    it('Create a Parking lot - with invalid input', function (done) {
        parkingCapacity = utils.create_parking_lot('create_parking_lot x');
        assert.equal(parkingCapacity, false);
        done();
    });

    it('Create a Parking lot', function (done) {
        parkingCapacity = utils.create_parking_lot(commands[0]);
        for (var i = 0; i < parkingCapacity; i++) {
            var obj = new Object();
            obj[parseInt(i)] = null;
            parkingLotArray.push(obj);
        }
        assert.equal(parkingCapacity, 6);
        done();
    });

    it('Allocating Parking to User 1', function (done) {
        var slotNumber = utils.park(parkingCapacity, parkingLotArray, commands[1]);
        assert.equal(slotNumber, 1, 'these numbers are equal');
        done();
    });

    it('Allocating Parking to User 2', function (done) {
        var slotNumber = utils.park(parkingCapacity, parkingLotArray, commands[2]);
        assert.equal(slotNumber, 2, 'these numbers are equal');
        done();
    });

    it('Allocating Parking to User 3', function (done) {
        var slotNumber = utils.park(parkingCapacity, parkingLotArray, commands[3]);
        assert.equal(slotNumber, 3, 'these numbers are equal');
        done();
    });

    it('Allocating Parking to User 4', function (done) {
        var slotNumber = utils.park(parkingCapacity, parkingLotArray, commands[4]);
        assert.equal(slotNumber, 4, 'these numbers are equal');
        done();
    });

    it('Allocating Parking to User 5', function (done) {
        var slotNumber = utils.park(parkingCapacity, parkingLotArray, commands[5]);
        assert.equal(slotNumber, 5, 'these numbers are equal');
        done();
    });

    it('Allocating Parking to User 6', function (done) {
        var slotNumber = utils.park(parkingCapacity, parkingLotArray, commands[6]);
        assert.equal(slotNumber, 6, 'these numbers are equal');
        done();
    });

    it('Leaving from slot 4', function (done) {
        var slotNumber = utils.leave(parkingCapacity, parkingLotArray, commands[7]);
        assert.equal(slotNumber, 4);
        done();
    });

    it('Leaving from slot 4 when empty', function (done) {
        var slotNumber = utils.leave(parkingCapacity, parkingLotArray, commands[7]);
        assert.equal(slotNumber, -1);
        done();
    });

    it('Checking status', function (done) {
        var slotNumber = utils.status(parkingCapacity, parkingLotArray);
        assert.equal(slotNumber.length, 6);
        done();
    });

    it('Allocating Parking to User 7. Should Reallocate the nearest empty postion 4', function (done) {
        var slotNumber = utils.park(parkingCapacity, parkingLotArray, commands[9]);
        assert.equal(slotNumber, 4);
        assert.notEqual(slotNumber, 7);
        done();
    });

    it('Allocating Parking to User 8. Should indicate Parking is full.', function (done) {
        var slotNumber = utils.park(parkingCapacity, parkingLotArray, commands[10]);
        assert.equal(slotNumber, null);
        assert.notEqual(slotNumber, 8);
        done();
    });

    it('Registeration no. for cars with white color', function (done) {
        var slotNumber = utils.registration_numbers_for_cars_with_colour(parkingCapacity, parkingLotArray, commands[11]);
        assert.equal(slotNumber[0], 'KA-01-HH-1234');
        assert.equal(slotNumber[1], 'KA-01-HH-9999');
        assert.equal(slotNumber[2], 'KA-01-P-333');
        done();
    });

    it('Slot no. for cars with white color', function (done) {
        var slotNumber = utils.slot_numbers_for_cars_with_colour(parkingCapacity, parkingLotArray, commands[12]);
        assert.equal(slotNumber[0], 1);
        assert.equal(slotNumber[1], 2);
        assert.equal(slotNumber[2], 4);
        done();
    });

    it('Slot no. for registration no. KA-01-HH-3141', function (done) {
        var slotNumber = utils.slot_number_for_registration_number(parkingCapacity, parkingLotArray, commands[13]);
        assert.equal(slotNumber, 6);
        done();
    });

    it('Slot no. for registration no. MH-04-AY-1111', function (done) {
        var slotNumber = utils.slot_number_for_registration_number(parkingCapacity, parkingLotArray, commands[14]);
        assert.equal(slotNumber, 'Not found');
        done();
    });

});
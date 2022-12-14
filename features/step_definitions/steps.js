const { Given, When, Then, Before } = require('@cucumber/cucumber')
const { assertThat, contains, is, not } = require('hamjest')
const assert = require('assert')

const { Person, Network } = require('../../src/shouty')

const default_range = 100

Before(function () {
  this.people = {}
  this.network = new Network(default_range)
})

Given('the range is {int}', function (range) {
  this.network = new Network(range)
})


Given('people are located at', function (dataTable) {
  dataTable.transpose().hashes().map((person) => {
    this.people[person.name] = new Person(this.network, person.location)
  })
});

Given('a person named {word}', function (name) {
  this.people[name] = new Person(this.network, 0)
})

When('Sean shouts', function () {
  this.people['Sean'].shout('Hello, World')
})


When('Sean shouts {string}', function (message) {
  this.people['Sean'].shout(message)
  this.messageFromSean = message
})

When('Sean shouts the following message', function (message) {
  this.people['Sean'].shout(message)
  this.messageFromSean = message
})

Then('Lucy should hear a shout', function () {
  assertThat(this.people['Lucy'].messagesHeard().length, is(1))
})

Then('Lucy should hear Sean\'s message', function () {
  assertThat(this.people['Lucy'].messagesHeard(), contains(this.messageFromSean))
})

Then('Larry should not hear Sean\'s message', function () {
  assertThat(this.people['Larry'].messagesHeard(), not(contains(this.messageFromSean)))
})

Then('{word} should not hear a shout', function (name) {
  assertThat(this.people[name].messagesHeard().length, is(0))
})

Then('Lucy hears the following messages:', function (expectedMessages) {
  let actualMessages = this.people['Lucy'].messagesHeard().map(message => [message])
  assert.deepEqual(actualMessages, expectedMessages.raw())
});


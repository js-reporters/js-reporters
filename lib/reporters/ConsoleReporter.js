module.exports = class ConsoleReporter {
  constructor (runner, options = {}) {
    // Cache references to console methods to ensure we can report failures
    // from tests tests that mock the console object itself.
    // https://github.com/js-reporters/js-reporters/issues/125
    this.log = options.log || console.log.bind(console);

    runner.on('error', this.onError.bind(this));
    runner.on('runStart', this.onRunStart.bind(this));
    runner.on('testStart', this.onTestStart.bind(this));
    runner.on('testEnd', this.onTestEnd.bind(this));
    runner.on('runEnd', this.onRunEnd.bind(this));
  }

  static init (runner) {
    return new ConsoleReporter(runner);
  }

  onError (error) {
    this.log('error', error);
  }

  onRunStart (runStart) {
    this.log('runStart', runStart);
  }

  onTestStart (test) {
    this.log('testStart', test);
  }

  onTestEnd (test) {
    this.log('testEnd', test);
  }

  onRunEnd (runEnd) {
    this.log('runEnd', runEnd);
  }
};

import WebConsoleReporter from './reporter';
import {ReporterFactory} from './reporter-base';

function ignorePromiseFailure(promise){
  return promise.catch(() => Promise.resolve(null));
}

export default class EmbeddedMocha {
  static runningPromise = Promise.resolve(null);
  constructor(config = {ui: 'bdd', Reporter: WebConsoleReporter}) {
    this.config = config;
    this.Reporter = config.Reporter;
    delete config.Reporter;
  }

  run(testCase){
    let newTestCasePromise = ignorePromiseFailure(EmbeddedMocha.runningPromise)
    .then(() => {
      let reporterInst = ReporterFactory.create(this.Reporter);
      let {reporter, promise} = reporterInst.get();
      reporter = reporter.bind(reporterInst);
      let config = Object.assign(this.config, {reporter});
      mocha.suite.suites = [];
      mocha.setup(config);
      testCase();
      mocha.run();
      return promise;
    });

    EmbeddedMocha.runningPromise = ignorePromiseFailure(newTestCasePromise);
    return newTestCasePromise;
  }
}

const packageJson = require('../../../package.json');
const fs = require('fs');
const { promiseReduce } = require('./asks/utils');
const asks = require('./asks');

// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//

module.exports = {
  prompt: async (options) => {
    let localConfig = {};
    try {
      localConfig = require('../../../local_config/in.json');
      // const jsonStr = fs.readFileSync('local_config/in.json', 'utf8');
      // localConfig = JSON.parse(jsonStr);
    } catch (error) {
      console.error('fail to load local config :', error);
    }
    
    const { prompter, args: a } = options;
    // console.log('args :', a);

    // await prompter.prompt({
    //   type: 'input',
    //   name: 'projectName',
    //   message: 'what is the project name?',
    // });

    const result = await promiseReduce(asks, async (config, ask, i) => ({
      ...config,
      ...await ask(options, { config, localConfig, step: i + 1 }),
    }), {
      project: {
        name: packageJson.name,
      },
    })

    console.log('config :', JSON.stringify(result, null, 2));

    result.json = {
      in: JSON.stringify(localConfig, null, 2),
      out: JSON.stringify(result, null, 2),
    };
    return result;
  },
}

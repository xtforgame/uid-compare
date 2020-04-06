const { promiseReduce } = require('./utils');

// {
//   name: 'name',
//   message: 'Project Name',
//   initial: (config.project && config.project.name),
//   editable: true,
//   validate(value, state) {
//     // console.log('state :', state);
//     if (!value) {
//       this.error = 'Invalid Project Name';
//       return false;
//     }
//     this.error = void 0;
//     return true;
//   },
// },

module.exports = async ({ prompter, args }, { localConfig, config, step }) => {
  const choices = []
  const project =  {
    ...localConfig.project,
    ...config.project,
  };
  if (!project.safename) {
    choices.push({
      name: 'safename',
      message: 'Project Safe Name',
      initial: (config.project && config.project.name),
      editable: true,
      validate(value, state) {
        // console.log('state :', state);
        if (!value) {
          this.error = 'Invalid Project Safe Name';
          return false;
        }
        let letters = /^[A-Za-z]{1}[A-Za-z0-9]*$/;
        if (!value.match(letters)) {
          this.error = 'Invalid Project Safe Name';
          return false;
        }
        this.error = void 0;
        return true;
      },
    });
  }

  if (choices.length === 0) {
    return {
      project,
    }
  }
  return {
    project: {
      ...project,
      ...(await prompter.prompt({
        type: 'editable',
        name: 'project',
        message: `${step}. Project Config:`,
        choices,
      })).project,
    },
  };
}

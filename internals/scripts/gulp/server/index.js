import clean from './clean';
import build from './build';
import serve from './serve';
import watch from './watch';

const children = {
  clean,
  build,
  serve,
  watch,
};

export default {
  childList: [
    'clean',
    'build',
    'serve',
    'watch',
  ],
  children,
  addTasks(gulpConfig) {
    this.childList.map(key => this.children[key].addTasks && this.children[key].addTasks(gulpConfig));
  },
};

import React from 'react';
import Button from 'material-ui/Button';
import EmbeddedMocha from '~/embedded-tests/embedded-mocha';
import testCase00 from '~/test-cases/test-case-00';

const style = {
  margin: 12,
};

export default class RequestTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {windowWidth: window.innerWidth};
    // console.log(this.props.location.pathname);

    this.ebdMocha = new EmbeddedMocha();
  }

  run = () => {
    this.ebdMocha.run(testCase00);
  };

  render(){
    return (
      <div>
        <Button
          dense
          color="primary"
          onTouchTap={this.run}
        >
          Run
        </Button>
      </div>
    );
  }
}

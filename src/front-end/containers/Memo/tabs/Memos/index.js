/* eslint-disable no-console */
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import FlipMove from 'react-flip-move';
import MemoCard from './MemoCard';

import modelMap from '~/containers/App/modelMap';


const {
  makeDefaultMemoCollectionSelector,
} = modelMap.selectors;

const styles = theme => ({
});

class Memos extends React.PureComponent {
  render() {
    const { memos } = this.props;

    return (
      <div>
        <FlipMove>
          {(memos || []).map(memo => (
            <MemoCard
              key={memo.id}
              memo={memo}
            />
          ))}
        </FlipMove>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  memos: makeDefaultMemoCollectionSelector(),
});

export default compose(
  connect(
    mapStateToProps,
    {},
  ),
  withStyles(styles),
)(Memos);

/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { FormTextField, FormSpace } from 'azrmui/core/FormInputs';

import NodeContentRenderer from '../shared/NodeContentRenderer';
import PlaceholderRenderer from '../shared/PlaceholderRenderer';

import '../shared/styles.css';
// import 'react-sortable-tree/style.css';
import '../shared/rst-style.css';

const useStyles = makeStyles(theme => ({
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

const RstBasic = (props) => {
  const classes = useStyles();

  const {
    value: treeData,
    onChange: setTreeData,
    containerProps,
    nodeProps,

    getNodeKey,
    generateNodeProps: gnp = ({ node }, nodeProps) => node.title,
    searchFinishCallback: sfc = () => {},
    searchMethod,

    nodeContentRenderer = NodeContentRenderer,
    placeholderRenderer = PlaceholderRenderer,

    searchQuery,
    searchFocusOffset,
    onSearchQueryChange: setSearchQuery,
    onSearchFocusOffsetChange: setSearchFocusOffset,
  } = props;

  const previousSearchQuery = useRef(searchQuery);
  const [matches, setMatches] = useState('');

  const generateNodeProps = args => gnp(args, {
    nodeProps,
    searchQuery,
    matches,
    previousSearchQuery: previousSearchQuery.current,
    searchFocusOffset,
  });

  useEffect(() => {
    previousSearchQuery.current = searchQuery;
  }, [searchQuery]);

  const selectPreviousMatch = () => {
    setSearchFocusOffset((searchFocusOffset - 1 + matches.length) % matches.length);
  };

  const selectNextMatch = () => {
    setSearchFocusOffset((searchFocusOffset + 1) % matches.length);
  };

  // https://stackoverflow.com/a/4819886/1601953
  const isTouchDevice = !!('ontouchstart' in window || navigator.maxTouchPoints);

  return (
    <React.Fragment>
      <div className={classes.searchBar}>
        <FormTextField
          id="search"
          label="Search"
          // onPressEnter={e => setSearchQuery(e.target.value)}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          // autoFocus
          margin="dense"
          fullWidth
        />
        <IconButton size="small" onClick={selectPreviousMatch}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton size="small" onClick={selectNextMatch}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <div {...containerProps}>
        <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
          <SortableTree
            treeData={treeData}
            onChange={setTreeData}
            getNodeKey={getNodeKey}
            generateNodeProps={generateNodeProps}
            nodeContentRenderer={nodeContentRenderer}
            placeholderRenderer={placeholderRenderer}
            searchQuery={searchQuery}
            searchFocusOffset={searchFocusOffset}
            searchMethod={searchMethod}
            searchFinishCallback={(matches) => {
              setMatches(matches);
              if (previousSearchQuery.current !== searchQuery) {
                setSearchFocusOffset(0);
              }
              sfc(matches);
            }}
          />
        </DndProvider>
      </div>
    </React.Fragment>
  );
};

export default (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocusOffset, setSearchFocusOffset] = useState(0);

  return (
    <RstBasic
      searchQuery={searchQuery}
      searchFocusOffset={searchFocusOffset}
      onSearchQueryChange={setSearchQuery}
      onSearchFocusOffsetChange={setSearchFocusOffset}
      {...props}
    />
  );
};

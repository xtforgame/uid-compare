/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';

import Button from '@material-ui/core/Button';

import NodeContentRenderer from './NodeContentRenderer';
import PlaceholderRenderer from './PlaceholderRenderer';

import './styles.css';
// import 'react-sortable-tree/style.css';
import './rst-style.css';


// const X = props => (
//   <div
//     style={{
//       backgroundColor: 'gray',
//       display: 'inline-block',
//       borderRadius: 10,
//       color: '#FFF',
//       padding: '0 5px',
//     }}
//   >
//     {props.children}
//   </div>
// );

const X = (props) => {
  const {
    node,
    selectedId,
    onSelect = () => {},
  } = props;

  const style = {
    textTransform: 'none',
  };

  // if (selectedId === node.id) {
  //   style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  // }
  return (
    <React.Fragment>
      <div style={{ display: 'flex' }}>
        <Button style={style} onClick={() => onSelect(node)}>
          {node.id || props.children}
        </Button>
        <div style={{ minWidth: 10, flex: 1 }} />
        <Button variant="outlined">
          編輯
        </Button>
      </div>
    </React.Fragment>
  );
};

export default (props) => {
  const [treeData, setTreeData] = useState([
    {
      id: 'x',
      expanded: true,
      children: [
        {
          id: 'egg-uid',
          expanded: true,
          children: [
            {
              id: 'egg2-uid',
              expanded: true,
              children: [
                {
                  id: 'egg3-uid',
                  expanded: true,
                  children: [
                    {
                      id: 'egg4-uid',
                      expanded: true,
                      children: [
                        {
                          id: 'egg5-uid',
                          expanded: true,
                          children: [
                            {
                              id: 'egg6-uid',
                              expanded: true,
                              children: [
                                {
                                  id: 'egg7-uid',
                                  expanded: true,
                                  children: [
                                    {
                                      id: 'egg8-uid',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'xx2',
          expanded: true,
        },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setSearchQuery('egg8-uid');
    }, 3000);
    setTimeout(() => {
      setSelectedId('egg8-uid');
    }, 4000);
  }, []);

  // https://stackoverflow.com/a/4819886/1601953
  const isTouchDevice = !!('ontouchstart' in window || navigator.maxTouchPoints);

  return (
    <div>
      <span>
        {`This is ${!isTouchDevice && 'not '}a touch-supporting browser`}
      </span>

      <div style={{ height: 300 }}>
        <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
          <SortableTree
            treeData={treeData}
            onChange={setTreeData}
            getNodeKey={({ node, treeIndex }) => {
              return node.id;
            }}
            generateNodeProps={({ node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus }) => {
              const style = {
                cursor: 'pointer',
              };
              if (selectedId === node.id) {
                style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
              }
              return {
                style,
                onClick: () => setSelectedId(node.id),
                title: node.title || (
                  <X
                    node={node}
                    searchQuery={searchQuery}
                    selectedId={selectedId}
                    onSelect={() => setSelectedId(node.id)}
                  />
                ),
              };
            }}
            nodeContentRenderer={NodeContentRenderer}
            placeholderRenderer={PlaceholderRenderer}
            searchQuery={searchQuery}
            searchFocusOffset={0}
            searchMethod={({ node, path, treeIndex, searchQuery }) => {
              // console.log('searchQuery :', searchQuery);
              return node.id === searchQuery;
            }}
          />
        </DndProvider>
      </div>
    </div>
  );
};

/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import RstBasic from '~/containers/Rst/Basic';

// const Node = props => (
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

const Node = (props) => {
  const {
    node,
    // selectedId,
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

  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <React.Fragment>
      <RstBasic
        value={treeData}
        onChange={setTreeData}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}

        containerProps={{ style: { height: 400 } }}
        getNodeKey={({ node, treeIndex }) => node.id}
        searchMethod={({
          node, path, treeIndex, searchQuery,
        }) => {
          // console.log('searchQuery :', searchQuery);
          if (!searchQuery) {
            return false;
          }
          return (node.id || '').includes(searchQuery);
        }}
        generateNodeProps={({
          node, path, treeIndex, lowerSiblingCounts, isSearchMatch, isSearchFocus,
        }, { nodeProps, searchQuery }) => {
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
              <Node
                node={node}
                searchQuery={searchQuery}
                selectedId={selectedId}
                onSelect={() => setSelectedId(node.id)}
              />
            ),
          };
        }}
      />
    </React.Fragment>
  );
};

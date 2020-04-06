import React, { useState, useEffect, useRef } from 'react';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import ProjectDropdown from '~/containers/ProjectDropdown';
import { useConnect } from 'azrmui/hooks/redux-react-hook-ex';
import MoreActionMenuButton from 'azrmui/core/Buttons/MoreActionMenuButton';
import MemberListItem from '~/containers/UserCrudUi/shared/MemberListItem';
import modelMapEx from '~/containers/App/modelMapEx';
import {
  makeMyUserSelector,
  makeSelectedProjectSelector,
} from '~/containers/App/selectors';

const {
  user,
  // userSetting,
  // organization,
  // project,
} = modelMapEx.querchy.promiseActionCreatorSets;

const mapStateToProps = createStructuredSelector({
  myUser: makeMyUserSelector(),
  userQueryMap: modelMapEx.cacher.selectorCreatorSet.user.selectQueryMap(),
  selectedProject: makeSelectedProjectSelector(),
});

const mapDispatchToProps = {};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default (props) => {
  const classes = useStyles();
  const {
    myUser,
    userQueryMap: {
      metadata,
      values,
    },
    selectedProject,
  } = useConnect(mapStateToProps, mapDispatchToProps);

  const projectMemberQueryName = selectedProject && `./api/projects/${selectedProject.id}/members`;
  const orgMemberQueryName = selectedProject && `./api/organizations/${selectedProject.organization_id}/members`;

  const projectMemberMetadata = metadata[projectMemberQueryName] || {};
  const projectMembers = values[projectMemberQueryName] || [];

  const orgMemberMetadata = metadata[orgMemberQueryName] || {};
  const orgMembers = values[orgMemberQueryName] || [];

  const [updatedBaseTime, setUpdatedBaseTime] = useState(new Date().getTime());
  const [reqTime, setReqTime] = useState(0);
  const [, forceUpdate] = useState({});
  const loaded = useRef(0);
  const autocompleteOptions = useRef(null);
  const [selectValue, setSelectValue] = useState([]);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }
    loaded.current = 0;
    autocompleteOptions.current = null;
    setReqTime(new Date().getTime());
    user.getCollection({ queryId: projectMemberQueryName, actionProps: { url: projectMemberQueryName } })
    .then(() => {
      loaded.current++;
      forceUpdate({});
    });
    user.getCollection({ queryId: orgMemberQueryName, actionProps: { url: orgMemberQueryName } })
    .then(() => {
      loaded.current++;
      forceUpdate({});
    });
  }, [selectedProject, updatedBaseTime]);

  const isReady = selectedProject
    && reqTime
    && projectMemberMetadata && projectMemberMetadata.requestTimestamp >= reqTime
    && orgMemberMetadata && orgMemberMetadata.requestTimestamp >= reqTime
    && loaded.current === 2;

  if (isReady && !autocompleteOptions.current) {
    const projMemberSet = new Set(projectMembers.map(m => m.id));
    autocompleteOptions.current = orgMembers.filter(m => !projMemberSet.has(m.id));
    const unselectedMemberMap = new Map(
      autocompleteOptions.current.map(m => [m.id, m]),
    );
    setSelectValue(
      selectValue
      .filter(m => !projMemberSet.has(m.id))
      .map(m => unselectedMemberMap.get(m.id))
    );
  }

  const reload = () => {
    loaded.current = 0;
    autocompleteOptions.current = null;
    setUpdatedBaseTime(new Date().getTime());
  };

  const getActionMenuItems = memberId => (closeMenu) => {
    const myMember = projectMembers.find(m => m.id === myUser.id);
    const member = projectMembers.find(m => m.id === memberId);
    const extraMenuItems = [];
    if (member && myMember && myMember.userProject && myMember.userProject.role === 'owner') {
      const { role } = member.userProject;
      if (role !== 'owner') {
        extraMenuItems.push(<Divider key="divider" />);
        const url = `${projectMemberQueryName}/${member.id}`;
        if (role === 'master') {
          extraMenuItems.push(
            <MenuItem
              key="toOwner"
              onClick={() => {
                user.update(member.id, { role: 'owner' }, { queryId: url, actionProps: { url } })
                .then(() => { reload(); })
                .catch(() => {});
                closeMenu();
              }}
            >
              <ListItemIcon>
                <ArrowUpwardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="升為專案總管" />
            </MenuItem>
          );
          extraMenuItems.push(
            <MenuItem
              key="toMember"
              onClick={() => {
                user.update(member.id, { role: 'member' }, { queryId: url, actionProps: { url } })
                .then(() => { reload(); })
                .catch(() => {});
                closeMenu();
              }}
            >
              <ListItemIcon>
                <ArrowDownwardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="降為一般會員" />
            </MenuItem>
          );
        } else {
          extraMenuItems.push(
            <MenuItem
              key="toMaster"
              onClick={() => {
                user.update(member.id, { role: 'master' }, { queryId: url, actionProps: { url } })
                .then(() => { reload(); })
                .catch(() => {});
                closeMenu();
              }}
            >
              <ListItemIcon>
                <ArrowUpwardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="升為管理者" />
            </MenuItem>
          );
        }
      }
    }
    return ([
      // <MenuItem
      //   key="edit"
      //   onClick={() => {
      //     // console.log('Edit');
      //     closeMenu();
      //   }}
      // >
      //   Edit
      // </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          // console.log('Delete');
          user.delete(Symbol('FakeId'), { queryId: projectMemberQueryName, actionProps: { url: `${projectMemberQueryName}/${memberId}` } })
          .then(() => {
            reload();
          });
          closeMenu();
        }}
      >
        移出專案
      </MenuItem>,
      ...extraMenuItems,
    ]);
  };

  const getIdentifier = option => option.userOrganization.labels.identifier || '';
  return (
    <div>
      <div
        style={{
          width: '100%',
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <ProjectDropdown key="projectSelector" style={{ width: '100%' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          // aria-label="Add"
          // aria-haspopup="true"
          variant="contained"
          color="primary"
          disabled={!selectValue || selectValue.length === 0}
          onClick={() => {
            Promise.all(selectValue.map(
              m => user.create({ memberId: m.id }, { queryId: projectMemberQueryName, actionProps: { url: projectMemberQueryName } })
            ))
            .then(reload)
            .catch(reload);
          }}
        >
          確認新增
        </Button>
      </div>
      <div style={{ width: 10, height: 1 }} />
      <Autocomplete
        style={{ flex: 1 }}
        key={updatedBaseTime}
        disablePortal
        multiple
        noOptionsText="找不到成員"
        id="tags-outlined"
        options={autocompleteOptions.current || []}
        getOptionLabel={option => `${option.name}(ID:${option.id})(${getIdentifier(option) || '<無識別名稱>'})`}
        renderTags={
          (value, getTagProps) => value.map((option, index) => (
            <Chip variant="outlined" label={option.name} {...getTagProps({ index })} />
          ))
        }
        value={selectValue}
        onChange={(event, newValue) => {
          setSelectValue(newValue);
        }}
        filterOptions={(options, state) => {
          let { inputValue } = state;
          inputValue = (inputValue || '').toLowerCase();
          return options.filter((option) => {
            if (option.name && option.name.toLowerCase().includes(inputValue)) {
              return true;
            }
            if (getIdentifier(option).toLowerCase().includes(inputValue)) {
              return true;
            }
            return false;
          });
        }}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="新增成員"
            placeholder="名稱/信箱"
            fullWidth
          />
        )}
      />
      <List>
        {projectMembers.map((projectMember) => {
          const { role } = projectMember.userProject;
          let roleChip;
          switch (role) {
            case 'owner':
              roleChip = <Chip color="secondary" label="專案總管" />;
              break;
            case 'master':
              roleChip = <Chip color="primary" label="管理者" />;
              break;
            // case 'member':
            //   break;
            default:
              roleChip = <Chip label="普通成員" />;
              break;
          }
          return (
            <MemberListItem
              key={projectMember.id}
              member={projectMember}
              labels={projectMember.labels}
              onClick={() => {}}
              role={roleChip}
              action={(
                <ListItemSecondaryAction>
                  <MoreActionMenuButton
                    getActionMenuItems={getActionMenuItems(projectMember.id)}
                  />
                </ListItemSecondaryAction>
              )}
            />
          );
        })}
      </List>
    </div>
  );
};

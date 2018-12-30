export default theme => ({
  mobileContentPlaceholder: {
    height: 0, // 40,
  },
  mobielContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  mobileContent: {
    paddingRight: 8,
    paddingLeft: 8,
    flex: 1,
    height: 1,
    overflowY: 'scroll',
  },
});

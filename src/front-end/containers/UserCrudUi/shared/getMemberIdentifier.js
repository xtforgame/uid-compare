export default member => (
  member
  && member.userOrganization
  && member.userOrganization.labels
  && member.userOrganization.labels.identifier
) || (
  member
  && member.userProject
  && member.userProject.labels
  && member.userProject.labels.identifier
);

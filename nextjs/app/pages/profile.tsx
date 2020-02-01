import { withAuth } from '../lib';
import { useSelector } from 'react-redux';
import { makeUserSelector } from '../modules/auth/selectors';

const Profile = () => {
  const user = useSelector(makeUserSelector());

  return (
    <div>
      <h1>Profile page</h1>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
};

export default withAuth()(Profile)
import { useSelector } from 'react-redux';

function Testing() {
  const authReady = useSelector((state) => state.auth.authReady);
  const user = useSelector((state) => state.firebase.auth.currentUser);

  if (!authReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>Welcome, {user.displayName}</div>
      ) : (
        <div>Not logged in</div>
      )}
    </div>
  );
}

export default Testing
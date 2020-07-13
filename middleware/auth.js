export default function({store, $cookies, redirect, route}) {
  const cookies = $cookies.get('access-token');
  if (cookies) {
    store.state.isAuth = true;
  } else if (route.name === 'chat') {
    return redirect('/');
  }
}


import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useAppSelector } from './app/hooks'
import type { IUserLoginInfo } from './interfaces/auth'
import NotFound from './pages/404'
import AddAd from './pages/AddAd'
import AdminPanel from './pages/AdminPanel'
import AdsAdminPanel from './pages/AdminPanel/Ads'
import { Types } from './pages/AdminPanel/Types'
import { UserEditAdminPanel } from './pages/AdminPanel/UserEdit'
import { Users } from './pages/AdminPanel/Users'
import AdPage from './pages/AdPage'
import UserEdit from './pages/editUser'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import { AuthReducerActionType } from './reducers/AuthReducer'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const user: IUserLoginInfo = jwtDecode(token);
				dispatch({
					type: AuthReducerActionType.LOGIN_USER,
					payload: user,
				});
			} catch (err) {
				console.error("Invalid token");
				localStorage.removeItem('token');
			}
		}
	}, []);

	const [user, setUser] = useState<IUserLoginInfo | null>(null);
    useEffect(() => {
        if (localStorage.token) {
            const user = jwtDecode<IUserLoginInfo>(localStorage.token);
            setUser(user);
        }
    }, []);

    const auth = useAppSelector(store => store.auth)
	console.log(auth)
  return (
		<>
      <Routes>
		{auth.isAuth && (
			<>
				{user?.role === 'Admin' && (
					<Route path='admin' element={<AdminPanel />}>
						<Route path='users' element={<Users />}></Route>
						<Route path='ads' element={<AdsAdminPanel />}></Route>
						<Route path='types' element={<Types />}></Route>
						<Route path='users/:id/edit' element={<UserEditAdminPanel />}></Route>
					</Route>
				)}
		<Route path='addAd' element={<AddAd />}></Route>
        <Route path='user/:id/edit' element={<UserEdit />}></Route>
			</>
		)}
		<Route path='ad/:id' element={<AdPage />}></Route>
		<Route path='/' element={<Home />}></Route>
		<Route path='user/:id' element={<User />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
		</>
	)
}

export default App



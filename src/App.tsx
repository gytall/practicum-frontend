import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { VacancyListFromAPI } from './components/vacancy-list-api/vacancy-list-api'
import { VacancyList } from './components/vacancy-list/vacancy-list'

function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to='/'>Вакансии из базы данных</Link>
						</li>
						<li>
							<Link to='/api-vacancies'>Вакансии из API</Link>
						</li>
					</ul>
				</nav>

				<Routes>
					<Route path='/' element={<VacancyList />} />
					<Route path='/api-vacancies' element={<VacancyListFromAPI />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App

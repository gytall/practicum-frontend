import { useEffect, useState } from 'react'
import { IVacancy } from '../utils/types'
import '../vacancy-list/vacancy.css'

export function VacancyListFromAPI() {
	const [searchQuery, setSearchQuery] = useState('')
	const [searchLocation, setSearchLocation] = useState('')
	const [noExperienceRequired, setNoExperienceRequired] = useState(false)
	const [noSalarySpecified, setNoSalarySpecified] = useState(false)
	const [vacancies, setVacancies] = useState<IVacancy[]>([])
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(0)
	const [hasMore, setHasMore] = useState(true)

	useEffect(() => {
		fetchVacancies()
	}, [page])

	const fetchVacancies = async () => {
		if (loading || !hasMore) return
		setLoading(true)
		try {
			const response = await fetch(
				`http://127.0.0.1:5000/vacancies_from_api?page=${page}&per_page=20`
			)
			const data = await response.json()
			setVacancies(prev => [...prev, ...data])
			setHasMore(data.length > 0)
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			setLoading(false)
		}
	}

	const filteredVacancies = vacancies.filter(vacancy => {
		const matchName = vacancy.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
		const matchLocation = vacancy.location
			.toLowerCase()
			.includes(searchLocation.toLowerCase())
		const matchNoExperience = !noExperienceRequired || vacancy.experience === ''
		const matchNoSalary = !noSalarySpecified || vacancy.salary === ''

		return matchName && matchLocation && matchNoExperience && matchNoSalary
	})

	const loadMore = () => {
		setPage(prev => prev + 1)
	}

	return (
		<div>
			<div className='search-container'>
				<input
					type='text'
					placeholder='Поиск по имени'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='search-input'
				/>
				<input
					type='text'
					placeholder='Поиск по локации'
					value={searchLocation}
					onChange={e => setSearchLocation(e.target.value)}
					className='search-input'
				/>
			</div>
			<div className='filter-container'>
				<div className='checkbox'>
					<label>
						<input
							type='checkbox'
							checked={noExperienceRequired}
							onChange={e => setNoExperienceRequired(e.target.checked)}
						/>
						Не требуется опыт
					</label>
					<label>
						<input
							type='checkbox'
							checked={noSalarySpecified}
							onChange={e => setNoSalarySpecified(e.target.checked)}
						/>
						Нет указанной зарплаты
					</label>
				</div>
			</div>
			<ul>
				{filteredVacancies.map(vacancy => (
					<a href={vacancy.url} key={vacancy.id}>
						<li className='vacancy-card'>
							<h2>{vacancy.name}</h2>
							<p>Опыт: {vacancy.experience}</p>
							<p>Зарплата: {vacancy.salary ? vacancy.salary : 'Не указано'}</p>
							<p>Навыки: {vacancy.key_skills}</p>
							<p>Компания: {vacancy.company}</p>
							<p>Адрес: {vacancy.location}</p>
						</li>
					</a>
				))}
			</ul>
			{loading && <p>Загрузка...</p>}
			{hasMore && !loading && <button onClick={loadMore}>Загрузить еще</button>}
		</div>
	)
}

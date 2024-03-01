import Loader from 'react-loader-spinner'

import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, vaccinationData: {}}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const covidApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidApiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationStatus = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          VaccinationCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          VaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          VaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBasedOnStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStatus()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgContainer">
        <div className="logoContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="plusLogo"
          />
          <h1>Co-Win</h1>
        </div>
        <h1 className="mainHeading">CoWIN Vaccination in India</h1>
        {this.renderViewBasedOnStatus()}
      </div>
    )
  }
}

export default CowinDashboard

import React from 'react'
import Header from '../component/Header'
import SpecialityMenue from '../component/SpecialityMenue'
import TopDoctors from '../component/TopDoctors'
import Banner from '../component/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenue />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home

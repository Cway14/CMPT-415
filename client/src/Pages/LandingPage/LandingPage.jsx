import React, { useState } from 'react'
import LoginModal from '../../components/LoginModal/LoginModal'
import './LandingPage.css'

const LandingPage = () => {

    const [showModal, setShowModal] = useState(false)
  
    return <div className="landingPageContainer">
        <div className="modal landingPage">
        <h1>Prince's <br/> Grand Escape</h1>
        <button
          className="button-large"
          onClick={() => setShowModal(true)}
        >
        Login
        </button>
        <button className="button-link">Sign up</button>
        <LoginModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
}
  
export default LandingPage;
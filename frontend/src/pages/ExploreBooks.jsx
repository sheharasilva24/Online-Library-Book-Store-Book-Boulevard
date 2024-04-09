import React from 'react'
import './styles/Explore.css'

export default function Profile() {
  return (
    <div className='explore-container'>
      <img src="https://i.ibb.co/xHSgDhM/10-1.png" alt="" className='explore-profileimg' />

      <div className="explore-profile">

        <p><span>Welcome back</span> Yevin Mawathage</p>

      </div>

      <div className="explore-catergories">

      </div>

      <div className="explore-books">
        <div className="explore-one">
          <div className='explore-bookimg'>
            <img src="https://i.ibb.co/xHSgDhM/10-1.png" alt="" />
          </div>
          <div className="explore-description">
            <p>Book Title</p>
            <p className='explore-des'>
              Enter the realm of deduction and mystery with 'Sherlock Holmes.
              Classic introduces Sherlock Holmes and Dr. John Watson as they
              embark on their first investigation together.
            </p>

            <button>
              view
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
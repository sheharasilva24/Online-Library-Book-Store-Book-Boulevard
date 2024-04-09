import React from 'react'
import './styles/Home.css'
import { Link } from "react-router-dom"
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


export default function Home() {



  return (

    <div className='home-container'>
      <Navbar />
      <div className="home-landimg">
        <img src="https://i.ibb.co/CJzbxwZ/1.png" alt="" />

        <div className='home-part2'>
          <h1>Welcome To <br /> The <span>Revolution</span> of Literature</h1>

          <p className='home-p1'>
            Explore Boundless Worlds
          </p>

          <p className='home-p2'>
            Your All-in-One Destination for eBooks and More!
          </p>

          <div className='home-but2'>
            <Link to={"/Cards"}><button className="landing-btn" data="Explore Literary Treasures"></button></Link>
          </div>
        </div>
      </div>



      <div className='home-part3'>
        <img src="https://i.ibb.co/CJzbxwZ/1.png" alt=""
        />

        <h1><span className='home-span1'>THE BEST</span> stories are<br /> the ones <span className='home-span2'>YOU LOVE</span></h1>

        <p className='home-p1'>
          Thousands of new titles every month.<br></br>One convenient subscription.
        </p>
        <p className='home-p2'>
          One convenient subscription.
        </p>

        <div className="home-but3">
          <Link to={"/Membership"}><button className="landing-btn" data="Unlock Exclusive Benefits"></button></Link>
        </div>
      </div>



      <div className='home-part4'>
        <h1>Featured <span>Today</span></h1>
        <img src="https://i.ibb.co/CJzbxwZ/1.png" alt=""
        />
        <div className='home-part41'>

          <div className='home-but4'>
            <Link to={"/Cards"}><button className="landing-btn" data="More Books"></button></Link>
          </div>

          <h1>Read <span className='home-span1'>What You Want</span><br /> How You Want</h1>

          <p className='home-p1'>
            Carry Your Library Everywhere <br />
            Download Books for Offline Enjoyment!
          </p>


          <div className="home-but4">
            <Link to={"/Comingsoon"}><button className="landing-btn" data="Purchase Books"></button></Link>

          </div>

        </div>


      </div>
      <Footer />
    </div>
  )
}

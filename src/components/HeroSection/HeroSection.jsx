import React from 'react'
import './HeroSection.scss'

const HeroSection = () => {
  return (
    <div className='Hero_section container'>
      <div className="hero_section_content">
        <div className="content_title">
          <div>Art Form</div>
          <div className="shift_right">Exhibition</div>
        </div>
        <div className="content_description">
          Art is something we do, a verb. Art is an expression of our thoughts, emotions, intuitions, and desires, but it is even more personal than that: it’s about sharing
        </div>
        <div className="hero_btn">
          <text>Explore the world</text>
          <img src="/public/assets/images/exploreWorld.svg" alt="" />
        </div>
      </div>
      <div className="hero_background">
        <div className="img1">
          <div className="img_container">
            <img src="/public/assets/images/zakirKhan.svg" alt="" />
          </div>
        </div>
        <div className="img2">
          <div className="img_container">
            <img src="/public/assets/images/zakirKhan.svg" alt="" />
          </div>
        </div>
        <div className="img3">
          <div className="img_container">
            <img src="/public/assets/images/zakirKhan.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
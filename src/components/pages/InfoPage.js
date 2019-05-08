import React from 'react'

export default function InfoPage() {
  return (
    <div id="info-page">
      <h1 className="heading">Info</h1>
      <h3 className="heading">An infomational page for this web app.</h3>

      <h2 className="heading">Cook Manager</h2>
      <h3 className="heading">A web app to manage how many times each of your unit's cooks serves as a cook.</h3>

      <div className="basic-style card accent1-color">
        <h2>Cooks Page</h2>
        <p>In this page you can add all the cooks: Name, Times and Color.</p>
        <ul>
          <li>Names: A short name is preferred</li>
          <li>Times: How many days has this person served as a cook.</li>
          <li>Color: The color that represents this person. Preferrably not too dark and not too light.</li>
        </ul>
      </div>

      <div className="basic-style card dark-color">
        <h2>Calendar Page</h2>
        <p>In this page you can click on a day and select the person that was cook on this day. Underneath you can see all the cooks and how many times they have served as cooks.</p>
      </div>

      <div className="basic-style card primary-color">
        <h2>Planner Page</h2>
        <p>Have there been times where you tried to plan out the next week and see who can be cook on which days? Well this page is just for that. Click on the days on which someone is not available to disable them. When finished with that you can click on the n/a text blocks on the very bottom to select which person will be cook on each day.</p>
      </div>
    </div>
  )
}

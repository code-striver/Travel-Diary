import userEvent from '@testing-library/user-event';
import React, { useEffect, useRef, useState } from 'react';

const TripForm = (props) => {
    const setWantToAdd = props.setWantToAdd;
    const setWantsToUpdate = props.setWantsToUpdate;
    const setTripToUpdate = props.setTripToUpdate
    const wantsToAdd = props.wantsToAdd
    const wantsToUpdate = props.wantsToUpdate
    const token = props.token;
    const tripList = props.tripList;
    const setTripList = props.setTripList
    const tripToUpdate = props.tripToUpdate
  const titleRef = useRef();
  const destinationRef = useRef();
  const startDateRef = useRef()
  const endDateRef = useRef()
  const activitiesRef = useRef()

  useEffect(()=>{
    console.log(tripToUpdate)
    if(wantsToUpdate){
        titleRef.current.value = tripToUpdate.title
        const destinationString = tripToUpdate.destinationArr.join(', ');
            destinationRef.current.value = destinationString
            startDateRef.current.value = tripToUpdate.startDate
            endDateRef.current.value = tripToUpdate.endDate
            const activitiesString = tripToUpdate.activitiesArr.join(', ');
             activitiesRef.current.value = activitiesString
      }
  },[tripToUpdate])

    function handleClose(e){
        e.preventDefault();
        setWantToAdd(false)
        setWantsToUpdate(false)
        setTripToUpdate(null)
    }
  async function handleSubmit(e){
    e.preventDefault();
    if(wantsToAdd){
      const tripRequestOprtions = {
        title:titleRef.current.value, 
        destinations:destinationRef.current.value, 
        startDate:startDateRef.current.value,
        endDate:endDateRef.current.value,
         activities:activitiesRef.current.value
      }
      await fetch('http://localhost:8000/api/trips/add', {
        method: 'POST', // Assuming userprofile endpoint expects a GET request
        headers: {
            'Content-Type': 'application/json',
            'authorization': token // Attach the token in the Authorization header
        },
        body:JSON.stringify(tripRequestOprtions)
    })
    await fetch('http://localhost:8000/api/trips/userTrips', {
                    method: 'GET', // Assuming userprofile endpoint expects a GET request
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token // Attach the token in the Authorization header
                    }
                })
        .then(response => response.json())
          .then(json => {
            console.log('json after pressing X')
            console.log(json)
            setTripList(json)
          })
          titleRef.current.value = ''
          destinationRef.current.value = ''
          startDateRef.current.value = ''
          endDateRef.current.value = ''
           activitiesRef.current.value = ''
           titleRef.current.focus()
    }
    else if(wantsToUpdate){
      const tripRequestOprtions = {
        title:titleRef.current.value, 
        destinations:destinationRef.current.value, 
        startDate:startDateRef.current.value,
        endDate:endDateRef.current.value,
         activities:activitiesRef.current.value
      }
      await fetch(`http://localhost:8000/api/trips/updateTrip/${tripToUpdate._id}`, {
        method: 'POST', // Assuming userprofile endpoint expects a GET request
        headers: {
            'Content-Type': 'application/json',
            'authorization': token // Attach the token in the Authorization header
        },
        body:JSON.stringify(tripRequestOprtions)
    })
    await fetch('http://localhost:8000/api/trips/userTrips', {
                    method: 'GET', // Assuming userprofile endpoint expects a GET request
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token // Attach the token in the Authorization header
                    }
                })
        .then(response => response.json())
          .then(json => {
            setTripList(json)
          })
          titleRef.current.value = ''
          destinationRef.current.value = ''
          startDateRef.current.value = ''
          endDateRef.current.value = ''
           activitiesRef.current.value = ''
           setWantsToUpdate(false)
    }
    
  };

  return (
    <div className="trip-form">
      <button className="close-button" onClick={handleClose}>X</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
        ref={titleRef}
          type="text"
          id="title"
          placeholder='write title of your trip...'
        />

        <label htmlFor="destinations">Destinations:</label>
        <input
        ref={destinationRef}
          type="text"
          id="destinations"
          placeholder='you can type many destinations seperated by comma'
        />

        <label htmlFor="startDate">Start Date:</label>
        <input
        ref={startDateRef}
          type="date"
        />

        <label htmlFor="endDate">End Date:</label>
        <input
        ref={endDateRef}
          type="date"
          id="endDate"
        />

        <label htmlFor="activities">Activities:</label>
        <textarea
        ref={activitiesRef}
          id="activities"
          placeholder='you can type many activities seperated by comma'
          
        ></textarea>

        <button type="submit" >Submit</button>
      </form>

      {/* Styles */}
      <style jsx>{`
        .trip-form {
          max-width: 400px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 5px;
          right: 5px;
          background: none;
          color:black;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input,
        textarea {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TripForm;

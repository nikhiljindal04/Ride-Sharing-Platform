import React from 'react'

const WaitingForDriver = (props) => {
  console.log("WaitingForDriver props:", props.ride.captain);
  return (
    <div>
      <h4
        className=" p-1 text-center w-[100%] top-0 text-2xl"
        onClick={() => {
          props.setWaitingForDriverPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-fill"></i>
      </h4>
      <h2 className="text-2xl font-semibold mb-5">Waiting for a Driver</h2>
      <div className='flex items-center justify-between'>
        <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995234/assets/92/8d4288-e896-4333-9bc2-c60c49f2a095/original/UberXL_Black_v2.png"></img>
        <div>
            <h2 className='text-lg font-medium'>{props.ride?.captain.fullName.firstName + " " + props.ride?.captain.fullName.lastName}</h2>
            <h4 className='text-xl font-semibold -mt-1'>{props.ride?.captain.vehicle.plate}</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto </p>
            <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
        </div>
      </div>
      <div className="flex justify-between items-center flex-col gap-4">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickupLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div className="">
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.destinationLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div className="">
              <h3 className="text-lg font-medium">&#x20b9;{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver

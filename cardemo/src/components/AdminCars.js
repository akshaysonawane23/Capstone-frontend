import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, ListGroup, ListGroupItem, CardGroup, Row, Col } from 'react-bootstrap'
import AddCarInfoModal from './AddCarInfoModal';
import EditCarInfoModal from './EditCarInfoModel';
import './Navbar.css';



function AdminCars(props) {
      const [carsInfo, setcarsInfo] = useState([])
      const [addModelShow, setaddModelShow] = useState(false)
      const [editModelShow, seteditModelShow] = useState(false)
      const [singleCarInfo, setsingleCarInfo] = useState({})

      useEffect(() => {
            getCarInfo()
      }, [])

      let getCarInfo = async () => {
            try {
                  let jwtToken = localStorage.getItem("jwtToken");
                  let token = `Bearer ${jwtToken}`
                  let res = await axios.get("http://localhost:8080/admin/car/info", {
                        headers: {
                              'Authorization': token,
                        }
                  })
                  if (!res.data.error) {
                        setcarsInfo(res.data.allCarDetails)
                  } else {
                        alert(res.data.message)
                  }
            } catch (error) {
                  console.log(error)
            }

      }
      let showUpdateCarInfoModel = (singleCarInfo) => {
            seteditModelShow(true);
            setsingleCarInfo(singleCarInfo)

      }

      let deleteCarInfo = async (carInfo) => {

            try {
                  let jwtToken = localStorage.getItem("jwtToken");
                  let token = `Bearer ${jwtToken}`
                  let res = await axios.delete(
                        `http://localhost:8080/admin/car/info/${carInfo.id}`, {
                        headers: {
                              'Authorization': token,
                        }
                  });
                  if (!res.data.error) {
                        alert(res.data.message);
                        getCarInfo();
                  } else {
                        alert(res.data.message);

                  }
            } catch (err) {
                  alert("server problem please try later")
            }
      };
      let powerSteering = "";
      let getSteering = (data) => {
            if (data) {
                  powerSteering = "true"
            } else {
                  powerSteering = "false"
            }
      }


      return (
            <div className=' admin'>
                  <h1 style={{ position: "relative", alignItems: "center" }}><button onClick={() => { setaddModelShow(true) }} className='btn btn-danger'>Add Car Info</button></h1>
                  <CardGroup >
                        <Row >
                              {carsInfo.map((car, index) => {
                                    getSteering(car.powerSteering);
                                    return (
                                          <Col key={index} className='mt-5'>
                                                <Card key={index} className='m-3' md={4} style={{ width: '25rem', border: '1px solid gray' }}>
                                                      <Card.Img variant="top" width={"24rem"} height={"150rem"} src={car.imageURL} />
                                                      <Card.Body>
                                                            <Card.Title>{car.name}</Card.Title>
                                                      </Card.Body>
                                                      <ListGroup className="list-group-flush">
                                                            <ListGroupItem>Brand Name: {car.company}</ListGroupItem>
                                                            <ListGroupItem>Fuel Type: {car.fuelType}</ListGroupItem>
                                                            <ListGroupItem>Showromm Price: {car.showroomPrice}</ListGroupItem>
                                                            <ListGroupItem>Onroad Price: {car.onroadPrice}</ListGroupItem>
                                                            <ListGroupItem>Power Steering: {powerSteering}</ListGroupItem>
                                                            <ListGroupItem>Break System: {car.breakSystem}</ListGroupItem>
                                                            <ListGroupItem>Mileage: {car.mileage}</ListGroupItem>
                                                            <ListGroupItem>Seating Capacity: {car.seatingCapacity}</ListGroupItem>
                                                            <ListGroupItem>Engine Capacity: {car.engineCapacity}</ListGroupItem>
                                                            <ListGroupItem>Gear Type: {car.gearType}</ListGroupItem>
                                                            <ListGroupItem>
                                                                  <button onClick={() => { showUpdateCarInfoModel(car) }} className='btn btn-primary mt-0 md-2'>Edit</button>
                                                                  &nbsp;&nbsp;&nbsp;
                                                                  <button onClick={() => { deleteCarInfo(car) }} className='btn btn-danger mt-0 md-2'>Delete</button>
                                                            </ListGroupItem>
                                                      </ListGroup>
                                                </Card>
                                          </Col>)
                              })}
                        </Row>
                  </CardGroup>
                  <span> <br></br> </span>
                  <AddCarInfoModal
                        show={addModelShow}
                        onHide={() => setaddModelShow(false)}
                        getcarinfo={getCarInfo}
                  />

                  <EditCarInfoModal
                        singlecarinfo={singleCarInfo}

                        show={editModelShow}
                        onHide={() => {
                              seteditModelShow(false)
                              getCarInfo();
                        }}

                  />
            </div>

      )
}



export default AdminCars
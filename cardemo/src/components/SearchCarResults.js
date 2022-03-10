
import React, { useEffect, useState } from 'react'
import { Card, ListGroup, ListGroupItem, CardGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios'


function SearchCarResults(props) {


      let powerSteering = "";
      let getSteering = (data) => {
            if (data) {
                  powerSteering = "true"
            } else {
                  powerSteering = "false"
            }
      }
      if (props.searchError) {
            return <h1>No Search Results</h1>
      }
      else {
            return (
                  <div >
                        <br></br>
                        <h1> Search Results</h1>
                        <CardGroup className=''>
                              <Row >
                                    {props.searchcarsinfo.map((car, index) => {
                                          getSteering()
                                          return (
                                                <Col key={index} className='mt-5'>
                                                      <Card key={index} md={4} className='m-3' style={{ width: '25rem', border: '1px solid gray' }}>
                                                            <Card.Img variant="top" width={"24rem"} height={"200rem"} src={car.imageURL} />

                                                            <Card.Body>
                                                                  <Card.Title className='bg-info bg-gradient'>{car.name}</Card.Title>
                                                            </Card.Body>

                                                            <ListGroup className="list-group-flush">
                                                                  <ListGroup className="list-group-flush">
                                                                        <ListGroupItem>Brand Name:{car.company}</ListGroupItem>
                                                                        <ListGroupItem>Fuel Type:{car.fuelType}</ListGroupItem>
                                                                        <ListGroupItem>Showromm Price:{car.showroomPrice}</ListGroupItem>
                                                                        <ListGroupItem>Onroad Price:{car.onroadPrice}</ListGroupItem>
                                                                        <ListGroupItem>Power Steering:{powerSteering}</ListGroupItem>
                                                                        <ListGroupItem>Break System:{car.breakSystem}</ListGroupItem>
                                                                        <ListGroupItem>Mileage:{car.mileage}</ListGroupItem>
                                                                        <ListGroupItem>Seating Capacity:{car.seatingCapacity}</ListGroupItem>
                                                                        <ListGroupItem>Engine Capacity:{car.engineCapacity}</ListGroupItem>
                                                                        <ListGroupItem>Gear Type:{car.gearType}</ListGroupItem>
                                                                  </ListGroup>

                                                            </ListGroup>
                                                      </Card>
                                                </Col>)
                                    })}
                              </Row>
                              <br></br>
                        </CardGroup>
                  </div>
            )
      }
}

export default SearchCarResults
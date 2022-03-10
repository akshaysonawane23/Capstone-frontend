
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios';
import addCarInfoValidate from './addCarInfoValidate';

function EditCarInfoModal(props) {
      const [carData, setcarData] = useState({
            "name": "",
            "company": "",
            "fuelType": "",
            "powerSteering": "",
            "breakSystem": "",
            "showroomPrice": "",
            "imageURL": "",
            "mileage": "",
            "seatingCapacity": "",
            "engineCapacity": "",
            "gearType": ""
      })
      const [errors, seterrors] = useState({})
      useEffect(() => {
            setcarData(props.singlecarinfo)
      }, [props.singlecarinfo])

      let changeData = (event) => {

            setcarData({
                  ...carData,
                  [event.target.name]: event.target.value
            })
      }

      let validateData = () => {
            seterrors(addCarInfoValidate(carData))
      }

      let hideAddCarInfo = () => {
            props.onHide()
      }

      let saveCarInfo = async (event) => {
            event.preventDefault()
            if (Object.keys(errors).length === 0) {
                  try {
                        let jwtToken = localStorage.getItem("jwtToken");
                        let token = `Bearer ${jwtToken}`
                        let res = await axios.put(`http://localhost:8080/admin/car/info/${props.singlecarinfo.id}`, carData, {
                              headers: {
                                    'Authorization': token,
                              }
                        })
                        if (!res.data.error) {
                              alert(res.data.message)

                              props.onHide()
                        } else {
                              alert(res.data.message)
                        }
                  } catch (error) {
                        props.onHide()
                        console.log(error);
                  }
            }
      }

      return (
            <Modal
                  backdrop="static"
                  keyboard={false}
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
            >
                  <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                              Edit Car Details
                        </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        <form onSubmit={saveCarInfo}>
                              <div>
                                    <label htmlFor="name">Car Name</label>
                                    <input type="text" onChange={changeData} value={carData.name} name="name" className="form-control form-control-sm" id="name" />
                                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                              </div>
                              <div>
                                    <label htmlFor="company">Brand Name</label>
                                    <input type="text" onChange={changeData} value={carData.company} name="company" className="form-control form-control-sm" id="company" />
                                    {errors.company && <p style={{ color: "red" }}>{errors.company}</p>}
                              </div>

                              <div>
                                    <label htmlFor="fuelType">Fuel Type</label>
                                    <input type="text" onChange={changeData} value={carData.fuelType} name="fuelType" className="form-control form-control-sm" id="fuelType" />
                                    {errors.fuelType && <p style={{ color: "red" }}>{errors.fuelType}</p>}
                              </div>
                              <div>
                                    <label htmlFor="powerSteering">Power Steering</label>
                                    <input type="text" onChange={changeData} value={carData.powerSteering} name="powerSteering" className="form-control form-control-sm" id="powerSteering" />
                                    {errors.powerSteering && <p style={{ color: "red" }}>{errors.powerSteering}</p>}
                              </div>

                              <div>
                                    <label htmlFor="showroomPrice">Showroom Price</label>
                                    <input type="number" onChange={changeData} value={carData.showroomPrice} name="showroomPrice" className="form-control form-control-sm" id="showroomPrice" />
                                    {errors.showroomPrice && <p style={{ color: "red" }}>{errors.showroomPrice}</p>}
                              </div>
                              <div>
                                    <label htmlFor="breakSystem">Break System</label>
                                    <input type="text" onChange={changeData} value={carData.breakSystem} name="breakSystem" className="form-control form-control-sm" id="breakSystem" />
                                    {errors.breakSystem && <p style={{ color: "red" }}>{errors.breakSystem}</p>}
                              </div>

                              <div>
                                    <label htmlFor="mileage">Mileage</label>
                                    <input type="number" onChange={changeData} value={carData.mileage} name="mileage" className="form-control form-control-sm" id="mileage" />
                                    {errors.mileage && <p style={{ color: "red" }}>{errors.mileage}</p>}
                              </div>
                              <div>
                                    <label htmlFor="seatingCapacity">Seating Capacity</label>
                                    <input type="number" onChange={changeData} value={carData.seatingCapacity} name="seatingCapacity" className="form-control form-control-sm" id="seatingCapacity" />
                                    {errors.seatingCapacity && <p style={{ color: "red" }}>{errors.seatingCapacity}</p>}
                              </div>


                              <div>
                                    <label htmlFor="engineCapacity">Engine Capacity In CC</label>
                                    <input type="number" onChange={changeData} value={carData.engineCapacity} name="engineCapacity" className="form-control form-control-sm" id="engineCapacity" />
                                    {errors.engineCapacity && <p style={{ color: "red" }}>{errors.engineCapacity}</p>}
                              </div>
                              <div>
                                    <label htmlFor="gearType">Gear Type</label>
                                    <input type="text" onChange={changeData} value={carData.gearType} name="gearType" className="form-control form-control-sm" id="gearType" />
                                    {errors.gearType && <p style={{ color: "red" }}>{errors.gearType}</p>}
                              </div>


                              <div>
                                    <label htmlFor="imageURL">Image URL</label>
                                    <input type="text" onChange={changeData} value={carData.imageURL} name="imageURL" className="form-control form-control-sm" id="imageURL" />
                                    {errors.imageURL && <p style={{ color: "red" }}>{errors.imageURL}</p>}
                              </div>
                              <button onClick={() => { validateData() }} className="btn btn-primary" >Update</button>
                        </form>
                  </Modal.Body>
                  <Modal.Footer>
                        <Button onClick={() => { hideAddCarInfo() }}>Close</Button>
                  </Modal.Footer>
            </Modal>
      );
}

export default EditCarInfoModal
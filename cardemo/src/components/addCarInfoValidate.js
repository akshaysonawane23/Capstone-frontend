const addCarInfoValidate = (carData) => {

      let errors = {}
      if (carData.name === "") {
            errors.name = "*car name is required";
      }
      if (carData.company === "") {
            errors.company = "*car company is required";
      }
      if (carData.fuelType === "") {
            errors.fuelType = "*car fuel type is required";
      }
      if (carData.breakSystem === "") {
            errors.breakSystem = "*car break system is required";
      }
      if (carData.powerSteering === "") {
            errors.powerSteering = "*car power steering is required";
      }
      if (carData.showroomPrice === "") {
            errors.showroomPrice = "*car showroom price is required";
      }
      if (carData.mileage === "") {
            errors.mileage = "*car mileage is required";
      }
      if (carData.seatingCapacity === "") {
            errors.seatingCapacity = "*car seating capacity is required";
      }
      if (carData.engineCapacity === "") {
            errors.engineCapacity = "*car engine capacity  is required";
      }
      if (carData.gearType === "") {
            errors.gearType = "*car gear type is required";
      }
      if (carData.imageURL === "") {
            errors.imageURL = "*car image url is required";
      }
      if (carData.imageURL.length > 255) {
            errors.imageURL = "*car image url should not be more than 255 characters";
      }

      return errors;
}

export default addCarInfoValidate
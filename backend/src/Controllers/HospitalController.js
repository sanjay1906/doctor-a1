const { Hospital, Doctor, Category } = require('Models');
const { handleError } = require('Helper');

const METERS_PER_MILES = 1609.34;

const getHospitalListing = async (req, res, next) => {
  const hospitals = await Hospital.find();
  res.json({
    data: hospitals,
    success: true
  });
};

const getHospitalById = async (req, res, next) => {
  const { hospitalId } = req.params;
  try {
    const hospital = await Hospital.findOne({ _id: hospitalId });
    const doctors = await Doctor.find({ hospitalId });
    const categories = await Category.find({
      _id: { $in: hospital.category || [] }
    });

    res.json({
      data: {
        ...hospital.toObject(),
        category: categories,
        doctors
      },
      success: true
    });
  } catch (err) {
    res.json({
      success: false
    });
    handleError(err);
  }
};

const getNearyByHospitals = async (req, res, next) => {
  try {
    const { latitude, longitude, distance, limit } = req.query;

    if (!limit) {
      limit = 5;
    }

    const nearyByHospitals = await Hospital.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseInt(longitude), parseInt(latitude)]
          },
          $maxDistance: distance * METERS_PER_MILES
        }
      }
    })
      .populate({ category: 1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: nearyByHospitals
    });
  } catch (err) {
    res.json({
      success: false
    });
    handleError(err);
  }
};

const addHospital = async (req, res, next) => {
  const {
    hospitalName,
    address,
    description,
    websiteUrl,
    mobileNo,
    emailId,
    hospitalImage,
    latitude,
    longitude
  } = req.body;
  const hospitalData = {
    hospitalName,
    address,
    description,
    websiteUrl,
    mobileNo,
    emailId,
    thumbnailImage:
      hospitalImage ||
      'https://clarkebenefits.com/wp-content/uploads/2018/07/hospital-icon.png',
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  };
  try {
    const hospital = new Hospital(hospitalData);

    await hospital.save();

    res.status(200);
    return res.json({
      success: true,
      data: 'Hospital added'
    });
  } catch (err) {
    res.status(404);
    return res.json({
      success: false,
      data: 'Unable to add hospital'
    });
  }
};

const deleteHospitalById = async (req, res, next) => {
  const { hospitalId } = req.params;
  await Hospital.findOneAndDelete({ _id: hospitalId });
  res.status(200);
  return res.json({
    success: true,
    data: 'Hospital deleted'
  });
};

const updateHospital = async (req, res, next) => {
  const { hospitalId } = req.params;
  const {
    hospitalName,
    address,
    description,
    websiteUrl,
    mobileNo,
    emailId,
    hospitalImage,
    latitude,
    longitude
  } = req.body;
  const hospitalData = {
    hospitalName,
    address,
    description,
    websiteUrl,
    mobileNo,
    emailId,
    thumbnailImage:
      hospitalImage ||
      'https://clarkebenefits.com/wp-content/uploads/2018/07/hospital-icon.png',
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  };
  try {
    await Hospital.findOneAndUpdate(
      { _id: hospitalId },
      { $set: hospitalData },
      { new: true }
    );
    res.status(200);
    return res.json({
      success: true,
      data: 'Hospital updated'
    });
  } catch (err) {
    res.status(404);
    return res.json({
      success: false,
      data: 'Unable to update hospital',
      err: err
    });
  }
};

module.exports = {
  getHospitalListing,
  getHospitalById,
  getNearyByHospitals,
  addHospital,
  deleteHospitalById,
  updateHospital
};

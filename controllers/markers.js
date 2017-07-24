
const { Markers } = require('../models')

function index (req, res, next) {
  console.log('hitting index');
  Markers.all().then(markers => res.json({markers})).catch(next)
}

function cityMarkers (req, res, next) {
  Markers.findByCityId(req.params.id).then(markers => {
     res.json({markers})
  }).catch(err => {
    next(err)
  })
}

function insertCityMarker (req, res, next) {
  console.log('req.body ------>', req.body);
  console.log(req.params.id);
  Markers.createWhere(req.body.savedMarker,req.params.id).then(markers => {
     res.json({markers})
  }).catch(err => {
    next(err)
  })
}

function deleteMarker (req, res, next) {
  console.log('hitting delete');
  Markers.destroy(req.params.id).then(markers => res.json({markers})).catch(next)
}

module.exports = {
  index, cityMarkers, insertCityMarker, deleteMarker
}

location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
       
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
      
    }
  }

  captainSchema.index({ location: '2dsphere' });
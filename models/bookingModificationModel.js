

const mongoose = require('mongoose');

// Mongoose Schema and Model
const BookingModificationSchema = new mongoose.Schema({
  BookingId:Number,
  ChangeDateTime: { type: Date, index: true },
  ChangeUserId: { type: Number, index: true },
  ChangeUserName: String,
  Covers: Number,
  VisitDateTime: { type: Date, index: true },
  Status: { type: String, index: true },
  Promotions: [{
    Id: Number,
    Name: String
  }],
  Cost: Number,
  Review: {
    VisitDateTime: { type: Date, index: true },
    ReviewDateTime: { type: Date, index: true },
    Review: String,
    AverageRating: Number,
    LikelyToRecommendRating: Number,
    FoodAndDrinkRating: Number,
    AtmosphereRating: Number,
    ServiceRating: Number,
    ValueRating: Number
  },
  OldProviderId: { type: Number, index: true },
  NewProviderId: { type: Number, index: true },
  BookingReasons: [{
    Id: Number,
    Name: String,
    NameRestaurantLanguage: String
  }],
  Spend: Number,
  IsReconfirmed: Boolean,
  IsConfirmedWithGuest: Boolean,
  RoomNumber: String,
  ReceiptXml: String,
  Duration: Number,
  TurnTime: Number,
  TotalPaymentMade: Number,
  IsCreditCardAddedToBooking: Boolean,
  ArrivalStatus: String,
  MealStatus: String,
  Tables: [{
    Id: { type: Number, index: true },
    Name: String,
    Area: {
      Id: Number,
      Name: String
    }
  }],
  BookingCodes: [{
    Id: Number,
    Title: String,
    Symbol: String
  }],
  OldProviderName: String,
  NewProviderName: String
});


BookingModificationSchema.index({ ChangeDateTime: 1 }, { unique: true });

const BookingModification = mongoose.model('BookingModification', BookingModificationSchema);


module.exports = BookingModification;

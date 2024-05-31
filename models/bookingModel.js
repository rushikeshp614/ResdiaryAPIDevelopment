
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  Id: { type: Number, index: true, unique: true },
  BookingReference: String,
  MembershipId: String,
  CustomerName: String,
  CustomerEmail: String,
  CustomerMobileCountryCode: Number,
  CustomerMobile: String,
  IsOptedInForEmail: Boolean,
  GroupEmailMarketingOptInText: String,
  GroupEmailMarketingOptInDateTime: Date,
  IsOptedInForSms: Boolean,
  GroupSmsMarketingOptInText: String,
  GroupSmsMarketingOptInDateTime: Date,
  ReceiveRestaurantEmailMarketing: Boolean,
  RestaurantEmailMarketingOptInText: String,
  RestaurantEmailMarketingOptInDateTime: Date,
  ReceiveRestaurantSmsMarketing: Boolean,
  RestaurantSmsMarketingOptInText: String,
  RestaurantSmsMarketingOptInDateTime: Date,
  IsConfirmedWithGuest: Boolean,
  Comments: String,
  ProviderId: { type: Number, index: true },
  RestaurantName: String,
  CoversBooked: Number,
  VisitDateTime: { type: Date, index: true },
  Spend: Number,
  Status: { type: String, index: true },
  ArrivalStatus: String,
  MealStatus: String,
  Promotions: [{
    Id: Number,
    Name: String,
    Quantity: Number,
    PricePaid: Number
  }],
  BookingSource: String,
  BookingDateTime: Date,
  Review: {
    VisitDateTime: Date,
    ReviewDateTime: Date,
    Review: String,
    AverageRating: Number,
    LikelyToRecommendRating: Number,
    FoodAndDrinkRating: Number,
    AtmosphereRating: Number,
    ServiceRating: Number,
    ValueRating: Number
  },
  CustomerFirstName: String,
  CustomerSurname: String,
  BookingReasons: [{
    Id: Number,
    Name: String,
    NameRestaurantLanguage: String
  }],
  CustomerId: { type: Number, index: true },
  CustomerDetails: {
    CustomerType: {
      Id: Number,
      Name: String
    },
    Rank: Number,
    IsVip: Boolean,
    PhoneCountryCode: Number,
    PhoneNumber: String,
    Birthday: Date,
    Anniversary: Date,
    CustomerCodes: [{
      Id: Number,
      Name: String
    }],
    Company: String,
    Comments: String
  },
  CustomerAddress: {
    House: String,
    Street: String,
    Town: String,
    CountyRegion: String,
    Country: String,
    Postcode: String
  },
  ServiceName: String,
  RoomNumber: String,
  ReceiptXml: String,
  Duration: Number,
  TurnTime: Number,
  Payments: [{
    Amount: Number,
    PaymentMethod: String,
    DateTimeProcessed: String
  }],
  CurrencyCode: String,
  IsCreditCardAdded: Boolean,
  Tables: [{
    Id: Number,
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
  CustomerMarketingSourceIpAddress: String,
  CancellationReasonId: Number
});

BookingSchema.index({ Id: 1, VisitDateTime: 1 });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
const mongoose = require('mongoose');

const customerModificationSchema = new mongoose.Schema({
    CustomerId: Number,
    ProviderId: Number,
    ModifiedByUserId: Number,
    ModifiedDateTime: Date,
    EmailAddress: String,
    MobileNumber: String,
    ReceiveGroupEmailMarketing: Boolean,
    GroupEmailMarketingOptInDateTime: Date,
    GroupEmailMarketingOptInText: String,
    ReceiveGroupSmsMarketing: Boolean,
    GroupSmsMarketingOptInDateTime: Date,
    GroupSmsMarketingOptInText: String,
    ReceiveRestaurantEmailMarketing: Boolean,
    RestaurantEmailMarketingOptInDateTime: Date,
    RestaurantEmailMarketingOptInText: String,
    ReceiveRestaurantSmsMarketing: Boolean,
    RestaurantSmsMarketingOptInDateTime: Date,
    RestaurantSmsMarketingOptInText: String,
    CustomerMarketingSourceIpAddress: String,
    Deleted: Boolean,
    Comments: String
});

const CustomerModification = mongoose.model('CustomerModification', customerModificationSchema);

module.exports = CustomerModification;
// const mongoose = require('mongoose');

// const customerModificationSchema = new mongoose.Schema({
//   CustomerId: { type: Number, index: true },
//   ProviderId: { type: Number, index: true },
//   ModifiedByUserId: Number,
//   ModifiedDateTime: { type: Date, index: true },
//   EmailAddress: { type: String, index: true },
//   MobileNumber: String,
//   ReceiveGroupEmailMarketing: Boolean,
//   GroupEmailMarketingOptInDateTime: Date,
//   GroupEmailMarketingOptInText: String,
//   ReceiveGroupSmsMarketing: Boolean,
//   GroupSmsMarketingOptInDateTime: Date,
//   GroupSmsMarketingOptInText: String,
//   ReceiveRestaurantEmailMarketing: Boolean,
//   RestaurantEmailMarketingOptInDateTime: Date,
//   RestaurantEmailMarketingOptInText: String,
//   ReceiveRestaurantSmsMarketing: Boolean,
//   RestaurantSmsMarketingOptInDateTime: Date,
//   RestaurantSmsMarketingOptInText: String,
//   CustomerMarketingSourceIpAddress: String,
//   Deleted: Boolean,
//   Comments: String
// });

// // Compound index on CustomerId and ModifiedDateTime
// customerModificationSchema.index({ CustomerId: 1, ModifiedDateTime: 1 }, { unique: true });

// const CustomerModification = mongoose.model('CustomerModification', customerModificationSchema);

// module.exports = CustomerModification;
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    Id: Number,
    Title: String,
    FirstName: String,
    Surname: String,
    Company: String,
    Department: String,
    Email: String,
    MobileCountryCode: Number,
    Mobile: String,
    PhoneCountryCode: Number,
    Phone: String,
    IsVip: Boolean,
    ReceiveEmailMarketing: Boolean,
    GroupEmailMarketingOptInText: String,
    GroupEmailMarketingOptInDateTime: Date,
    ReceiveSmsMarketing: Boolean,
    GroupSmsMarketingOptInText: String,
    GroupSmsMarketingOptInDateTime: Date,
    ReceiveRestaurantEmailMarketing: Boolean,
    RestaurantEmailMarketingOptInText: String,
    RestaurantEmailMarketingOptInDateTime: Date,
    ReceiveRestaurantSmsMarketing: Boolean,
    RestaurantSmsMarketingOptInText: String,
    RestaurantSmsMarketingOptInDateTime: Date,
    Comments: String,
    Birthday: Date,
    Anniversary: Date,
    IsDrinkingAge: Boolean,
    MembershipId: String,
    Field1: String,
    Field2: String,
    Field3: String,
    Field4: String,
    Field5: String,
    IsBlocked: Boolean,
    CustomerCodes: [Number],
    CustomerCodesList: [{
        Id: Number,
        Name: String
    }],
    CustomerType: {
        Id: Number,
        Name: String
    },
    Rank: Number,
    Address: {
        House: String,
        Street: String,
        Town: String,
        CountyRegion: String,
        Country: String,
        Postcode: String
    },
    IsRoyaltyCardHolder: Boolean,
    CreatedDateTime: Date,
    CustomerMarketingSourceIpAddress: String,
    MarketingPreferencesUrl: String
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
// const mongoose = require('mongoose');

// const CustomerSchema = new mongoose.Schema({
//   Id: { type: Number, index: true, unique: true },
//   Title: String,
//   FirstName: String,
//   Surname: String,
//   Company: String,
//   Department: String,
//   Email: { type: String, index: true },
//   MobileCountryCode: Number,
//   Mobile: String,
//   PhoneCountryCode: Number,
//   Phone: String,
//   IsVip: Boolean,
//   ReceiveEmailMarketing: Boolean,
//   GroupEmailMarketingOptInText: String,
//   GroupEmailMarketingOptInDateTime: Date,
//   ReceiveSmsMarketing: Boolean,
//   GroupSmsMarketingOptInText: String,
//   GroupSmsMarketingOptInDateTime: Date,
//   ReceiveRestaurantEmailMarketing: Boolean,
//   RestaurantEmailMarketingOptInText: String,
//   RestaurantEmailMarketingOptInDateTime: Date,
//   ReceiveRestaurantSmsMarketing: Boolean,
//   RestaurantSmsMarketingOptInText: String,
//   RestaurantSmsMarketingOptInDateTime: Date,
//   Comments: String,
//   Birthday: Date,
//   Anniversary: Date,
//   IsDrinkingAge: Boolean,
//   MembershipId: { type: String, index: true },
//   Field1: String,
//   Field2: String,
//   Field3: String,
//   Field4: String,
//   Field5: String,
//   IsBlocked: Boolean,
//   CustomerCodes: [Number],
//   CustomerCodesList: [{
//     Id: Number,
//     Name: String
//   }],
//   CustomerType: {
//     Id: Number,
//     Name: String
//   },
//   Rank: Number,
//   Address: {
//     House: String,
//     Street: String,
//     Town: String,
//     CountyRegion: String,
//     Country: String,
//     Postcode: String
//   },
//   IsRoyaltyCardHolder: Boolean,
//   CreatedDateTime: Date,
//   CustomerMarketingSourceIpAddress: String,
//   MarketingPreferencesUrl: String
// });


// CustomerSchema.index({ Id: 1, Email: 1 }, { unique: true });
// const Customer = mongoose.model('Customer', CustomerSchema);

// module.exports = Customer;
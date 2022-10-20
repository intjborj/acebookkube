module.exports = {
  async up(db, client) {
    await db.collection('tickettypes').insertMany([
      {name: "Equipment Maintenance", code:"EquipmentMaintenance"},
      {name: "CCTV Review", code:"CCTVReview"},
      {name: "HIS Client Concern", code:"HISClientConcern"},
      {name: "HIS Development Request", code:"HISDevelopmentRequest"},
    ]);
  },

  async down(db, client) {
    
  }
};

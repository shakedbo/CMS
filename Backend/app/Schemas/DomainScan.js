const mongoose = require('mongoose');
const { SystemSchema, SystemModel } = require('./System');



const DomainScanSchema = new mongoose.Schema({
    // Asset is the queried domain
    asset: {
        type: String
    },
    // All the results of the queried asset
    systems: {
        type: [SystemSchema],
        default: []
    }
})

DomainScanSchema.methods.addSystems = async function (systems) {
    try {
        // for each system in systems, push it into the systems array
        // console.log("-------------------\nsystems = ", systems, "\n----------------------\n");
        for (let i = 0; i < systems.length; i++) {
            let curSys = await new SystemModel({ name: systems[i].name, categories: systems[i].categories });
            await this.systems.push(curSys);
        }
        await this.save();
    } catch (err) {
        console.error(err);
    }
}

const DomainScanModel = mongoose.model('DomainScan', DomainScanSchema);

module.exports = { DomainScanModel, DomainScanSchema };
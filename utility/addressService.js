const isServiceable = async (address) => {

    const location = address.location;

    // some logic to check if the location is serviceable
    // const serviceableArea = await ServiceableArea.findOne({
    //     location: {
    //         $geoIntersects: {
    //             $geometry: location
    //         }
    //     }
    // });
    return true;
};

module.exports = { isServiceable };
/**
 * By a given array of arrays, we need to return one array which contains one copy of each element in the all array of arrays
 */

module.exports = (arrOfArrays) => {
    let systems = [];

    // First, create a big array which contain all the elements of arrOfArrays
    for (let i = 0; i < arrOfArrays.length; i++) {
        for (let j = 0; j < arrOfArrays[i].length; j++) {
            systems.push(arrOfArrays[i][j]);
        }
    }


    // Array of name really truck on the dups
    let arrayWithoutDups = [], arrayNamesWithoutDups = [];

    systems.forEach(sys => {
        if (!arrayNamesWithoutDups.includes(sys.name)) {
            arrayWithoutDups.push(sys);
            arrayNamesWithoutDups.push(sys.name);
        }
    })

    return arrayWithoutDups;
}
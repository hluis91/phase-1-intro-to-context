// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}
// let employee1 = new createEmployeeRecord(['Nacho', 'Camacho', 'Custodian', 25],);
// console.log(employee1);


function createEmployeeRecords(arrayOfArrays){
    let collection = []
    for (let i = 0; i < arrayOfArrays.length; i++) {
        collection.push(createEmployeeRecord(arrayOfArrays[i]))
    }
    return collection
}

function createDateStampObj(typeEvent, timeStamp){
    return {
        type: typeEvent,
        hour: parseInt(timeStamp.slice(-4)),
        date: timeStamp.slice(0,10)
    }
}

function createTimeInEvent(object, timeStamp){
    object.timeInEvents.push(createDateStampObj("TimeIn", timeStamp))
    return object
}

function createTimeOutEvent(object, timeStamp){
    object.timeOutEvents.push(createDateStampObj("TimeOut", timeStamp))
    return object
}

function hoursWorkedOnDate(object, dateYMD){
    const timeIn = object.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = object.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(object, dateYMD){

    const wage = object.payPerHour
    const hoursWorked = hoursWorkedOnDate(object, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(object){
    const allWages = object.timeInEvents.map((day) => {return wagesEarnedOnDate(object, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records){
    const allPay = (records.map((employee) => {return allWagesFor(employee)}))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}


result = (score, questions) => {
    let resultPercentage = (score / questions) * 100;
    switch (true) {
        case (resultPercentage >= 75):
            console.log("Amazing !!")
            break;
        case (resultPercentage >= 65):
            console.log("Good !!")
            break;
        case (resultPercentage >= 55):
            console.log("Not Bad..")
            break;
        case (resultPercentage >= 35):
            console.log("Need to focus..")
            break;
        default:
            console.log("Poor .. Work Hard")
    }
}

result(1, 6);
result(2, 6);
result(3, 6);
result(4, 6);
result(5, 6);
result(6, 6);

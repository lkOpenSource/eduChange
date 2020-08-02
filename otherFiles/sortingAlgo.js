let result = [
    { name: "Sathu", totalScore: 10 },
    { name: "Sibi", totalScore: 20 },
    { name: "JR", totalScore: 40 },
    { name: "Jappa", totalScore: 5 },
    { name: "Jathu", totalScore: 50 }]

sortData = (a, b) => {
    return b.totalScore - a.totalScore;
}

result.sort(sortData);

result.forEach(element => {
    console.log(element.name);
});
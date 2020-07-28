let data = [
    { name: "Sathurshan Jegatheeswaran", totalScore: 10 },
    { name: "Sibi", totalScore: 20 },
    { name: "JR", totalScore: 40 },
    { name: "Jappa", totalScore: 5 },
    { name: "Jathu", totalScore: 50 }]

let searchText = "s";

let newText = searchText.trim();

// const result = data.filter((dataObject) => (
//     dataObject.name.toUpperCase().includes(newText.toUpperCase()))
// );
//console.log(result);

const result = data.filter((dataObject) => {
    let newData = dataObject.name.toUpperCase();
    let newSearchData = newText.toUpperCase();
    let index = newData.indexOf(newSearchData);
    if (index !== -1 && index < 1) {
        return true;
    } else {
        return false;
    }
})
console.log(result);
   
// if (text.length == 0) {
//     this.setState({data:dataOfLeaders,searchText:""})
//    // console.log(dataOfLeaders)
// } else {
//     const newData = this.state.data.filter((data) => {
//         const itemData = data.name.toUpperCase();
//         const textData = text.toUpperCase();
//         return (itemData.indexOf(textData) > -1)
//     })
//     this.setState({
//         data: newData,
//         searchText: text
//     })
// }
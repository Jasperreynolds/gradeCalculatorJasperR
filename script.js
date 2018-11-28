var rowCount= 1;


function pageSetUp(){
    var container = document.getElementById("tableContainer");
    var table = document.createElement("table");
    table.setAttribute("id", "mainTable");
    container.appendChild(table);
    addRow();
}


function calculateCurrentGrade(){
    var grades = [];
    var gradeWeight = [];
    var finalGrade = 0;
    for(var i = 1; i < rowCount; i++){
        grades.push(document.getElementById("percent" + i).value);
        gradeWeight.push(document.getElementById("weight" + i).value);
    }
    for (var k=0; k <gradeWeight.length; k++){
        gradeWeight[k] = convertArrayStringToNumber(gradeWeight[k]);
        gradeWeight[k] = averageArray(gradeWeight[k]);
    }
    for (var j=0; j < grades.length; j++){
        grades[j] = convertArrayStringToNumber(grades[j]);
        grades[j] = averageArray(grades[j]);
    }
    for(var x = 0; x < rowCount - 1; x++) {
        finalGrade += grades[x] * (gradeWeight[x] / 100);
    }
    finalGrade = finalGrade * 100;
    finalGrade = Math.round(finalGrade);
    finalGrade = finalGrade / 100;

    if(finalGrade >100){
        alert("Your Grade is over 100%! Great job, or you put in your grades incorrectly.");
    }

    document.getElementById("displayGrade").innerHTML= "Your grade is: " + finalGrade + "%";
    return finalGrade;

}


function addRow() {
    if(rowCount >= 7){
        return false;
    }
    var table= document.getElementById("mainTable");
    var textRow = document.createElement("tr");
    var labelRow = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.setAttribute("id", "cat" + rowCount);
    var td2 = document.createElement("td");
    td2.setAttribute("id", "wgt" + rowCount);
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");
    var initialCat = document.getElementById("category").value;
    input1.setAttribute("id","percent" + rowCount);
    input2.setAttribute("id","weight" + rowCount);
    input1.setAttribute("value", "80,90,100");
    input2.setAttribute("value", "30");
    if(initialCat.length==0){
        initialCat = "Homework";
    }
    td1.innerHTML = initialCat + " Percent";
    td2.innerHTML = initialCat + " Weight";
    td3.append(input1);
    td4.append(input2);
    labelRow.append(td1);
    labelRow.append(td2);
    textRow.append(td3);
    textRow.append(td4);
    table.append(labelRow);
    table.append(textRow);
    rowCount++;

    colorTable(textRow, labelRow);



}

function colorTable(t, l){
    var color = "red";
    t.setAttribute("class", color);
    l.setAttribute("class", color);

}

function convertArrayStringToNumber(str){
    var array = str.split(",");
    for(var i=0; i < array.length; i++){
        array[i] = parseInt(array[i]);
    }
    return array;
}

function averageArray(arr){
    var avg = 0;
    for(i = 0; i < arr.length; i++){
        avg += arr[i];
    }
    avg = avg / arr.length;
    return avg;
}

function calculateGradeNeeded(){
    var gradeDesired = [];
    var finalTestWeight = [];
    var finalGrade = calculateCurrentGrade();
    gradeDesired.push(document.getElementById("yourDesiredGrade").value);
    finalTestWeight.push(document.getElementById("percentWeightOfFinal").value);
    gradeDesired = parseInt(gradeDesired);
    finalTestWeight = parseInt(finalTestWeight);
    var currentPoints = (finalGrade / 100) * (1 - (finalTestWeight / 100));
    var pointsNeeded = (gradeDesired / 100) - currentPoints;
    var gradeNeeded = (pointsNeeded / (finalTestWeight / 100)) * 100;
    gradeNeeded = gradeNeeded * 100;
    gradeNeeded = Math.round(gradeNeeded);
    gradeNeeded = gradeNeeded/100;

    if(gradeNeeded>100){
        alert("Bummer! You need more than 100%! I hope you can get extra credit!");
    }
    document.getElementById("youNeedThis").innerHTML = "You need a " + gradeNeeded + "%";
}

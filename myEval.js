function contAddSub(str){
    var numbers = str.split(/[+-]/g);
    var operators = str.split(/[\d.]/g).filter(e => {return e != ""});
    for(var i = 0; i < numbers.length - 1; i++){
        if(operators[i] == '+'){
            numbers[i+1] = Number(numbers[i]) + Number(numbers[i+1]);
        }else if(operators[i] == '-'){
            numbers[i+1] = Number(numbers[i]) - Number(numbers[i+1]);
        }
    }
    return numbers[numbers.length-1];
}

function resolveMulDiv(str){
    var mulIndex = str.indexOf('*');
    var divIndex = str.indexOf('/');
    var firstOperIndex;
    var firstOper;
    if(divIndex == -1 && mulIndex == -1){
        return str;
    }else if(divIndex == -1){
        firstOperIndex = mulIndex;
        firstOper = '*';
    }else if(mulIndex == -1){
        firstOperIndex = divIndex;
        firstOper = '/';
    }else{
        firstOperIndex = mulIndex > divIndex ? divIndex : mulIndex;
        firstOper = mulIndex > divIndex ? '/' : '*';
    }

    list = [];
    for(var i = 0; i < str.length; i++){
        if(str[i] == '*'|| str[i] == '/' || str[i] == '+' || str[i] == '-'){
            list.push(i);
        }
    }
    for(var j = 0 ; j < list.length; j++){
        if(list[0] == firstOperIndex){
           var leftPart = "";
           var rightPart = str.substring(list[1]);
           var leftNum = str.substring(0,firstOperIndex);
           var rightNum = str.substring(firstOperIndex+1,list[1]);
           var calResult;
           if(firstOper == '/'){
                calResult = Number(leftNum) / Number(rightNum);
           }else{
                calResult = Number(leftNum) * Number(rightNum);
           }
           return resolveMulDiv(leftPart + calResult + rightPart);
        }
        if(list[j] == firstOperIndex && j!=0 && j != list.length - 1){
           var leftPart = str.substring(0,list[j-1]+1);
           var rightPart = str.substring(list[j+1]);
           var leftNum = str.substring(list[j-1]+1,firstOperIndex);
           var rightNum = str.substring(firstOperIndex+1,list[j+1]);
           var calResult;
           if(firstOper == '/'){
                calResult = Number(leftNum) / Number(rightNum);
           }else{
                calResult = Number(leftNum) * Number(rightNum);
           }
           return resolveMulDiv(leftPart + calResult + rightPart);
        } 
        if(list[list.length-1] == firstOperIndex){
           var leftPart = str.substring(0,list[list.length-2]+1);
           var rightPart = "";
           var leftNum = str.substring(list[list.length-2]+1,firstOperIndex);
           var rightNum = str.substring(firstOperIndex+1);
           var calResult;
           if(firstOper == '/'){
                calResult = Number(leftNum) / Number(rightNum);
           }else{
                calResult = Number(leftNum) * Number(rightNum);
           }
           return resolveMulDiv(leftPart + calResult + rightPart);
        }
    }
}

function myEval(newExp) {
    //validate(newExp);
    var result;
    while (newExp.lastIndexOf('(') >= 0) {
        var leftIndex = newExp.lastIndexOf('(');
        var rightIndex = newExp.indexOf(')');
        result = operInter(newExp.substr(leftIndex+1, rightIndex - leftIndex-1));
        var leftPart = newExp.substr(0, leftIndex);
        var rightPart = newExp.substr(rightIndex + 1, newExp.length);
        newExp = leftPart + result + rightPart;
    }
    return operInter(newExp);
}

function operInter(str){
    return contAddSub(resolveMulDiv(str));
}

function validate(str){
    //check invalid chars
    if(!/[^+-*/.]/g.test(str)){
        throw new Error("contain invalid chars!")
    }
    //check brackets
    var map = str.split('').filter(e=>{return e == '(' || e == ')'}).reduce((a,v)=>{
        a[v] = a[v] ? a[v] + 1 : 1;
        return a;    
    },{});
    if(map['('] < map[')']){
        throw new Error("missing left brackets");
    }else if(map['('] > map[')']){
        throw new Error("missing right brackets");
    }
}

var exp = "2*2*2+2/(2+1)";
var muls = "2*3*14.2/2";
var adds = "1+2+3/3*4/4-6/3";
var newExp = "(5+3*(4+2))"
console.log(myEval(exp));



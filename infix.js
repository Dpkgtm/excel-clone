function evaluate (ar){
    let arr=ar.split('');//convert stirng to char array
    let oprands=[];//stack for operands
    let operators=[]; //stack for operators
    while(arr.length>0){
        let ch=arr.shift();
        if(ch=='('){
            operators.push(ch);
        }
        else if(ch>='0'&&ch<='9'){
            oprands.push(ch-'0');
        }
     else if(ch=='+'||ch=='-'||ch=='*'||ch=='/'){
        while(operators.length>0&&precedence(ch)<=precedence(operators[operators.length-1])&&operators[operators.length-1]!='('){
            let v2=oprands.pop();
            let v1=oprands.pop();
            let op=operators.pop();
            let ans=calculate(v1,v2,op);
            oprands.push(ans);
        }
        operators.push(ch);
     }
     else if(ch==')'){
        while(operators.length>0&&operators[operators.length-1]!='('){
            let v1=oprands.pop();
            let v2=oprands.pop();
            let op=operators.pop();
            let ans=calculate(v1,v2,op);
            oprands.push(ans);
        }
        operators.pop();
     }
    }
    while(operators.length>0){
        let v1=oprands.pop();
        let v2=oprands.pop();
        let op=operators.pop();
        let ans=calculate(v1,v2,op);
        oprands.push(ans);
    }
    return oprands.pop();
}
function calculate(v1,v2,op){
    if(op=='+') return v1+v2;
    else if(op=='-') return v1-v2;
    else if(op=='*') return v1*v2;
    else return v1/v2;
}
function precedence(op){
    if(op=='+') return 1;
    else if(op=='-') return 1;
    else if(op=='*') return 2;
    else return 2;
}


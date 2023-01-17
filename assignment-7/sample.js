let n=78;
let count=0;
for(let i=0;i<n;i++){
    if(n%i==0){
        count+=i;
    }
}
if(n==count){
    console.log('It is a perfect number');
}
else{
    console.log('It is not a perfect number');
}
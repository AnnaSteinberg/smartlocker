async  function healthLambda(){
    return{
        status:"ok",
        service:"lambda"
    };
}

module.exports={healthLambda};
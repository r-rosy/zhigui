import axios from 'axios'

export default {
    HttpRequest:  function(pointer,url,method,action,body)
{
    switch(method)
    {
        case 'get':
            axios.get(url).then(function(response){
                console.log(response);
                if(response.status==200)
                    {
                        action(response,pointer);
                    }else {
                        pointer.$message(response.data.message);
                        
                    }
            }).catch(function(error){
                console.log(error);
            })
            break;
        case 'post':
            axios.post(url,body).then(function(response){
                console.log(response);
                if(response.status==200)
                    {
                        action(response,pointer);
                    }else {
                        pointer.$message(response.data.message);
                    }
            }
            ).catch(function(error){
                console.log(error);
            }
            )
            break;
    }
},
GetUserBaseInfo : function (pointer)
    {
    this.HttpRequest(pointer,'/api/v1/user/info','get',
    function(response,pointer) {
        pointer.individual = response.data.data
    },null)
},


}

import axios from 'axios'
import ElementUI from 'element-ui'

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
                        pointer.$message(response.data.error);
                        ElementUI.Message({  
                        message: response.data.message.Message
                        })
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
                        pointer.$message(response.data.error);
                        ElementUI.Message({  
                        message: response.data.message.Message
                        })
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

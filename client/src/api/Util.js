import axios from 'axios'
const Util={
    searchAPI(router,searchText){
        if(searchText!==""){
            router.push(`/search/${searchText}`)
        }
    },
    search(key){
        return(axios({
            method:'get',
            url:'http://127.0.0.1:3000/search',
            params:{
                key:key
            }
        }));
    },
    love(content_id,uid){
      return axios({
          method: 'post',
          url: 'http://127.0.0.1:3000/like',
          data: {
              content_id:content_id,
              uid:uid
          }
      })
    },
    comment(content_id){
        return axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/comment',
            data: {
                content_id:content_id,
                uid:this.$cookie.getCookie('uid')
            }})
    }
};
export default Util;
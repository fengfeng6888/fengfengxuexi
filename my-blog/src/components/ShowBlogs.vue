<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="(blog,index) in filteredBlogs" class="single-blog" :key="index">
      <router-link :to="'/blog/'+blog.id">
      <h2 v-rainbow>{{blog.title | to-uppercase}}</h2></router-link>
      <article>
        {{blog.content | snippet}}
      </article>
    </div>
  </div>
</template>

<script>
import axios from '../axios-auth';


export default {
  name: 'show-blogs',
  data() {
    return {
      blogs:[],
      search:""
    }
  },
  created() {
    axios.get("/posts.json")
    .then(function(data){
      // console.log(data);
      // this.blogs=data.body.slice(0,10);
      // console.log(this.blogs);
      return data.data;
    }).then((data)=>{
      var blogsArray = [];
      for(let key in data){
        data[key].id = key;
        blogsArray.push(data[key]);
      }
      this.blogs = blogsArray;
    })
  },
  computed:{
    filteredBlogs:function(){
      return this.blogs.filter((blog)=>{
        return blog.title.match(this.search);
      })
    }
  },
  filters:{
    toUppercase(value){
      return value.toUpperCase();
    }
  },
  directives:{
    'rainbow':{
      bind(el,binding,vnode){
        el.style.color = "#" + Math.random().toString(16).slice(2,8);
      }
    }
  }
}
</script>

<style>
#show-blogs{
  min-width: 800px;
  margin: 0 auto;
}

.single-blog{
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a{
  color: #444;
  text-align: none;
}

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

</style>

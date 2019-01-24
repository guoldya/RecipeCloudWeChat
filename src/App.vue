<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style  >
#app {
  font-family: "PingFang-SC-Medium";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
p {
  word-wrap: break-word;
  word-break: break-all;
}
.margin45 {
  margin-top: 100px;
}
.outCarint {
  padding: 0 24px;
}
</style>

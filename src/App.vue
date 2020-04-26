<template>
  <div id="app">
    <!--div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div-->
    <router-view />
  </div>
</template>

<style lang="scss">
$btn-bg-color: #42b983;
$btn-color: #2c3e50;

* {
  font-size: 1rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  padding: 10px;
}

.btn {
  background: $btn-bg-color;
  color: $btn-color;

  border: 0;
  border-color: darken($color: $btn-bg-color, $amount: 30);
  outline-color: darken($color: $btn-bg-color, $amount: 30);

  border-radius: 0.25rem;
  padding: 0.5rem;
  margin: 0.5rem;
  height: 2rem;
}

.btn[disabled] {
  opacity: 0.5;
}

.input {
  height: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
}

// Grid system
.row:after {
  content: "";
  display: table;
  clear: both;
}

@mixin col($number) {
  float: left;
  width: calc(100% / 12 * #{$number});
}

@for $i from 1 through 12 {
  .col-#{$i} {
    @include col($i);
  }
}

// Flex

.flex {
  display: flex;
  justify-content: space-around;
}
</style>

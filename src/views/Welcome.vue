<template>
  <div>
    <h1>Welcome</h1>
    <div>
      <router-link :to="{name: 'tournament'}">Enter Tournament</router-link>
    </div>
    <div>
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome"
};
</script>
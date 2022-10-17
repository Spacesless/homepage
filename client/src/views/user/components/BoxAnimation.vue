<template>
  <ul class="background">
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
    <li />
  </ul>
</template>

<style lang="less" scoped>
.background {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  li {
    position: absolute;
    bottom: -160px;
    display: block;
    width: 40px;
    height: 40px;
    list-style: none;
    background-color: rgba(@primary-color, 0.2);
    transition-timing-function: linear;
    animation: square 25s infinite;

    &:nth-child(1) {
      left: 10%;
    }

    &:nth-child(2) {
      left: 20%;
      width: 80px;
      height: 80px;
      animation-duration: 17s;
      animation-delay: 2s;
    }

    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }

    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      background-color: rgba(@primary-color, 0.3);
      animation-duration: 22s;
    }

    &:nth-child(5) {
      left: 70%;
    }

    &:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      background-color: rgba(@primary-color, 0.25);
      animation-delay: 3s;
    }

    &:nth-child(7) {
      left: 32%;
      width: 160px;
      height: 160px;
      animation-delay: 7s;
    }

    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-duration: 40s;
      animation-delay: 15s;
    }

    &:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      background-color: rgba(@primary-color, 0.35);
      animation-duration: 40s;
      animation-delay: 2s;
    }

    &:nth-child(10) {
      left: 90%;
      width: 160px;
      height: 160px;
      animation-delay: 11s;
    }
  }
}

@keyframes square {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-800px) rotate(600deg);
    opacity: 0;
  }
}
</style>

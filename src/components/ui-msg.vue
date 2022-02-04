<template>
  <p class="message">
    {{ msg }}
  </p>
</template>

<script>
export default {
  name: "ui-msg",
  props: {
    msg: ''
  },
  watch: {
    msg: function() {
      const msgElem = document.querySelector('.message');
      let arrMsg = this.msg.split(' ');

      for (const arrMsgKey of arrMsg) {
        if (arrMsgKey === 'успешно') {
          msgElem.classList.add('success');
          setTimeout(() => {
            msgElem.classList.remove('success');
          }, 4000)
        } else if (arrMsgKey === 'ошибка') {
          msgElem.classList.add('danger');
          setTimeout(() => {
            msgElem.classList.remove('danger');
          }, 4000)
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  position: absolute;
  top: -50px;
  left: 50%;
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  transform: translateX(-50%);
  background: #ccc;
  padding: 15px 30px;
  opacity: 0.6;
  border-radius: 0 0 12px 12px;
  animation-name: showMsg;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;

  @keyframes showMsg {
    from { top: -50px}
    20% {top: 0}
    to {top: -50px}
  }
}
.message.success {
  background: #A5D6A7;
}
.message.danger {
  background: #FF8A65;
}
</style>

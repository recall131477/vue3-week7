<template>
  <div class="modal fade" ref="frontCouponModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="coupon-puzzle">
          <div class="wait">
            <ul>
              <li
                v-for="(item, index) in todoWait"
                :key="item.url"
                @click="handPuzzle(item, index)"
              >
                <img :src="item.url" alt="" />
              </li>
            </ul>
          </div>
          <div class="carried">
            <ul>
              <li
                v-for="(item, index) in todoOver"
                :key="item.url"
                @click="resetPuzzle(item, index)"
              >
                <img :src="item.url" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import puzzleImg1 from '@/assets/img/Puzzle/1.png';
import puzzleImg2 from '@/assets/img/Puzzle/2.png';
import puzzleImg3 from '@/assets/img/Puzzle/3.png';
import puzzleImg4 from '@/assets/img/Puzzle/4.png';
import puzzleImg5 from '@/assets/img/Puzzle/5.png';
import puzzleImg6 from '@/assets/img/Puzzle/6.png';
import puzzleImg7 from '@/assets/img/Puzzle/7.png';
import puzzleImg8 from '@/assets/img/Puzzle/8.png';
import puzzleImg9 from '@/assets/img/Puzzle/9.png';

export default {
  data() {
    return {
      couponModal: '',
      todoWait: [
        {
          idx: 8,
          url: puzzleImg9,
        },
        {
          idx: 1,
          url: puzzleImg2,
        },
        {
          idx: 6,
          url: puzzleImg7,
        },
        {
          idx: 5,
          url: puzzleImg6,
        },
        {
          idx: 7,
          url: puzzleImg8,
        },
        {
          idx: 0,
          url: puzzleImg1,
        },
        {
          idx: 3,
          url: puzzleImg4,
        },
        {
          idx: 2,
          url: puzzleImg3,
        },
        {
          idx: 4,
          url: puzzleImg5,
        },
      ],
      todoOver: [],
      winIdx: 0,
      isWin: false,
    };
  },
  watch: {
    todoOver: {
      handler(newArr) {
        this.winIdx = 0;
        newArr.forEach((item, index) => {
          if (item.idx === index) {
            this.winIdx += 1;
          }
        });
      },
      deep: true,
    },
    winIdx(newVal) {
      if (newVal === 9) {
        this.isWin = true;
        this.closeCouponModal();
        this.$emit('get-coupon');
      }
    },
  },
  methods: {
    // 將陣列隨機
    randomArr() {
      this.todoWait.sort(() => (Math.random() > 0.5 ? -1 : 1));
    },
    handPuzzle(item, index) {
      this.todoOver.push(item);
      this.todoWait.splice(index, 1);
    },
    resetPuzzle(item, index) {
      this.todoWait.push(item);
      this.todoOver.splice(index, 1);
    },
    openCouponModal() {
      // 開啟優惠券 modal
      this.couponModal.show();
    },
    closeCouponModal() {
      // 關閉優惠券 modal
      this.couponModal.hide();
    },
  },
  mounted() {
    this.randomArr();
    this.couponModal = new Modal(this.$refs.frontCouponModal);
  },
};
</script>

<style lang="scss">
.coupon-puzzle {
  > div {
    background-size: 100% 100%;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    cursor: pointer;
    display: block;
    width: 166px;
    height: 166px;
    border: 1px solid #fff;
    float: left;
  }
  .modal-dialog {
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 3.5rem);
  }
  .modal-backdrop {
    background-color: rgba(#000, 0.6);
  }

  .modal-backdrop.show {
    opacity: 0;
  }
}

img {
  display: block;
  width: 100%;
  height: 100%;
}

.wait {
  width: 500px;
  height: 500px;
  background-color: #fff;
}

.carried {
  width: 500px;
  height: 500px;
  background-color: #fff;
  background-size: cover;
  background-image: url('@/assets/img/Puzzle/bg2.jpg');
}

.winPage {
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: top 0.3s;
}
.winPage.open {
  top: 0;
}

.winPage > h1 {
  color: #fff;
  font-size: 60px;
}

.close {
  position: absolute;
  top: 15%;
  right: 20%;
}
</style>

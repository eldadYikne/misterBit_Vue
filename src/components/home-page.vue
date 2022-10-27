 <template>
  <div v-if="user" class="home-page">
    <span class="home-page-title">Hello, {{ user.name }}</span>
    <div class="user-modal">
      <div class="balance">
        <div class="title-container">
          <span class="title-name"> {{ user.name }}'s balance </span>
          <span class="title-balance">
            USD: <span class="user-balance">$ {{ user.balance }}</span>
          </span>
          <span class="title-bitcoin"
            >Bitcoin:
            <span class="user-balance-bitcoin">{{ bitcoinValue }}</span>
          </span>
        </div>
        <div class="btn-container-option">
          <RouterLink to="/contact">
            <button class="view-contacts">View contacts</button>
          </RouterLink>
          <button @click="toggleModal" class="view-contacts">Currency</button>
        </div>
        <span class="title-transitions">Your transitions </span>
        <div class="transition-container" v-if="user.transactions">
          <div
            class="transition"
            v-for="transition in user.transactions"
            :key="transition.at"
          >
            <div class="at-to-container">
              <span class="to">To {{ transition.to }}</span>
              <span class="at"> {{ transition.at }}</span>
            </div>
            <div class="amount-container">
              <span class="amount">Amount: {{ transition.amount }}$</span>
              <span class="coinLeft">Wallet: {{ transition.coinLeft }}$</span>
            </div>
          </div>
        </div>
        <div v-if="modalCoinsTypeShown" class="btn-container-type-coins">
          <button
            v-on:click="onChangeCoinType(coin)"
            class="button coin"
            v-for="coin in allTypeOfCoins"
            v-bind:key="coin"
            @click="toggleModal"
          >
            {{ coin }}
          </button>
        </div>
      </div>
      <section class="bitcoin-display">
        <span class="wallstreet"> Current BTC {{ currCoin }}</span>
        <span class="bitcoin-val">{{ bitCoinInMoney }}</span>
        <span class="wallstreet">According wallstreet </span>
      </section>

      <div class="chart">
        <ChartApp :width="400" />
      </div>
    </div>
  </div>
</template>

<script>
import { bitcoinService } from "../service/bitcoin.service";
import { userService } from "../service/user.service";
import ContactList from "./contact-list.vue";
import ChartApp from "./chart-app.vue";
import store from "../store";

export default {
  data() {
    return {
      user: null,
      bitcoinValue: null,
      bitCoinInMoney: null,
      currCoin: "USD",
      allTypeOfCoins: [],
      modalCoinsTypeShown: false,
    };
  },
  created() {
    this.getUser();
    this.getBitValue();
  },
  methods: {
    async getUser() {
      this.user = await this.$store.getters.user;
    },
    async getBitValue() {
      try {
        const bitcoinData = await bitcoinService.getRate(this.currCoin);
        this.allTypeOfCoins = bitcoinData.coinsTypes;
        const userBitcoin = this.user.balance / bitcoinData.bitCoinVal.buy;
        this.bitcoinValue = userBitcoin;
        this.bitCoinInMoney = bitcoinData.bitCoinVal.buy;
      } catch (err) {
        console.log(err);
      }
    },
    onChangeCoinType(coin) {
      this.currCoin = coin;
      this.getBitValue();
    },
    toggleModal() {
      this.modalCoinsTypeShown = !this.modalCoinsTypeShown;
    },
  },
  components: { ContactList, ChartApp },
};
</script>


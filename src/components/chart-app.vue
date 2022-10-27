<template>
  <Line :width="300" :height="300" v-if="loaded" :chart-data="chartData" />
</template>
  
  <script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default {
  name: "LineChart",
  components: {
    Line,
  },
  data() {
    return {
      loaded: false,
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.setChart();
  },
  methods: {
    async setChart() {
      try {
        const coinData = await axios.get("https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true");
        this.chartData = {
          datasets: [
            {
              label: coinData.data.name,
              backgroundColor: "#f87979",
              data: coinData.data.values.map((data) => data.y),
            },
          ],
          labels: coinData.data.values.map((data) => {
            const newDate = new Date(data.x * 1000);
            const dateToDisplay = new Intl.DateTimeFormat("en-US").format(newDate);
            return dateToDisplay;
          }),
        };
        this.loaded = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>


<template>
  <NavbarCard></NavbarCard>
  <div class="export-btn">
    <Button label="Graph" icon="pi pi-chart-line" @click="toggleChart" />
  </div>
  <div>
    <Chart
      type="line"
      :data="lineData"
      :options="lineOptions"
      v-if="displayLine"
      class="chart_fix"
    />
    <Chart type="pie" :data="pieData" :options="pieOptions" v-if="displayPie" class="chart_fix2"/>
  </div>
  <ContainCard :cards="cards"></ContainCard>
</template>
<script>
import ContainCard from "../components/ContainCard.vue";
import NavbarCard from "../components/NavbarCard.vue";
export default {
  name: "App",
  components: {
    ContainCard,
    NavbarCard,
  },
  data() {
    return {
      displayCard: false,
      displayLine: false,
      displayPie: false,
      chartLabel: null,
      cards: [],
      timeData: [],
      lineData: {
        labels: [],
        datasets: [
          {
            label: "Value",
            backgroundColor: "#42A5F5",
            borderColor: "#42A5F5",
            data: [],
            // tension: .4
          },
        ],
      },
      pieData: {
        labels: ["YES", "NO"],
        datasets: [
          {
            data: [],
            backgroundColor: ["#42A5F5", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#FFB74D"],
          },
        ],
      },
      lineOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#FFFFFF",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#FFFFFF",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#FFFFFF",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
      pieOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#FFFFFF",
            },
          },
        },
      },
    };
  },
  methods: {
    toggleFile: function () {
      this.displayCard = !this.displayCard;
    },
    toggleChart() {
      if (
        this.pieData.datasets[0].data[0] > 0 ||
        this.pieData.datasets[0].data[0] > 0
      ) {
        this.displayPie = !this.displayPie;
      } else if (typeof this.pieData.datasets[0].data[0] == "number") {
        this.displayLine = !this.displayLine;
      }
    },
  },
  mounted() {
    var authToken = localStorage.getItem("Auth");
    fetch("http://localhost:5000/tracker/" + this.$route.params.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: authToken,
      },
    })
      .then((data) => data.json())
      .then((cards) => {
        this.cards = cards;
        let that = this;
        let yes = 0,
          no = 0;
        Object.keys(cards).forEach(function (key) {
          let val = parseInt(cards[key].value);
          const date = new Date(parseInt(cards[key].time_stamp));
          let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const day = date.getDay();
          that.lineData.labels.push(days[day]);
          that.lineData.datasets[0].data.push(val);
          if (cards[key].value == "Yes") {
            yes += 1;
          } else if (cards[key].value == "No") {
            no += 1;
          }
        });
        this.pieData.datasets[0].data.push(yes);
        this.pieData.datasets[0].data.push(no);
      });
  },
};
</script>
<style>
.export-btn {
  margin-top: 2rem;
  margin-bottom: 3rem;
}
@media only screen and (min-width: 600px){
  .chart_fix{
      width: 70%;
  }
  .chart_fix2{
    width: 50%
  }
}
@media only screen and (min-width: 1000px){
  .chart_fix{
      width: 50%;
  }
  .chart_fix2{
    width: 30%
  }
}
</style>
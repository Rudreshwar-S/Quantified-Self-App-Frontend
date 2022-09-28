<template>
  <div class="add-btn">
    <Button label="Add Log" icon="pi pi-download" @click="toggleFile" />
  </div>
  <div class="export-btn">
    <Button label="Graph" icon="pi pi-download" @click="toggleChart" />
  </div>
  <Chart
    type="line"
    :data="lineData"
    :options="lineOptions"
    v-if="displayLine"
  />
  <Chart type="pie" :data="pieData" :options="pieOptions" v-if="displayPie"/>

  <AddCard v-if="displayCard" tracker=""></AddCard>
  <DailyLogTrackers :cards="cards" ></DailyLogTrackers>
</template>
<script>
import AddCard from "../components/AddCard.vue";
import DailyLogTrackers from "../components/DailyLogTrackers.vue";
export default {
  name: "App",
  components: {
    DailyLogTrackers,
    AddCard,
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
            label: "Tracker ID: ",
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
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
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
              color: "#495057",
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
      if(this.pieData.datasets[0].data[0]>0 || this.pieData.datasets[0].data[0]>0){
        this.displayPie = !this.displayPie;
      }else if(typeof(this.pieData.datasets[0].data[0])=="number"){
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
.add-btn {
  margin-top: 1rem;
}
.export-btn {
  margin-top: 2rem;
}
</style>

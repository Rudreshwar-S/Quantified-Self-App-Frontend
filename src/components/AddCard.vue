<template>
    <div class="parent_div" v-if="displayDiv">
        <div class="card">
            <Card style="width: 17rem;">
                <template #title>
                    <!-- <Setting class="setting-loc" :radius="100" direction="down-left" type="quarter-circle" showIcon="pi pi-cog "/> -->
                    Card Details
                </template>
                <template #content>
                    <h3>Tracker ID: {{this.$route.params.id}}</h3>
                    <InputText placeholder="Value" style="margin-bottom: 0.8em" v-model="cardValue"></InputText>
                    <Textarea placeholder="Note" style="margin-bottom: 0.8em;" v-model="note" rows="4" cols="22">x``</Textarea>
                </template>
                <template #footer>
                    <Button icon="pi pi-check" type="submit" label="Save" @click="onSubmit"/>
                    <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" @click="onCancel"/>
                </template>
            </Card>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                cardValue: '',
                note: '',
                isValidTracker: false,
                displayDiv: true,
            }
        },
        methods: {
            onSubmit(){
                var timeStamp = new Date().getTime();
                let data = {
                    time_stamp: timeStamp,
                    value: this.cardValue,
                    note: this.note,
                }
                if(!this.note || !this.cardValue){
                    alert("All fields required!")
                }
                else{
                    var authToken = localStorage.getItem("Auth");
                    fetch("http://localhost:5000/tracker/"+this.$route.params.id, {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': authToken
                    }, 
                    body: JSON.stringify(data)
                })
                }
                this.displayDiv=false
                // window.setTimeout(function(){location.reload()},1000)
            },
            onCancel(){
                this.displayDiv=false
            }
        }
    };
</script>

<style scoped>
    .parent_div{
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content:center;
        z-index: 1;
        padding-bottom: 10%;
    }
    .card{
        margin-bottom: 2rem; 
    }
</style>
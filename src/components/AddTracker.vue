<template>
    <div class="parent_div">
        <div class="card">
            <Card style="width: 17rem;" @submit.prevent="handleSubmit(!v$.$invalid)">
                <template #title>
                    <!-- <Setting class="setting-loc" :radius="100" direction="down-left" type="quarter-circle" showIcon="pi pi-cog "/> -->
                    Tracker Details
                </template>
                <template #content>
                    <h3>Tracker ID:</h3>
                    <InputText placeholder="Name" style="margin-bottom: 0.8em" v-model="trackerName"></InputText>
                    <Textarea placeholder="Description" style="margin-bottom: 0.8em;" v-model="description" rows="4" cols="22">x``</Textarea>
                    <Dropdown  style="margin-bottom: 0.8em" v-model="trackerType"/>
                </template>
                <template #footer>
                    <Button icon="pi pi-check" type="submit" label="Save" @click="onSubmit"/>
                    <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" @click=""/>
                </template>
            </Card>
        </div>
    </div>
</template>
<script>
    import { required } from "@vuelidate/validators";
    import { useVuelidate } from "@vuelidate/core";
    import { inject } from 'vue';
    import Dropdown from './Dropdown.vue';
    export default {
        // inject:['displayTracker'],
        components:{
            Dropdown,
        },
        data() {
            return{
                trackerId: '',
                trackerName: '',
                description: '',
                trackerType: null,
                isValidTracker: false,
            }
        },
        methods: {
            onSubmit(){
                console.log(this.displayTracker)
                let data = {
                    name: this.trackerName,
                    description: this.description,
                    tracker_type: this.trackerType.name
                }
                if(!this.description || !this.trackerName || this.trackerType==null){
                    alert("All fields required!")
                }
                else{
                    var authToken = localStorage.getItem("Auth");
                    console.log("authToken: ",authToken)
                    fetch("http://localhost:5000/trackers", {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': authToken
                    }, 
                    body: JSON.stringify(data)
                })
                }
            },
        }
    };
</script>

<style scoped>
    .parent_div{
        position: fixed;
        width: 100vw;
        height: 100vh;
        /* display: flex; */
        align-items: center;
        justify-content:center;
        z-index: 1;
        padding-bottom: 10%;
    }
    .card{
        margin-bottom: 2rem; 
    }
</style>